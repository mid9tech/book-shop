"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe2Icon } from "lucide-react";

export function ChangeLanguageDropDown() {
  const [position, setPosition] = React.useState("en");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Globe2Icon className="h-4 w-4 hover:cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="vi">Vietnamese</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
