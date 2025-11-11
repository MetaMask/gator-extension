import {
  Delegation,
  ExecutionMode,
  MetaMaskSmartAccount,
  createDelegation,
  createExecution,
} from "@metamask/smart-accounts-kit";
import { DelegationManager } from "@metamask/smart-accounts-kit/contracts";
import { Address, Hex, parseEther, zeroAddress } from "viem";

export function prepareRootDelegation(delegator: MetaMaskSmartAccount, delegate: Address): Delegation {
  // The following scope is a simple example that limits
  // the number of native token transfers the delegate can perform on the delegator's
  // behalf.

  // You can add more caveats to the delegation as needed to restrict
  // the delegate's actions. Checkout MetaMask Smart Accounts Kit docs for more
  // information on how to use delegation scopes.

  // How to use delegation scopes:
  // https://docs.metamask.io/smart-accounts-kit/guides/delegation/use-delegation-scopes/

  return createDelegation({
    scope: {
      type: "nativeTokenTransferAmount",
      maxAmount: parseEther("0.001"),
    },
    to: delegate,
    from: delegator.address,
    environment: delegator.environment,
  });
}

export function prepareRedeemDelegationData(delegation: Delegation): Hex {
  const execution = createExecution({ target: zeroAddress });
  const data = DelegationManager.encode.redeemDelegations({
    delegations: [[delegation]],
    modes: [ExecutionMode.SingleDefault],
    executions: [[execution]],
  });

  return data;
}
