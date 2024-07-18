"use client";

import { useSession } from "next-auth/react";
import { RiContactsBook3Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { PiPasswordBold } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { Skeleton } from "@/components/ui/skeleton";

interface NavProps {
  onNavClick: (page: string) => void;
}
export default function NavBarUser({ onNavClick }: NavProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-1/4 flex space-x-4 flex-col mt-5">
        <Skeleton className="h-[100px] w-[100px] rounded-full" />
        <Skeleton className="h-[30px] w-[300px] mt-5" />
        <Skeleton className="h-[30px] w-[300px] mt-5" />
      </div>
    );
  }

  return (
    <aside className="w-1/4 text-start bg-white pt-4 border-r-2">
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <img
            src={session?.user?.avatar || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-lg">{session?.user?.email}</h2>
            <button
              onClick={() => onNavClick("profile")}
              className="text-blue-500 flex flex-row items-center"
            >
              <CiEdit className="mr-2" /> <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>
      <nav className="mt-6">
        <ul>
          <li
            onClick={() => onNavClick("profile")}
            className="px-4 py-4 text-black hover:bg-gray-200 flex flex-row cursor-pointer"
          >
            <button className="flex items-center w-full text-left">
              <CgProfile className="mr-10 text-2xl" /> <span>Profile</span>
            </button>
          </li>
          <li
            onClick={() => onNavClick("contacts")}
            className="px-4 py-4 text-black hover:bg-gray-200 flex flex-row cursor-pointer"
          >
            <button className="flex items-center w-full text-left">
              <RiContactsBook3Fill className="mr-10 text-2xl" />{" "}
              <span>Contacts</span>
            </button>
          </li>
          <li
            onClick={() => onNavClick("changePw")}
            className="px-4 py-4 text-black hover:bg-gray-200 flex flex-row cursor-pointer"
          >
            <button className="flex items-center w-full text-left">
              <PiPasswordBold className="mr-10 text-2xl" />{" "}
              <span>Change Password</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
