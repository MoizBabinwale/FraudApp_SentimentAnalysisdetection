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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import excelFile from "../reviewAppSheet.csv"
// import XLSX from 'xlsx';

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
    const navigate = useNavigate()

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
            toast.error('Please select a file to upload!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        var file = formData
        const headers = {
            'Content-Type': 'multipart/form-data',
            'zoneid': 'Asia/Kolkata',
        };
        try {
            const response = await axios.post(uploadCSV, file, { headers })
            console.log(response);
            if (response) {
                toast.success('Csv Uploaded successfully!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate("/")
                }, 2500);
            } else {
                toast.success('Something went wrong!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return
            }
        } catch (error) {
            console.error('Error:', error.message);

        }
    }

    const handleDownload = () => {

        const link = document.createElement('a');
        link.href = excelFile;
        link.download = 'downloaded-excel-file.xlsx';
        link.click();
    };
    return (
        <div className='col-12 col-lg-12 ol-sm-12 d-flex justify-content-center ailgn-item-center'>
            <div className="upload-container">
                <div>
                    <h1>Get Formated Excel File</h1>
                    <button onClick={handleDownload} style={{ marginLeft: "100px", borderRadius: "20px", backgroundColor: "black", color: "white" }}>Download Demo File</button>
                </div>
                <form enctype="multipart/form-data" className="upload-form">
                    <label for="file-upload">Select a file to upload:</label>
                    <input type="file" id="file-upload" name="fileToUpload" accept=".csv" onChange={selectDocumentHandler} ref={fileInputRef} />
                    <button type="submit" className="upload-button mt-3 " onClick={handleUpload}>Upload</button>
                </form>
            </div>
        </div>
    )
}
