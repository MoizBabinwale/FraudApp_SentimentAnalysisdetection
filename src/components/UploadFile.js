import { useRef } from 'react'
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import ManualUpload from './ManualUpload';
import { uploadCSV } from '../api';
import axios from 'axios';
import { Form } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
    rating: {
        marginBottom: theme.spacing(2),
    },
    uploadButton: {
        marginBottom: theme.spacing(2),
    },
}));
export default function UploadFile() {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null)
    const classes = useStyles();
    const [appName, setAppName] = useState('');
    const [starRating, setStarRating] = useState(0);

    const handleAppNameChange = (event) => {
        setAppName(event.target.value);
    };

    const handleStarRatingChange = (event, newValue) => {
        setStarRating(newValue);
    };
    // const handleFileChange = (event) => {
    //     const selectedFile = event.target.files[0];
    //     if (selectedFile) {
    //         console.log('Selected file:', selectedFile);
    //     }
    // };


    const selectDocumentHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            console.log('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        const headers = {
            'Content-Type': 'multipart/form-data',
            'zoneid': 'Asia/Kolkata',
        };
        try {
            const response = await axios.post(uploadCSV, formData, { headers })
            console.log(response);
        } catch (error) {
            console.error('Error:', error.message);

        }
    }


    return (
        <div className='col-12 col-lg-12 ol-sm-12 d-flex justify-content-center ailgn-item-center'>
            <div className="upload-container">
                <form enctype="multipart/form-data" className="upload-form">
                    <label for="file-upload">Select a file to upload:</label>
                    <input type="file" id="file-upload" name="fileToUpload" accept=".csv" onChange={selectDocumentHandler} ref={fileInputRef} />
                    <button type="submit" className="upload-button mt-3 " onClick={handleUpload}>Upload</button>
                </form>
            </div>
        </div>
    )
}
