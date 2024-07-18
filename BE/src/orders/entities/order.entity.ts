import {
  ObjectType,
  Field,
  ID,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { PAYMENT_METHOD, STATUS_ORDER } from 'src/utils/const';
import { IsEnum } from 'class-validator';
import { OrderItem } from './order-item.entity';
import { Contact } from 'src/contacts/entities/contact.entity';
import { Promotion } from 'src/promotions/entities/promotion.entity';

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field()
  contactId: string;

  @Field(() => Contact)
  contact: Contact;

  @Field(() => Promotion, {
    nullable: true,
    name: 'promotion',
  })
  promotion?: Promotion;

  @Field({ nullable: true })
  promotionId?: string;

  @Field()
  ownerId: string;

  @Field()
  isPaid: boolean;

  @Field(() => Float)
  totalPrice: number;

  @Field(() => Float)
  priceToPay: number;

  @Field(() => Float, { defaultValue: 0 })
  reducePrice: number;

  @Field()
  @IsEnum(PAYMENT_METHOD)
  paymentMethod: PAYMENT_METHOD;

  @Field(() => [OrderItem], { name: 'items' })
  items: OrderItem[];

  @Field()
  @IsEnum(STATUS_ORDER)
  status: STATUS_ORDER;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
