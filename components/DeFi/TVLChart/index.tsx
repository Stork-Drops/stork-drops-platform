import axios from 'axios'
import useSWR from 'swr'
import { format } from 'date-fns'
import { AreaChart, Area, Legend, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import moment from 'moment';

//set up fetcher for swr
const fetcher = url => axios.get(url).then(res => res.data) 

const SolanaTVLChart = () => {
    const { data, error } = useSWR('https://api.llama.fi/charts/Solana', fetcher);
    if (error) return <p>There was an error bro</p>
    if (!data) return <p>Loading...</p>

    //get currentTVL from data by taking the last value and returning totalLiquidityUSD
    const currentTVL = data[data.length - 1].totalLiquidityUSD
    
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
                <span className="text-sm">{formatDollar(currentTVL)}</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data}>
                <Area type="monotone" dataKey="totalLiquidityUSD" stroke="#8884d8" fillOpacity={1} fill="url(#solanadefi)" />
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
                    dataKey="date"
                />
                <YAxis
                    tickLine={false}
                    style= {{fontSize: "12px"}}
                    tickFormatter={formatNumber}
                    className="text-xs" 
                    dataKey="totalLiquidityUSD"/>
                </AreaChart>
                </ResponsiveContainer>
        </div>
    )
};

export default SolanaTVLChart;