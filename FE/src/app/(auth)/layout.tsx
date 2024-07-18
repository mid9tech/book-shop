import AuthHeader from "./components/header";
import MyProvider from "@/+core/providers/custom";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MyProvider>
      <div className="bg-[#f4fefd] min-h-[50rem] flex flex-col">
        <AuthHeader />
        <div className="flex-1 flex items-center justify-center pl-40 pr-40">
          <div className="flex flex-col items-center p-10">
            <img src="./logo.jpg" className="w-70 h-80 mb-6" alt="Icon" />
            <h1 className="text-5xl font-bold mb-8">HShopp</h1>
            <h2 className="text-2xl text-center mb-8">
              Explore our book haven for a curated selection
              <br /> that caters to every book lover's taste.
            </h2>
          </div>
          <div className="w-1/3">{children}</div>
        </div>
      </div>
    </MyProvider>
  );
}
