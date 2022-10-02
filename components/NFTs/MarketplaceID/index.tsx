import React from 'react'
import Tooltip from '@nextui-org/react'

const MarketplaceID = (props) => {
    const { marketplace } = props
    switch (marketplace) {
        case 'HYPERfwdTjyJ2SCaKHmpF2MtrXqWxrsotYDsTrshHWq8': // Hyperspace
            return <img className="w-5" src="/marketplaces/magiceden.png"/>
        case 'MEisE1HzehtrDpAAT8PnLHjpSSkRYakotTuJRPjTpo8': // Magic Eden
            return <img className="w-5" src="/marketplaces/magiceden.png"/>
        case 'M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K': // Magic Eden
            return <img className="w-5" src="/marketplaces/magiceden.png"/>
        case '3o9d13qUvEuuauhFrVom1vuCzgNsJifeaBYDPquaT73Y': // Opensea
            return <img className="w-5" src="/marketplaces/opensea.png"/>
        case '617jbWo616ggkDxvW1Le8pV38XLbVSyWY8ae6QUmGBAU': // Solsea
            return <img className="w-5" src="/marketplaces/yawww.png"/>
        case '7t8zVJtPCFAqog1DcnB6Ku1AVKtWfHkCiPi1cAvcJyVF': // DigitalEyes
            return <img className="w-5" src="/marketplaces/yawww.png"/>
        case '29xtkHHFLUHXiLoxTzbC7U8kekTwN3mVQSkfXnB1sQ6e': // CoralCube
            return <img className="w-5" src="/marketplaces/yawww.png"/>
        case '5SKmrbAxnHV2sgqyDXkGrLrokZYtWWVEEk5Soed7VLVN': // YAWWW
            return <img className="w-5" src="/marketplaces/yawww.png"/>
        default: 
            return <img className="w-5" src="/marketplaces/yawww.png"/>
    }
}

export default MarketplaceID