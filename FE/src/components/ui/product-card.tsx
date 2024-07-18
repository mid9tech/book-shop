"use client";

import { useState } from "react";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./card";
import Rating from "./rating";
import { FaCartPlus, FaEye } from "react-icons/fa";
import Link from "next/link";
import { ProductType } from "@/+core/interfaces";
import { useSession } from "next-auth/react";
import { useToast } from "./use-toast";
import { ToastAction } from "./toast";
import { AddToCartService } from "@/+core/services/cart/add";

function ProductDetail({
  id,
  avatar,
  name,
  rate,
  priceSale,
  price,
  description,
  isOnSale,
  address,
}: ProductType) {
  const { data: session } = useSession();
  const { toast } = useToast();

  const addToCart = async () => {
    const { errors } = await AddToCartService(
      session?.accessToken as string,
      id,
      1
    );

    if (errors)
      return toast({
        variant: "destructive",
        title: "Cannot add to cart. Please sign in or verify account first!",
        description: new Date().toDateString(),
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    toast({
      variant: "default",
      title: "Successfully added to cart",
      description: new Date().toDateString(),
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  };

  return (
    <div className="absolute inset-0 bg-white bg-opacity-95 py-4 flex flex-col">
      <div className="flex flex-col w-full items-start gap-2 px-4">
        <Link
          href={`/product?id=${id}`}
          className="text-black hover:text-blue-600 text-sm"
        >
          {name}
        </Link>

        <div className="flex items-center gap-2">
          {isOnSale ? (
            <>
              <span className="line-through text-gray-500">{price}$</span>
              <span className="text-black ml-3">{priceSale}$</span>
            </>
          ) : (
            <span className="text-black ml-3">{price}$</span>
          )}
        </div>
      </div>

      <hr className="my-2" />
      <p className="px-4 text-left">{description}</p>

      <div className="flex justify-between m-1 flex-1 relative">
        <Button
          onClick={addToCart}
          className="rounded-full aspect-square w-12 h-12 flex items-center absolute left-4 bottom-0 justify-center border-2 bg-slate-50 text-black hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out"
        >
          <FaCartPlus />
        </Button>

        <Link href={`/product?id=${id}`}>
          <Button className="rounded-full aspect-square w-12 h-12 flex items-center justify-center absolute right-4 bottom-0 border-2 bg-slate-50 text-black hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out">
            <FaEye />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function ProductCard({
  id,
  avatar,
  name,
  priceSale,
  rate,
  price,
  description,
  address,
  isOnSale,
}: ProductType) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="!w-[300px] text-sm rounded-none relative overflow-hidden !h-[29rem]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isOnSale && (
        <img
          src="https://cdn-icons-png.flaticon.com/512/1374/1374072.png"
          alt={name || description}
          className="w-10 rotate-45 object-cover absolute"
        />
      )}

      <CardContent className="mt-5">
        {isHovered ? (
          <ProductDetail
            id={id}
            avatar={avatar}
            name={name}
            rate={rate}
            price={price}
            priceSale={priceSale}
            description={description}
            address={address}
            isOnSale={isOnSale}
            categoryId={""}
            publisherId={""}
            author={""}
            images={[]}
            status={""}
          />
        ) : (
          <>
            <img
              src={
                avatar ||
                "https://thebookwithnopictures.com/wp-content/uploads/2014/08/BookWithNoPictures_3D-300x423.png"
              }
              alt={name}
              className="w-full h-[20rem] object-cover mt-2"
            />
            <CardTitle className="flex text-left mt-4 font-normal text-sm">
              {name}
            </CardTitle>
            <CardDescription className="flex text-left mt-1">
              <Rating score={rate} />
            </CardDescription>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col justify-start">
        <div className="flex mt-1 justify-start w-full">
          {isOnSale ? (
            <>
              <span className="line-through text-gray-500">{price}$</span>
              <span className="text-black ml-3">{priceSale}$</span>
            </>
          ) : (
            <span className="text-black ml-3">{price}$</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
