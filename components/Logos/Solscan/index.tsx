import React from 'react'

const SolanaLogo = (props) => {
    const { width, height } = props
    return(
        <img style={{ width: props.width, height: props.height }} className="mr-1" src="/solana-logo.svg"/>
    )
}

export default SolanaLogo