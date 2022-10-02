import React from 'react'
import { BsCircleFill } from "react-icons/bs";

const LiveBadge = () => {
    return(
        <div className="flex items-center">
            <span style={{ fontSize: 10 }}className="font-semibold flex items-center animate-pulse bg-green-200 px-2 py-0.5 rounded-xl text-green-500">
                <BsCircleFill className="w-1.5 h-1.5 mr-1.5"/>
                LIVE
            </span>
        </div>
    )
}

export default LiveBadge