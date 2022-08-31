import React from 'react';
import { WalletMultiButton } from '@components/WalletConnect';
import { useWallet } from '@solana/wallet-adapter-react';

const Welcome = () => {
    const { connected } = useWallet();
    return (
        <>
            <div className="z-50 h-96 fixed bottom-0 flex justify-center items-center">
                <div className="p-2 rounded-xl text-base m-10 border border-green-500 bg-green-200 text-green-600">
                    Please read. Hey we're excited to have you test out our platform. We're still in beta, so please be patient with us as we work out the kinks.
                    Some things might break, some things might be slow but just know we're working hard to make this the best experience possible. Enjoy ❤️
                </div>
            </div>
        </>
    );
}

export default Welcome;