import React from "react"

const Tag = ({ cryptoProject }) => {
    const { projectCategory } = cryptoProject.fields
    return(
        <div className="text-xs bg-red-200 text-white">
            {projectCategory}
        </div>
    )
}

export default Tag