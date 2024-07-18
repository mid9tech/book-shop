import MainNavBar from "@/components/nav/navbar";
import LandingHeader from "./components/header/header";
import MainHeader from "@/components/layout/header";
import MyProvider from "@/+core/providers/custom";

export default function LayoutLanding({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MyProvider>
      <MainHeader />
      <LandingHeader />
      <MainNavBar />
      <div className="w-full flex justify-center">
        <div className="w-4/5 min-h-[45rem] flex align-middle text-center">
          {" "}
          {children}
        </div>
      </div>
    </MyProvider>
  );
}
