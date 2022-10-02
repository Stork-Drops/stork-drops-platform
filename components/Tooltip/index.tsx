import { ProposalState } from '@solana/spl-governance';
import React from 'react'
import { GrCircleInformation } from "react-icons/gr";

const Tooltip = (props) => {
    return(
        <Tooltip content={props.content} placement={props.placement}>
            <GrCircleInformation className="w-5 h-5 ml-1"/>
        </Tooltip>
    )
}

export default Tooltip