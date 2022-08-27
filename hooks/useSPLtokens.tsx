import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useCallback, useEffect, useState } from "react";
import { useTokenRegistry } from "@context/TokenRegistry";
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

interface TokenAccount {
  publicKey: string;
  mint: string;
  amount: number;
  decimals: number;
  symbol: string;
  logo: string | undefined;
}

const useSPLTokens = ( publicKey: any) => {
  const tokenRegistry = useTokenRegistry();
  const { connection } = useConnection();
  const { wallet } = useWallet();

  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState<TokenAccount[] | null>(null);

  const fetchTokens = useCallback(async () => {
    if (wallet) {
      setLoading(true);

      // Get Token Accounts owned by wallet
      const response = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { programId: TOKEN_PROGRAM_ID }
      );

      // Parsing Token info
      let parsedTokens: TokenAccount[] = [];
      response.value.forEach((tokenAccount) => {
        const mint = tokenAccount.account.data["parsed"]["info"]["mint"];
        const amount = Number(
          tokenAccount.account.data["parsed"]["info"]["tokenAmount"]["amount"]
        );
        if (amount) {
          const tokenMetadata = tokenRegistry.get(mint);
          if (tokenMetadata) {
            parsedTokens.push({
              publicKey: tokenAccount.pubkey.toBase58(),
              mint,
              amount,
              decimals: tokenMetadata.decimals,
              symbol: tokenMetadata.symbol,
              logo: tokenMetadata.logoURI,
            });
          }
        }
      });
      setTokens(parsedTokens);

      setLoading(false);
    }
  }, [connection, wallet, tokenRegistry]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  return { tokens, loading };
};

export default useSPLTokens;