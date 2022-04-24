import React from 'react'
import { Box } from '@mui/material'
import Navbar from '../Components/Navbar'
import AdminHomeTab from '../Components/AdminHomeTab';

const AdminReportPage = () => {
    return (
        <Box>
            <Navbar />
            <AdminHomeTab url='reports'/>
            
        </Box>
    )
}

export default AdminReportPage