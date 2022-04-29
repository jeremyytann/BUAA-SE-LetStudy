import React from 'react'
import { Box } from '@mui/material'
import '../Pages/AdminUser.css'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { useNavigate } from 'react-router-dom'

const Notice = ({ notice }) => {
    let date = notice.created_date.split('T')
    let time = date[1].split('.')
    const navigate = useNavigate();

    const linkNotice = () => {
        navigate(`/admin/notice/${notice.id}`);
    }

    return (
        <Box onClick={linkNotice} className='question-view-background' border={1} height={130} width={870} mr={2.5} mb={2.2} borderRadius={5} sx={{cursor: 'pointer'}}>
            <Box mt={2.5} mx={3} display='flex'>
                <Box display='flex' width={680}>
                    <Box className='question-view-title' maxWidth={650} fontWeight='bold' fontSize={18}>
                        {notice.title}
                    </Box>
                </Box>
            </Box>

            <Box className='question-view-description' ml={3} mt={2} textAlign='left' width={750} maxWidth={750} height={30}>
                {notice.description}
            </Box>

            <Box display='flex' alignItems='center'>
                <Box display='flex' width={730} mt={0.5} ml={3}>
                    <Box display='flex'>
                        <Box>
                            <AccessTimeRoundedIcon fontSize='small' />
                        </Box>

                        <Box ml={1} fontSize={15}>
                            {date[0]}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Notice