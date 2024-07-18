import { PagingInput } from "./paging";

// Define the TypeScript type for the login input
export interface SearchConditionInput extends PagingInput {
  keyword?: string;
  categoryIds?: string[];
  publisherIds?: string[];
  isOnSale?: boolean;
  minPrice?: number;
  maxPrice?: number;
  rate?: number;
}
