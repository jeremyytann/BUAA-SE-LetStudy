import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import './GeneralUser.css'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const NotFoundPage = () => {
    const navigate = useNavigate();
    let username = Cookies.get('username')

    return (
        <Box>
            <Navbar />

            <Box mt={8} fontSize={250} fontWeight='bold' color='#DDC3A5'>
                404
            </Box>

            <Box fontSize={35} fontWeight='bold'>
                抱歉，你所访问的页面不存在
            </Box>

            <Box fontSize={22.8}>
                你想查找什么呢？可通过以下链接跳转过去哦
            </Box>

            <Box display='flex' justifyContent='center' mt={10}>
                <Box width={200}>
                    <Box fontSize={40} fontWeight='bold'>
                        房间
                    </Box>

                    <Box display='flex' justifyContent='center' fontSize={25} mt={3} >
                        <Box borderBottom={1} sx={{cursor: 'pointer'}} onClick={() => navigate('/rooms/public/1')}>
                            公共房间
                        </Box>
                    </Box>

                    <Box display='flex' justifyContent='center' fontSize={25} mt={3} >
                        <Box borderBottom={1} sx={{cursor: 'pointer'}} onClick={() => navigate('/rooms/private/1')}>
                            私人房间
                        </Box>
                    </Box>
                </Box>

                <Box width={200}>
                    <Box fontSize={40} fontWeight='bold'>
                        笔记
                    </Box>

                    <Box display='flex' justifyContent='center' fontSize={25} mt={3} >
                        <Box borderBottom={1} sx={{cursor: 'pointer'}} onClick={() => navigate('/notes/all/1')}>
                            全部
                        </Box>
                    </Box>

                    <Box display='flex' justifyContent='center' fontSize={25} mt={3} >
                        <Box borderBottom={1} sx={{cursor: 'pointer'}} onClick={() => navigate('/notes/popular/1')}>
                            热门
                        </Box>
                    </Box>

                    <Box display='flex' justifyContent='center' fontSize={25} mt={3} >
                        <Box borderBottom={1} sx={{cursor: 'pointer'}} onClick={() => navigate('/notes/latest/1')}>
                            最新
                        </Box>
                    </Box>
                </Box>
                
                <Box width={200}>
                    <Box fontSize={40} fontWeight='bold'>
                        问答
                    </Box>

                    <Box display='flex' justifyContent='center' fontSize={25} mt={3} >
                        <Box borderBottom={1} sx={{cursor: 'pointer'}} onClick={() => navigate('/questions/all/1')}>
                            全部
                        </Box>
                    </Box>

                    <Box display='flex' justifyContent='center' fontSize={25} mt={3} >
                        <Box borderBottom={1} sx={{cursor: 'pointer'}} onClick={() => navigate('/questions/popular/1')}>
                            热门
                        </Box>
                    </Box>

                    <Box display='flex' justifyContent='center' fontSize={25} mt={3} >
                        <Box borderBottom={1} sx={{cursor: 'pointer'}} onClick={() => navigate('/questions/latest/1')}>
                            最新
                        </Box>
                    </Box>
                </Box>

                <Box width={200}>
                    <Box fontSize={40} fontWeight='bold'>
                        个人账户
                    </Box>
                    <Box display='flex' justifyContent='center' fontSize={25} mt={3} >
                        <Box borderBottom={1} sx={{cursor: 'pointer'}} onClick={() => navigate(`/profile/${username}/notes`)}>
                            笔记
                        </Box>
                    </Box>
                    <Box display='flex' justifyContent='center' fontSize={25} mt={3} >
                        <Box borderBottom={1} sx={{cursor: 'pointer'}} onClick={() => navigate(`/profile/${username}/questions`)}>
                            问题
                        </Box>
                    </Box>
                    <Box display='flex' justifyContent='center' fontSize={25} mt={3} >
                        <Box borderBottom={1} sx={{cursor: 'pointer'}} onClick={() => navigate(`/profile/${username}/collections`)}>
                            收藏
                        </Box>
                    </Box>
                </Box>
            </Box>
            
        </Box>
    )
}

export default NotFoundPage