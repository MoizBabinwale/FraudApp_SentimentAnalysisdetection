
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UploadFile from './UploadFile';
import ManualUpload from './ManualUpload';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    button: {
        color: '#fff', // Text color
        padding: "10px",
        borderRadius: "20px",
        height: "45px", // Add padding,
        cursor: "pointer"

    },
}));

function Upload() {
    const [isManual, setIsManul] = useState(true)
    const classes = useStyles();
    const handleButtonClick = () => {
        setIsManul(!isManual)
    }



    const navigate = useNavigate()

    useEffect(() => {
        var isAdmin = sessionStorage.getItem("isAdmin")
        if (!isAdmin) {
            navigate('/', { replace: true });
        }
        var isLogin = sessionStorage.getItem("isLogin")
        if (!isLogin) {
            navigate('/', { replace: true });
        }

    }, [navigate])

    return (
        <div className="m-3 row d-flex">
            <div
                className={classes.button}
                style={{
                    background: isManual ? "#228a25" : "grey",
                    margin: "10px",
                    width: "129px", // Change order based on isManual state
                }}
                onClick={() => handleButtonClick(true)}
            >
                Manual Upload
            </div>
            {/* Panel for "Upload File" */}
            <div
                className={classes.button}
                style={{
                    background: isManual ? "grey" : "#228a25",
                    margin: "10px",
                    width: "101px",// Change order based on isManual state
                }}
                onClick={() => handleButtonClick(false)}
            >
                Upload File
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
                {isManual ? <ManualUpload /> : <UploadFile />}
            </div>
        </div>
    )
}

export default Upload
