import React from 'react'
import Navbar from '../Components/Navbar'
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import HomeTab from '../Components/HomeTab';
import HomeSubTab from '../Components/HomeSubTab';
import UserRoomBody from '../Components/UserRoomBody';

const UserRoomPage = () => {
    let user = Cookies.get('username');

    if (user === undefined) {
        return <Navigate to='/login'/>
    }

    return (
        <div>
            <Navbar />
            <HomeTab url={'rooms'}/>
            <HomeSubTab url={'rooms'}/>
            <UserRoomBody />
        </div>
    )
}

export default UserRoomPage