import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import AdminHomeTab from '../Components/AdminHomeTab';
import AdminHomeSubTab from '../Components/AdminHomeSubTab';
import AdminNoticeBody from '../Components/AdminNoticeBody';
import AdminHomeFlipPage from '../Components/AdminHomeFlipPage';

const AdminNoticePage = () => {
    return (
        <Box>
            <Navbar />
            <AdminHomeTab url={'notices'} />
            <AdminHomeSubTab url={'notices'} />
            <AdminNoticeBody />
            <AdminHomeFlipPage url={'notices'} />
        </Box>
    )
}

export default AdminNoticePage