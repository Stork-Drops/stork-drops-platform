import { TokenInfoMap, TokenListProvider } from "@solana/spl-token-registry";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const chainIDs = {
  Mainnet: 101,
  Testnet: 102,
  Devnet: 103,
};

const TokenRegistryContext = createContext<TokenInfoMap>({} as TokenInfoMap);

export const TokenRegistryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [tokenMap, setTokenMap] = useState<TokenInfoMap>(new Map());

  useEffect(() => {
    new TokenListProvider().resolve().then((tokens) => {
      const tokenList = tokens.filterByChainId(chainIDs.Mainnet).getList();

      setTokenMap(
        tokenList.reduce((map, item) => {
          map.set(item.address, item);
          return map;
        }, new Map())
      );
    });
  }, [setTokenMap]);

  return (
    <TokenRegistryContext.Provider value={tokenMap}>
      {children}
    </TokenRegistryContext.Provider>
  );
};

export const useTokenRegistry = () => useContext(TokenRegistryContext);