import React from 'react'
import Navbar from '../Components/Navbar'
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import HomeTab from '../Components/HomeTab';
import HomeSubTab from '../Components/HomeSubTab';
import UserRoomBody from '../Components/UserRoomBody';
import HomeFlipPage from '../Components/HomeFlipPage';

const UserRoomPage = ({ type }) => {
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
            <HomeFlipPage url={'rooms'}/>
        </div>
    )
}

export default UserRoomPage