import React, { FunctionComponent, useEffect, useMemo, useState, Fragment } from "react";
import { PublicKey } from "@solana/web3.js";
import { TokenInfo } from "@solana/spl-token-registry";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { TOKEN_LIST_URL, useJupiter } from "@jup-ag/react-hook";
import {
  CHAIN_ID,
  INPUT_MINT_ADDRESS,
  OUTPUT_MINT_ADDRESS,
} from "../../../constants";

import FeeInfo from "./FeesInfo";
import SpinnerProgress from "./SpinnerProgress";
import fetch from "cross-fetch";
import JSBI from "jsbi";
import Decimal from "decimal.js";
import { SECOND_TO_REFRESH } from "../../../pages/_app";
import { TokenIcon, TokenName, TokenPrice, TokenSymbol, JupiterTokenPrice } from '@utils/tokenList'
import { Connection } from '@solana/web3.js';
import { TbArrowsDoubleNeSw } from "react-icons/tb";
import { BsSliders } from "react-icons/bs";
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { HiChevronDown, HiChevronUp, HiCheck } from "react-icons/hi";
import { BsChevronExpand } from "react-icons/bs";
import { FiX, FiSearch } from "react-icons/fi";

interface IJupiterFormProps {}
type UseJupiterProps = Parameters<typeof useJupiter>[0];

const JupiterForm: FunctionComponent<IJupiterFormProps> = (props) => {
  const wallet = useWallet();
  const connection = new Connection("https://rpc.ankr.com/solana", 'confirmed');
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());
  const [inputSwapToken, setInputSwapToken] = useState()
  const [outputSwapToken, setOutputSwapToken] = useState()

  const [formValue, setFormValue] = useState<
Omit<UseJupiterProps, "amount"> & { amount: Decimal }
  >({
    amount: new Decimal(1), // unit in lamports (Decimals)
    inputMint: new PublicKey(INPUT_MINT_ADDRESS),
    outputMint: new PublicKey(OUTPUT_MINT_ADDRESS),
    slippage: 1, // 0.1%
  });

  const [inputTokenInfo, outputTokenInfo] = useMemo(() => {
    return [
      tokenMap.get(formValue.inputMint?.toBase58() || ""),
      tokenMap.get(formValue.outputMint?.toBase58() || ""),
    ];
  }, [
    tokenMap,
    formValue.inputMint?.toBase58(),
    formValue.outputMint?.toBase58(),
  ]);

  useEffect(() => {
    fetch(TOKEN_LIST_URL["mainnet-beta"])
      .then((res) => res.json())
      .then((tokens: TokenInfo[]) => {
        setTokenMap(
          tokens.reduce((map, item) => {
            map.set(item.address, item);
            return map;
          }, new Map())
        );
      });
  }, [setTokenMap]);
  

  const amountInInteger = useMemo(() => {
    return JSBI.BigInt(
      formValue.amount.mul(10 ** (inputTokenInfo?.decimals || 1))
    );
  }, [inputTokenInfo, formValue.amount]);

  const {
    routeMap,
    allTokenMints,
    routes,
    loading,
    exchange,
    error,
    refresh,
    lastRefreshTimestamp,
  } = useJupiter({ ...formValue, amount: amountInInteger });

  const validOutputMints = useMemo(
    () => routeMap.get(formValue.inputMint?.toBase58() || "") || allTokenMints,
    [routeMap, formValue.inputMint?.toBase58()]
  );

  // ensure outputMint can be swapable to inputMint
  useEffect(() => {
    if (formValue.inputMint) {
      const possibleOutputs = routeMap.get(formValue.inputMint.toBase58());

      if (
        possibleOutputs &&
        !possibleOutputs?.includes(formValue.outputMint?.toBase58() || "")
      ) {
        setFormValue((val) => ({
          ...val,
          outputMint: new PublicKey(possibleOutputs[0]),
        }));
      }
    }
  }, [formValue.inputMint?.toBase58(), formValue.outputMint?.toBase58()]);

  const [timeDiff, setTimeDiff] = useState(lastRefreshTimestamp);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (loading) return;

      const diff = new Date().getTime() - lastRefreshTimestamp;
      setTimeDiff((diff / SECOND_TO_REFRESH) * 100);

      if (diff >= SECOND_TO_REFRESH) {
        refresh();
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [loading]);

  // swap formValue from inputMint to outputMint and vice versa
  const inputOutputSwitcher = () => {
    setFormValue((val) => ({
      ...val,
      inputMint: val.outputMint,
      outputMint: val.inputMint,
    }));
  };
  

  //onClick set inputMint value equal to


  const [selected, setSelected] = useState('So11111111111111111111111111111111111111112')

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  // QUICK ACTION TOKEN SELECTION FUNCTIONS
  const selectSOLMint = () => {
    setFormValue((val) => ({
      ...val,
      inputMint: new PublicKey("So11111111111111111111111111111111111111112"),
    }));
  }

  const selectUSDCMint = () => {
    setFormValue((val) => ({
      ...val,
      inputMint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
    }));
  }

  const selectUSDTMint = () => {
    setFormValue((val) => ({
      ...val,
      inputMint: new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"),
    }));
  }

  const selectMSOLMint = () => {
    setFormValue((val) => ({
      ...val,
      inputMint: new PublicKey("mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So"),
    }));
  }
  
  return (
    <div className="w-11/12 md:w-1/3 bg-gray-100 p-4 rounded-xl">
      <div className="flex items-center justify-end">
        <button className="mr-2 inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span className="flex items-center justify-between text-xs">
            <BsSliders className="w-3 mr-2"/>
            Settings</span>
        </button>

        <button
          className={`${
            loading ? "opacity-50 cursor-not-allowed" : ""
          } inline-flex items-center px-1 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 space-x-2`}
          type="button"
          onClick={refresh}
          disabled={loading}>
          <SpinnerProgress percentage={timeDiff} sqSize={14} strokeWidth={3} />
        </button>
      </div>

      <div className="relative flex items-center justify-start my-2.5">
        {/* SELECT TOKEN */}
        <div className="absolute flex items-center justify-center m-2">
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={openModal}
                className="flex items-center justify-between rounded-full text-dracula bg-white border border-gray-300 px-2 py-1 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                <div className="w-5 mr-1">
                  <TokenIcon mint={formValue.inputMint?.toBase58()}/>
                </div>
                <TokenSymbol mint={formValue.inputMint?.toBase58()}/>
              </button>
            </div>

            <Dialog className="text-dracula max-w-lg fixed w-11/12 md:w-1/2 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 overflow-y-auto z-50 shadow-md" open={isOpen} onClose={() => setIsOpen(false)}>
              <Dialog.Panel className="h-72 rounded-xl overflow-y-scroll w-full transform overflow-hidden bg-white p-5 text-left align-middle shadow-xl transition-all">
                <Dialog.Title 
                  className="mb-2.5 flex items-center justify-between">
                  <h2 className="text-lg font-extrabold">Select a token</h2>
                  <button 
                    onClick={closeModal}
                    className="text-xs font-extrabold bg-gray-200 text-dracula px-2 py-1 rounded-lg">
                    esc
                  </button>
                </Dialog.Title>
                
                <div>

                {/* TOKEN SEARCH BAR */}
                <div className="relative rounded-md shadow-sm mb-2.5">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                    <span className="text-gray-500 sm:text-sm">
                      <FiSearch className="w-4 h-4"/>
                    </span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-gray-300 pl-7  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Search token or paste an SPL token address"
                  />
                </div>

                {/* QUICK ACTION MENU */}
                <div className="my-5 grid grid-cols-4 grid-rows-1 justify-end gap-2">
                  <button 
                    onClick={() => { selectSOLMint(); closeModal();}}
                    className="flex items-center justify-between border border-gray-300 rounded-xl w-fit px-2 py-1">
                    <div className="w-5 mr-1">
                      <TokenIcon mint="So11111111111111111111111111111111111111112"/>
                    </div>
                    SOL
                  </button>
                  <button 
                    onClick={() => { selectUSDCMint(); closeModal();}}
                    className="flex items-center justify-between border border-gray-300 rounded-xl w-fit px-2 py-1">
                    <div className="w-5 mr-1">
                      <TokenIcon mint="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"/>
                    </div>
                    USDC
                  </button>
                  <button 
                    onClick={() => { selectUSDTMint(); closeModal();}}
                    className="flex items-center justify-between border border-gray-300 rounded-xl w-fit px-2 py-1">
                    <div className="w-5 mr-1">
                      <TokenIcon mint="Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"/>
                    </div>
                    USDT
                  </button>
                 <button 
                    onClick={() => { selectMSOLMint(); closeModal();}}
                    className="flex items-center justify-between border border-gray-300 rounded-xl w-fit px-2 py-1">
                    <div className="w-5 mr-1">
                      <TokenIcon mint="mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So"/>
                    </div>
                    mSOL
                  </button>
                </div>

                <div>
                  {allTokenMints
                    .map((tokenMint) => {
                      const found = tokenMap.get(tokenMint);
                      return (
                        <li className="text-gray-500 hover:text-dracula list-none">
                          <button 
                              onClick={(e) => {
                              const pbKey = new PublicKey(e.currentTarget.value);
                              if (pbKey) {
                                setFormValue((val) => ({
                                  ...val,
                                  inputMint: pbKey,
                                }));
                              }
                              closeModal();
                            }}
                            key={tokenMint} 
                            value={tokenMint}>
                            <div className="flex items-center justify-start">
                              <div>
                                {found.logoURI}
                              </div>
                              <div className="flex-col text-left">
                                <p className="text-sm font-semibold">{found ? found.symbol : tokenMint}</p>
                                <p className="text-sm font-base">{found ? found.name : tokenMint}</p>
                              </div>
                            </div>
                            
                          </button>
                        </li>
                      );
                    })
                    .filter(Boolean)}
                </div>
                </div>
              </Dialog.Panel>
            </Dialog>
        </div>

        {/* INPUT MINT AMOUNT */}
        <div className="w-full">
          <input
            name="amount"
            id="amount"
            className="text-right sm:text-sm md:text-xl h-14 p-2 focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-xl"
            value={formValue.amount.toString()}
            type=""
            pattern="[0-9]*"
            onInput={(e: any) => {
              let newValue = e.target?.value || "0";

              let newAmount = new Decimal(newValue);

              if (newAmount.lessThan(0)) {
                newAmount = new Decimal(0);
              }
              setFormValue((val) => ({
                ...val,
                amount: newAmount,
              }));
            }}
          />
        </div>
      </div>

      {/* SWITCHER */}
      <div className="pt-2.5 flex items-center justify-center">
        <button onClick={inputOutputSwitcher} className="p-2 rounded-full border border-dracula">
          <TbArrowsDoubleNeSw className="w-4 h-4 text-dracula"/>
        </button>
      </div>


      {/* OUTPUT INPUT AND SWAP AMOUNT */}
      <div className="bg-gray-100 p-2 rounded-xl flex items-center justify-between">
        <div>
          <label htmlFor="outputMint" className="block text-xs font-medium">
            You receive
          </label>
          <select
            id="outputMint"
            name="outputMint"
            className="mt-1 bg-neutral block w-24 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-full"
            value={formValue.outputMint?.toBase58()}
            onChange={(e) => {
              const pbKey = new PublicKey(e.currentTarget.value);
              if (pbKey) {
                setFormValue((val) => ({
                  ...val,
                  outputMint: pbKey,
                }));
              }
            }}
          >
            {validOutputMints.map((tokenMint) => {
              const found = tokenMap.get(tokenMint);

              return (
                <option key={tokenMint} value={tokenMint}>
                  {found ? found.symbol : tokenMint}
                </option>
              );
            })}
          </select>
        </div>

        {/* Output Token Amount */}
        <div className="bg-gray-100">
          {routes?.[0] &&
            (() => {
              const route = routes[0];
              return (
                <>
                  <div className="text-lg font-extrabold text-indigo-500">
                    {new Decimal(route.outAmount.toString())
                      .div(10 ** (outputTokenInfo?.decimals || 1))
                      .toString()} {" "}
                    {outputTokenInfo?.symbol}
                  </div>
                </>
              );
            })()}
        </div>
      </div>
      
      {routes && routes.length > 0 ? (
        <div>
        <div className="relative my-2.5 border-2 border-indigo-600 p-2 rounded-xl">
        <div className="text-xs font-extrabold text-white absolute -top-4 -right-3 p-1 rounded-full bg-indigo-600">
            Best Price
        </div>
        {routes?.[0] &&
          (() => {
            const route = routes[0];

            return (
              <>
                <div className="flex items-center justify-between">
                    <div className="">
                      <p className="text-sm font-semibold">{route.marketInfos.map((info) => info.label).join(" x ")}</p>
                      <p className="text-xs font-base">{route.marketInfos
                        .map(
                          (info) =>
                            `${
                              tokenMap.get(info?.inputMint.toString())?.symbol
                            } x ${
                              tokenMap.get(info?.outputMint.toString())?.symbol
                            }`
                        )
                        .join(" x ")}</p>
                    </div>
                    <div className="text-sm">
                      <div className="font-extrabold text-indigo-500">
                        {new Decimal(route.outAmount.toString())
                          .div(10 ** (outputTokenInfo?.decimals || 1))
                          .toString()} {" "}
                        {outputTokenInfo?.symbol}
                      </div>
                      <div className="text-xs text-gray-500 font-base">
                        $<JupiterTokenPrice mint={outputTokenInfo?.symbol}/>
                      </div>
                    </div>
                </div>
              </>
            );
          })()}
      </div>

      <div>
        {routes?.[0] &&
          (() => {
            const route = routes[0];
            return (
              <>
                <FeeInfo route={route} />
              </>
            );
          })()}
      </div>
        </div>
      ) : (
        <span className="my-5 flex items-center justify-center font-medium text-sm">{routes?.length} routes found!</span>
      )}

      {error && <div>Error in Jupiter, try changing your input or refreshing</div>}
      
      {/* SWAP BUTTON */}
      <div className="flex justify-center my-4">
        <button
          type="button"
          disabled={loading}
          onClick={async () => {
            if (
              !loading &&
              routes?.[0] &&
              wallet.signAllTransactions &&
              wallet.signTransaction &&
              wallet.sendTransaction &&
              wallet.publicKey
            ) {
              const swapResult = await exchange({
                userPublicKey: wallet.publicKey,
                wallet: {
                  sendTransaction: wallet.sendTransaction,
                  signAllTransactions: wallet.signAllTransactions,
                  signTransaction: wallet.signTransaction,
                },
                routeInfo: routes[0],
                onTransaction: async (txid) => {
                  console.log("sending transaction");
                },
              });

              console.log({ swapResult });

              if ("error" in swapResult) {
                console.log("Error:", swapResult.error);
              } else if ("txid" in swapResult) {
                console.log("Sucess:", swapResult.txid);
                console.log("Input:", swapResult.inputAmount);
                console.log("Output:", swapResult.outputAmount);
              }
            }
          }}
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-lg font-semibold rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Swap
        </button>
      </div>
    </div>
  );
};

export default JupiterForm;