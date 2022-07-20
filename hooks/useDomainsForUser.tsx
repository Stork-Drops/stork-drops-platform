import React from "react"
import { useConnection } from "@solana/wallet-adapter-react";
import { NameRegistryState, performReverseLookupBatch } from "@bonfida/spl-name-service";
import { getAllDomains } from "@bonfida/spl-name-service";
import { useEffect, useRef, useState } from "react";
import { PublicKey } from "@solana/web3.js";

interface Result {
  pubkey: PublicKey;
  registry: NameRegistryState;
  reverse: string;
}
  
export const useDomainsForUser = (user: any) => {
  const { connection } = useConnection();
  const [result, setResult] = useState<Result[] | undefined>(undefined);
  const mounted = useRef(true);

  useEffect(() => {
    const fn = async () => {
      const domains = await getAllDomains(connection, user);
      const registries = await NameRegistryState.retrieveBatch(connection, [
        ...domains,
      ]);
      const reverses = await performReverseLookupBatch(connection, [
        ...domains,
      ]);
      const _result: Result[] = [];
      for (let i = 0; i < domains.length; i++) {
        _result.push({
          pubkey: domains[i],
          registry: registries[i]!,
          reverse: reverses[i]!,
        });
      }
      if (mounted.current) {
        setResult(_result);
      }

      return () => (mounted.current = false);
    };

    fn().catch(console.error);
  }, [user]);

  return result;
};