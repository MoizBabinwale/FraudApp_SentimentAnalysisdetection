import React, { useEffect, useState } from 'react'
import { signUp } from '../../api/index';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Register() {
    const [userExists, setUserExists] = useState(false);
    const [isShowPassowrd, setIsShowPassword] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        var isLogin = sessionStorage.getItem("isLogin")
        if (isLogin) {
            navigate('/', { replace: true });
        }
    }, [navigate])
    const showPassword = () => {
        setIsShowPassword(!isShowPassowrd)
    }
    const handleSignup = async (e) => {
        e.preventDefault()
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        var name = document.getElementById("username").value
        var userid = document.getElementById("userid").value
        var number = document.getElementById("number").value

        if (email === "" || password === "" || name === "" || userid === "" || number === "") {
            return toast.error('Please Enter Proper User Data !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        if (number.length !== 10) {
            toast.error('Please 10 Digits Number!', {
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
        var userName = name;
        var userId = userid;
        var emailId = email;
        var mobileNumber = number;
        var userType = 0;
        try {
            const headers = {
                'Content-Type': 'application/json',
                'zoneid': 'Asia/Kolkata',
            };
            const requestData = {
                userType,
                userName,
                mobileNumber,
                emailId,
                userId,
                password,
            };
            const response = await axios.post(signUp, JSON.stringify(requestData), { headers });
            console.log('signup Response:', response);
            if (response.status === 200) {
                toast.success('Register success!', {
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
                    navigate("/login")
                }, 2500);
            } else {
                setUserExists(true)
            }
        } catch (error) {
            console.log("error ", error);
            if (error) {
                setUserExists(true)
            }
        }
    }
    return (

        <div id="HomeContainer" className="d-flex justify-content-center align-items-center mt-5 mb-5">
            <div className="background-animation p-4 rounded">
                <h2 className="mb-4">Register</h2>
                <div className="row mb-2">
                    <div className="col-12 col-sm-6">
                        <label >Name</label>
                    </div>
                    <div className="col-12 col-sm-6">
                        {userExists && (
                            <p style={{ color: 'red', marginBottom: "0", fontSize: "small" }}>User already exists!</p>

                        )}
                        <input type="text" className="form-control" id="username" />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-12 col-sm-6">
                        <label >Username</label>
                    </div>
                    <div className="col-12 col-sm-6">
                        <input type="text" className="form-control" id="userid" />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-12 col-sm-6">
                        <label>Email</label>
                    </div>
                    <div className="col-12 col-sm-6">

                        <input type="email" className="form-control" id="email" />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-12 col-sm-6">
                        <label >Password</label>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="d-flex">
                            <input type={isShowPassowrd ? "text" : "password"} className="form-control" id="password" style={{ width: "90%" }} />
                            <button style={{ marginLeft: "5px", color: "black", border: "0", background: "none" }} type="button" onClick={showPassword} id="togglePassword">
                                <i className={`fa ${isShowPassowrd ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>

                </div>
                <div className="row mb-2">
                    <div className="col-12 col-sm-6">
                        <label>Contact Number</label>
                    </div>
                    <div className="col-12 col-sm-6">
                        <input type="number" className="form-control" id="number" min="0" />
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-success" onClick={handleSignup}>Register</button>
                </div>
            </div>

        </div>

    )
}

export default Register
