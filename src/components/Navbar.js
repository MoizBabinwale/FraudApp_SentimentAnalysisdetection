import React, { useEffect, useState } from 'react'
import I1 from "../img/bar.png"
import { Link, useNavigate } from 'react-router-dom'
import I2 from "../img/fradapp.jpg"
import I4 from "../img/I4.jpg"

function Navbar() {
    const [isUpload, setIsUpload] = useState(true)
    const [showLinks, setShowLinks] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isadmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        var isLogin1 = JSON.parse(sessionStorage.getItem("isLogin"))
        if (isLogin1 === true) {
            // navigate('/')
            setIsLogin(true)
        }
        var isadmin1 = JSON.parse(sessionStorage.getItem("isAdmin"))
        if (isadmin1 === true) {
            // navigate('/')
            setIsAdmin(true)
        }
    }, [])
    const toggleLinks = () => {
        console.log("toggle");
        setShowLinks(!showLinks);
    }
    const handleLogout = () => {
        // e.preventDefault()
        sessionStorage.removeItem("isLogin")
        sessionStorage.removeItem("isAdmin")
        sessionStorage.removeItem("userDetails")
        window.location.reload()
        setIsLogin(false)
    }

    return (

        <div className='navContainer'>
            <nav>
                <div className="logo">
                    <Link to='/'><h1>FRAUD APP</h1></Link>
                </div>
                <ul className={`${showLinks ? 'show-links' : 'click'}`}>
                    {/* <i className="fa fa-times" onClick="hideMenu()"></i> */}
                    <Link to='/'>
                        <li><a href='/'>Home</a></li>
                    </Link>
                    {isLogin && isadmin ?
                        (<>
                            <Link to='/upload'>
                                <li><a href='/'>Upload</a></li>
                            </Link>
                            <Link to='/userList'>
                                <li><a href='/'>User List</a></li>
                            </Link>
                        </>) : (null)
                    }
                    {!isLogin ? (<><Link to='/login'>
                        <li><a href='/'>Login</a></li>
                    </Link>
                        <Link to='/register'>
                            <li><a href='/'>Register</a></li>
                        </Link>
                    </>) : (
                        <>
                            <Link to='/review'>
                                <li><a href='/'>Review App</a></li>
                            </Link>
                            <Link to='/' >
                                <li><a href='/' onClick={handleLogout}>Logout</a></li>
                            </Link>
                        </>
                    )}

                </ul>
                <Link to='/'>
                    <img src={I1} alt='hamburger' onClick={toggleLinks} />
                </Link>
            </nav>
            {isLogin ? (<div className='ImageContainer'>
                <img src={I2} alt='Wallpaper' />
            </div>) : (
                <div className='ImageContainer'>
                    <img src={I4} alt='Wallpaper' />
                </div>
            )}
        </div>
    )
}

export default Navbar
