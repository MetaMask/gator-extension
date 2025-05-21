"use client";

import { useGatorContext } from "../_hooks/useGatorContext";

export default function CreateDelegateButton() {
  const { generateDelegateWallet } = useGatorContext();

  return (
    <button className="btn btn-primary btn-sm font-normal gap-1" onClick={generateDelegateWallet}>
      Create Delegate Wallet
    </button>
  );
}
