//import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import DarkModeSwitch from '../components/DarkModeSwitch'
import { Link } from '@nextui-org/react';
import { FiArrowRight } from "react-icons/fi";
import JoinDiscord from "../components/JoinDiscord"

const Navigation = () => {
    return(
        <>
            <div className="flex justify-between my-5">
                <p className="text-4xl font-extrabold">SDrops</p>
                <div className="flex items-center justify-center">
                    <DarkModeSwitch/>
                    <JoinDiscord/>
                </div>
            </div>
        </>
    )
}

export default Navigation;