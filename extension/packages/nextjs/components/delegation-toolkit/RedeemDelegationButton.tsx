"use client";

import { useState } from "react";
import { getDeleGatorEnvironment } from "@metamask/delegation-toolkit";
import { Hex } from "viem";
import { sepolia } from "viem/chains";
import useDelegateSmartAccount from "~~/hooks/delegation-toolkit/useDelegateSmartAccount";
import { usePimlicoUtils } from "~~/hooks/delegation-toolkit/usePimlicoUtils";
import useStorageClient from "~~/hooks/delegation-toolkit/useStorageClient";
import { prepareRedeemDelegationData } from "~~/utils/delegation-toolkit/delegationUtils";

export default function RedeemDelegationButton() {
  const { smartAccount } = useDelegateSmartAccount();
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState<Hex | null>(null);
  const chain = sepolia;
  const { getDelegation } = useStorageClient();
  const { bundlerClient, paymasterClient, pimlicoClient, error } = usePimlicoUtils();

  const handleRedeemDelegation = async () => {
    if (!smartAccount) return;

    setLoading(true);

    const delegation = getDelegation(smartAccount.address);

    if (!delegation) {
      return;
    }

    const redeemData = prepareRedeemDelegationData(delegation);
    const { fast: fee } = await pimlicoClient!.getUserOperationGasPrice();

    const userOperationHash = await bundlerClient!.sendUserOperation({
      account: smartAccount,
      calls: [
        {
          to: getDeleGatorEnvironment(chain.id).DelegationManager,
          data: redeemData,
        },
      ],
      ...fee,
      paymaster: paymasterClient,
    });

    const { receipt } = await bundlerClient!.waitForUserOperationReceipt({
      hash: userOperationHash,
    });

    setTransactionHash(receipt.transactionHash);

    console.log(receipt);
    setLoading(false);
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (transactionHash) {
    return (
      <div>
        <button
          className="btn btn-primary btn-sm font-normal gap-1"
          onClick={() => window.open(`https://sepolia.etherscan.io/tx/${transactionHash}`, "_blank")}
        >
          View on Etherscan
        </button>
      </div>
    );
  }

  return (
    <button className="btn btn-primary btn-sm font-normal gap-1" onClick={handleRedeemDelegation} disabled={loading}>
      {loading ? "Redeeming..." : "Redeem Delegation"}
    </button>
  );
}
