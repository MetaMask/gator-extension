const CreateDelegationCodeBlock = () => {
  return (
    <div className="mockup-code mb-4">
      <pre data-prefix="$">
        <code>{`// utils/delegation-toolkit/delegationUtils.ts`}</code>
      </pre>
      <pre data-prefix=">">
        <code>const caveats = createCaveatBuilder(delegator.environment)</code>
      </pre>
      <pre data-prefix=">">
        <code> .addCaveat(&quot;limitedCalls&quot;, 1)</code>
      </pre>
      <pre data-prefix=">">
        <code></code>
      </pre>
      <pre data-prefix=">">
        <code>const delegation = createDelegation({`{`}</code>
      </pre>
      <pre data-prefix=">">
        <code> to: delegate,</code>
      </pre>
      <pre data-prefix=">">
        <code> from: delegator.address,</code>
      </pre>
      <pre data-prefix=">">
        <code> caveats,</code>
      </pre>
      <pre data-prefix=">">
        <code>{`})`}</code>
      </pre>
      <pre data-prefix=">">
        <code></code>
      </pre>
      <pre data-prefix=">">
        <code>{`// components/delegation-toolkit/CreateDelegationButton.tsx`}</code>
      </pre>
      <pre data-prefix=">">
        <code>const signature = await smartAccount.signDelegation({`{`}</code>
      </pre>
      <pre data-prefix=">">
        <code> delegation,</code>
      </pre>
      <pre data-prefix=">">
        <code>{`})`}</code>
      </pre>
      <pre data-prefix=">">
        <code></code>
      </pre>
      <pre data-prefix=">">
        <code>const signedDelegation = {`{ ...delegation, signature }`}</code>
      </pre>
      <pre data-prefix=">">
        <code>storeDelegation(signedDelegation) {`// Persisted!`}</code>
      </pre>
    </div>
  );
};

export default CreateDelegationCodeBlock;
