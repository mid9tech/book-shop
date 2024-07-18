"use client";

import React, { useState, useEffect } from "react";
import ToTalCart from "./components/total";
import CartElement from "./components/cartElement";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { GetCartQuery } from "@/+core/definegql";
import { CartItem } from "@/+core/interfaces";
import Spinner from "@/components/ui/spinner";
import RequireSignIn from "@/components/ui/require-signin";
import formatter from "@/lib/formatDate";

export default function CartPage() {
  const { data: session } = useSession();
  const { data, loading, error, refetch } = useQuery(GetCartQuery, {
    context: {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
    fetchPolicy: "no-cache",
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (data && !error) {
      setCartItems(data.getCart || []);
    }
  }, [data, error]);

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
  };

  let totalPrice = 0;
  let length = cartItems.length;

  for (let item of cartItems) {
    if (item.product.isOnSale) {
      totalPrice += item.product.priceSale * item.quantity;
    } else {
      totalPrice += item.product.price * item.quantity;
    }
  }

  const today = new Date();
  const dateInFuture = new Date(today);
  dateInFuture.setDate(today.getDate() + 7);

  return (
    <section className="h-full bg-gradient-to-r w-full text-start">
      <div className="container mx-auto py-5 h-full">
        <div className="flex justify-center my-4">
          <div className="w-2/3">
            <div className="mb-4 bg-white shadow-md rounded-none">
              <div className="py-3 px-4 bg-gradient-to-l from-blue-600 to-blue-700 rounded-none">
                <h5 className="text-xl text-white mb-0">
                  Cart - {length} items
                </h5>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="flex flex-auto w-full justify-center items-center">
                    <Spinner size={80} />
                  </div>
                ) : error ? (
                  <RequireSignIn />
                ) : (
                  cartItems.map((cartItem) => (
                    <CartElement
                      key={cartItem.product.id}
                      product={cartItem.product}
                      quantity={cartItem.quantity}
                      onRemove={handleRemoveFromCart}
                      refetchCart={refetch}
                    />
                  ))
                )}

                <hr className="my-4" />
              </div>
            </div>

            <div className="mb-4 bg-white shadow-md rounded-none">
              <div className="p-4">
                <p>Expected shipping delivery</p>
                <p className="mb-0">
                  {formatter.format(
                    new Date(today.setDate(today.getDate() + 3))
                  )}{" "}
                  - {formatter.format(new Date(dateInFuture))}
                </p>
              </div>
            </div>

            <div className="mb-4 bg-white shadow-md rounded-none">
              <div className="p-4">
                <p>We accept</p>
                <div className="flex space-x-2">
                  <img
                    className="w-12"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa"
                  />
                  <img
                    className="w-12"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                    alt="American Express"
                  />
                  <img
                    className="w-12"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                    alt="Mastercard"
                  />
                  <img
                    className="w-12"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                    alt="PayPal acceptance mark"
                  />
                </div>
              </div>
            </div>
          </div>

          <ToTalCart total={totalPrice} />
        </div>
      </div>
    </section>
  );
}
