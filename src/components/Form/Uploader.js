import React from 'react'
import Dropzone from 'react-dropzone'

const Uploader = ({ children, onDrop, loading }) => {
    return (
        <Dropzone
            onDrop={onDrop}
            accept={['.pdf', '.doc', '.txt', '.docx']}
            multiple={false}
        >
        {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}  className="dropzone">
                <input {...getInputProps()} disabled={loading}/>
                {children}
            </div>
        )}
    </Dropzone>
    )
}

export default Uploader
