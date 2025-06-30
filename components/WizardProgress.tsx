type WizardProgressProps = {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
};

export default function WizardProgress({ currentStep, totalSteps, stepLabels }: WizardProgressProps) {
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="w-40 items-center justify-center  mb-6 px-4">
      <div className="flex  text-sm text-black mb-1">
        <p>Step {currentStep} of {totalSteps}</p>
        {stepLabels && <p>{stepLabels[currentStep - 1]}</p>}
      </div>

      <div className="w-40 bg-gray-100 h-2 rounded-full">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
