import { useEffect, useRef } from 'react'
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { saveApps } from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
export default function ManualUpload() {
    const fileInputRef = useRef(null);

    const navigate = useNavigate()
    const uploadFile = () => {
        console.log("file ", fileInputRef);
    };
    const classes = useStyles();
    const [appName, setAppName] = useState('');
    const [starRating, setStarRating] = useState(0);

    const handleAppNameChange = (event) => {
        setAppName(event.target.value);
    };

    const handleStarRatingChange = (event, newValue) => {
        setStarRating(newValue);
    };
    useEffect(() => {
        // This useEffect will run after the state has been updated
        console.log("starRating ", starRating);
    }, [starRating]);


    const handleUpload = async () => {
        var appName = document.getElementById("appName").value
        var appType = document.getElementById("appType").value
        var description = document.getElementById("description").value
        var devCompanyName = document.getElementById("devCompanyName").value
        var downloadLink = document.getElementById("downloadLink").value
        var imageName = ""
        if (!appName) {
            toast.error('Please Enter App Name!', {
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
        try {
            const headers = {
                'Content-Type': 'application/json',
                'zoneid': 'Asia/Kolkata',
            };
            const requestData = JSON.stringify({
                appName,
                appType,
                description,
                devCompanyName,
                imageName,
                downloadLink,
                starRating
            });
            // Implement your upload logic here
            const response = await axios.post(saveApps, requestData, { headers })
            console.log('Uploading...');
            if (response.status === 200) {
                toast.success('App Created successfully!', {
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
                toast.error('Something went wrong!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return
            }
            console.log('response ', response)

        } catch (error) {
            console.log("error ", error);
        }

    };


    const [selectedFile, setSelectedFile] = useState(null)
    const selectDocumentHandler = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64Data = event.target.result;
                console.log('Base64 data:', base64Data);
            };

            reader.readAsDataURL(selectedFile);
        }
    };
    return (
        <div style={{ width: "100%" }}>
            <div className='col-12 col-lg-12 col-sm-12 justify-content-center align-item-center d-flex '>
                <div className=" maualUpload p-4 rounded border-box">
                    <h2 className="mb-4">Create App</h2>
                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label >App Name</label>
                        </div>
                        <div className="col-12 col-sm-6">
                            <input type="text" className="form-control" style={{ border: "1px solid #000" }} id="appName" />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label >App Type</label>
                        </div>
                        <div className="col-12 col-sm-6">
                            <input type="text" className="form-control" style={{ border: "1px solid #000" }} id="appType" />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label >Description</label>
                        </div>
                        <div className="col-12 col-sm-6">
                            <input type="text" className="form-control" style={{ border: "1px solid #000" }} id="description" />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label>Devlopment Company</label>
                        </div>
                        <div className="col-12 col-sm-6">
                            <input type="email" className="form-control" style={{ border: "1px solid #000" }} id="devCompanyName" />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label>Downlaod Link</label>
                        </div>
                        <div className="col-12 col-sm-6">
                            <input type="text" className="form-control" style={{ border: "1px solid #000" }} id="downloadLink" />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label>Select a Logo to upload:</label>
                        </div>
                        <div className="col-12 col-sm-6">
                            <input type="file" id="file-upload" name="Logo Uplaod" accept="image/*" onChange={selectDocumentHandler} ref={fileInputRef} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.formContainer}>
                <Rating
                    name="star-rating"
                    value={starRating}
                    onChange={handleStarRatingChange}
                    className={classes.rating}
                />
                {/* Add any additional fields you want here */}
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.uploadButton}
                    onClick={handleUpload}
                >
                    Upload
                </Button>
            </div>
        </div>
    )
}
