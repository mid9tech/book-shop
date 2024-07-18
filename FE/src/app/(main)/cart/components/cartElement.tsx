import { ProductInCart } from "@/+core/interfaces";
import UpdateQuantity from "./changeQuantity";
import DeleteButton from "./deleteBtn";
import Link from "next/link";

interface CartElementProps {
  product: ProductInCart;
  quantity: number;
  onRemove: (productId: string) => void;
  refetchCart: () => void;
}

const CartElement: React.FC<CartElementProps> = ({
  product,
  quantity,
  onRemove,
  refetchCart,
}) => {
  return (
    <div className="flex flex-wrap py-5 border-b-2">
      <div className="lg:w-1/4 w-full mb-4 lg:mb-0">
        <div className="bg-white rounded overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
          <img
            src={product.avatar}
            className="w-full h-[250px]"
            alt={product.name}
          />
        </div>
      </div>
      <div className="lg:w-1/2 w-full mb-4 lg:mb-0">
        <Link
          href={`/product?id=${product.id}`}
          className="hover:text-blue-500"
        >
          <p className="ml-4">{product.name}</p>
        </Link>
        <div className="flex space-x-2">
          <DeleteButton
            refetchCart={refetchCart}
            productId={product.id}
            onRemove={onRemove}
          />
        </div>
      </div>
      <div className="lg:w-1/4 w-full">
        <UpdateQuantity
          current={quantity}
          refetchCart={refetchCart}
          productId={product.id}
        />

        {product.isOnSale ? (
          <p className="flex flex-row text-center mt-5">
            <p className="line-through text-gray-500">{product.price} $</p>{" "}
            <p className="text-black ml-3">{product.priceSale} $ </p>
          </p>
        ) : (
          <p className="text-center mt-5">{product.price} $ </p>
        )}
      </div>
    </div>
  );
};

export default CartElement;
