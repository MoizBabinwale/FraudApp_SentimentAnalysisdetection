import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userList, userUpdate } from '../../api';
import axios from 'axios';
import { Flag } from '@mui/icons-material';

function UserList() {
    const [isadmin, setIsAdmin] = useState(false)
    const [userListList, setUserList] = useState([])
    const [checked, setChecked] = useState(false)

    const navigate = useNavigate()
    useEffect(() => {
        var isAdmin = JSON.parse(sessionStorage.getItem("isAdmin"))
        if (isAdmin) {
            setIsAdmin(true)
            getUserList()
        } else {
            navigate('/', { replace: true })
        }
    }, [])

    const getUserList = async () => {
        try {

            const headers = {
                'Content-Type': 'application/json',
                'zoneid': 'Asia/Kolkata',
            };
            var response = await axios.get(userList, { headers })
            console.log("userList ", response);
            if (response.status === 200) {
                var userData = response.data
                setUserList(userData)
            }
        } catch (error) {
            console.log("error ", error);
        }
    }

    const updateUser = async (item) => {
        var userType = item.userType
        var userName = item.userName
        var mobileNumber = item.mobileNumber
        var emailId = item.emailId
        var userId = item.userId
        var password = item.password
        var id = item.id
        const requestOptions = JSON.stringify({
            userType,
            userName,
            mobileNumber,
            emailId,
            userId,
            password,
            id
        })
        const headers = {
            'Content-Type': 'application/json',
            'zoneid': 'Asia/Kolkata',
        };
        try {
            const response = await axios.put(userUpdate, requestOptions, { headers })
            console.log("response ", response);
        } catch (error) {
            console.log("error ", error);
        }
    }
    const handleChecked = (item, key) => {
        const userListList1 = [...userListList];
        userListList1[key].userType = item.userType === 1 ? 0 : 1;
        setUserList(userListList1);
        updateUser(item)
    };
    return (
        <div>
            {isadmin ? (
                <div className="Table container d-flex  w-100 align-items-center">
                    <div className="d-flex flex-column  w-100 align-items-center">
                        <table className="table table-bordered" style={{ width: '90%' }}>
                            <thead className="table-dark">
                                <tr>
                                    <th>Sr. Number</th>
                                    <th>User Name</th>
                                    <th>userId</th>
                                    <th>Email</th>
                                    <th>Number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {userListList.map((item, key, index) => (<tbody>
                                <tr>
                                    <td>{key + 1}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.userId}</td>
                                    <td>{item.emailId}</td>
                                    <td>{item.mobileNumber}</td>
                                    <td>
                                        <input type="checkbox" checked={item.userType > 0} onChange={() => handleChecked(item, key)} id='isAdminchecked' />
                                    </td>
                                </tr>
                            </tbody>
                            ))}
                        </table>
                    </div>
                </div>
            ) : (
                null
            )}
        </div>
    );
}

export default UserList;
