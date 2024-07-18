import { PAYMENT_METHOD, STATUS_ORDER } from "../enums";
import { ContactInterface } from "./contact";
import { PromotionType } from "./promotion";

// graphql/interfaces.js
export interface OrderItem {
  productId: string;
  price: number;
  quantity: number;
}

export interface CreateOrderInput {
  contactId: string;
  promotionId?: string;
  isPaid: boolean;
  paymentMethod: PAYMENT_METHOD;
  items: OrderItem[];
}

// Define the interfaces
export interface OrderDetailItem {
  price: number;
  quantity: number;
  product: {
    id: string;
    name: string;
    avatar: string;
    rate: number;
  };
}

export interface Order {
  id: string;
  isPaid: boolean;
  totalPrice: number;
  priceToPay: number;
  reducePrice: number;
  paymentMethod: PAYMENT_METHOD;
  contact?: ContactInterface;
  promotion?: PromotionType;
  status: STATUS_ORDER;
  items?: OrderDetailItem[];
  createdAt: string;
  updatedAt: string;
}

export interface PagingOrder {
  page: number;
  limit: number;
  total: number;
  data: Order[];
}

export interface UpdateOrderInput {
  id: string;
  status: STATUS_ORDER;
  reason: string;
}
