import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '../components/WalletConnect/WalletModalProvider';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { AppProps } from 'next/app';
import React, { FC, useMemo } from 'react';
import { AudioPlayerProvider } from "react-use-audio-player"
import { ProfileContext, ProfileProvider } from "../context/ProfileContext"
import { MusicProvider } from "../context/MusicContext"

// Use require instead of import since order matters
require('../styles/globals.css');
require('../styles/wallet-adapter.css');

// Call `createTheme` and pass your custom values
const lightTheme = createTheme({
    type: 'light',
    theme: {
    }
  })
  
const darkTheme = createTheme({
    type: 'dark',
    theme: {
    }
})

const App: FC<AppProps> = ({ Component, pageProps }) => {
    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint
    //const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const endpoint = "https://ssc-dao.genesysgo.net/"

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new SolletExtensionWalletAdapter({ network }),
        ],
        [network]
    );

    // const cyberConnect = new CyberConnect({
    //     namespace: 'CyberConnect',
    //     env: Env.PRODUCTION,
    //     chain: Blockchain.SOLANA,
    //     provider: solanaProvider,
    //     chainRef: "", // from jiayi: not needed + can pass empty string instead
    //   });

    // // useEffect(() => {
    // //     cyberConnect();
    // // }, [])

    return (
        <NextThemesProvider
                defaultTheme="light"
                attribute="class"
                value={{
                light: lightTheme.className,
                dark: darkTheme.className
            }}>
            <NextUIProvider>
                <AudioPlayerProvider>
                    <MusicProvider>
                        <ConnectionProvider endpoint={endpoint}>
                            <WalletProvider wallets={wallets} autoConnect>
                                <ProfileProvider>
                                    <WalletModalProvider>
                                            <Component {...pageProps} />
                                    </WalletModalProvider>
                                </ProfileProvider>
                            </WalletProvider>
                        </ConnectionProvider>
                        </MusicProvider>
                </AudioPlayerProvider>
            </NextUIProvider>
        </NextThemesProvider>
    );
};

export default App;
