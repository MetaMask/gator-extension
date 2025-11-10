const RedeemDelegationCodeBlock = () => {
  return (
    <div className="mockup-code mb-4">
      <pre data-prefix="$">
        <code>{`// utils/delegations/delegationUtils.ts`}</code>
      </pre>
      <pre data-prefix=">">
        <code>const execution = createExecution({target: zeroAddress })</code>
      </pre>
      <pre data-prefix=">">
        <code>const data = DelegationManager.encode.redeemDelegations({`{`}</code>
      </pre>
      <pre data-prefix=">">
        <code> delegations: [[delegation]],</code>
      </pre>
      <pre data-prefix=">">
        <code> modes: [ExecutionMode.SingleDefault],</code>
      </pre>
      <pre data-prefix=">">
        <code> executions: [[execution]],</code>
      </pre>
      <pre data-prefix=">">
        <code>{`})`}</code>
      </pre>
      <pre data-prefix=">">
        <code></code>
      </pre>
      <pre data-prefix=">">
        <code>{`// components/delegations/RedeemDelegationButton.tsx`}</code>
      </pre>
      <pre data-prefix=">">
        <code>const userOperationHash = await bundlerClient.sendUserOperation({`{`}</code>
      </pre>
      <pre data-prefix=">">
        <code> account: smartAccount,</code>
      </pre>
      <pre data-prefix=">">
        <code> calls: [{`{`}</code>
      </pre>
      <pre data-prefix=">">
        <code>{` // You can use the delegateSmartAccount to retrieve the DeleGatorEnvironment`}</code>
      </pre>
      <pre data-prefix=">">
        <code> to: delegateSmartAccount.environment.DelegationManager,</code>
      </pre>
      <pre data-prefix=">">
        <code> data: redeemData,</code>
      </pre>
      <pre data-prefix=">">
        <code> {`}],`}</code>
      </pre>
      <pre data-prefix=">">
        <code> ...fee,</code>
      </pre>
      <pre data-prefix=">">
        <code> paymaster: paymasterClient,</code>
      </pre>
      <pre data-prefix=">">
        <code>{`})`}</code>
      </pre>
    </div>
  );
};

export default RedeemDelegationCodeBlock;
