import React, { useCallback, useEffect, useState } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

const ValidatorList = () => {
    const [validatorList, setValidatorList] = useState(null)
    const [selectedValidator, setSelectedValidator] = useState(null)
    const { connection } = useConnection();

    //select

    const getValidators = async() => {
        // Get all validators, categorized by current (i.e. active) and deliquent (i.e. inactive)
        const { current } = await connection.getVoteAccounts();
        setValidatorList(current)
        console.log('These are the active validators :', current)
    }

    useEffect(() => {
        getValidators();
    }, [])

    return(
        <>
            Test
        </>
    )
}

export default ValidatorList