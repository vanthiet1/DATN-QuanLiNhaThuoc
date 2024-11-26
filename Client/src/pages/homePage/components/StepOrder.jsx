import React, { useEffect, useState } from 'react';
import dataStepOrder from './dataStepOrder';

const StepOrder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isManualClick, setIsManualClick] = useState(false);

  const handleStepClick = (index) => {
    setCurrentStep(index);
    setIsManualClick(true);
  };

  useEffect(() => {
    if (isManualClick) {
      const timeout = setTimeout(() => {
        setIsManualClick(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const slide = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % dataStepOrder.length);
    }, 3000);

    return () => clearInterval(slide);
  }, [isManualClick, currentStep]);

  return (
    <div className="flex gap-5">
      <div>
        <img
          className="w-[300px] h-[450px]"
          src={dataStepOrder[currentStep].image}
          alt="Step Image"
        />
      </div>

      <div className="flex flex-col">
        {dataStepOrder.map((step, index) => (
          <div
            key={index}
            className="flex items-start mb-4 cursor-pointer"
            onClick={() => handleStepClick(index)}
          >
            <div className="flex flex-col items-center mr-4 pt-1">
              <div
                className={`h-4 w-4 rounded-full border-2 ${
                  currentStep === index ? 'bg-[#2563EB] border-[#dfdfdf]' : 'bg-white border-[#2563EB]'
                }`}
              ></div>
              {index < dataStepOrder.length - 1 && (
                <div className="h-[60px] w-0.5 bg-gray-300"></div>
              )}
            </div>
            <div>
              <span
                className={`block font-bold text-[20px] ${
                  currentStep === index ? 'text-[#2563EB]' : 'text-black'
                }`}
              >
                {step.title}
              </span>
              <span className="block max-w-[600px]">{step.des}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepOrder;
