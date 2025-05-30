"use client";

import { GatorProvider } from "./_providers/GatorProvider";
import { StepProvider } from "./_providers/StepProvider";
import { NextPage } from "next";
import Steps from "~~/components/delegation-toolkit/Steps";

const DelegationToolkit: NextPage = () => {
  return (
    <StepProvider>
      <GatorProvider>
        <div className="min-h-screen mt-8">
          <Steps />
        </div>
      </GatorProvider>
    </StepProvider>
  );
};

export default DelegationToolkit;
