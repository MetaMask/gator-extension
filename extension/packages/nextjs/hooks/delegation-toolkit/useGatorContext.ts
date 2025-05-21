import { useContext } from "react";
import { GatorContext } from "../../app/delegation-toolkit/_providers/GatorProvider";

export function useGatorContext() {
  const context = useContext(GatorContext);

  if (!context) {
    throw new Error("useGatorContext must be used within the scope of GatorContextProvider");
  }

  return context;
}
