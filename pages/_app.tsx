import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '../components/WalletConnect/WalletModalProvider';
import NetworkStatus from "@components/NetworkStatus";
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
import React, { FC, useMemo, useEffect } from 'react';
import { SWRConfig } from 'swr'
import { AudioPlayerProvider } from "react-use-audio-player"
import { ProfileProvider } from "../context/ProfileContext"
import { MusicProvider } from "../context/MusicContext"
import Background from "../components/Background"
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import Welcome from '@components/Welcome'
import { GoogleAnalytics } from "nextjs-google-analytics";
import Script from 'next/script'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import 'react-loading-skeleton/dist/skeleton.css'

// Use require instead of import since order matters
require('../styles/globals.css');
require('../styles/wallet-adapter.css');

// // Call `createTheme` and pass your custom values
// const lightTheme = createTheme({
//     type: 'light',
//     theme: {
//     }
//   })
  
// const darkTheme = createTheme({
//     type: 'dark',
//     theme: {
//     }
// })

const UnauthenticatedView = () => {
    return (
        <>

        </>
    )
}

const App: FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
        gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        router.events.on('hashChangeComplete', handleRouteChange)
        return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
        router.events.off('hashChangeComplete', handleRouteChange)
        }
    }, [router.events])

    const { connected, wallet } = useWallet();
    
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


    return (
        <>
            <NextUIProvider>
                <MusicProvider>
                    <AudioPlayerProvider>
                            <ConnectionProvider endpoint={endpoint}>
                                <WalletProvider wallets={wallets} autoConnect>
                                    <ProfileProvider>
                                        <WalletModalProvider>
                                                {/* Global Site Tag (gtag.js) - Google Analytics */}
                                                <Script
                                                    strategy="afterInteractive"
                                                    src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
                                                />
                                                <Script
                                                    id="gtag-init"
                                                    strategy="afterInteractive"
                                                    dangerouslySetInnerHTML={{
                                                    __html: `
                                                        window.dataLayer = window.dataLayer || [];
                                                        function gtag(){dataLayer.push(arguments);}
                                                        gtag('js', new Date());
                                                        gtag('config', '${gtag.GA_TRACKING_ID}', {
                                                        page_path: window.location.pathname,
                                                        });
                                                    `,
                                                    }}
                                                />
                                                <Component {...pageProps} />
                                        </WalletModalProvider>
                                    </ProfileProvider>
                                </WalletProvider>
                            </ConnectionProvider>
                    </AudioPlayerProvider>
                </MusicProvider>
            </NextUIProvider>
         </>
    );
};

export default App;
