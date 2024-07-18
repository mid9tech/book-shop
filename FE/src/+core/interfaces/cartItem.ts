// Define the TypeScript type for the cart item input
export interface CartInput {
  productId: string;
  quantity: number | 1;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: ProductInCart;
}

export interface ProductInCart {
  id: string;
  name: string;
  price: number;
  priceSale: number;
  avatar: string;
  isOnSale: boolean;
}
