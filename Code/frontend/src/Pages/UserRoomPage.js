import React from 'react'
import Navbar from '../Components/Navbar'
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import HomeTab from '../Components/HomeTab';
import HomeSubTab from '../Components/HomeSubTab';
import UserRoomBody from '../Components/UserRoomBody';
import HomeFlipPage from '../Components/HomeFlipPage';
import api from '../Api/api';

const UserRoomPage = ({ type }) => {
    let user = Cookies.get('username');

    const banCheck = async() => {
        const data = api.userGetByUsername(user)

        if (data.data[0].status === 0) {
            return <Navigate to='/banned'/>
        }
    }

    if (user === undefined) {
        return <Navigate to='/login'/>
    } else {
        banCheck();
    }

    return (
        <div>
            <Navbar />
            <HomeTab url={'rooms'}/>
            <HomeSubTab url={'rooms'}/>
            <UserRoomBody />
            <HomeFlipPage url={'rooms'}/>
        </div>
    )
}

export default UserRoomPage