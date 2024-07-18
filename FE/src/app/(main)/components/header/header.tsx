import Link from "next/link";
import SearchInput from "./search-input";
import CartIcon from "./cartIcon";

const LandingHeader = () => {
  return (
    <div className="w-full bg-white flex justify-center">
      <header className="flex pt-5 pb-5 text-black justify-between items-center w-4/5">
        <Link
          href="/"
          className="flex text-6xl font-mono font-semibold hover:cursor-pointer "
        >
          <span className="text-white font-bold bg-gradient-to-r from-blue-500 to-blue-700 px-2 rounded-md">
            H
          </span>
          <p className="text-blue-700">Shopp</p>
        </Link>

        <SearchInput />

        <CartIcon />
      </header>
    </div>
  );
};

export default LandingHeader;
