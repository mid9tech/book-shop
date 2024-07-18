import Link from "next/link";

interface TotalProps {
  total: number;
}

export default function ToTalCart({ total = 0 }) {
  return (
    <div className="w-1/3 ml-10">
      <div className="mb-4 bg-white shadow-md rounded-none">
        <div className="py-3 px-4 bg-gradient-to-l from-blue-600 to-blue-700 rounded-none">
          <h5 className="text-xl text-white mb-0">Summary</h5>
        </div>
        <div className="p-4">
          <ul className="list-none">
            <li className="flex justify-between py-2 border-b">
              <span>Products</span>
              <span>${total}</span>
            </li>
            <li className="flex justify-between py-2 border-b">
              <span>Shipping</span>
              <span>Gratis</span>
            </li>
            <li className="flex justify-between py-2">
              <div>
                <strong>Total amount</strong>
                <p className="mb-0 text-sm">(including VAT)</p>
              </div>
              <span>
                <strong>${total}</strong>
              </span>
            </li>
          </ul>
          <Link href="/checkout">
            <button className="w-full py-2 mt-4 bg-black text-white rounded-none hover:bg-gray-700 transition-colors duration-300">
              Go to checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
