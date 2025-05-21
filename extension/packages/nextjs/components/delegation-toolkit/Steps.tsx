"use client";

import { useEffect } from "react";
import CreateDelegateButton from "./CreateDelegateButton";
import CreateDelegationButton from "./CreateDelegationButton";
import DeployDelegatorButton from "./DeployDelegatorButton";
import RedeemDelegationButton from "./RedeemDelegationButton";
import { useAccount } from "wagmi";
import useDelegateSmartAccount from "~~/hooks/delegation-toolkit/useDelegateSmartAccount";
import useDelegatorSmartAccount from "~~/hooks/delegation-toolkit/useDelegatorSmartAccount";
import { useStepContext } from "~~/hooks/delegation-toolkit/useStepContext";
import useStorageClient from "~~/hooks/delegation-toolkit/useStorageClient";

export default function Steps() {
  const { step, changeStep } = useStepContext();
  const { address } = useAccount();
  const { smartAccount } = useDelegatorSmartAccount();
  const { smartAccount: delegateSmartAccount } = useDelegateSmartAccount();
  const { getDelegation } = useStorageClient();

  useEffect(() => {
    if (!address) {
      changeStep(1);
    }

    if (address && smartAccount && !delegateSmartAccount) {
      smartAccount.isDeployed().then(isDeployed => {
        if (!isDeployed) {
          changeStep(2);
        }
        if (isDeployed) {
          changeStep(3);
        }
      });
    }

    if (address && smartAccount && delegateSmartAccount) {
      const delegation = getDelegation(delegateSmartAccount.address);
      if (!delegation) {
        changeStep(4);
      } else {
        changeStep(5);
      }
    }
  }, [address, smartAccount, delegateSmartAccount]);

  return (
    <div className="max-w-3xl mx-auto">
      {step === 1 && (
        <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 py-4">
          <p className="text-base-content/80 mb-6 leading-relaxed">
            The first step would be to connect your wallet.
            <br />
            <br />
            You can customize the Wagmi config to connect to any chain you want, and use the connector of your choice.
          </p>
        </div>
      )}
      {step === 2 && (
        <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 py-4">
          <p className="text-base-content/80 mb-6 leading-relaxed">
            The MetaMask smart contract account that grants authority. This will on chain be deployed, just in time for
            redeeming the delegation.
          </p>
          <DeployDelegatorButton />
        </div>
      )}
      {step === 3 && (
        <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 py-4">
          <p className="text-base-content/80 mb-6 leading-relaxed">
            The MetaMask smart contract account that receives the delegation. Initially this will be counterfactual (not
            deployed on-chain), until it is deployed by submitting a user operation
          </p>
          <CreateDelegateButton />
        </div>
      )}
      {step === 4 && (
        <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 py-4">
          <p className="text-base-content/80 mb-6 leading-relaxed">
            The delegator creates and signs a delegation, granting specific authority to the delegate account. In this
            case, the delegation can be used to perform any transaction on delegator&apos;s behalf.
            <br />
            <br />
            To restrict the delegate account to only perform specific actions, the delegator can specify a caveats array
            in the delegation.
          </p>
          <CreateDelegationButton />
        </div>
      )}
      {step === 5 && (
        <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 py-4">
          <p className="text-base-content/80 mb-6 leading-relaxed">
            The redeemer submits a user operation that executes the action allowed by the delegation (in this case,
            transfer nothing to no one) on behalf of the delegator
          </p>
          <RedeemDelegationButton />
        </div>
      )}
    </div>
  );
}
