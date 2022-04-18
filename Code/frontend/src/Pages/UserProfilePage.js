import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import api from '../Api/api';
import Navbar from '../Components/Navbar'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';

const UserProfilePage = () => {
    const { username } = useParams();
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async() => {
            const data = await api.userGetByUsername(username);
            setUser(data.data[0]);
        }

        fetchUser();
    }, [username])

    let currentUser = Cookies.get('username');

    if (currentUser === undefined) {
        return <Navigate to='/login'/>
    }

    return (
        <div>
            <Navbar />
            {username}'s page
        </div>
    )
}

export default UserProfilePage