export interface RecommendProductInput {
  productId: string;
  quantity: number;
}

export interface RecommendInput {
  products: RecommendProductInput[];
  totalValue: number;
}
