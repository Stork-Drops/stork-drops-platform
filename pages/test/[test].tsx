import React from "react"
import { useRouter } from 'next/router'
import { useConnection } from '@solana/wallet-adapter-react';


const Test = () => {
    const router = useRouter()
    const { test } = router.query
    const { connection } = useConnection();

    console.log(test)

    return (
        <div>
        <h1>Test</h1>
        </div>
    )
}

export default Test