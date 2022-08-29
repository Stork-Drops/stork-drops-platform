import React, { useState, useMemo, createContext, useEffect, Children } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

const ProfileContext = React.createContext(null);

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

	return(
		<ProfileContext.Provider 
			value={{ 
				walletAddress, setWalletAddress, 
				bonfidaUsername, setBonfidaUsername,
				compactWalletAddress, setCompactWalletAddress,
				twitterUsername, setTwitterUsername,
				domainCollection, setDomainCollection,
				nftCollection, setNFTCollection,
				tokenCollection, setTokenCollection
			}}>
				{children}
		</ProfileContext.Provider>
	);
}

export { ProfileContext, ProfileProvider };