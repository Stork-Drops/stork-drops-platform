import React, { useState, useMemo, createContext, useEffect, Children } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { fetchSolanaNameServiceName } from "../utils/name-service"

const MusicContext = React.createContext(null);

function MusicProvider({ children }){
    const [songIndex, setSongIndex] = useState(0)

	return(
		<MusicContext.Provider 
			value={{ 
				songIndex, setSongIndex
			}}>
				{children}
		</MusicContext.Provider>
	);
}

export { MusicContext, MusicProvider };