import '@splidejs/react-splide/css/core';
import React, { useContext, useState, useEffect } from "react"
import Head from 'next/head';
import Link from 'next/link'
import { format } from 'date-fns'
import Navigation from "@components/Navigation"
import AppBar from "@components/AppBar"
import NewsFeed from "@components/NewsFeed";
import { Container, Grid, Row, Col, Spacer, Loading } from '@nextui-org/react';
import { fetchContent } from '../../utils/fetchContentfulContent'
import RecentDropsCard from '@components/RecentDropsCard'
import { ProfileContext } from "../../context/ProfileContext"
import MarketCapFeed from "@components/MarketCapFeed"
//import certifiedRealms from "/public/realms/mainnet-beta.json"
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { HiArrowRight, HiArrowLeft, HiLink } from "react-icons/hi";
import { BsTwitter } from "react-icons/bs";
import { HiOutlineLink, HiOutlinePhotograph } from "react-icons/hi";
import Discovery from "@components/Discovery"

<div>
    <Splide 
        hasTrack={false}
        options={{
            arrows: true,
            perPage: 3,
            rewind: true,
            gap   : '1rem',
        }}
        onMoved={ ( splide, newIndex ) => {
            // eslint-disable-next-line
            console.log( 'moved', newIndex );
            // eslint-disable-next-line
            console.log( 'length', splide.length );
        }}
        aria-label="DAOs">

        <div className="flex items-center justify-between my-10">
            <div>
                <div className="flex items-center">
                    <h2 className="text-4xl font-semibold">DAOs</h2>
                    <Link href="/daos">
                        <span className="cursor-pointer ml-2.5 flex items-center p-2 bg_sunrise rounded-xl text-white font-semibold text-xs">
                            View all <HiArrowRight className="ml-1"/>
                        </span>
                    </Link>
                </div>
                <p className="text-sm bg-sunrise">Decentralized Autonomous Organizations</p>
            </div>
        
            <div className="splide__arrows">
                <button className="splide__arrow splide__arrow--prev text-xl border border-gray-300 p-2 rounded-full mr-2">
                    <HiArrowLeft/>
                </button>
                <button className="splide__arrow splide__arrow--next text-xl border border-gray-300 p-2 rounded-full">
                    <HiArrowRight/>
                </button>
            </div>
        </div>   

        <div>
        <SplideTrack>
            {certifiedRealms && certifiedRealms.length > 0 ? (
                certifiedRealms.map((verifiedRealms) => (
                <SplideSlide>
                    <Link href={`/daos/#${verifiedRealms.symbol}`}>
                        <div key={verifiedRealms.displayName} className="cursor-pointer w-full border border-gray-300 hover:border-gray-400 rounded-xl p-4 h-40 bg-gray-50">
                            <Row align="center">
                                <Col span="3">
                                    <img className="w-14 p-1 rounded-full bg-gray-100 border border-gray-200" 
                                    src={
                                        verifiedRealms.ogImage ? verifiedRealms.ogImage : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.n_qNHbNptQi-kGTQRFnmoAAAAA%26pid%3DApi&f=1"
                                    } 
                                    alt="DAO-banner" />
                                </Col>
                                <Col className="text-dracula">
                                    <p className="text-sm">{verifiedRealms.symbol}</p>
                                    <p className="text-normal font-semibold">{verifiedRealms.displayName}</p>
                                </Col>
                            </Row>
                            <Spacer y={0.5}/>
                            <Row>
                                <div className="font-semibold text-normal">
                                    {verifiedRealms.twitter ? 
                                        <a target="_blank" href={`https://twitter.com/${verifiedRealms.twitter}`} className="flex items-center justify-center text-white bg-twitter-blue p-2 rounded-full">
                                            <BsTwitter/>
                                        </a>
                                        : null
                                    }
                                    </div>
                                    <div className="font-semibold text-normal ml-2">
                                    {verifiedRealms.website ? 
                                        <a target="_blank" href={verifiedRealms.website} className="flex items-center justify-center text-dracula bg-gray-300 p-2 rounded-full">
                                            <HiOutlineLink/>
                                        </a>
                                        : null
                                    }
                                </div>
                            </Row>
                        </div>
                    </Link>
                </SplideSlide>
        )))
        : (
            <Loading/>
        )}
        </SplideTrack>
        </div>
    </Splide>
</div>   