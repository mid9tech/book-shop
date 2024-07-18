import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import {
  CurrentUser,
  JwtAccessAuthGuard,
  JwtAdminAuthGuard,
} from 'src/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUserInterface } from 'src/interfaces';
import { PagingOrderInput } from './dto/paging-order.input';
import { PagingOrderResponse } from './entities/paging-order.entity';
import { OrderItem } from './entities/order-item.entity';
import { UpdateOrderInput } from './dto/update-order.input';
import { RequireActiveGuard } from 'src/guard/require-active.guard';
import { Contact } from 'src/contacts/entities/contact.entity';
import { Promotion } from 'src/promotions/entities/promotion.entity';
import { ContactsService } from 'src/contacts/contacts.service';
import { PromotionsService } from 'src/promotions/promotions.service';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly promotionService: PromotionsService,
    private readonly contactsService: ContactsService,
  ) {}

  @Mutation(() => Order)
  @UseGuards(JwtAccessAuthGuard, RequireActiveGuard)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.ordersService.create(
      createOrderInput,
      user.id,
      user.email,
      user.firstName,
    );
  }

  @Query(() => PagingOrderResponse, { name: 'orders' })
  @UseGuards(JwtAdminAuthGuard)
  findAll(@Args('pagingOrderInput') pagingOrderInput: PagingOrderInput) {
    return this.ordersService.findMany(pagingOrderInput);
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Query(() => PagingOrderResponse, { name: 'historiesOrder' })
  @UseGuards(JwtAccessAuthGuard, RequireActiveGuard)
  historiesOrder(
    @Args('pagingOrderInput') pagingOrderInput: PagingOrderInput,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.ordersService.findMany(pagingOrderInput, user.id);
  }

  @ResolveField(() => [OrderItem], { name: 'items' })
  findItems(@Parent() parent: Order) {
    return this.ordersService.findItems(parent.id);
  }

  @Mutation(() => Boolean)
  updateStatusOrder(@Args('updateOrderInput') updateInput: UpdateOrderInput) {
    return this.ordersService.update(updateInput.id, updateInput);
  }

  @ResolveField(() => Contact, { name: 'contact' })
  findContact(@Parent() parent: Order) {
    return this.contactsService.findOne(parent.contactId, parent.ownerId);
  }

  @ResolveField(() => Promotion, { nullable: true, name: 'promotion' })
  async findPromotion(@Parent() parent: Order) {
    if (!parent.promotionId) return null;
    return this.promotionService.findOne(parent.promotionId);
  }
}
