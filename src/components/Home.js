import React, { useEffect, useState } from 'react'
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import { allAppList, reviewList, saveReview } from '../api';
import Loading from './Loading';
import { makeStyles } from '@material-ui/core/styles';
import review from '../img/review.jpg';

import { toast } from 'react-toastify';

import Sentiment from 'sentiment';
// import { MdRateReview } from "@react-icons/all-files"

const useStyles = makeStyles((theme) => ({
    rating: {
        marginBottom: theme.spacing(2),
    },
}))
function Home() {
    const [userReviewList, setUserReviewList] = useState([])
    const [isLogin, setIsLogin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [expansionStates, setExpansionStates] = useState({});

    const [starRating, setStarRating] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [cardData, setCardData] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [appId, setAppId] = useState(0);

    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        var isLogin1 = JSON.parse(sessionStorage.getItem("isLogin"))
        var isAdmin = JSON.parse(sessionStorage.getItem("isAdmin"))
        if (isLogin1 === true) {
            setIsLogin(true)
        } if (isAdmin) {
            setIsAdmin(true)
        }
        getAllAppList()
        var value = 1
        setStarRating(value)
        // const data = [{
        //     userName: "JOHN ",
        //     review: "This is FInal review"
        // }]
        // setReviews(data)
    }, [])
    const getAllAppList = async () => {
        // var value = 1
        // setStarRating(value)
        setLoading(true)
        try {
            const headers = {
                'Content-Type': 'application/json',
                'zoneid': 'Asia/Kolkata',
            };
            // Implement your upload logic here
            const response = await axios.get(allAppList, { headers })
            console.log('Uploading...', response);
            if (response.data === "") {
                setCardData([])
            } else {
                setCardData(response.data)
            }
            setLoading(false)

        } catch (error) {
            console.log("error ", error);
            setLoading(false)
        }
    }

    const getReveiwList = async (item) => {
        console.log(item);
        var appId = item.id
        setAppId(appId)
        // setStarRating(value)

        try {
            const headers = {
                'Content-Type': 'application/json',
                'zoneid': 'Asia/Kolkata',
            };
            // Implement your upload logic here
            const response = await axios.get(reviewList + appId, { headers })
            var data1 = response.data
            setReviews(data1)
        } catch (error) {
            console.log("error ", error);
            setLoading(false)
        }
    }
    const classes = useStyles();

    // const sentiment = new Sentiment()
    const sentiment = new Sentiment()
    const handleReview = async () => {
        var reviewText = document.getElementById("reviewText").value
        const tempResult = sentiment.analyze(reviewText)
        var analysisScore = tempResult.score
        var user = JSON.parse(sessionStorage.getItem("userDetails"))
        var userId = user.id
        var userName = user.userName
        var review = reviewText
        const reviewData1 = JSON.stringify({
            review,
            userName,
            userId,
            appId,
            analysisScore
        })
        try {
            const headers = {
                'Content-Type': 'application/json',
                'zoneid': 'Asia/Kolkata',
            };
            const response = await axios.post(saveReview, reviewData1, { headers })
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
                getReveiwList(response.data)
                getAllAppList()
                document.getElementById("reviewText").value = ''
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
        <>
            {isLogin ? (<div>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className='d-flex w-100 mt-3' id='HomeContainer'>
                        <div className='d-flex flex-row w-100'>
                            <div className='row w-100'>
                                <div className='container d-flex flex-wrap' style={{ justifyContent: "flex-start", width: "1200px" }}>
                                    {cardData.map((item, key) => (
                                        <div className={`col-md-4 mb-4 mt-2`} style={{ maxWidth: "350px", margin: "15px" }}>
                                            <div className={`card ${isExpanded ? 'expanded-card' : ''}`}  >
                                                {/* set the default Image here */}
                                                {item.score >= 0 ? (<div className="logo-container" style={{ border: "5px solid #52e16c" }}>
                                                    <img className="logo" onClick={() => getReveiwList(item)} src={(item.imageData ? item.imageData : "https://source.unsplash.com/random/1920x1080/?")} alt="Logo" />
                                                </div>) : (<div className="logo-container" style={{ border: "5px solid red" }}>
                                                    <img className="logo" onClick={() => getReveiwList(item)} src={(item.imageData ? item.imageData : "https://source.unsplash.com/random/1920x1080/?")} alt="Logo" />
                                                </div>)}
                                                <div className="card-body" style={{ lineHeight: "20px", textAlign: "left", maxHeight: "200px", overflowY: "auto" }}>
                                                    <h4 className="card-title" style={{ textTransform: "uppercase", display: "flex", alignItems: "center" }}>
                                                        {item.appName}
                                                        <Rating
                                                            name="star-rating"
                                                            value={item.starRating}
                                                            className={classes.rating}
                                                            style={{ marginLeft: "10px", marginTop: "12px" }} // Adding some space between the app name and the rating
                                                        />
                                                    </h4>
                                                    <p>App Type:{item.appType}</p>
                                                    <p className="card-text">Description : {item.description}</p>
                                                    <p>Company Name : {item.devCompanyName}</p>
                                                    <p>Download Link: <a href={item.downloadLink} target="_blank" rel="noopener noreferrer">{item.downloadLink}</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div
                                    className={`col-md-4 mb-4 mt-2`}
                                    style={{
                                        position: "sticky",
                                        top: "10%", // Adjust this value to position the card vertically
                                        zIndex: 1, // Make sure the card appears above other content
                                        width: "335px",
                                        marginRight: "15px",
                                    }}
                                >
                                    <div className={`card ${isExpanded ? 'expanded-card' : ''}`} style={{ height: "560px" }}  >
                                        <div className="logo-container">
                                            <img className="logo" src={review} alt="Logo" />
                                        </div>
                                        <div className="card-body" style={{ lineHeight: "1.5", textAlign: "left", maxHeight: "500px", overflowY: "auto" }}>
                                            {reviews.length !== 0 ? (<>
                                                {reviews.map((item, key) => (
                                                    <>
                                                        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", borderRadius: "20px", backgroundColor: "#d9d7d7" }}>
                                                            <div
                                                                style={{
                                                                    width: "30px",
                                                                    height: "30px",
                                                                    borderRadius: "50%",
                                                                    background: "#f2f2f2",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    marginRight: "10px",
                                                                }}
                                                            >
                                                                <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>{item.userName.charAt(0)}</span>
                                                            </div>
                                                            <b style={{ textTransform: "uppercase" }}>{item.userName}</b>
                                                        </div>
                                                        <p className="card-text">
                                                            {item.review}
                                                        </p>
                                                    </>
                                                ))
                                                }
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <input type='text' id='reviewText' placeholder='Enter New Review...' style={{ borderRadius: "20px" }} />
                                                    <button type="button" class="btn btn-success" onClick={handleReview} >Submit</button>
                                                </div>
                                            </>
                                            ) : (<div className="card-body" style={{ lineHeight: "20px", textAlign: "left", maxHeight: "200px", overflowY: "auto" }}>
                                                <p>Please Select App To see Their Reviews</p>
                                            </div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                )}
            </div>) : (<div className='mt-4' style={{ display: "flex", justifyContent: "center", fontSize: "large" }}>
                <h4 style={{ fontWeight: "800" }}>Please Login to see the reviews</h4>
            </div>)}
        </>
    )
}




export default Home
