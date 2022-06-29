import React from 'react'
import Link from "next/link"
import { format } from 'date-fns'
import { FiCalendar } from "react-icons/fi";
import { Modal, Text, Row, Button } from '@nextui-org/react';

const CryptoProjectCard = ({ cryptoProject }) => {
    const { projectTitle, projectDescription, projectDropDate, projectCategory, projectThumbnail, projectSlug } = cryptoProject;
    const dropDate = new Date(projectDropDate);
    // modal open/close states + handlers
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    const CryptoProjectModal = () => {
        return(
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}>
                <Modal.Body>
                <img
                    className="rounded-xl"
                    src={projectThumbnail.url}
                    alt={projectTitle}
                />
                <p className="text-3xl font-semibold">{projectTitle}</p>
                <Row justify='space-between' align='center'>
                    <div className="flex items-center space-between my-1 text-dracula text-sm font-semibold">
                        <span className="">{format(dropDate, 'M.dd.yyyy')}</span>
                        <span className="mx-0.5">,</span>
                        <span className="">{format(dropDate, 'h:mm a')}</span>
                    </div> 
                </Row>
                <Row justify="space-between">
                    <Text size={14}>{projectDescription}</Text>
                </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                        <div className="">
                            {projectCategory.map(projectCategories => (
                                <span key={projectCategories} style={{ fontSize: 10 }} className="mr-1 ml-0.5 px-2 py-1 lowercase italic text-xs font-semibold border border-clean-blue text-clean-blue rounded-full">
                                    {projectCategories}
                                </span>
                            ))} 
                        </div>
                    </Row>
                </Modal.Footer>
            </Modal>
        )
    }



    return(
    <>
        <CryptoProjectModal/>
            <div className="cursor-pointer" onClick={handler}>
                <img
                    className="rounded-xl"
                    src={projectThumbnail.url}
                    alt={projectTitle}
                />
                <div className="my-3.5">
                    <div className="flex items-center space-between my-1 text-dracula text-sm font-semibold">
                        <span className="mr-1 text-white bg-clean-blue rounded-md p-1"><FiCalendar/></span>
                        <span className="">{format(dropDate, 'M.dd.yyyy')}</span>
                        <span className="mx-0.5">,</span>
                        <span className="">{format(dropDate, 'h:mm a')}</span>
                    </div> 
                    <h2 className="my-1.5 font-extrabold text-2xl text-dracula">{projectTitle}</h2>
                    <div className="">
                        {projectCategory.map(projectCategories => (
                            <span key={projectCategories} style={{ fontSize: 10 }} className="mr-1 px-2 py-1 lowercase italic text-xs font-semibold border border-clean-blue text-clean-blue rounded-full">
                                {projectCategories}
                            </span>
                        ))} 
                    </div>
                </div>
            </div>
    </>
    )
}

export default CryptoProjectCard;