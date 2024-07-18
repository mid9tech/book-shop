"use client";

import React, { useState } from "react";
import {
  FaGift,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaUserFriends,
} from "react-icons/fa";
import UpdateQuantity from "./components/changeQuantity";
import Thumbnails from "./components/thumbnails";
import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import { GetProductQuery } from "@/+core/definegql";
import Spinner from "@/components/ui/spinner";
import { ProductType } from "@/+core/interfaces";
import { useSearchParams } from "next/navigation";
import SomethingWhenWrong from "@/components/ui/sth-went-wrong";
import CreateReview from "./create-review";
import CustomerReviews from "./reviews";
import Rating from "@/components/ui/rating";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { AddToCartService } from "@/+core/services/cart/add";
import { ToastAction } from "@radix-ui/react-toast";

export default function ProductPage() {
  const params = useSearchParams();
  const [refreshReviews, setRefreshReviews] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleReviewCreated = () => {
    setRefreshReviews(true); // Trigger refresh of reviews
  };

  const { data, loading, error } = useQuery(GetProductQuery, {
    variables: {
      id: params.get("id"),
    },
  });

  if (loading) {
    return (
      <div className="p-8 w-full min-h-screen">
        <div className="flex items-center w-full space-x-4">
          <div className="space-y-2 w-full">
            <Spinner size={100} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <SomethingWhenWrong />;
  }

  let product: ProductType = data.product;

  const addToCart = async () => {
    const productId = params.get("id") as string;

    try {
      const { errors } = await AddToCartService(
        session?.accessToken as string,
        productId,
        quantity
      );

      if (errors) {
        throw new Error(errors[0].message);
      }

      toast({
        variant: "default",
        title: "Successfully added to cart",
        description: new Date().toDateString(),
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
        description: new Date().toDateString(),
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }
  };

  const handleQuantity = (value: number) => {
    setQuantity(value);
  };

  return (
    <div className="bg-white rounded-lg py-10 w-full">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex lg:flex-row">
          <div className="flex-shrink-0">
            <img
              className="w-96 p-4 h-auto"
              src={product.avatar}
              alt="Product Image"
            />
            <div className="flex mt-4 space-x-4">
              <Thumbnails images={product.images} />
            </div>
          </div>
          <div className="mt-6 lg:mt-0 lg:ml-10 w-[30rem] flex-grow text-start">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <h2 className="text-xl font-bold mt-3">
              {product.isOnSale ? (
                <>
                  <span className="line-through text-gray-500">
                    {product.price}$
                  </span>
                  <span className="text-black ml-3">{product.priceSale}$</span>
                </>
              ) : (
                <span className="text-black">{product.price}$</span>
              )}
            </h2>
            <div className="flex m-t-10">
              <Rating score={product.rate || 0} />
            </div>
            <p className="mt-4 space-y-2 text-justify">{product.description}</p>

            <UpdateQuantity getQuantity={handleQuantity} />

            <div className="mt-6">
              <Button
                onClick={addToCart}
                className="w-1/2 py-3 bg-blue-600 text-white rounded-none"
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 lg:mt-0 lg:ml-6">
          <ul className="space-y-4">
            <li className="flex items-center text-start space-x-4 border p-4 border-gray-200">
              <FaShieldAlt className="w-6 h-6 text-green-600" />
              <div>
                <span className="block">Guarantee</span>
                <span className="text-xs text-gray-500">
                  Your satisfaction is guaranteed.
                </span>
              </div>
            </li>
            <li className="flex items-center text-start space-x-4 border p-4 border-gray-200">
              <FaTruck className="w-6 h-6 text-blue-600" />
              <div>
                <span className="block">Free Shipping</span>
                <span className="text-xs text-gray-500">
                  Enjoy free shipping on all orders.
                </span>
              </div>
            </li>
            <li className="flex items-center text-start space-x-4 border p-4 border-gray-200">
              <FaGift className="w-6 h-6 text-red-600" />
              <div>
                <span className="block">Special Gift Cards</span>
                <span className="text-xs text-gray-500">
                  Get special gift cards with every purchase.
                </span>
              </div>
            </li>
            <li className="flex items-center text-start space-x-4 border p-4 border-gray-200">
              <FaUndo className="w-6 h-6 text-orange-600" />
              <div>
                <span className="block">Free Return</span>
                <span className="text-xs text-gray-500">
                  Easy and free returns within 30 days.
                </span>
              </div>
            </li>
            <li className="flex items-center text-start space-x-4 border p-4 border-gray-200">
              <FaUserFriends className="w-6 h-6 text-black" />
              <div>
                <span className="block">Consultancy</span>
                <span className="text-xs text-gray-500">
                  Expert consultancy for all your needs.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col mt-10 lg:flex-row gap-4 justify-between">
        <div className="lg:w-2/3">
          <CustomerReviews
            rate={product.rate}
            productId={product.id}
            refreshReviews={refreshReviews}
          />
        </div>
        <div className="lg:w-1/3">
          <CreateReview
            productId={product.id}
            onReviewCreated={handleReviewCreated}
          />
        </div>
      </div>
    </div>
  );
}
