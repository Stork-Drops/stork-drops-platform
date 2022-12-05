import React, { Fragment } from 'react'
import Link from 'next/link';

const discoveryItems = [
    {
        discoveryTitle: 'DAOs',
        discoverySlug: '/daos',
        discoveryImageSrc: '',
        discoveryDescription: 'Decentralized autonomous organizations.',
    },
    {
        discoveryTitle: 'NFTs',
        discoverySlug: '/nfts',
        discoveryImageSrc: '',
        discoveryDescription: 'Non-fungible tokens.',
    },
    {
        discoveryTitle: 'DeFi',
        discoverySlug: '/defi',
        discoveryImageSrc: '',
        discoveryDescription: 'Decentralized finance.',
    }
]

const Discovery = () => {
    return(
        <div className="my-5 grid grid-cols-1 grid-rows-1 md:grid-cols-3 md:grid-rows-1 items-center gap-4">
            {discoveryItems.map((item, index) => (
                <Link key={index} href={item.discoverySlug}>
                    <div className="cursor-pointer h-48 rounded-xl w-full p-4 border hover:border-gray-300 relative overflow-hidden">
                        <div className="absolute -right-16 -bottom-16 h-52 w-52 rounded-full border border-gray-200">
                            <img 
                                alt={item.discoveryTitle} 
                                src="/daos-banner.png" 
                                className="object-fill"
                            />
                        </div>
                        <div className="w-4/6">
                            <p className="text-4xl font-medium">
                                {item.discoveryTitle}
                            </p>
                            <p className="text-gray-400 text-sm">
                                {item.discoveryDescription}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Discovery;