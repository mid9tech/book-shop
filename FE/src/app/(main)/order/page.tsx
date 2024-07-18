"use client";

import { HistoriesOrderQuery } from "@/+core/definegql";
import { PagingOrder, OrderDetailItem } from "@/+core/interfaces";
import Spinner from "@/components/ui/spinner";
import SomethingWhenWrong from "@/components/ui/sth-went-wrong";
import formatter from "@/lib/formatDate";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import OrderItems from "./components/item";
import { STATUS_ORDER } from "@/+core/enums";

const OrderHistoryPage = () => {
  const { data: session } = useSession();
  const { loading, error, data } = useQuery(HistoriesOrderQuery, {
    variables: { pagingOrderInput: { limit: 10, page: 1 } },
    context: {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  });

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleRowClick = (orderId: string) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

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

  const historiesOrder: PagingOrder = data.historiesOrder;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Orders</h1>
      {historiesOrder.data.map((order) => (
        <div
          key={order.id}
          className="bg-white border hover:shadow-md rounded-none mb-6"
        >
          <div
            className="p-4 cursor-pointer flex justify-between items-center"
            onClick={() => handleRowClick(order.id)}
          >
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
              <div>
                <p className="text-lg font-medium">{order.id}</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 4h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z"
                    />
                  </svg>
                  Order Date: {formatter.format(new Date(order.createdAt))}
                </p>
              </div>
            </div>
            <div>
              <p
                className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === STATUS_ORDER.DONE
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {order.status === STATUS_ORDER.DONE ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
                {order.status}
              </p>
            </div>
          </div>
          {selectedOrderId === order.id && (
            <div className="p-4 border-t border-gray-200">
              <OrderItems items={order.items || []} id={order.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryPage;
