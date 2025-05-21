"use client";

import { GatorProvider } from "./_providers/GatorProvider";
import { StepProvider } from "./_providers/StepProvider";
import { NextPage } from "next";
import Hero from "~~/components/delegation-toolkit/Hero";
import Steps from "~~/components/delegation-toolkit/Steps";

const DelegationToolkit: NextPage = () => {
  return (
    <StepProvider>
      <GatorProvider>
        <div className="flex items-center justify-center h-screen">
          <div className="container mx-auto px-4 py-12">
            <Hero />
            <div className="mt-12">
              <Steps />
            </div>
          </div>
        </div>
      </GatorProvider>
    </StepProvider>
  );
};

export default DelegationToolkit;
