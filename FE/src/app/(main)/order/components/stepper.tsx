import { STATUS_ORDER } from "@/+core/enums";
import React from "react";

interface Props {
  status: STATUS_ORDER;
}

const Stepper = ({ status }: Props) => {
  const statuses = Object.values(STATUS_ORDER);
  const currentStep = statuses.indexOf(status);

  return (
    <div className="flex items-center justify-between w-full">
      {statuses.map((step, index) => (
        <div key={step} className="relative flex flex-1 items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              index <= currentStep
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {index + 1}
          </div>
          {index < statuses.length - 1 && (
            <div className="flex-1 h-1 mx-2 bg-gray-300">
              <div
                className={`h-full ${index < currentStep ? "bg-blue-500" : ""}`}
              />
            </div>
          )}
          <div
            className={`absolute top-7 left-1/2 transform -translate-x-1/2 text-center text-sm ${
              index <= currentStep ? "text-blue-500" : "text-gray-600"
            }`}
          >
            {step.replace("_", " ")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
