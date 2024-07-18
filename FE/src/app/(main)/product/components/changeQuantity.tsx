import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
  getQuantity: (quantity: number) => void;
}

export default function UpdateQuantity({ getQuantity }: Props) {
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(newQuantity);
    getQuantity(newQuantity); // Give to parent component
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
    getQuantity(quantity - 1); // Give to parent component
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
    getQuantity(quantity + 1); // Give to parent component
  };

  return (
    <div className="mt-6 flex items-center space-x-4">
      <label
        htmlFor="quantity"
        className="block text-sm font-medium text-gray-700"
      >
        Quantity
      </label>
      <div className="flex">
        <button
          className="px-4 py-2 bg-white text-black rounded-none border border-gray-300 transition-all hover:bg-black hover:text-white"
          onClick={decrementQuantity}
        >
          -
        </button>
        <Input
          id="quantity"
          name="quantity"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="border-t border-b border-gray-300 p-2 h-12 w-16 text-center rounded-none"
        />
        <button
          className="px-4 py-2 bg-white text-black rounded-none border border-gray-300 transition-all hover:bg-black hover:text-white"
          onClick={incrementQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
}
