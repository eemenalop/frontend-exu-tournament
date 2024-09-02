import React from 'react'

const PresentationPage = ({ imageURL }) => {
    return (
        <div className="relative h-60 bg-gray-100">
            <img
                src={imageURL}
                alt="Presentation"
                className="absolute inset-0 w-full h-full object-cover"
            />
        </div>
    )
}

export default PresentationPage