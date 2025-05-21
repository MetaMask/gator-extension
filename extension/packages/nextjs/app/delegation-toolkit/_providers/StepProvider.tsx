import { createContext, useCallback, useState } from "react";

interface StepContextType {
  step: number;
  changeStep: (step: number) => void;
}

export const StepContext = createContext<StepContextType>({
  step: 1,
  changeStep: () => {},
});

export const StepProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState(1);

  const changeStep = useCallback(
    (step: number) => {
      setStep(step);
    },
    [step],
  );

  return <StepContext.Provider value={{ step, changeStep }}>{children}</StepContext.Provider>;
};
