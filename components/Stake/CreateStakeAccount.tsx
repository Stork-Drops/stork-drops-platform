import React, { useCallback, useState } from 'react'
import {
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    StakeProgram,
    Authorized,
    sendAndConfirmTransaction,
    Lockup,
    PublicKey,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    Connection
  } from "@solana/web3.js";
import { Dialog } from '@headlessui/react'
import {
    WalletNotConnectedError,
    SignerWalletAdapterProps
  } from '@solana/wallet-adapter-base';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';


const CreateStakeAccount = () => {
    const { connection } = useConnection();
    const { publicKey, wallet, sendTransaction, signTransaction } = useWallet();
    const base58address = publicKey?.toBase58();
    let [Tx, setTx] = useState('');
    let [TxLink, setLink] = useState('');

    let [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    // input amount state that the user wants to stake
    const [inputAmountforAccountCreation, setInputAmountforAccountCreation] = useState(0);

    function closeModal() {
        setIsCreateModalOpen(false)
    }

    function openModal() {
        setIsCreateModalOpen(true)
    }

    const handleAmountChange = (event) => {
        setInputAmountforAccountCreation(event.target.value);
    };

    const createStakeAcctAndDelegate = useCallback(async () => {
        //TODO: hardcoded validator's voting account from solanaBeach
        //const votingAccountToDelegate = new PublicKey('9GJmEHGom9eWo4np4L5vC6b6ri1Df2xN8KFoWixvD1Bs') // Block Logic Brian Long Validator

        // Create a keypair for our stake account
        const newStakeAccount = Keypair.generate();
        
        // determine the minimum balance for a stake account
        const minimumRent = await connection.getMinimumBalanceForRentExemption(StakeProgram.space);
        // user input amount * LAMPORTS_PER_SOL combined with minimum rent to create finalCreateStakeDeposit
        const userAmountToStake = inputAmountforAccountCreation * LAMPORTS_PER_SOL; 
        const createStakeAccountDeposit = minimumRent + userAmountToStake;
        console.log('This is your deposit :', createStakeAccountDeposit)

        // transaction
        const transaction = new Transaction().add(
            StakeProgram.createAccount({
                authorized: new Authorized(publicKey, publicKey),
                fromPubkey: publicKey,
                lamports: createStakeAccountDeposit,
                lockup: new Lockup(0, 0, publicKey),
                stakePubkey: newStakeAccount.publicKey,
            })
        );

        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();

        const signature = await sendTransaction(transaction, connection, { minContextSlot });

        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });

        //Update NEW Tx Value
        setTx(signature);

        //create Tx url LINK
        let Link = 'https://explorer.solana.com/tx/' + signature + '?cluster=mainnet'
        setLink(Link);

      }, [publicKey, sendTransaction, connection]);

    return (
        <div className="w-full">
            <button
                type="button"
                onClick={openModal}
                className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white"
                >
                Create Stake Account
            </button>

            <Dialog className="flex items-center justify-center" open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(true)}>
                <Dialog.Panel className="fixed h-fit rounded-xl m-10 w-full md:w-1/2 bg-white p-4 border shadow-md">
                    <Dialog.Title className="font-extrabold text-2xl">New Staking Account</Dialog.Title>
                    <Dialog.Description className="">
                    <div className="my-2.5">
                        <label htmlFor="price" className="block text-xs font-base text-dracula">Deposit amount</label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm">◎</span>
                            </div>
                            <input disabled={!publicKey} onKeyDown={handleAmountChange} type="number" name="price" id="price" className="block w-full h-12 text-2xl rounded-md border-2 border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="0.00"/>
                            <div className="absolute inset-y-0 right-0 flex items-center">
                            <label htmlFor="currency" className="sr-only">Currency</label>
                                <button className="text-dracula text-xs p-2 font-extrabold">
                                    MAX
                                </button>
                            </div>
                        </div>
                    </div>
                    </Dialog.Description>

                    <div className="w-full grid grid-cols-2 grid-rows-1 gap-2 items-center justify-around">
                        <button className="py-2 px-4 font-extrabold bg-red-500 text-white rounded-xl" onClick={() => setIsCreateModalOpen(false)}>Cancel</button>
                        <button className="py-2 px-4 text-white font-extrabold  bg-indigo-500 rounded-xl" disabled={!publicKey} onClick={createStakeAcctAndDelegate}>Create Account</button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    )
}

export default CreateStakeAccount