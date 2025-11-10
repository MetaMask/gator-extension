"use client";

import useDelegateSmartAccount from "~~/hooks/delegations/useDelegateSmartAccount";
import useDelegatorSmartAccount from "~~/hooks/delegations/useDelegatorSmartAccount";
import { useStepContext } from "~~/hooks/delegations/useStepContext";
import useStorageClient from "~~/hooks/delegations/useStorageClient";
import { prepareRootDelegation } from "~~/utils/delegations/delegationUtils";

export default function CreateDelegationButton() {
  const { smartAccount } = useDelegatorSmartAccount();
  const { storeDelegation } = useStorageClient();
  const { smartAccount: delegateSmartAccount } = useDelegateSmartAccount();
  const { changeStep } = useStepContext();

  const handleCreateDelegation = async () => {
    if (!smartAccount || !delegateSmartAccount) return;
    console.log(smartAccount.address, delegateSmartAccount.address);
    const delegation = prepareRootDelegation(smartAccount, delegateSmartAccount.address);

    const signature = await smartAccount.signDelegation({
      delegation,
    });

    const signedDelegation = {
      ...delegation,
      signature,
    };

    console.log(signedDelegation);
    storeDelegation(signedDelegation);
    changeStep(5);
  };

  return (
    <button className="btn btn-primary btn-sm font-normal gap-1" onClick={handleCreateDelegation}>
      Create Delegation
    </button>
  );
}
