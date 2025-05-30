export const description = `
<div className="flex justify-center mt-8">
  <div className="flex flex-col bg-base-100 px-6 py-4 text-center items-center max-w-4xl rounded-xl border border-base-300 space-y-4">
    <h2 className="text-lg font-semibold text-yellow-500">Configuration required</h2>
    
    <p className="text-center text-lg">
      Please update the{" "}
      <code className="italic bg-base-200 text-base font-bold max-w-full break-words break-all inline-block">
        .env
      </code>{" "}
      file with the{" "}
      <code className="italic bg-base-200 text-base font-bold max-w-full break-words break-all inline-block">
        PIMLICO_API_KEY
      </code>{" "}
      variable.
    </p>
    
    <p className="text-center text-lg">
      Please check the{" "}
      <code className="italic bg-base-200 text-base font-bold max-w-full break-words break-all inline-block">
        .env.example
      </code>{" "}
      for reference.
    </p>
  </div>
</div>
`;

export const externalExtensionName = "Delegation Toolkit";