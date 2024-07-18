"use client";

import { SearchProductQuery } from "@/+core/definegql";
import { ProductType } from "@/+core/interfaces";
import ProductCard from "@/components/ui/product-card";
import Spinner from "@/components/ui/spinner";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GrLinkNext } from "react-icons/gr";

export default function LatestProduct() {
  const { data, loading, error } = useQuery(SearchProductQuery, {
    variables: {
      searchConditionInput: {
        page: 1,
        limit: 12,
      },
    },
  });

  let products: ProductType[] = [];

  if (error) {
    console.log("Error: ", error.message);
  } else {
    products = data?.products?.data;
  }

  return (
    <div className="mb-10">
      <div className="flex p-4 bg-gradient-to-l my-5 justify-between start-0 border">
        <h1 className="bolder font-bold text-3xl">LATEST BOOK</h1>
        <Link href={"/search"}>
          <p className="cursor-pointer hover:text-blue-500 flex flex-row mt-2">
            <span>View all</span> <GrLinkNext className="font-2xl mt-1 ml-2" />
          </p>
        </Link>
      </div>

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-x-[5rem] gap-y-8">
          {loading ? (
            <div className="p-8 w-full min-h-screen">
              <div className="flex items-center w-full space-x-4">
                <div className="space-y-2 w-full">
                  <Spinner size={80} />
                </div>
              </div>
            </div>
          ) : (
            products?.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  avatar={product.avatar}
                  name={product.name}
                  rate={product.rate || 0}
                  price={product.price}
                  description={product.description}
                  address={product.address}
                  priceSale={product.priceSale}
                  isOnSale={product.isOnSale}
                  categoryId={""}
                  publisherId={""}
                  author={""}
                  images={[]}
                  status={""}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
