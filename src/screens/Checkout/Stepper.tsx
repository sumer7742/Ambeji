

interface StepperProps {
  step: number;
  setStep: (e: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ step, setStep }) => {
  const steps = ["Address", "Summary", "Payment", "Done"];

  return (
    <div className="w-full bg-white p-4 rounded-md shadow border border-gray-200">
      <div className="flex items-center justify-between relative">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = step === stepNumber;
          const isCompleted = step > stepNumber;

          return (
            <div
              key={label}
              className="flex flex-col items-center flex-1 relative"
            >
              {/* Step circle */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold z-10 cursor-pointer
                  ${isCompleted
                    ? "bg-green-500 text-white"
                    : isActive
                      ? "bg-[#dd3333] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                onClick={() => setStep(stepNumber)}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>

              {/* Step label */}
              <span
                className={`mt-2 text-xs sm:text-sm text-center
                  ${isActive ? "text-[#dd3333] font-medium" : isCompleted ? "text-green-600" : "text-gray-400"}`}
              >
                {label}
              </span>
              {index < steps.length - 1 && (
                <div className="absolute top-[15px] left-1/2 w-full h-0.5 -z-0">

                  <div className="h-[3px] absolute left-0 bg-gray-300 w-full" />
                  <div
                    className={`h-[3px] absolute left-0 transition-all duration-500
        ${isCompleted && "bg-green-500"}`}
                    style={{
                      width: isCompleted
                        ? "100%"
                        : isActive
                          ? "50%"
                          : "0%",
                    }}
                  />
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
