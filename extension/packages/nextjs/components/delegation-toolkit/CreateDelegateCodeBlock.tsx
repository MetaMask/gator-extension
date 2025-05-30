const DelegateCodeBlock = () => {
  return (
    <div className="mockup-code mb-4">
      <pre data-prefix="$">
        <code>{`// Create delegate smart account`}</code>
      </pre>
      <pre data-prefix=">">
        <code>const account = privateKeyToAccount(delegateWallet)</code>
      </pre>
      <pre data-prefix=">">
        <code></code>
      </pre>
      <pre data-prefix=">">
        <code>toMetaMaskSmartAccount({`{`}</code>
      </pre>
      <pre data-prefix=">">
        <code> client: publicClient,</code>
      </pre>
      <pre data-prefix=">">
        <code> implementation: Implementation.Hybrid,</code>
      </pre>
      <pre data-prefix=">">
        <code> deployParams: [account.address, [], [], []],</code>
      </pre>
      <pre data-prefix=">">
        <code> deploySalt: &quot;0x&quot;,</code>
      </pre>
      <pre data-prefix=">">
        <code> signatory: {`{ account }`},</code>
      </pre>
      <pre data-prefix=">">
        <code>{`})`}</code>
      </pre>
    </div>
  );
};

export default DelegateCodeBlock;
