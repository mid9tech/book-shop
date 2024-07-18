import { FaExclamationTriangle } from "react-icons/fa";

export default function SomethingWhenWrong() {
  return (
    <div className="flex flex-col w-full my-10 items-center justify-center p-6 bg-red-100 border border-red-400 text-red-700 rounded-none">
      <FaExclamationTriangle className="text-4xl mb-4" />
      <p className="text-xl mb-4">Some thing went wrong!</p>
    </div>
  );
}
