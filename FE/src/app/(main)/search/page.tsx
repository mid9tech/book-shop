import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";
import { SearchConditionInput } from "@/+core/interfaces";
import { NavFilter } from "./navbar";
import ProductResponse from "./product";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    limit?: string;
    page?: string;
    isOnSale?: string;
    minPrice?: string;
    maxPrice?: string;
    rate?: string;
    keyword?: string;
    categoryIds?: string[];
    publisherIds?: string[];
  };
}) {
  const input: SearchConditionInput = {
    page: parseInt(searchParams?.page || "1"),
    limit: parseInt(searchParams?.limit || "10"),
    isOnSale: searchParams?.isOnSale === "true" ? true : false,
    minPrice: parseFloat(searchParams?.minPrice || ""),
    maxPrice: parseFloat(searchParams?.maxPrice || ""),
    rate: parseInt(searchParams?.rate || ""),
    keyword: searchParams?.keyword,
    categoryIds: searchParams?.categoryIds,
    publisherIds: searchParams?.publisherIds,
  };

  return (
    <div className="flex w-full">
      <NavFilter />
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={
          <div className="p-8 w-full min-h-screen">
            <div className="flex items-center w-full space-x-4">
              <div className="space-y-2 w-full">
                <Spinner size={100} />
              </div>
            </div>
          </div>
        }
      >
        <ProductResponse searchParams={input} />
      </Suspense>
    </div>
  );
}
