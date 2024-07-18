import AllPublisher from "./publishers";

export default function Page() {
  return (
    <div className="flex flex-col w-full mb-10">
      <div className="flex p-4 bg-gradient-to-l my-5 justify-between start-0 border">
        <h1 className="bolder font-bold text-3xl">PUBLISHERS</h1>
      </div>
      <AllPublisher />
    </div>
  );
}
