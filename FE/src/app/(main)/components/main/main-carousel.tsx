"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@apollo/client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PromotionsQuery } from "@/+core/definegql";
import { PromotionType } from "@/+core/interfaces/promotion";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import formatter from "@/lib/formatDate";
import Link from "next/link";

// Utility function to format Date objects

export default function LandingCarouse() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const { data, loading, error } = useQuery(PromotionsQuery, {
    variables: {
      isAvailablePromotions: true,
    },
  });

  if (error) {
    console.log("Error: ", error.message);
  }

  const promotions: PromotionType[] = data?.promotions || [];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-[100%] rounded-none mt-5 mb-5"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {loading ? (
          <div className="h-[50rem] w-full flex items-center justify-center">
            <Spinner size={80} />
          </div>
        ) : (
          promotions.map((promotion) => (
            <CarouselItem key={promotion.id}>
              <div className="p-1">
                <Card className="rounded-none">
                  <CardContent
                    className="flex h-[50rem] rounded-none relative items-center justify-center p-6 bg-no-repeat bg-cover"
                    style={{
                      backgroundImage: `url('${promotion.banner}') `,
                    }}
                  >
                    <div className="bg-black opacity-70 inset-0 w-full h-full absolute"></div>
                    <div className="text-white absolute z-10 opacity-100 p-4 animate-fadeInUp space-y-4">
                      <h1 className="text-5xl font-bold uppercase">
                        {promotion.name}
                      </h1>
                      <h2 className="text-xl mx-64 text-balance">
                        {promotion.description}
                      </h2>
                      <h3 className="text-lg">
                        {promotion.startDate
                          ? formatter.format(new Date(promotion.startDate))
                          : "N/A"}{" "}
                        -{" "}
                        {promotion.endDate
                          ? formatter.format(new Date(promotion.endDate))
                          : "N/A"}
                      </h3>
                      <Link href={"/search"}>
                        <Button className="rounded-none bg-gray-300 text-black hover:text-white transition duration-300 w-[10rem] h-[3srem]">
                          Shop Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      <CarouselPrevious className="ml-[4rem]" />
      <CarouselNext className="mr-[4rem]" />
    </Carousel>
  );
}
