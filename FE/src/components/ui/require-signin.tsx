import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import { Button } from "./button";

export default function RequireSignIn() {
  return (
    <div className="flex flex-col w-full my-10 items-center justify-center p-6 bg-red-100 border border-red-400 text-red-700 rounded-none">
      <FaExclamationTriangle className="text-4xl mb-4" />
      <p className="text-xl mb-4">Not available, please sign in first</p>
      <Link href="/login">
        <Button className="px-4 py-2 bg-black text-white rounded-none hover:bg-gray-700 transition duration-300">
          Sign In
        </Button>
      </Link>
    </div>
  );
}
