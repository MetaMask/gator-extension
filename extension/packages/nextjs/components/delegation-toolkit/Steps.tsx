"use client";

import { useEffect, useState } from "react";
import AddressCard from "./AddressCard";
import CreateDelegateButton from "./CreateDelegateButton";
import CreateDelegateCodeBlock from "./CreateDelegateCodeBlock";
import CreateDelegationButton from "./CreateDelegationButton";
import CreateDelegationCodeBlock from "./CreateDelegationCodeBlock";
import CreateDelegatorCodeBlock from "./CreateDelegatorCodeBlock";
import DeployDelegatorButton from "./DeployDelegatorButton";
import LearnMoreButton from "./LearnMoreButton";
import RedeemDelegationButton from "./RedeemDelegationButton";
import RedeemDelegationCodeBlock from "./RedeemDelegationCodeBlock";
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
  const [storedDelegation, setStoredDelegation] = useState<any>(null);

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

  // Refresh stored delegation when on step 4 or 5
  useEffect(() => {
    if (step === 5 && delegateSmartAccount) {
      const delegation = getDelegation(delegateSmartAccount.address);
      setStoredDelegation(delegation);
    }
  }, [step, delegateSmartAccount]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AddressCard
            address={smartAccount?.address}
            title="Delegator Account"
            description="The account that creates the delegation"
            fallbackText="Not connected"
          />

          <AddressCard
            address={delegateSmartAccount?.address}
            title="Delegate Account"
            description="The account that receives the delegation"
            fallbackText="Not created yet"
          />
        </div>
      </div>

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
            The MetaMask smart contract account that grants authority to the delegate account. The Deploy Delegator
            button will send a dummy user operation to deploy the smart account on-chain.
          </p>

          <LearnMoreButton href="https://docs.gator.metamask.io/how-to/create-delegator-account" />
          <CreateDelegatorCodeBlock />
          <DeployDelegatorButton />
        </div>
      )}
      {step === 3 && (
        <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 py-4">
          <p className="text-base-content/80 mb-6 leading-relaxed">
            The MetaMask smart contract account that receives the delegation. Initially this will be counterfactual (not
            deployed on-chain), until it is deployed by submitting a user operation.
          </p>

          <LearnMoreButton href="https://docs.gator.metamask.io/how-to/create-delegator-account" />
          <CreateDelegateCodeBlock />
          <CreateDelegateButton />
        </div>
      )}
      {step === 4 && (
        <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 py-4">
          <p className="text-base-content/80 mb-6 leading-relaxed">
            The delegator creates and signs a delegation, granting specific authority to the delegate account. In this
            case, the delegation can be used to perform any transaction on delegator&apos;s behalf. The signed
            delegation will be persisted in localStorage.
            <br />
            <br />
            To restrict the delegate account to only perform specific actions, the delegator can specify a caveats array
            in the delegation.
          </p>

          <LearnMoreButton href="https://docs.gator.metamask.io/how-to/create-delegation" />

          <CreateDelegationCodeBlock />
          <CreateDelegationButton />
        </div>
      )}
      {step === 5 && (
        <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 py-4">
          {storedDelegation && (
            <div className="mb-6">
              <div className="mt-4 bg-base-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-sm">📋 Delegation to Redeem:</h4>
                <div className="mockup-code text-xs overflow-x-auto">
                  <pre className="whitespace-pre-wrap break-words pl-4">
                    <code>{JSON.stringify(storedDelegation, null, 2)}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          <p className="text-base-content/80 mb-6 leading-relaxed">
            The redeemer submits a user operation that executes the action allowed by the delegation (in this case,
            transfer nothing to no one) on behalf of the delegator. We are using the signed delegation stored in
            localStorage to execute on behalf of the delegator.
          </p>

          <LearnMoreButton href="https://docs.gator.metamask.io/how-to/redeem-delegation" />
          <RedeemDelegationCodeBlock />
          <RedeemDelegationButton />
        </div>
      )}
    </div>
  );
}
