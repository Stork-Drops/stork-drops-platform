import React, { useState, useEffect } from 'react'
import DefiCard from '@components/DeFi/DefiCard'

const DefiList = () => {
    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-auto gap-4">
                <DefiCard address='SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp' defiDescription='The autonomous interest rate machine for lending on Solana.'/>
                <DefiCard address='MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac' defiDescription='Long &amp; short everything.'/>
                <DefiCard address='5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm' defiDescription='The best risk-free yields on Solana.'/>
                <DefiCard address='mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So' defiDescription='Stake Solana without locking in your funds.'/>
                <div className="p-3 border border-green-500 font-semibold text-lg text-green-500 rounded-xl">
                    Want a specific protocol integrated into Stork Drops? Let us know.
                </div>
            </div>
        </>
    )
}

export default DefiList;