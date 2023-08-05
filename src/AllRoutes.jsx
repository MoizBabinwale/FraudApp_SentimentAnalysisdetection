import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import UserList from './components/Admin/UserList'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Upload from './components/Upload'
import ErrorPage from './components/ErrorPage'

const AllRoutes = ({ loginStatus, isLogin, setAdmin }) => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/userList' element={<UserList setAdmin={setAdmin} />} />
            <Route path="*" element={<ErrorPage />} ></Route>
        </Routes>
    )
}

export default AllRoutes
