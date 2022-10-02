import React from 'react'

const SolanaFM = (props) => {
    const { width, height } = props
    return(
        <img style={{ width: props.width, height: props.height }} className="mr-1" src="/logos/solana-fm.svg"/>
    )
}

export default SolanaFM