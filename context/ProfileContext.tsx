import React, { useState, useMemo, createContext, useEffect, Children } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

const ProfileContext = React.createContext({
	walletAddress: "",
	setWalletAddress: (walletAddress: string) => {},
	bonfidaUsername: "",
	setBonfidaUsername: (bonfidaUsername: string) => {},
	compactWalletAddress: "",
	setCompactWalletAddress: (compactWalletAddress: any) => {},
	twitterUsername: "",
	setTwitterUsername: (twitterUsername: string) => {},
	domainCollection: [],
	setDomainCollection: (domainCollection: any) => {},
	nftCollection: [],
	setNFTCollection: (nftCollection: any) => {},
	tokenCollection: [],
	setTokenCollection: (tokenCollection: any) => {},
	networkStatus: null,
	setNetworkStatus: (networkStatus: number) => {}
});

function ProfileProvider({ children }){
	const { connection } = useConnection();
	const { publicKey } = useWallet();
	const [walletAddress, setWalletAddress] = useState("");
	const [bonfidaUsername, setBonfidaUsername] = useState("");
	const [compactWalletAddress, setCompactWalletAddress] = useState("");
	const [twitterUsername, setTwitterUsername] = useState("");
	const [domainCollection, setDomainCollection] = useState([]);
	const [nftCollection, setNFTCollection] = useState<any>([]);
	const [tokenCollection, setTokenCollection] = useState<any>([]);
	const [networkStatus, setNetworkStatus] = useState(null);

	return(
		<ProfileContext.Provider 
			value={{ 
				walletAddress, setWalletAddress, 
				bonfidaUsername, setBonfidaUsername,
				compactWalletAddress, setCompactWalletAddress,
				twitterUsername, setTwitterUsername,
				domainCollection, setDomainCollection,
				nftCollection, setNFTCollection,
				tokenCollection, setTokenCollection,
				networkStatus, setNetworkStatus
			}}>
				{children}
		</ProfileContext.Provider>
	);
}

export { ProfileContext, ProfileProvider };