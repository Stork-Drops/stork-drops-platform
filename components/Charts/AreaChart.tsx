import axios from 'axios'
import useSWR from 'swr'
import { format } from 'date-fns'
import { AreaChart, Area, Legend, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import moment from 'moment';


//set up fetcher for swr
const fetcher = url => axios.get(url).then(res => res.data) 

const ReusableAreaChart = (props: { data: Array, key: string, xAxis: string, yAxis: string}) => {

    
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
        <div className="p-1 border border-gray-200 rounded-xl">
            <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={props.data}>
                <Area type="monotone" dataKey={`${props.key}`} stroke="#8884d8" fillOpacity={1} fill="url(#solanadefi)" />
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
                {/* <Tooltip
                    content={<CustomTooltip />} >
                </Tooltip> */}
                <XAxis
                    tickLine={false}
                    tickFormatter={formatXAxis}
                    style= {{fontSize: "12px"}}
                    className="text-xs" 
                    dataKey={`${props.xAxis}`}
                />
                <YAxis
                    tickLine={false}
                    style= {{fontSize: "12px"}}
                    tickFormatter={formatNumber}
                    className="text-xs" 
                    dataKey={`${props.yAxis}`}    />
                </AreaChart>
                </ResponsiveContainer>
        </div>
    )
}

export default ReusableAreaChart