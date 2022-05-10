import React from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const HomeTab = ({ url }) => {
    const navigate = useNavigate();

    const linkNotes = () => {
        navigate('/notes/all/1');
    }

    const linkRooms = () => {
        navigate('/rooms/public/1');
    }

    const linkQuestions = () => {
        navigate('/questions/all/1');
    }

    return (
        <Box display='flex' mt={6} mx={10}>
            { url === 'rooms' ? 
                <Box onClick={linkRooms} color='#E0A96D' fontSize={40} fontWeight='bold' sx={{cursor: 'pointer'}}>
                    房间
                </Box> :
                <Box onClick={linkRooms} color='#D5D5D5' fontSize={40} fontWeight='bold' sx={{cursor: 'pointer'}}>
                    房间
                </Box>
            }

            { url === 'notes' ?
                <Box onClick={linkNotes} color='#E0A96D' fontSize={40} ml={7} fontWeight='bold' sx={{cursor: 'pointer'}}>
                    笔记
                </Box> :
                <Box onClick={linkNotes} color='#D5D5D5' fontSize={40} ml={7} fontWeight='bold' sx={{cursor: 'pointer'}}>
                    笔记
                </Box>
            }

            { url === 'questions' ? 
                <Box onClick={linkQuestions} color='#E0A96D' fontSize={40} ml={7} fontWeight='bold' sx={{cursor: 'pointer'}}>
                    问答
                </Box> :
                <Box onClick={linkQuestions} color='#D5D5D5' fontSize={40} ml={7} fontWeight='bold' sx={{cursor: 'pointer'}}>
                    问答
                </Box>
            }
        </Box>
    )
}

export default HomeTab