import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CartsService } from './carts.service';
import { CartItem } from './entities/cart.entity';
import { AddProductInput } from './dto/cart.input';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAccessAuthGuard } from 'src/guard/jwt-auth.guard';
import { CurrentUserInterface } from 'src/interfaces';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { RequireActiveGuard } from 'src/guard/require-active.guard';

@Resolver(() => CartItem)
export class CartsResolver {
  constructor(
    private readonly cartsService: CartsService,
    private readonly productService: ProductsService,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(JwtAccessAuthGuard, RequireActiveGuard)
  async addProductToCart(
    @Args('addProductInput') addProductInput: AddProductInput,
    @CurrentUser() user: CurrentUserInterface,
  ): Promise<boolean> {
    return await this.cartsService.addProductToCart(
      addProductInput.productId,
      user.id,
      addProductInput.quantity,
    );
  }

  @Query(() => [CartItem])
  @UseGuards(JwtAccessAuthGuard, RequireActiveGuard)
  async getCart(@CurrentUser() user: CurrentUserInterface): Promise<any> {
    return this.cartsService.getCart(user.id);
  }

  @ResolveField(() => Product, { name: 'product' })
  getProduct(@Parent() cartItem: CartItem) {
    return this.productService.findOne(cartItem.productId);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAccessAuthGuard, RequireActiveGuard)
  async updateProductQuantity(
    @Args('updateProductQuantityInput')
    updateProductQuantityInput: AddProductInput,
    @CurrentUser() user: CurrentUserInterface,
  ): Promise<boolean> {
    return await this.cartsService.updateProductQuantity(
      updateProductQuantityInput.productId,
      user.id,
      updateProductQuantityInput.quantity,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAccessAuthGuard, RequireActiveGuard)
  async removeProductFromCart(
    @Args('productId') productId: string,
    @CurrentUser() user: CurrentUserInterface,
  ): Promise<boolean> {
    return await this.cartsService.removeProductFromCart(productId, user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAccessAuthGuard, RequireActiveGuard)
  async clearCart(@CurrentUser() user: CurrentUserInterface): Promise<boolean> {
    return await this.cartsService.clearCart(user.id);
  }
}
