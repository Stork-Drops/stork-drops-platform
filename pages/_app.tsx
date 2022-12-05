import { DefaultSeo } from 'next-seo';
import { createTheme, NextUIProvider, Container } from "@nextui-org/react"
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
import { GoogleAnalytics } from "nextjs-google-analytics";
import Script from 'next/script'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import { JupiterProvider } from "@jup-ag/react-hook";
import { Connection } from '@solana/web3.js';
import { Toaster } from 'react-hot-toast';
import 'react-loading-skeleton/dist/skeleton.css'

// Use require instead of import since order matters
require('../styles/globals.css');
require('../styles/wallet-adapter.css');

const theme = createTheme({
    type: "regular",
    theme: {
        fonts: {
            p: "Inter, sans-serif",
            h1: "DM Sans, sans-serif",
        }
    }
})

export const SECOND_TO_REFRESH = 30 * 1000;

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

const App: FC<AppProps> = ({ Component, pageProps }) => {
    const { connected } = useWallet();
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
    
    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint
    //const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const endpoint = useMemo(() => process.env.NEXT_PUBLIC_QUICKNODE_URL, [network]);

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
    
    return (
        <>
            <NextUIProvider theme={theme}>
                <MusicProvider>
                    <AudioPlayerProvider>
                            <ConnectionProvider endpoint={endpoint}>
                                <WalletProvider wallets={wallets} autoConnect>
                                    <ProfileProvider>
                                        <WalletModalProvider>
                                            <DefaultSeo
                                                additionalLinkTags={[
                                                    {
                                                        rel: 'icon',
                                                        href: '/favicon.ico',
                                                    },
                                                    {
                                                        rel: 'apple-touch-icon',
                                                        href: '/sd-package.svg',
                                                        sizes: '76x76'
                                                    }
                                                ]}      
                                                openGraph={{
                                                    type: 'website',
                                                    locale: 'en_US',
                                                    url: 'https://storkdrops.xyz',
                                                    site_name: 'Stork Drops',
                                                }}
                                                twitter={{
                                                    handle: '@storkdrops_',
                                                    site: '@storkdrops_',
                                                    cardType: 'summary_large_image',
                                                }}
                                            />
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
                                            <Toaster 
                                                position="bottom-left"
                                                toastOptions={{
                                                    duration: 5000,
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
