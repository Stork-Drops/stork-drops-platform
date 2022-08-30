import React from 'react';
import { WalletMultiButton } from '@components/WalletConnect';
import Navigation from '@components/Navigation';

const Welcome = () => {
    return (
        <>
            <div className="h-screen flex justify-center items-center">
                <div className="p-2 rounded-xl text-sm md:w-2/4 fixed top-0 m-10 border border-green-500 bg-green-200 text-green-600">
                    Please read. Hey we're excited to have you test out our platform. We're still in beta, so please be patient with us as we work out the kinks.
                    Some things might break, some things might be slow but just know we're working hard to make this the best experience possible. Enjoy ❤️
                </div>
                <div className="grid auto-rows-auto grid-cols-1 gap-4 justify-center">
                    <div className="flex items-center">
                        <img className="w-32" src="/sd-full.svg"/>
                        <div 
                            style={{
                                fontSize: '0.6rem',
                            }}
                            className="ml-1 w-min bg_sunrise text-white px-1 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-semibold hover:opacity-80">
                            beta
                        </div>  
                    </div>
                    <p className="text-base font-base italic">Welcome anon. We've been waiting for you.</p>
                    <WalletMultiButton />
                </div>
            </div>
        </>
    );
}

export default Welcome;