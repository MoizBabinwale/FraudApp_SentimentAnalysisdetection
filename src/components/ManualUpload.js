import { useRef } from 'react'
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';

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

    const handleUpload = () => {
        // Implement your upload logic here
        console.log('Uploading...');
    };
    return (
        <div>
            <div className='col-12 col-lg-12 ol-sm-12 justify-content-center align-item-center d-flex '>
                <div className=" maualUpload p-4 rounded border-box">
                    <h2 className="mb-4">Manul Review</h2>
                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label >App Name</label>
                        </div>
                        <div className="col-12 col-sm-6">
                            <input type="text" className="form-control" id="username" />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label >Review</label>
                        </div>
                        <div className="col-12 col-sm-6">
                            <input type="text" className="form-control" id="userid" />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label>comments</label>
                        </div>
                        <div className="col-12 col-sm-6">
                            <input type="email" className="form-control" id="email" />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label >Password</label>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label>Contact Number</label>
                        </div>
                        <div className="col-12 col-sm-6">
                            <input type="number" className="form-control" id="number" />
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
