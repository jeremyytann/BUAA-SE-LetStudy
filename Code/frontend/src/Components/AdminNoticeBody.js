import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import api from '../Api/api'
import Notice from './Notice'

const AdminNoticeBody = () => {
    const { tab, page } = useParams();
    const [notices, setNotices] = useState();

    useEffect(() => {
        const fetchAllNoticesByPage = async() => {
            const data = await api.noticeGetAllByPage(page, 8);
            setNotices(data.data);
        }

        const fetchLatestNoticesByPage = async() => {
            const data = await api.noticeGetLatestByPage(page, 8);
            setNotices(data.data);
        }

        if (tab === 'all') {
            fetchAllNoticesByPage();
        } else if (tab === 'latest') {
            fetchLatestNoticesByPage();
        }
    }, [tab, page])

    return (
        <Box height={580} mt={5} ml={10} mr={2}>
            { notices !== undefined && notices.length > 0 ?
                <Box display='flex' flexWrap='wrap'>
                    {notices.map((notice, index) => (
                        <Notice key={index} notice={notice}/>
                    ))}
                </Box> :
                <Box>
                    <Box display='flex' fontSize={24} fontWeight='bold' color='darkgrey'>
                        尚未发布任何公告
                    </Box> 
                </Box>
            }
        </Box>
    )
}

export default AdminNoticeBody