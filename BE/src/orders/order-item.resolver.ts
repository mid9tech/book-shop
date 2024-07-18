import { Parent, Resolver, ResolveField } from '@nestjs/graphql';
import { OrderItem } from './entities/order-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';

@Resolver(() => OrderItem)
export class OrdersItemResolver {
  constructor(private readonly productsService: ProductsService) {}
  @ResolveField(() => Product, { name: 'product' })
  findProduct(@Parent() parent: OrderItem) {
    return this.productsService.findOne(parent.productId);
  }
}
