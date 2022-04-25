import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import AdminHomeTab from '../Components/AdminHomeTab';
import AdminHomeSubTab from '../Components/AdminHomeSubTab';
import AdminBugBody from '../Components/AdminBugBody';
import AdminHomeFlipPage from '../Components/AdminHomeFlipPage';

const AdminBugPage = () => {
    return (
        <Box>
            <Navbar />
            <AdminHomeTab url={'bugs'} />
            <AdminHomeSubTab url={'bugs'} />
            <AdminBugBody />
            <AdminHomeFlipPage url={'bugs'} />
        </Box>
    )
}

export default AdminBugPage