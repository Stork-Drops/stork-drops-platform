import axios from 'axios'
import useSWR from 'swr'
import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { AreaChart, Area, Legend, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import moment from 'moment';

//set up fetcher for swr
const fetcher = url => axios.get(url).then(res => res.data) 

const TokenPriceChart = (props: { mintAddress: any }) => {
    const { data: oneDayPrice } = useSWR(`https://api.coingecko.com/api/v3/coins/solana/contract/${props.mintAddress}/market_chart/?vs_currency=usd&days=1`, fetcher);
    // const { data: sevenDayPrice } = useSWR(`https://api.coingecko.com/api/v3/coins/solana/contract/${mintAddress}/market_chart/?vs_currency=usd&days=7`, fetcher);
    // const { data: thirtyDayPrice } = useSWR(`https://api.coingecko.com/api/v3/coins/solana/contract/${mintAddress}/market_chart/?vs_currency=usd&days=30`, fetcher);

    const [formattedOneDayPrice, setFormattedOneDayPrice] = useState([])
    
    function formatDollar(num) {
        var p = num.toFixed(2).split(".");
        return ["$", p[0]
            .split("")
            .reverse()
            .reduce(function(acc, num, i) {
                return num + (i && !(i % 3) ? "," : "") + acc;
            }),]
            .join("");
    }

    //a function that takes in a number as a parameter and returns the number as a string plus m if million and b if billion
    const formatNumber = (num) => {
        if (num >= 1000000000) {
            return `${formatDollar(num/1000000000)}B`
        } else if (num >= 1000000) {
            return `${formatDollar(num/1000000)}M`
        } else {
            return `${formatDollar(num)}`
        }
    }

    //a function that takes oneDayPrice data and returns an array of objects with the date as a key value pair and set it to x-axis 
    const formatOneDayPrice = (oneDayPrice) => {
        const formattedOneDayPrice = oneDayPrice.map((price) => {
            return {
                date: moment(price.date).format('MMM DD')
            }
        }).reverse()
    }

    //a function that takes oneDayPrice data and returns an array of objects with the price as a key value pair and set it to x-axis 
    const formatMarketcap = (oneDayPrice) => {
        const formattedOneDayPriceData = oneDayPrice.map((price) => {
            return {
                price: price.value
            }
        }).reverse()
    }
    

    

    const formatXAxis = (tickFormat) => {
        return moment.unix(tickFormat).format("MMM YY");
    };

    const formatLabelDate = (tickFormat) => {
        return moment.unix(tickFormat).format("MMM YYYY");
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
          return (
            <div style={{
                    backgroundColor: '#fff',
                    border: "1px solid #ccc",
                    padding: '5px',
                }} 
                className="rounded-md shadow-md border-0">
              <p className="text-sm">{formatLabelDate(label)}</p>
              <p className="text-sm">{formatDollar(payload[0].value)}</p>
            </div>
          );
        }
        return null;
      };

    return(
        <div className="p-3 border border-gray-200 rounded-xl">
            <div className="mb-2.5 text-left">
                <h3 className="text-normal font-semibold">Total Value Locked (TVL)</h3>
                <span className="text-sm">CURRENT TVL AMOUNT $$$</span>
            </div>

            

            

            <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={oneDayPrice}>
                <Area type="monotone" dataKey={formatMarketcap} stroke="#8884d8" fillOpacity={1} fill="url(#solanadefi)" />
                <defs>
                    <linearGradient id="solanadefi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8884d8" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#8884d8" stopOpacity={0.1}/>
                    </linearGradient>
                </defs>
                <CartesianGrid 
                    stroke="#ccc" 
                    strokeDasharray="5 5" 
                    vertical={false}
                />
                <Tooltip
                    content={<CustomTooltip />} >
                </Tooltip>
                <XAxis
                    tickLine={false}
                    tickFormatter={formatXAxis}
                    style= {{fontSize: "12px"}}
                    className="text-xs" 
                    dataKey={formatOneDayPrice}
                />
                <YAxis
                    tickLine={false}
                    style= {{fontSize: "12px"}}
                    tickFormatter={formatNumber}
                    className="text-xs" 
                    dataKey={formatMarketcap}/>
                </AreaChart>
                </ResponsiveContainer>
        </div>
    )
};

export default TokenPriceChart;