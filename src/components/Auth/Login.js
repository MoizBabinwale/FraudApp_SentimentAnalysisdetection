import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { logIn } from '../../api/index';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate()
    const [isShowPassowrd, setIsShowPassword] = useState(false)
    const showPassword = () => {
        setIsShowPassword(!isShowPassowrd)
    }
    useEffect(() => {
        var isLogin = sessionStorage.getItem("isLogin")
        if (isLogin) {
            navigate('/', { replace: true });
        }
    }, [navigate])
    const handleLogin = async (e) => {
        e.preventDefault()
        const userId = document.getElementById("email").value
        const password = document.getElementById("password").value
        if (!userId || !password) {
            toast.error('Invalid Credentials...!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        try {
            const headers = {
                'Content-Type': 'application/json',
                'zoneid': 'Asia/Kolkata',
            };
            const requestData = JSON.stringify({
                userId, password
            })
            const response = await axios.post(logIn, requestData, { headers })
            if (response.status === 200) {
                console.log(response);
                toast.success('Login success!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate("/")
                    var isAdmin = response.data.userType
                    if (isAdmin === 1) {
                        sessionStorage.setItem("isAdmin", true)
                        sessionStorage.setItem("isLogin", true)
                        window.location.reload()
                    } else {
                        sessionStorage.setItem("isLogin", true)
                        window.location.reload()
                    }
                }, 3500);
            }
        } catch (error) {
            console.log("error ", error);
        }
    }
    return (
        <div id="HomeContainer" className="d-flex justify-content-center align-items-center mt-5 mb-5">
            <form className="background-animation HomeContainer p-4">
                <h2 className="mb-4">Login</h2>
                <div className="row mb-2">
                    <div className="col-12 col-sm-6">
                        <label >Email</label>
                    </div>
                    <div className="col-12 col-sm-6">
                        <input type="text" className="form-control" id="email" />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-12 col-sm-6">
                        <label>Password</label>
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
                <button type="submit" className="btn btn-success" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}

export default Login
