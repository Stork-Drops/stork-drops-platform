import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Navigation = () => {
    return(
        <>
            <div className="flex justify-between my-5">
                <p className="text-4xl font-extrabold">SDrops</p>
                <WalletMultiButton/>
            </div>
        </>
    )
}

export default Navigation;