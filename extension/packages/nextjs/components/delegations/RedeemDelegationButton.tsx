"use client";

import { useState } from "react";
import { getSmartAccountsEnvironment } from "@metamask/smart-accounts-kit";
import { Hex } from "viem";
import { sepolia } from "viem/chains";
import useDelegateSmartAccount from "~~/hooks/delegations/useDelegateSmartAccount";
import { usePimlicoUtils } from "~~/hooks/delegations/usePimlicoUtils";
import useStorageClient from "~~/hooks/delegations/useStorageClient";
import { prepareRedeemDelegationData } from "~~/utils/delegations/delegationUtils";

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
          to: getSmartAccountsEnvironment(chain.id).DelegationManager,
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
    return (
      <div className="bg-red-50 border border-red-200 shadow-md rounded-lg px-4 py-3 mb-4">
        <div className="flex items-center">
          <div className="text-red-600 text-sm">Error: {error}</div>
        </div>
      </div>
    );
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
