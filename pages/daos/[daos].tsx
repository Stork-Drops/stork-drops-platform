import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
import React, { Fragment, useEffect, useCallback} from 'react'
import { formatWalletAddress, formatDollar, formatAbbreviationNumber }  from '@utils/formatters';
import axios from 'axios'
import useSWR from 'swr'
import { getRealms, getAllProposals } from '@solana/spl-governance';
import { Connection, PublicKey } from '@solana/web3.js';
import { useConnection } from '@solana/wallet-adapter-react';
import Navigation from '@components/Navigation';
import toast from 'react-hot-toast';

//Set up fetcher for SWR
const fetcher = url => axios.get(url).then(res => res.data) 

const SelectedDAOPage = ({ data }) => {
    const { connection } = useConnection();
    const router = useRouter();
    const { daos  } = router.query;
    const DAOpubkey = daos as string;
    const selectedRealm = new PublicKey(DAOpubkey);
    const [DAOproposals, setDAOproposals] = React.useState([]);

    // SPL GOVERNANCE PROGRAM ID
    const SPLGovernanceProgramId = new PublicKey('GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw');

    console.log('These is the DAO data : ', data);

    const fetchProposals = async() => {
        const proposals = await getAllProposals(connection, SPLGovernanceProgramId, selectedRealm);
        //setDAOproposals(proposals);
        console.log('Recent proposals:', proposals)
    }

    useEffect(() => {
        fetchProposals();
    }, [])

    return(
        <>
            <Navigation/>
            This is your selected DAO: {daos}
        </>
    )
}

export async function getServerSideProps(context) {
    const connection = new Connection(process.env.NEXT_PUBLIC_QUICKNODE_URL, 'recent');
    const { daos } = context.query;
    const selectedRealm = new PublicKey(daos);
    const res = await getRealms(connection, selectedRealm)
    const data = await res;

    return { 
        props: { 
            data 
        } 
    };
}

export default SelectedDAOPage;