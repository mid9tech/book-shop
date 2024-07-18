"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductType } from "@/+core/interfaces";
import ProductCard from "@/components/ui/product-card";
import { useQuery } from "@apollo/client";
import { SearchProductQuery } from "@/+core/definegql";
import Spinner from "@/components/ui/spinner";

export default function OnSaleProduct() {
  const { data, loading, error } = useQuery(SearchProductQuery, {
    variables: {
      searchConditionInput: {
        page: 1,
        limit: 10,
        isOnSale: true,
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
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full my-5"
    >
      <CarouselContent>
        {loading ? (
          <div className="flex flex-auto w-full justify-center items-center">
            <Spinner size={60} />
          </div>
        ) : (
          products?.map((product) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/3 lg:basis-1/4 mr-2 ml-2"
            >
              <div className="p-1">
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
              </div>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      <CarouselPrevious className="ml-10" />
      <CarouselNext className="mr-10" />
    </Carousel>
  );
}
