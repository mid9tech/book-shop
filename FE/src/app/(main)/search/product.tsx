"use client";

import { ProductType, SearchConditionInput } from "@/+core/interfaces";
import { SearchProductService } from "@/+core/services";
import ProductCard from "@/components/ui/product-card";

export default async function ProductResponse({
  searchParams,
}: {
  searchParams: SearchConditionInput;
}) {
  const { data, errors } = await SearchProductService(searchParams);

  let products: ProductType[] = [];
  if (data && data.products && data.products.data) {
    products = data.products.data;
  }

  return (
    <div className="w-3/4 p-5 flex flex-col items-center">
      <h1 className="text-center text-3xl mb-5 w-full">
        {`Your search for "${
          searchParams.keyword ? searchParams.keyword : ""
        }" revealed the following:`}
      </h1>
      <div className="mx-auto w-32 border-b mb-4 border-gray-500"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-[5rem] gap-y-10">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            avatar={product.avatar}
            name={product.name}
            rate={product.rate || 0}
            price={product.price}
            description={product.description}
            address={product.address}
            isOnSale={product.isOnSale}
            priceSale={product.priceSale}
            categoryId={""}
            publisherId={""}
            author={""}
            images={[]}
            status={""}
          />
        ))}
      </div>
    </div>
  );
}
