"use client";

import { RiDeleteBin5Line } from "react-icons/ri";
import { RemoveProductFromCartService } from "@/+core/services";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { ToastAction } from "@/components/ui/toast";

interface DeleteBtnProps {
  productId: string;
  onRemove: (productId: string) => void;
  refetchCart: () => void;
}

export default function DeleteButton({
  productId,
  onRemove,
  refetchCart,
}: DeleteBtnProps) {
  const { toast } = useToast();
  const { data: session } = useSession();

  const removeFromCart = () => {
    RemoveProductFromCartService(session?.accessToken as string, productId)
      .then(() => {
        onRemove(productId); // Call the onRemove handler
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
  return (
    <button
      className="text-3xl text-red-600 hover:text-red-800 p-4"
      title="Remove item"
      onClick={removeFromCart}
    >
      <RiDeleteBin5Line />
    </button>
  );
}
