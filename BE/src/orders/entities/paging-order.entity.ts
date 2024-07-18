import { ObjectType, Field } from '@nestjs/graphql';
import { PagingResponse } from 'src/interfaces/paging.response';
import { Order } from './order.entity';

@ObjectType()
export class PagingOrderResponse extends PagingResponse {
  @Field(() => [Order], { defaultValue: [] })
  data: Order[];
}
