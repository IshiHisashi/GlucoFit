import React, { createContext, useState, ReactNode, useContext } from "react";

type OnboardingData = {
  name?: string;
  birthday?: Date;
  height?: number;
  weight?: number;
  diabates_type?: number;
  medicine_name?: string;
  //   dosage?:string;
  //   unit?:string;
  log_timestamp?: Date;
  maximum_bsl?: number;
  minimum_bsl?: number;
  notification?: boolean;
};

type OnboardingContextType = {
  onboardingData: OnboardingData;
  updateOnboardingData: (newData: Partial<OnboardingData>) => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});

  // Function to update the state
  const updateOnboardingData = (newData: Partial<OnboardingData>) => {
    setOnboardingData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <OnboardingContext.Provider
      value={{ onboardingData, updateOnboardingData }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
