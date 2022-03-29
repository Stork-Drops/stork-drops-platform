import { Link } from '@nextui-org/react';
import { FiArrowRight } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";

const JoinDiscord = () => {
    return(
        <Link  
            className="w-max bg-indigo-700 text-white p-2 rounded-full text-extrabold"
            href="#">
            <span className="mx-1 text-sm flex items-center"><FaDiscord className="mx-2"/> Join Discord <FiArrowRight className="ml-2"/></span>
        </Link>
    )
}

export default JoinDiscord