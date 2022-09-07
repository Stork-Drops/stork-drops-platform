import React, {useEffect, useState} from "react";
import useSWR from "swr";
import sumBy from 'lodash/sumBy'
import { Connection } from '@solana/web3.js';
import { BsCircleFill } from "react-icons/bs";
import { Tooltip, Loading } from '@nextui-org/react'
import { ProfileContext } from '@context/ProfileContext';

const tpsAlertThreshold = 1000
const tpsWarningThreshold = 1300

const NetworkStatus = () => {
    const { networkStatus, setNetworkStatus } = React.useContext(ProfileContext);
    const [status, setStatus] = useState("")
    const [slot, setSlot] = useState("" || null)
    //const connection = useConnection();
    const connection = new Connection("https://ssc-dao.genesysgo.net/", 'confirmed');

    const getRecentPerformance = async () => {
    try {
        const samples = 2
        const response = await connection.getRecentPerformanceSamples(samples);
        setSlot(response[0].slot)
        setNetworkStatus(response[0].slot)
        const totalSecs = sumBy(response, 'samplePeriodSecs')
        const totalTransactions = sumBy(response, 'numTransactions')
        const tps = totalTransactions / totalSecs
    
        if (tps < tpsWarningThreshold) {
            setStatus("animate-pulse text-yellow-500 fill-yellow-500")
        } 
        if (tps < tpsAlertThreshold) {
            setStatus("animate-pulse text-red-500 fill-red-500")
        }
        if (!tps){
            setStatus("animate-pulse text-green-500 fill-green-500")
        }
        else {
            setStatus("animate-pulse text-green-500 fill-green-500")
        }
        } catch {
            console.log('Unable to fetch TPS')
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getRecentPerformance();
        }, 2000);
        return () => clearInterval(interval);
      }, []);

    return(
        <>
            <Tooltip 
                placement="topStart"
                className="" 
                content={
                    <div className="w-full">
                        <p>The most recent slot number on the network.</p>
                    </div>
                }
                hideArrow>
                <div className="flex items-center justify-between w-fit">
                    <BsCircleFill 
                        style={{
                            marginRight: "0.2rem",
                            fontSize: "0.3rem",
                        }}
                        className={status}
                    />
                    <div 
                        style={{
                            fontSize: "0.7rem",
                        }}
                        className={status}>
                        {networkStatus ? networkStatus : <Loading size="xs"/>}
                    </div>
                </div>
            </Tooltip>
        </>
    )
}

export default NetworkStatus;