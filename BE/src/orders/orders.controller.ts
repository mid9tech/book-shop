import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Render,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ContactsService } from 'src/contacts/contacts.service';
import { SITE_DOMAIN } from 'src/utils/const';

@Controller('/')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly contactService: ContactsService,
  ) {}

  @Get('/order')
  @Render('pages/order/order')
  async order(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    const orders = [];

    const temp = await this.ordersService.findMany({
      limit: limit,
      page: page,
    });

    for (const item of temp.data) {
      const contact = await this.contactService.findOne(
        item.contactId,
        item.ownerId,
      );
      orders.push({
        ...item,
        phoneNumber: contact.phoneNumber,
        fullName: contact.fullName,
        address: `${contact.detailAddress}, ${contact.wards}, ${contact.district}, ${contact.province}`,
      });
    }

    return {
      backend_base_url: SITE_DOMAIN,
      orders: orders,
      total: temp.total,
      limit: limit,
      page: page,
    };
  }
}
