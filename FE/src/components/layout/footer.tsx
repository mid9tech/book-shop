import {
  FaCcVisa,
  FaCcDiscover,
  FaCcPaypal,
  FaCcMastercard,
} from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { FaMeta, FaMapLocation } from "react-icons/fa6";
import { RiMailUnreadFill } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoMdMail } from "react-icons/io";
import Link from "next/link";

const MainFooter = () => {
  return (
    <div className="w-full bg-black">
      <div className="flex justify-center">
        <footer className="w-4/5">
          <div className="bg-black text-white flex w-full pt-4 pb-10 text-left">
            {/* ABOUT US */}
            <div className="flex flex-col items-left justify-top w-1/3">
              <h2 className="text-xl font-bold mb-2">
                <span className="pr-2 border-r-2 border-blue-500">
                  About Us
                </span>{" "}
              </h2>
              <div className="text-xs mt-6">
                <p className="flex mb-2">
                  {"*"}
                  <FaMapLocation className="text-sm mr-1" />
                  <strong className="mr-2">Address: </strong>
                  474 Ontario St Toronto, ON M4X 1M7 Canada
                </p>
                <p className="flex mb-2">
                  {"*"}
                  <MdOutlinePhone className="text-sm mr-1" />
                  <strong className="mr-2">Phone: </strong>
                  (+1234)56789xxx
                </p>

                <p className="flex mb-2">
                  {"*"}
                  <RiMailUnreadFill className="text-sm mr-1" />
                  <strong className="mr-2">Mail: </strong>
                  tadathemes@gmail.com
                </p>
              </div>
              <Link
                href="/"
                className="flex text-5xl mt-6 font-mono font-semibold hover:cursor-pointer "
              >
                <span className="text-white font-bold bg-gradient-to-r from-blue-500 to-blue-700 px-2 rounded-md">
                  H
                </span>
                <p className="text-blue-700">Shopp</p>
              </Link>
            </div>

            {/* PRODUCT TAGS */}
            <div className="flex flex-col items-left justify-top w-1/3">
              <h2 className="text-xl font-bold mb-2">
                <span className="pr-2 border-r-2 border-blue-500">
                  Product Tags
                </span>{" "}
              </h2>
              {/* Include your product tags here */}
              <div className="grid grid-cols-4 gap-2 w-96 mt-5">
                {[...Array(16)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-500 text-xs text-center h-8 text-white p-2 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors duration-300"
                  >
                    {10 * index} - {20 * index}
                  </div>
                ))}
              </div>
            </div>

            {/* NEWSLETTER */}
            <div className="flex flex-col items-left justify-top w-1/3">
              <h2 className="text-xl font-bold mb-2">
                <span className="pr-2 border-r-2 border-blue-500">
                  Newsletter
                </span>{" "}
              </h2>
              <p className="mt-3">
                Subscribe now and receive weekly newsletter
              </p>
              <div className="flex mt-10">
                <Input
                  className="rounded-none h-12"
                  type="email"
                  placeholder="Input your email..."
                />
                <Button className="rounded-none bg-blue-700 h-12" type="submit">
                  {" "}
                  <IoMdMail />{" "}
                </Button>
              </div>
            </div>
          </div>

          {/* COPYRIGHT AND PAYMENT ICONS */}
        </footer>
      </div>

      <div className="bg-gray-800 text-white flex justify-center py-4 text-center">
        <div className="flex w-4/5 justify-between">
        <div>&copy; HShopp. All rights reserved.</div>
        <div className="text-3xl flex ml-auto space-x-4">
          <FaCcVisa />
          <FaMeta />
          <FaCcDiscover />
          <FaCcPaypal />
          <FaCcMastercard />
        </div>

        </div>
       
      </div>
    </div>
  );
};

export default MainFooter;
