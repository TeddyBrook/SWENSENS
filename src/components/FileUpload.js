import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUploadChange = () => {
        if (!file) {
            alert('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        axios.post('http://localhost:8081/upload', formData)
            .then(res => {
                if (res.data.Status === "Success") {
                    console.log("Upload Successful");
                } else {
                    console.log("Upload Failed");
                }
            })
            .catch(err => {
                console.error('Error during file upload:', err);
                alert('An error occurred during file upload.');
            });
    };

    return (
        <div className="name-container">
            <label className="title1-name"> 
                รูปภาพ <span className="required"> * </span> 
            </label>
            <input type="file" onChange={handleFileChange} />
            <button className="register-user" onClick={handleUploadChange}> 
                บันทึก 
            </button>
        </div>
    );
};

export default FileUpload;
