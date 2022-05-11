import { Box } from '@mui/material'
import React from 'react'
import api from '../Api/api'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Chat = ({ message }) => {
    let date = message.createdDate.split('T')
    let time = date[1].split('.')
    const navigate = useNavigate();
    let username = Cookies.get('username')

    const linkProfile = async() => {
        if (message.room.type === 0) {
            const data = await api.roomQuit(message.room.id, 0);

            if (data.errorCode === 0) {
                navigate(`/profile/${message.user.username}/notes`);
            }
        } else {
            const data = await api.roomQuit(message.room.id, 1);

            if (data.errorCode === 0) {
                navigate(`/profile/${message.user.username}/notes`);
            }
        }
    }

    return (
        <Box mx={2} mb={1.5} height={60}>
            <Box display='flex' alignItems='center' mx={1}>
                { message.user.username === username ? 
                    <Box fontWeight='bold' color='#E0A96D' onClick={linkProfile} sx={{cursor: 'pointer'}}>
                        { message.user.username }
                    </Box> :
                    <Box fontWeight='bold' onClick={linkProfile} sx={{cursor: 'pointer'}}>
                        { message.user.username }
                    </Box>
                }
                
                
                <Box ml={2} fontSize={14}>
                    { date[0] }
                </Box>

                <Box ml={1} fontSize={14}>
                    { time[0] }
                </Box>
            </Box>
            
            <Box display='flex'>
                <Box mx={1} mt={1} height={25} width={1150} className='answer-description-text' display='flex' textAlign='left'>
                    { message.content }
                </Box>
            </Box>
        </Box>
    )
}

export default Chat