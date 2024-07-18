"use client";

import { GetCartQuery } from "@/+core/definegql/queries/getCart";
import { CartItem } from "@/+core/interfaces";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoCart } from "react-icons/io5";

export default function CartIcon() {
  const { data: session } = useSession();
  const { data, loading, error } = useQuery(GetCartQuery, {
    context: {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  });

  let totalPrice = 0;
  let length = 0;

  let cartItems: CartItem[] = [];
  if (error) {
  } else {
    cartItems = data?.getCart || []; // Provide a default empty array
  }

  length = cartItems.length;

  for (let item of cartItems) {
    if (item.product.isOnSale) {
      totalPrice += item.product.priceSale * item.quantity;
    } else {
      totalPrice += item.product.price * item.quantity;
    }
  }

  return (
    <div className="flex items-center relative mr-10 hover:cursor-pointer">
      <Link href="/cart">
        <div className="relative">
          <IoCart className="text-5xl" />
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 rounded-full"
          >
            {length}
          </Badge>
        </div>
      </Link>

      <p className="mt-3">$ {totalPrice} USD</p>
    </div>
  );
}
