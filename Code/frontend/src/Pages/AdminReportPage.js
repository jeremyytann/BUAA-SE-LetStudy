import React from 'react'
import { Box } from '@mui/material'
import Navbar from '../Components/Navbar'
import AdminHomeTab from '../Components/AdminHomeTab';
import AdminHomeSubTab from '../Components/AdminHomeSubTab';
import AdminReportBody from '../Components/AdminReportBody';
import AdminHomeFlipPage from '../Components/AdminHomeFlipPage';

const AdminReportPage = () => {
    return (
        <Box>
            <Navbar />
            <AdminHomeTab url={'reports'}/>
            <AdminHomeSubTab url={'reports'} />
            <AdminReportBody />
            <AdminHomeFlipPage url={'reports'} />
        </Box>
    )
}

export default AdminReportPage