
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UploadFile from './UploadFile';
import ManualUpload from './ManualUpload';

const useStyles = makeStyles((theme) => ({
    button: {
        color: '#fff', // Text color
        padding: theme.spacing(2),
        borderRadius: "20px",
        height: "60px", // Add padding,
        cursor: "pointer"

    },
}));

function Upload() {
    const [isManual, setIsManul] = useState(false)
    const classes = useStyles();

    return (
        <div className="m-3 row d-flex"  >
            <div className={classes.button} style={{ background: isManual ? "#228a25" : "grey", margin: "10px", width: "147px" }} onClick={() => setIsManul(true)}>
                Manual Upload
            </div>
            {/* Panel for "Upload File" */}
            <div className={classes.button} style={{ background: isManual ? "grey" : "#228a25", margin: "10px", width: "115px" }} onClick={() => setIsManul(false)}>
                Upload File
            </div>
            <div className="d-flex flex-column justify-content-centeralign-items-center">
                {isManual ? (<ManualUpload />) : (<UploadFile />)}

            </div>
        </div >
    )
}

export default Upload
