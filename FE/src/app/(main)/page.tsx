import * as React from "react";

import { GrLinkNext } from "react-icons/gr";

import LandingCarouse from "./components/main/main-carousel";
import LatestProduct from "./components/main/latest-product";
import OnSaleProduct from "./components/main/onsale-product";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <div>
        <div>
          <div className="flex p-4 bg-gradient-to-l my-5 justify-between start-0 border">
            <h1 className="bolder font-bold text-3xl">HOT DEALS</h1>
          </div>
        </div>

        <LandingCarouse />
      </div>

      <div>
        <div className="flex p-4 bg-gradient-to-l my-5 justify-between start-0 border">
          <h1 className="bolder font-bold text-3xl">ON SALE</h1>
          <Link href={"/search"}>
            <p className="cursor-pointer hover:text-blue-500 flex flex-row mt-2">
              <span>View all</span>{" "}
              <GrLinkNext className="font-2xl mt-1 ml-2" />
            </p>
          </Link>
        </div>
        <OnSaleProduct />
      </div>

      <LatestProduct />
    </div>
  );
}
