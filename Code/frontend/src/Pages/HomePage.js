import React from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import './GeneralUser.css'

const Homepage = () => {
    let user = Cookies.get('username');

    if (user === undefined) {
        return <Navigate to='/login'/>
    }

    return (
        <div>
            <Navbar />
            {user} logged in.
        </div>
    )
}

export default Homepage