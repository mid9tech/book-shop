import { InputType } from '@nestjs/graphql';
import { PagingRequest } from 'src/interfaces';

@InputType()
export class PagingOrderInput extends PagingRequest {}
