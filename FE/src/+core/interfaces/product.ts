export interface ProductType {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  publisherId: string;
  price: number;
  priceSale?: number;
  isOnSale: boolean;
  avatar: string;
  author: string;
  images: string[];
  status: string;
  rate: number; // Assuming this is part of the product object
  address: string; // Assuming this is part of the product object
}
