import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { PromotionsModule } from 'src/promotions/promotions.module';
import { ProductsModule } from 'src/products/products.module';
import { OrdersController } from './orders.controller';
import { ContactsModule } from 'src/contacts/contacts.module';
import { OrdersItemResolver } from './order-item.resolver';

@Module({
  providers: [OrdersResolver, OrdersService, OrdersItemResolver],
  imports: [PromotionsModule, ProductsModule, ContactsModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
