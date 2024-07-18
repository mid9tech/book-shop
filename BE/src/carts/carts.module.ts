import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsResolver } from './carts.resolver';
import { CartsRepository } from './carts.repository';
import { ProductsModule } from 'src/products/products.module';

@Module({
  providers: [CartsResolver, CartsService, CartsRepository],
  imports: [ProductsModule],
})
export class CartsModule {}
