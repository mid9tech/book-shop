import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from './product.entity';
import { PagingResponse } from 'src/interfaces/paging.response';

@ObjectType()
export class PagingProduct extends PagingResponse {
  @Field(() => [Product], { defaultValue: [] })
  data: Product[];
}
