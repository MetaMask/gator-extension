"use client";

import { useState } from "react";
import useDelegateSmartAccount from "../_hooks/useDelegateSmartAccount";
import { usePimlicoUtils } from "../_hooks/usePimlicoUtils";
import useStorageClient from "../_hooks/useStorageClient";
import { prepareRedeemDelegationData } from "../_utils/delegationUtils";
import { getDeleGatorEnvironment } from "@metamask/delegation-toolkit";
import { Hex } from "viem";
import { sepolia } from "viem/chains";

export default function RedeemDelegationButton() {
  const { smartAccount } = useDelegateSmartAccount();
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState<Hex | null>(null);
  const chain = sepolia;
  const { getDelegation } = useStorageClient();
  const { bundlerClient, paymasterClient, pimlicoClient } = usePimlicoUtils();

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
