import React from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import '../Pages/GeneralUser.css'
import { useState, useEffect } from 'react'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PendingIcon from '@mui/icons-material/Pending';

const UserReport = ({ report }) => {
    let date = report.created_date.split('T')
    let time = date[1].split('.')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [status, setStatus] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        if (report.type === 1) {
            setCategory('笔记')
            setTitle(report.note.title)
        } else if (report.type === 2) {
            setCategory('留言')
            setTitle(report.comment.description)
        } else if (report.type === 3) {
            setCategory('问题')
            setTitle(report.question.title)
        } else if (report.type === 4) {
            setCategory('回答')
            setTitle(report.answer.description)
        } else if (report.type === 5) {
            setCategory('用户')
            setTitle(report.profile.username)
        } 

        if (report.status === 0) {
            setStatus('未处理')
        } else if (report.status === 1) {
            setStatus('已处理')
        } else if (report.status === 2) {
            setStatus('已拒绝')
        }
    }, [report])

    const linkReport = () => {
        navigate(`/report/${report.id}`);
    }

    return (
        <Box className='report-view-background' onClick={linkReport} borderRadius={5} mb={3} height={130} maxHeight={130} width={1150} maxWidth={1150} border={1}>
            <Box display='flex' textAlign='left' fontWeight='bold' fontSize={16} mt={2.5} ml={2.5}>
                {report.title}
            </Box>

            <Box className='report-view-description' textAlign='left' mx={2.5} mt={2} height={40} fontSize={16}>
                {report.description}
            </Box>

            <Box display='flex' alignItems='center'>
                <Box display='flex' width={1000} ml={2.5}>
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
                            {category}
                        </Box>
                    </Box>

                    <Box display='flex' ml={4} fontSize={16}>
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

                            { status === '已拒绝' ?
                                <Box fontWeight='bold' sx={{color: '#BC544B'}}>
                                    {status}
                                </Box> : ''
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default UserReport