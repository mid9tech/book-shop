"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Publisher } from "@/+core/interfaces";
import ProductCard from "@/components/ui/product-card";
import { useQuery } from "@apollo/client";
import { GetPublisherQuery } from "@/+core/definegql";
import Spinner from "@/components/ui/spinner";
import SomethingWhenWrong from "@/components/ui/sth-went-wrong";
import PublisherCard from "./card";

export default function AllPublisher() {
  const { data, loading, error } = useQuery(GetPublisherQuery);

  let publishers: Publisher[] = [];

  if (loading) {
    return (
      <div className="p-8 w-full min-h-screen">
        <div className="flex items-center w-full space-x-4">
          <div className="space-y-2 w-full">
            <Spinner size={100} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <SomethingWhenWrong />;
  }

  publishers = data?.publishers;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-x-[5rem] gap-y-8">
      {publishers?.map((publisher) => (
        <PublisherCard
          key={publisher.id}
          id={publisher.id}
          avatar={publisher.avatar}
          name={publisher.name}
          description={publisher.description}
          status={false}
        />
      ))}
    </div>
  );
}
