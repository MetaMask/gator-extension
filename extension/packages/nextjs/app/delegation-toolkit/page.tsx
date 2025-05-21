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
        <div className="min-h-screen bg-base-200">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
              <Hero />
              <div className="mt-12">
                <Steps />
              </div>
            </div>
          </div>
        </div>
      </GatorProvider>
    </StepProvider>
  );
};

export default DelegationToolkit;
