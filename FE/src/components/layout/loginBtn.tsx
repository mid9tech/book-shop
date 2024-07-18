"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import LogoutButton from "./logoutBtn";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import Link from "next/link";

const DynamicLoginBtn = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-5 w-5 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-[100px]" />
          <Skeleton className="h-2 w-[80px]" />
        </div>
      </div>
    );
  }

  if (session && session.user) {
    return (
      <Popover>
        <PopoverTrigger className="text-sm flex hover:cursor-pointer hover:text-black">
          <Avatar className="w-5 h-5 mr-2 mt-0.25">
            <AvatarImage src={session.user.avatar as string} alt="Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>
            {session.user.firstName && session.user.lastName
              ? session.user.firstName + " " + session.user.lastName
              : session.user.email}
          </p>
        </PopoverTrigger>
        <PopoverContent className="rounded-none">
          <div>
            <Link href="/user">
              <Button className="w-full h-full rounded-none text-black border-none bg-white hover:text-white">
                My Profile
              </Button>
            </Link>
          </div>
          <DropdownMenuSeparator />
          <div>
            <Link href="/order">
              <Button className="w-full h-full rounded-none border-none text-black bg-white hover:text-white">
                Purchase Order
              </Button>
            </Link>
          </div>
          <DropdownMenuSeparator />
          <div>
            <LogoutButton />
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <a className="flex mr-4 text-sm hover:text-black" href="/login">
      <p>Sign in or Create Account</p>
    </a>
  );
};

export default DynamicLoginBtn;
