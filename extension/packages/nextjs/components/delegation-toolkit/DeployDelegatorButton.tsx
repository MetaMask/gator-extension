"use client";

import { useState } from "react";
import { zeroAddress } from "viem";
import useDelegatorSmartAccount from "~~/hooks/delegation-toolkit/useDelegatorSmartAccount";
import { usePimlicoUtils } from "~~/hooks/delegation-toolkit/usePimlicoUtils";
import { useStepContext } from "~~/hooks/delegation-toolkit/useStepContext";

export default function DeployDelegatorButton() {
  const [loading, setLoading] = useState(false);
  const { smartAccount } = useDelegatorSmartAccount();
  const { changeStep } = useStepContext();
  const { bundlerClient, paymasterClient, pimlicoClient, error } = usePimlicoUtils();

  const handleDeployDelegator = async () => {
    if (!smartAccount) return;
    setLoading(true);
    const { fast: fee } = await pimlicoClient!.getUserOperationGasPrice();

    const userOperationHash = await bundlerClient!.sendUserOperation({
      account: smartAccount,
      calls: [
        {
          to: zeroAddress,
        },
      ],
      paymaster: paymasterClient,
      ...fee,
    });

    const { receipt } = await bundlerClient!.waitForUserOperationReceipt({
      hash: userOperationHash,
    });

    console.log(receipt);
    setLoading(false);
    changeStep(3);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 shadow-md rounded-lg px-4 py-3 mb-4">
        <div className="flex items-center">
          <div className="text-red-600 text-sm">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button className="btn btn-primary btn-sm font-normal gap-1" onClick={handleDeployDelegator} disabled={loading}>
        {loading ? "Deploying..." : "Deploy Delegator Account"}
      </button>
    </>
  );
}
