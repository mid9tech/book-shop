import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface ThumbnailsProps {
  images?: string[];
}

export default function Thumbnails({ images }: ThumbnailsProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm h-[150px]"
    >
      <CarouselContent>
        {images?.map((image) => (
          <img
            className="w-[100px] h-[150px] object-cover mr-5"
            src={image}
            alt="thumbnails"
          />
        ))}
      </CarouselContent>
    </Carousel>
  );
}
