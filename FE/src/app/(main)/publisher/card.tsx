import { Publisher } from "@/+core/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

export default function PublisherCard({
  id,
  avatar,
  name,
  description,
}: Publisher) {
  return (
    <Card className="!w-[300px] text-sm rounded-none relative overflow-hidden !h-[29rem]">
      <CardContent className="mt-5">
        <>
          <img
            src={avatar}
            alt={name}
            className="w-full h-[20rem] object-cover mt-2"
          />
          <CardTitle className="flex text-left mt-4 font-normal text-sm">
            {name}
          </CardTitle>
        </>
      </CardContent>
      <CardFooter className="flex flex-col justify-start">
        <span className="text-black text-start ml-3">{description}$</span>
      </CardFooter>
    </Card>
  );
}
