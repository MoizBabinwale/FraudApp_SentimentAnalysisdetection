import React, { useEffect, useState } from 'react'

function Home() {
    const [userReviewList, setUserReviewList] = useState([])
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        var isLogin1 = JSON.parse(sessionStorage.getItem("isLogin"))
        if (isLogin1 === true) {
            setIsLogin(true)
        }
    }, [])
    return (
        <div className='container d-flex justify-content-center align-items-center w-100' id='HomeContainer'>
            <div className='d-flex flex-column align-items-center w-100'>
                {isLogin ? (
                    <div className="Table container d-flex  w-100 align-items-center">
                        <div className="col-lg-12 col-md-12 col-sm-12 w-100">
                            <div className="justify-content-center align-items-center d-flex">
                                <h3> Fraud app detection review details </h3>
                            </div>
                            <hr />
                            <table className="table table-bordered mt-5" style={{ width: '100%' }}>
                                <thead className="table-secondary">
                                    <tr>
                                        <th style={{ width: "150px" }} >Sr. Number</th>
                                        <th style={{ width: "150px" }} >Logo</th>
                                        <th style={{ width: "280px" }}>User Name</th>
                                        <th style={{ width: "400px" }}>Review</th>
                                        <th>Email</th>
                                        <th>Pred</th>
                                    </tr>
                                </thead>
                                {userReviewList.map((item, key, index) => (<tbody>
                                    <tr>
                                        <td>{key + 1}</td>
                                        <td></td>
                                        <td>{item.userName}</td>
                                        <td>{item.reviewData}</td>
                                        <td>{item.emailId}</td>
                                        <td>{item.mobileNumber}</td>
                                    </tr>
                                </tbody>
                                ))}
                            </table>
                        </div>
                    </div>) : (
                    <h1>Please login to see the Apps and app reviews</h1>
                )}
            </div>
        </div>
    )
}

export default Home
