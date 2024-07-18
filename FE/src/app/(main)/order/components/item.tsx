import { OrderDetailItem } from "@/+core/interfaces";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdOutlinePriceChange } from "react-icons/md";

interface OrderItemsProps {
  items: OrderDetailItem[];
  id?: string;
}

const OrderItems = ({ items, id }: OrderItemsProps) => {
  let totalPrice = 0;

  for (let item of items) {
    totalPrice += item.price * item.quantity;
  }
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="px-6 py-3 font-medium leading-4 tracking-wider text-left border-b border-gray-200">
            Name
          </th>
          <th className="px-6 py-3 font-medium leading-4 tracking-wider text-left border-b border-gray-200">
            Quantity
          </th>
          <th className="px-6 py-3 font-medium leading-4 tracking-wider text-left border-b border-gray-200">
            Price
          </th>
          <th className="py-3 text-end font-medium leading-4 tracking-wider border-b border-gray-200">
            Total Price
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {items.map((item) => (
          <tr key={item.product.id}>
            <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap max-w-[300px] overflow-hidden">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-[7rem] h-auto">
                  <img src={item.product.avatar} alt={item.product.name} />
                </div>
                <div className="ml-4">
                  <div className="font-medium leading-5 text-gray-900">
                    {item.product.name}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 leading-5 text-start border-b border-gray-200 whitespace-nowrap">
              {item.quantity}
            </td>
            <td className="px-6 py-4 leading-5 text-start border-b border-gray-200 whitespace-nowrap">
              {item.price}$
            </td>
            <td className="py-4 text-end leading-5 border-b border-gray-200 whitespace-nowrap">
              {item.price * item.quantity}$
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={3}>
            <p className="text-end mt-4">
              <MdOutlinePriceChange className="text-blue-600 text-3xl" />
            </p>
          </td>

          <td>
            <p className="text-end mt-4">
              {" "}
              <span className="font-bold">Total Price:</span> $ {totalPrice}
            </p>
          </td>
        </tr>

        {id && (
          <tr>
            <td colSpan={4}>
              <p className="text-end mt-4">
                <Link href={`/order/${id}`}>
                  <Button variant="outline" className="rounded-none">
                    View Detail
                  </Button>
                </Link>
              </p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrderItems;
