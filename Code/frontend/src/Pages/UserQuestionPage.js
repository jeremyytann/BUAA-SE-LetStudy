import React from 'react'
import Navbar from '../Components/Navbar'
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import HomeTab from '../Components/HomeTab';
import HomeSubTab from '../Components/HomeSubTab';
import UserQuestionBody from '../Components/UserQuestionBody';

const UserQuestionPage = () => {
    let user = Cookies.get('username');

    if (user === undefined) {
        return <Navigate to='/login'/>
    }

    return (
        <div>
            <Navbar />
            <HomeTab url={'questions'}/>
            <HomeSubTab url={'questions'}/>
            <UserQuestionBody />
        </div>
    )
}

export default UserQuestionPage