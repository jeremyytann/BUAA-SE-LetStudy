import React from 'react'
import { Box } from '@mui/material'
import Bug from './Bug'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../Api/api'

const AdminBugBody = () => {
    const { tab, page } = useParams();
    const [bugs, setBugs] = useState();

    useEffect(() => {
        const fetchUnfinishedBugsByPage = async() => {
            const data = await api.bugGetByStatusAndPage(0, page, 8);
            setBugs(data.data);
        }

        const fetchCompletedBugsByPage = async() => {
            const data = await api.bugGetByStatusAndPage(1, page, 8);
            setBugs(data.data);
        }

        const fetchAllBugsByPage = async() => {
            const data = await api.bugGetAllByPage(page, 8);
            setBugs(data.data);
        }

        if (tab === 'unfinished') {
            fetchUnfinishedBugsByPage();
        } else if (tab === 'completed') {
            fetchCompletedBugsByPage();
        } else if (tab === 'all') {
            fetchAllBugsByPage();
        }
    }, [tab, page])

    return (
        <Box height={580} mt={5} ml={10} mr={2}>
            { bugs !== undefined && bugs.length > 0 ?
                <Box display='flex' flexWrap='wrap'>
                    {bugs.map((bug, index) => (
                        <Bug key={index} bug={bug}/>
                    ))}
                </Box> :
                <Box>
                    <Box display='flex' fontSize={24} fontWeight='bold' color='darkgrey'>
                        目前还未有此类反馈
                    </Box> 
                </Box>
            }
        </Box>
    )
}

export default AdminBugBody