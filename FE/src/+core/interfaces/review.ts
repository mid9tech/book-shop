import { REVIEW_SORT } from "../enums";
import { PagingInput } from "./paging";

interface UserReview {
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface Review {
  productId: string;
  content: string;
  rate: number;
  images: string[];
  title: string;
  owner: UserReview;
  createdAt: string;
}

export interface CreateReviewInput {
  productId: string;
  content: string;
  rate: number;
  images: string[];
  title: string;
}

export interface ReviewPagingData {
  page: number;
  limit: number;
  total: number;
  countOneStar: number;
  countTwoStar: number;
  countThreeStar: number;
  countFourStar: number;
  countFiveStar: number;
  data: Review[];
}

export interface PagingReviewInput extends PagingInput {
  rate?: number;
  sort?: REVIEW_SORT;
}
