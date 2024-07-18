import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

interface successOrderProps {
  id: string;
}

export default function SuccessOrder({ id }: successOrderProps) {
  return (
    <div className="flex flex-col w-full my-10 items-center justify-center p-6 bg-green-50 border border-green-400 text-black rounded-none">
      <IoCheckmarkDoneCircleSharp className="text-4xl mb-4" />
      <p className="text-xl mb-4">Congratulations on your successful order!</p>
      <div className="flex flex-row">
        <Link href="/search">
          <Button className="py-2 bg-black text-white rounded-none hover:bg-gray-700 transition duration-300">
            Continues Shopping
          </Button>
        </Link>

        <Link href={`/order/${id}`}>
          <Button className="py-2 ml-4 bg-black text-white rounded-none hover:bg-gray-700 transition duration-300">
            View Detail
          </Button>
        </Link>
      </div>
    </div>
  );
}
