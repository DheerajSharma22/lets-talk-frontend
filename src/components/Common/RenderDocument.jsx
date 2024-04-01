import React from 'react'
import { FaFileAlt } from "react-icons/fa";

const RenderDocument = ({ file, url, fileName }) => {

    switch (file) {
        case "video":
            return <video src={url} width={200} />


        case "audio":
            return <audio src={url} width={200} />


        case "image":
            return <img src={url} width={200} />


        default:
            // Render a .docx icon with default styles
            return <div className='flex items-center gap-2'>
                <FaFileAlt className='text-2xl'/>
                <p>{fileName}</p>
            </div>

    }
}

export default RenderDocument
