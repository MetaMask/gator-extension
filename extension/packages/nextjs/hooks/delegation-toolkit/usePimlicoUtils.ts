import { useEffect, useState } from "react";
import { PimlicoClient, createPimlicoClient } from "permissionless/clients/pimlico";
import { http } from "viem";
import { BundlerClient, PaymasterClient, createBundlerClient, createPaymasterClient } from "viem/account-abstraction";
import { useChainId } from "wagmi";

export function usePimlicoUtils() {
  const [paymasterClient, setPaymasterClient] = useState<PaymasterClient>();
  const [bundlerClient, setBundlerClient] = useState<BundlerClient>();
  const [pimlicoClient, setPimlicoClient] = useState<PimlicoClient>();
  const [error, setError] = useState<string | null>(null);
  const chainId = useChainId();

  useEffect(() => {
    const pimlicoKey = process.env.NEXT_PUBLIC_PIMLICO_API_KEY;

    if (!pimlicoKey) {
      setError("Pimlico API key is not set. Please set the NEXT_PUBLIC_PIMLICO_API_KEY environment variable.");
      return;
    }

    const bundlerClient = createBundlerClient({
      transport: http(`https://api.pimlico.io/v2/${chainId}/rpc?apikey=${pimlicoKey}`),
    });

    const paymasterClient = createPaymasterClient({
      transport: http(`https://api.pimlico.io/v2/${chainId}/rpc?apikey=${pimlicoKey}`),
    });

    const pimlicoClient = createPimlicoClient({
      transport: http(`https://api.pimlico.io/v2/${chainId}/rpc?apikey=${pimlicoKey}`),
    });

    setPimlicoClient(pimlicoClient);
    setBundlerClient(bundlerClient);
    setPaymasterClient(paymasterClient);
  }, [chainId]);

  return { bundlerClient, paymasterClient, pimlicoClient, error };
}
