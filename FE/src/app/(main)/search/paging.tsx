"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PaginationProduct() {
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const params = useSearchParams();
  const pageNumbers = [];

  // Determine the range of page numbers to display
  const startPage = Math.max(1, currentPage - 1);
  const endPage = currentPage + 1;
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const updateParams = (key: any, value: any) => {
    const newParams = new URLSearchParams(params);
    newParams.set(key, value);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-row justify-between w-full py-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem className={currentPage === 1 ? "hidden" : ""}>
            <PaginationPrevious
              href="#"
              onClick={() => {
                if (currentPage === 1) return;

                setCurrentPage(currentPage - 1);
                updateParams("page", currentPage - 1);
              }}
            />
          </PaginationItem>
          {/* Dynamic Pagination Items */}
          {pageNumbers.map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href="#"
                isActive={currentPage === pageNum}
                onClick={() => {
                  setCurrentPage(pageNum);
                  updateParams("page", pageNum);
                }}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => {
                setCurrentPage(currentPage + 1);
                updateParams("page", currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
