"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState<string | undefined>(
    params.get("keyword") as string | undefined
  );

  const handleSearch = () => {
    router.push(`/search?keyword=${searchKeyword}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <div className="flex w-full max-w-2xl items-center">
      {/* <SearchDropdown /> */}
      <Input
        className="rounded-none !h-12"
        type="text"
        value={searchKeyword || undefined}
        onChange={handleChange}
        placeholder="Search..."
      />
      <Button
        onClick={handleSearch}
        className="rounded-none bg-blue-700 !h-12"
        type="button"
      >
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchInput;
