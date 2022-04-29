import { Box } from '@mui/material';
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const UserProfileTab = () => {
    const { username, tab } = useParams();
    const navigate = useNavigate();

    const linkNotes = () => {
        navigate(`/profile/${username}/notes`)
    }

    const linkQuestions = () => {
        navigate(`/profile/${username}/questions`)
    }

    const linkCollections = () => {
        navigate(`/profile/${username}/collections`)
    }

    return (
        <Box>
            <Box display='flex' ml={6} pt={4.5} mb={4.5}>
                { tab === 'notes' ? 
                    <Box onClick={linkNotes} color='#DDC3A5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                        笔记
                    </Box> :
                    <Box onClick={linkNotes} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                        笔记
                    </Box>
                }
                
                { tab === 'questions' ? 
                    <Box onClick={linkQuestions} color='#DDC3A5' ml={4} fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                        问题
                    </Box> :
                    <Box onClick={linkQuestions} color='#D5D5D5' ml={4} fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                        问题
                    </Box>
                }

                { tab === 'collections' ? 
                    <Box onClick={linkCollections} color='#DDC3A5' ml={4} fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                        收藏
                    </Box> :
                    <Box onClick={linkCollections} color='#D5D5D5' ml={4} fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                        收藏
                    </Box>
                }
            </Box>
            
        </Box>
    )
}

export default UserProfileTab