import { Link } from '@nextui-org/react';
import { FiArrowRight } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";

const JoinTwitter = () => {
    return(
        <Link  
            className="w-max bg-indigo-700 text-white p-2 rounded-full text-extrabold"
            href="#">
            <span className="mx-1 text-sm flex items-center"><FaTwitter className="mx-2"/> Join Twitter <FiArrowRight className="ml-2"/></span>
        </Link>
    )
}

export default JoinTwitter