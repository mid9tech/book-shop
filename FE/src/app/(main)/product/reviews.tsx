"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Rating from "@/components/ui/rating";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@apollo/client";
import { ReviewsByProductQuery } from "@/+core/definegql";
import { useSearchParams, useRouter } from "next/navigation";
import { PagingReviewInput, ReviewPagingData } from "@/+core/interfaces";
import { REVIEW_SORT } from "@/+core/enums";
import formatter from "@/lib/formatDate";

interface CustomerReviewProps {
  productId: string;
  rate: number;
  refreshReviews: boolean;
}

export default function CustomerReviews({
  productId,
  rate,
  refreshReviews,
}: CustomerReviewProps) {
  const [sortOrder, setSortOrder] = useState("newest");
  const [commentsLimit, setCommentsLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRate, setSelectedRate] = useState<number | undefined>(
    undefined
  );

  const router = useRouter();
  const params = useSearchParams();
  const reviewsRef = useRef<HTMLDivElement>(null);

  const updateParams = (key: string, value: any) => {
    const newParams = new URLSearchParams(params);
    newParams.set(key, value);
    router.push(`?${newParams.toString()}`);
  };

  const pagingReviewInput: PagingReviewInput = {
    limit: Number(params.get("limit")) || commentsLimit,
    page: Number(params.get("page")) || currentPage,
    rate: Number(params.get("rate")) || selectedRate,
    sort: (params.get("sort") as REVIEW_SORT) || sortOrder,
  };

  const { data, refetch } = useQuery(ReviewsByProductQuery, {
    variables: {
      productId: productId,
      pagingReviewInput: pagingReviewInput,
    },
  });

  useEffect(() => {
    if (refreshReviews) {
      refetch();
      refreshReviews = false;
    }
  }, [refreshReviews]);

  useEffect(() => {
    const relevantParams = ["page", "rate", "sort", "limit"];
    const hasRelevantChange = relevantParams.some(
      (param) => params.get(param) !== null
    );

    if (hasRelevantChange) {
      refetch().then(() => {
        if (reviewsRef.current) {
          reviewsRef.current.scrollIntoView({ behavior: "smooth" });
        }
      });

      //refetch();
    } else {
      refetch();
    }
  }, [params]);

  let reviewPagingData: ReviewPagingData = data?.reviewsByProduct || [];
  const totalPages = Math.ceil(reviewPagingData.total / reviewPagingData.limit);

  // Determine the range of page numbers to display
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);
  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Card className="w-full h-auto rounded-none text-start">
      <CardHeader className="text-start">
        <CardTitle className="text-3xl">Customer Review</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4" ref={reviewsRef}>
          <div className="mb-6">
            <div className="flex items-center mt-2">
              <div className="text-4xl font-semibold">{rate}</div>
              <div className="ml-2">
                <div className="flex items-center">
                  <div className="flex">
                    <Rating score={rate} />
                  </div>
                  <div className="ml-2 text-gray-500">
                    ({reviewPagingData.total})
                  </div>
                </div>
                <div className="flex mt-1 gap-10 justify-between">
                  <div className="flex">
                    <button
                      className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1"
                      onClick={() => {
                        setSelectedRate(undefined);
                        updateParams("rate", "");
                      }}
                    >
                      All
                    </button>
                    <button
                      className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1"
                      onClick={() => {
                        setSelectedRate(5);
                        updateParams("rate", 5);
                      }}
                    >
                      5 ★ ({reviewPagingData.countFiveStar})
                    </button>
                    <button
                      className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1"
                      onClick={() => {
                        setSelectedRate(4);
                        updateParams("rate", 4);
                      }}
                    >
                      4 ★ ({reviewPagingData.countFourStar})
                    </button>
                    <button
                      className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1"
                      onClick={() => {
                        setSelectedRate(3);
                        updateParams("rate", 3);
                      }}
                    >
                      3 ★ ({reviewPagingData.countThreeStar})
                    </button>
                    <button
                      className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1"
                      onClick={() => {
                        setSelectedRate(2);
                        updateParams("rate", 2);
                      }}
                    >
                      2 ★ ({reviewPagingData.countTwoStar})
                    </button>
                    <button
                      className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1"
                      onClick={() => {
                        setSelectedRate(1);
                        updateParams("rate", 1);
                      }}
                    >
                      1 ★ ({reviewPagingData.countOneStar})
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <Select
                      onValueChange={(value) => {
                        setSortOrder(value);
                        updateParams("sort", value);
                      }}
                    >
                      <SelectTrigger className="w-[100px] rounded-none">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={REVIEW_SORT.LATEST}>
                            Latest
                          </SelectItem>
                          <SelectItem value={REVIEW_SORT.OLDEST}>
                            Oldest
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Select
                      onValueChange={(value) => {
                        setCommentsLimit(Number(value));
                        updateParams("limit", Number(value));
                      }}
                    >
                      <SelectTrigger className="rounded-none">
                        <SelectValue placeholder="Limit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="10">10 Reviews</SelectItem>
                          <SelectItem value="20">20 Reviews</SelectItem>
                          <SelectItem value="30">30 Reviews</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6  max-h-screen overflow-y-auto">
            {reviewPagingData ? (
              reviewPagingData.data?.map((review) => (
                <div
                  className="p-4 bg-white shadow rounded"
                  key={review.productId}
                >
                  <div className="flex items-center">
                    <img
                      src={review.owner.avatar}
                      alt="User avatar"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="flex flex-col w-full">
                      <span className="font-semibold w-full">
                        {review.owner.firstName && review.owner.lastName
                          ? review.owner.firstName + " " + review.owner.lastName
                          : "someone"}
                      </span>
                      <div className="w-full flex items-center justify-between">
                        <div className="flex">
                          <Rating score={review.rate} />
                        </div>
                        <div className="ml-auto text-sm text-gray-500">
                          {formatter.format(new Date(review.createdAt))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2">{review.title}</p>
                  <p className="mt-2">{review.content}</p>
                  <div className="mt-2 flex flex-row gap-4">
                    {review.images.map((image, index) => (
                      <img
                        className="w-20 h-20"
                        src={image}
                        alt="image"
                        key={index}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No Review</p>
            )}
          </div>
          <div className="mt-5">
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
                <PaginationItem
                  className={currentPage === totalPages ? "hidden" : ""}
                >
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
        </div>
      </CardContent>
    </Card>
  );
}
