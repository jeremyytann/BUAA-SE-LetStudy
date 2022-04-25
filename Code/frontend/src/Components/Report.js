import React from 'react'
import { Box } from '@mui/material'
import '../Pages/AdminUser.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PendingIcon from '@mui/icons-material/Pending';

const Report = ({ report }) => {
    let date = report.created_date.split('T')
    let time = date[1].split('.')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [status, setStatus] = useState('')
    const navigate = useNavigate();

    const linkReport = () => {
        navigate(`/admin/report/${report.id}`)
    }

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

    return (
        <Box className='question-view-background' border={1} height={130} width={870} mr={2.5} mb={2.2} borderRadius={5} onClick={linkReport} sx={{cursor: 'pointer'}}>
            <Box mt={2.5} mx={3} display='flex'>
                <Box display='flex' width={680}>
                    <Box className='question-view-title' maxWidth={650} fontWeight='bold' fontSize={18}>
                        {title}
                    </Box>
                </Box>
            </Box>

            <Box className='question-view-description' ml={3} mt={2} textAlign='left' width={750} maxWidth={750} height={30}>
                {report.description}
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

                    <Box display='flex' ml={3} fontSize={16}>
                        <Box>
                            <MenuRoundedIcon fontSize='small'/>
                        </Box>
                        
                        <Box ml={1}>
                            {category}
                        </Box>
                    </Box>

                    <Box display='flex' ml={3} fontSize={16}>
                        <Box>
                            <PersonRoundedIcon fontSize='small'/>
                        </Box>
                        
                        <Box ml={1}>
                            {report.user.username}
                        </Box>
                    </Box>

                    <Box display='flex' ml={3} fontSize={16}>
                        <Box>
                            <PendingIcon fontSize='small'/>
                        </Box>
                        
                        <Box ml={1}>
                            { status === '未处理' ?
                                <Box>
                                    {status}
                                </Box> : ''
                            }

                            { status === '已处理' ?
                                <Box sx={{color: '#3CB043'}}>
                                    {status}
                                </Box> : ''
                            }

                            { status === '已拒绝' ?
                                <Box sx={{color: '#BC544B'}}>
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

export default Report