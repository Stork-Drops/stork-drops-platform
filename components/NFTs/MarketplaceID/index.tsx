import React from 'react'

const MarketplaceID = (props: { marketplace: any }) => {
    switch (props.marketplace) {
        case 'HYPERfwdTjyJ2SCaKHmpF2MtrXqWxrsotYDsTrshHWq8':
            return 'Hyperspace'
        case 'MEisE1HzehtrDpAAT8PnLHjpSSkRYakotTuJRPjTpo8':
            return <><img src="/marketplaces/magiceden.png"/></>
        case 'E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe':
            return <><img src="/marketplaces/magiceden.png"/></>
        case '3o9d13qUvEuuauhFrVom1vuCzgNsJifeaBYDPquaT73Y':
            return <><img src="/marketplaces/opensea.png"/></>
        case '617jbWo616ggkDxvW1Le8pV38XLbVSyWY8ae6QUmGBAU':
            return 'Solsea'
        case '7t8zVJtPCFAqog1DcnB6Ku1AVKtWfHkCiPi1cAvcJyVF':
            return 'Digital Eyes'
        case '29xtkHHFLUHXiLoxTzbC7U8kekTwN3mVQSkfXnB1sQ6e':
            return 'CoralCube'
        case '5SKmrbAxnHV2sgqyDXkGrLrokZYtWWVEEk5Soed7VLVN':
            return <><img src="/marketplaces/yawww.png"/></>
    }
}

export default MarketplaceID