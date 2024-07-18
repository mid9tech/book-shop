"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { RenderAboutQuery } from "@/+core/definegql";
import { About } from "@/+core/interfaces";
import Spinner from "@/components/ui/spinner";
import SomethingWhenWrong from "@/components/ui/sth-went-wrong";
import { useQuery } from "@apollo/client";

export default function AboutPage() {
  const { data, error, loading } = useQuery(RenderAboutQuery);

  let main: About[] = [];
  let child: About[] = [];
  let qAndA: About[] = [];

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

  if (data) {
    main = data.renderAbout.main;
    child = data.renderAbout.child;
    qAndA = data.renderAbout.qAndA;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <h1 className="text-5xl font-bold">About Us</h1>
      {/* Main content section */}
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
        {main.map((item) => (
          <div
            key={item.title}
            className="mb-10 flex flex-col lg:flex-row items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-48 h-48 object-cover rounded-lg lg:mr-8 mb-4 lg:mb-0 shadow-md"
            />
            <div>
              <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
              <p className="text-lg">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Child content section */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {child.map((item) => (
          <div
            key={item.title}
            className="mb-8 flex flex-col lg:flex-row items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-32 h-32 object-cover rounded-lg lg:mr-6 mb-4 lg:mb-0 shadow-md"
            />
            <div>
              <h2 className="text-3xl font-semibold mb-2">{item.title}</h2>
              <p className="text-base">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Q&A section */}
      <Accordion type="single" className="w-full" collapsible>
        {qAndA.map((item) => (
          <AccordionItem key={item.title} value={item.title}>
            <AccordionTrigger className="text-2xl font-semibold">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-base p-4">
              {item.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
