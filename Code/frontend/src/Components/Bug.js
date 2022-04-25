import React from 'react'
import { Box } from '@mui/material'
import '../Pages/AdminUser.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PendingIcon from '@mui/icons-material/Pending';

const Bug = ({ bug }) => {
    let date = bug.created_date.split('T')
    let time = date[1].split('.')
    const [status, setStatus] = useState('')
    const navigate = useNavigate();

    const linkBug = () => {
        navigate(`/admin/bug/${bug.id}`)
    }

    useEffect(() => {
        if (bug.status === 0) {
            setStatus('未处理')
        } else if (bug.status === 1) {
            setStatus('已处理')
        }
    }, [bug])

    return (
        <Box className='question-view-background' border={1} height={130} width={870} mr={2.5} mb={2.2} borderRadius={5} onClick={linkBug} sx={{cursor: 'pointer'}}>
            <Box mt={2.5} mx={3} display='flex'>
                <Box display='flex' width={680}>
                    <Box className='question-view-title' maxWidth={650} fontWeight='bold' fontSize={18}>
                        {bug.title}
                    </Box>
                </Box>
            </Box>

            <Box className='question-view-description' ml={3} mt={2} textAlign='left' width={750} maxWidth={750} height={30}>
                {bug.description}
            </Box>

            <Box display='flex' alignItems='center'>
                <Box display='flex' width={710} mt={0.5} ml={3}>
                    <Box display='flex'>
                        <Box>
                            <AccessTimeRoundedIcon fontSize='small' />
                        </Box>

                        <Box ml={1} fontSize={15}>
                            {date[0]}
                        </Box>
                    </Box>

                    <Box display='flex' ml={3} fontSize={16}>
                        <Box>
                            <MenuRoundedIcon fontSize='small'/>
                        </Box>
                        
                        <Box ml={1}>
                            {bug.type}
                        </Box>
                    </Box>

                    <Box display='flex' ml={3} fontSize={16}>
                        <Box>
                            <PersonRoundedIcon fontSize='small'/>
                        </Box>
                        
                        <Box ml={1}>
                            {bug.user.username}
                        </Box>
                    </Box>
                </Box>

                <Box display='flex' ml={3} fontSize={16}>
                    <Box>
                        <PendingIcon fontSize='small'/>
                    </Box>
                    
                    <Box ml={1}>
                        { status === '未处理' ?
                            <Box fontWeight='bold'>
                                {status}
                            </Box> : ''
                        }

                        { status === '已处理' ?
                            <Box fontWeight='bold' sx={{color: '#3CB043'}}>
                                {status}
                            </Box> : ''
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Bug