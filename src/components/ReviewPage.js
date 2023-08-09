import React, { useEffect, useState } from 'react'
import { appList, saveReview } from '../api';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextareaAutosize, Button } from '@mui/material';

function ReviewPage() {

    const [app, setApp] = useState([]);
    const [appName, setAppName] = useState("");
    const [appId, setAppId] = useState("");
    const [selectedApp, setSelectedApp] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        var isLogin = sessionStorage.getItem("isLogin")
        if (!isLogin) {
            navigate('/', { replace: true });
        }
        getAppList()
    }, [navigate])
    const getAppList = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'zoneid': 'Asia/Kolkata',
            };
            const response = await axios.get(appList, { headers })
            console.log('List ', response);
            if (response.status === 200) {
                console.log(response);
                setApp(response.data)
            }
            else {
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
    }

    const handleAppChange = (event) => {
        var selectedApp = (event.target.value);
        const selectedAppName = app.find((appItem) => appItem.id === selectedApp)?.appName
        setAppName(selectedAppName)
        setAppId(selectedApp)
    };

    const handleSubmit = async () => {
        var reviewText = document.getElementById("reviewText").value
        var user = JSON.parse(sessionStorage.getItem("userDetails"))
        console.log(user);
        var userId = user.id
        var userName = user.userName
        var reviewData = reviewText
        const reviewData1 = JSON.stringify({
            reviewData,
            userName,
            userId,
            appId
        })
        try {
            const headers = {
                'Content-Type': 'application/json',
                'zoneid': 'Asia/Kolkata',
            };
            const response = await axios.post(saveReview, reviewData1, { headers })
            console.log('List ', response);
            if (response.status === 200) {
                toast.success('Review Uploaded successfully!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                reviewText = ''
                setAppId("")
            }
            else {
                toast.error('Something Went wrong!', {
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

        } catch (error) {
            console.log("error ", error);
        }
    }
    return (
        <div className="row justify-content-center align-items-center p-4">
            <div className="col-lg-6 col-md-8 col-sm-12 mt-3">
                <div className="justify-content-center align-items-center d-flex">
                    <h3> Fraud app detection using sentiment analysis </h3>
                </div>
                <hr />
                <div className='col-lg-12 col-md-12 col-sm-12 mt-4 justify-content-center align-items-center d-flex'>
                    Enter your Review
                </div>
                <div className='col-lg-12 col-md-12 col-sm-12 mt-4 justify-content-center align-items-center d-flex'>
                    <FormControl fullWidth variant="outlined" style={{ width: "50%" }}>
                        <InputLabel>Select App</InputLabel>
                        <Select value={appId} onChange={handleAppChange} label="Select App">
                            {app.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.appName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className='col-lg-12 col-md-12 col-sm-12 mt-4'>
                    <div className="input-group">
                        <TextareaAutosize
                            className="form-control"
                            aria-label="With textarea"
                            placeholder="Type your Review here..."
                            id="reviewText"
                            style={{ border: "1px solid #000" }}
                        />
                    </div>
                </div>
                <div className='justify-content-center align-items-center d-flex mt-4'>
                    <Button variant="contained" color="primary" onClick={handleSubmit} style={{ width: "10%" }} className="mt-4">
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default ReviewPage
