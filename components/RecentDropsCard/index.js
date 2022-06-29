import React from 'react'
import { Spacer } from '@nextui-org/react';
import { format } from 'date-fns'
import { AiOutlineFieldTime } from "react-icons/ai";
import { FiCalendar } from "react-icons/fi";

const RecentDropsCard = ({ cryptoProject }) => {
    const { projectTitle, projectDropDate, projectCategory, projectThumbnail } = cryptoProject;
    const dropDate = new Date(projectDropDate)

    return(
    <div className="">
            <img
                className="rounded-xl shadow-md object-cover"
                src={projectThumbnail.url}
                alt={projectTitle}
            />
            <div className="my-3.5">
                <h2 className="font-extrabold text-2xl text-dracula">{projectTitle}</h2>
                <div className="flex items-center space-between my-1 text-dracula">
                    <span className="text-sm">{format(dropDate, 'M.dd.yyyy')}</span>
                    <Spacer x={0.3}/>
                    <span className="text-sm">{format(dropDate, 'h:mm a')}</span>
                </div> 
            </div>
    </div>
    )
}

export default RecentDropsCard;