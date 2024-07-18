"use client";

import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import {
  AiOutlineMenu,
  AiOutlineBook,
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import Link from "next/link";
import { USER_STATUS } from "@/+core/enums";

const MainNavBar = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="flex justify-center w-full bg-gray-800">
        <nav className="flex text-white items-center ml-6 h-12 shadow-md">
          <Link
            className="h-full w-60 flex justify-between border-l-2 border-white hover:bg-black"
            href={"/search"}
          >
            <div className="flex rounded-none mt-3">
              <AiOutlineMenu className="mr-4 mt-1 ml-10" />
              ALL CATEGORY
            </div>
          </Link>
          <Link
            className="h-full w-60 flex justify-between border-l-2 border-white hover:bg-black"
            href={"/publisher"}
          >
            <div className="flex rounded-none mt-3">
              <AiOutlineBook className="mr-4 mt-1 ml-10" />
              ALL PUBLISHER
            </div>
          </Link>
          <Link
            className="h-full w-60 flex justify-between border-l-2 border-white hover:bg-black"
            href={"/contact"}
          >
            <div className="flex rounded-none mt-3">
              <AiOutlinePhone className="mr-4 mt-1 ml-10" />
              CONTACT US
            </div>
          </Link>
          <Link
            className="h-full w-60 flex justify-between border-x-2 border-white hover:bg-black"
            href={"/about"}
          >
            <div className="flex rounded-none mt-3">
              <AiOutlineInfoCircle className="mr-4 mt-1 ml-10" />
              ABOUT US
            </div>
          </Link>
        </nav>
      </div>

      {status === "loading" && (
        <header className="flex w-full text-white bg-gray-100 justify-between items-center h-10">
          <Skeleton className="h-3 w-[20rem] ml-[10%]" />
        </header>
      )}

      {session &&
        session.user &&
        session.user.status === USER_STATUS.UNVERIFIED && (
          <header className="flex w-full text-red-500 bg-gray-100 justify-between items-center h-10">
            <Link href="/verification" className="ml-[10%] underline">
              Please verify your account first.
            </Link>
          </header>
        )}
    </>
  );
};

export default MainNavBar;
