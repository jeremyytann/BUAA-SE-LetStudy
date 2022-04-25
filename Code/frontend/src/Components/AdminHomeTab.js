import React from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const AdminHomeTab = ({ url }) => {
    const navigate = useNavigate();

    const linkNotices = () => {
        navigate('/admin/notices/latest/1');
    }

    const linkReports = () => {
        navigate('/admin/reports/unfinished/1');
    }

    const linkBugs = () => {
        navigate('/admin/bugs/unfinished/1');
    }

    const linkUsers = () => {
        navigate('/admin/users/all/1');
    }

    return (
        <Box display='flex' mt={6} mx={10}>
            { url === 'notices' ? 
                <Box onClick={linkNotices} color='#000000' fontSize={40} fontWeight='bold' sx={{cursor: 'pointer'}}>
                    公告
                </Box> :
                <Box onClick={linkNotices} color='#D5D5D5' fontSize={40} fontWeight='bold' sx={{cursor: 'pointer'}}>
                    公告
                </Box>
            }

            { url === 'reports' ?
                <Box onClick={linkReports} color='#000000' fontSize={40} ml={7} fontWeight='bold' sx={{cursor: 'pointer'}}>
                    举报
                </Box> :
                <Box onClick={linkReports} color='#D5D5D5' fontSize={40} ml={7} fontWeight='bold' sx={{cursor: 'pointer'}}>
                    举报
                </Box>
            }

            { url === 'bugs' ? 
                <Box onClick={linkBugs} color='#000000' fontSize={40} ml={7} fontWeight='bold' sx={{cursor: 'pointer'}}>
                    反馈
                </Box> :
                <Box onClick={linkBugs} color='#D5D5D5' fontSize={40} ml={7} fontWeight='bold' sx={{cursor: 'pointer'}}>
                    反馈
                </Box>
            }

            { url === 'users' ? 
                <Box onClick={linkUsers} color='#000000' fontSize={40} ml={7} fontWeight='bold' sx={{cursor: 'pointer'}}>
                    用户管理
                </Box> :
                <Box onClick={linkUsers} color='#D5D5D5' fontSize={40} ml={7} fontWeight='bold' sx={{cursor: 'pointer'}}>
                    用户管理
                </Box>
            }
        </Box>
    )
}

export default AdminHomeTab