//import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import DarkModeSwitch from '../components/DarkModeSwitch'
import { Link } from '@nextui-org/react';
import { FiArrowRight } from "react-icons/fi";

const Navigation = () => {
    return(
        <>
            <div className="flex justify-between my-5">
                <p className="text-4xl font-extrabold">SDrops</p>
                <div className="flex items-center justify-center">
                    <DarkModeSwitch/>
                    <Link  
                        className="w-max border bg-indigo-700 text-white p-2 rounded-full text-extrabold"
                        href="#">
                        <span className="mx-2 text-sm flex items-center">Join Discord <FiArrowRight className="ml-2"/></span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navigation;