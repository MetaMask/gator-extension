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
  const { bundlerClient, paymasterClient, pimlicoClient } = usePimlicoUtils();

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

  return (
    <>
      <button className="btn btn-primary btn-sm font-normal gap-1" onClick={handleDeployDelegator}>
        {loading ? "Deploying..." : "Deploy Delegator Account"}
      </button>
    </>
  );
}
