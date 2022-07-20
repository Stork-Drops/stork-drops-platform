import React, { useEffect, useState } from 'react';
import { TokenListProvider, TokenInfo } from '@solana/spl-token-registry';
import { Loading } from "@nextui-org/react"
import useSWR from "swr";


export const TokenIcon = (props: { mint: string }) => {
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());

  useEffect(() => {
    new TokenListProvider().resolve().then(tokens => {
      const tokenList = tokens.filterByChainId(101).getList();

      setTokenMap(tokenList.reduce((map, item) => {
        map.set(item.address, item);
        return map;
      },new Map()));
    });
  }, [setTokenMap]);

  const token = tokenMap.get(props.mint);
  if (!token || !token.logoURI) return null;

  return (
    <>
      <img
        className="rounded-full border"
        width={45} 
        src={token.logoURI} 
      />
    </>
  );
}

export const TokenName = (props: { mint: string }) => {
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());

  useEffect(() => {
    new TokenListProvider().resolve().then(tokens => {
      const tokenList = tokens.filterByChainId(101).getList();

      setTokenMap(tokenList.reduce((map, item) => {
        map.set(item.address, item);
        return map;
      },new Map()));
    });
  }, [setTokenMap]);

  const token = tokenMap.get(props.mint);
  if (!token || !token.name) return null;

  return (
    <>
      <span>{token.name}</span>
    </>
  );
}

export const TokenSymbol = (props: { mint: string }) => {
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());

  useEffect(() => {
    new TokenListProvider().resolve().then(tokens => {
      const tokenList = tokens.filterByChainId(101).getList();

      setTokenMap(tokenList.reduce((map, item) => {
        map.set(item.address, item);
        return map;
      },new Map()));
    });
  }, [setTokenMap]);

  const token = tokenMap.get(props.mint);
  if (!token || !token.symbol) return null;

  return (
    <>
      <span>{token.symbol}</span>
    </>
  );
}

export const TokenPrice = (props: { tokenAddress: any, sumAmount: number }) => {
  // Set up SWR fetcher
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const API_TO_JSON = `https://public-api.solscan.io/market/token/${props.tokenAddress}`;

  const { data, error } = useSWR(
    API_TO_JSON,
    fetcher
  );

  if (error) return <p>An error has occurred.</p>;
  if (!data) return <Loading type="points" />;
  
  return(
    <>
      {((data.priceUsdt) * props.sumAmount).toFixed(4)}
    </>
  )
}

export const TokenChange = (props: { tokenAddress: any }) => {
  // Set up SWR fetcher
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const API_TO_JSON = `https://public-api.solscan.io/market/token/${props.tokenAddress}`;

  const { data, error } = useSWR(
    API_TO_JSON,
    fetcher
  );

  if (error) return <p>An error has occurred.</p>;
  if (!data) return <Loading type="points" />;
  
  return(
    <>
      <span className={`text-sm ${data.priceChange24h < 0 ? "text-rose-400" : "text-emerald-400"}`}>
        {(data.priceChange24h).toFixed(4)}%
      </span>
    </>
  )
}




