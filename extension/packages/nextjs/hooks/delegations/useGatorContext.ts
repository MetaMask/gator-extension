import { useContext } from "react";
import { GatorContext } from "../../app/delegations/_providers/GatorProvider";

export function useGatorContext() {
  const context = useContext(GatorContext);

  if (!context) {
    throw new Error("useGatorContext must be used within the scope of GatorContextProvider");
  }

  return context;
}
