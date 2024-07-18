"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { RecommendQuery } from "@/+core/definegql/queries/recommend";
import { PromotionType } from "@/+core/interfaces";
import formatter from "@/lib/formatDate";
import { BiSolidDiscount } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { RecommendInput } from "@/+core/interfaces/recommend";
import { PROMOTION_TYPE } from "@/+core/enums";

interface ShowVoucherInterface {
  onSelectVoucher: (voucher: PromotionType) => void;
  recommendInput: RecommendInput;
}

export default function ShowVoucher({
  onSelectVoucher,
  recommendInput,
}: ShowVoucherInterface) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const { data } = useQuery(RecommendQuery, {
    variables: {
      recommendInput: recommendInput,
    },
    context: {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
    fetchPolicy: "no-cache",
  });

  let vouchers: PromotionType[] = [];
  if (data && data.recommend) {
    vouchers = data.recommend;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-blue-500 underline mb-5">Select Voucher</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[60rem]">
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-2xl flex flex-row text-start font-bold mb-6 text-blue-600">
              <BiSolidDiscount className="mt-1" />
              <span className="ml-4">Select Voucher</span>
            </h2>
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[30rem] w-full bg-white overflow-auto">
          {vouchers.map((voucher) => (
            <div className="border-b shadow-md p-4 pb-6 mb-3 border text-start flex justify-between">
              <div className="mb-4">
                <span className="font-bold">{voucher.name}</span>
                <span className="ml-5">
                  {voucher.type === PROMOTION_TYPE.PERCENT
                    ? voucher.discountPercentage + "%"
                    : voucher.discountValue + " $"}{" "}
                  off
                  {", min spend: "} ${voucher.minValue}
                  {", expired: "}
                  {voucher.endDate
                    ? formatter.format(new Date(voucher.endDate))
                    : "N/A"}
                </span>
              </div>
              <div className="flex flex-row">
                <button
                  className="text-blue-500 hover:text-blue-600 underline mb-5 ml-5"
                  onClick={() => {
                    onSelectVoucher(voucher);
                    setOpen(false);
                  }}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
