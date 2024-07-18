"use client";

import { UpdateProductQuantityInCartService } from "@/+core/services";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useState, ChangeEvent } from "react";

interface QuantityProps {
  current: number;
  productId: string;
  refetchCart: () => void;
}

export default function UpdateQuantity({
  current = 1,
  productId,
  refetchCart,
}: QuantityProps) {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState<number>(current);

  const reduceQuantity = () => {
    if (quantity > 1) {
      UpdateProductQuantityInCartService(session?.accessToken as string, {
        productId: productId,
        quantity: quantity - 1,
      })
        .then(() => {
          setQuantity((prev) => Math.max(1, prev - 1));
          refetchCart();
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: error.message,
            action: <ToastAction altText="Close">Close</ToastAction>,
          });
        });
    }
  };

  const increaseQuantity = () => {
    UpdateProductQuantityInCartService(session?.accessToken as string, {
      productId: productId,
      quantity: quantity + 1,
    })
      .then(() => {
        setQuantity((prev) => prev + 1);
        refetchCart();
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: error.message,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(value);
  };

  return (
    <div className="mt-6 flex items-center space-x-4">
      <div className="flex">
        <button
          className="px-4 py-2 bg-white text-black rounded-none border border-gray-300 transition-all hover:bg-black hover:text-white"
          onClick={reduceQuantity}
        >
          -
        </button>
        <Input
          id="quantity"
          name="quantity"
          min="1"
          value={quantity}
          onChange={handleInputChange}
          className="border-t border-b border-gray-300 p-2 h-12 w-16 text-center rounded-none"
        />
        <button
          className="px-4 py-2 bg-white text-black rounded-none border border-gray-300 transition-all hover:bg-black hover:text-white"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
}
