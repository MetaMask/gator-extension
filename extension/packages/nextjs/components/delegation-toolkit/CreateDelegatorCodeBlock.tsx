const DelegatorSmartAccountCodeBlock = () => {
  return (
    <div className="mockup-code mb-4">
      <pre data-prefix="$">
        <code>{`// Create delegator smart account`}</code>
      </pre>
      <pre data-prefix=">">
        <code>smartAccount = toMetaMaskSmartAccount({`{`}</code>
      </pre>
      <pre data-prefix=">">
        <code> client: publicClient,</code>
      </pre>
      <pre data-prefix=">">
        <code> implementation: Implementation.Hybrid,</code>
      </pre>
      <pre data-prefix=">">
        <code> deployParams: [userAddress, [], [], []],</code>
      </pre>
      <pre data-prefix=">">
        <code> deploySalt: &quot;0x&quot;,</code>
      </pre>
      <pre data-prefix=">">
        <code> signatory: {`{ walletClient }`},</code>
      </pre>
      <pre data-prefix=">">
        <code>{`})`}</code>
      </pre>
      <pre data-prefix=">">
        <code></code>
      </pre>
      <pre data-prefix=">">
        <code>{`// Deploys smart account on first transaction`}</code>
      </pre>
      <pre data-prefix=">">
        <code>userOperationHash = bundlerClient.sendUserOperation({`{`}</code>
      </pre>
      <pre data-prefix=">">
        <code> account: smartAccount,</code>
      </pre>
      <pre data-prefix=">">
        <code> calls: [dummyTransaction],</code>
      </pre>
      <pre data-prefix=">">
        <code> paymaster: paymasterClient, {`// Sponsored gas`}</code>
      </pre>
      <pre data-prefix=">">
        <code>{`})`}</code>
      </pre>
    </div>
  );
};

export default DelegatorSmartAccountCodeBlock;
