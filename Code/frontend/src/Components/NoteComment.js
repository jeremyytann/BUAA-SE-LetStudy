import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material'
import '../Pages/GeneralUser.css'
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';

const NoteComment = ({ comment }) => {
    let date = comment.created_date.split('T')
    let time = date[1].split('.')
    const navigate = useNavigate();

    const linkReport = () => {
        navigate(`/report/create/comment/${comment.id}`);
    }

    return (
        <Box mb={2.5} height={60} maxHeight={60} width={445} maxWidth={445}>
            <Box mx={2} mt={1} display='flex' alignItems='center'>
                <Box fontSize={16} fontWeight='bold'>
                    { comment.user.username }
                </Box>
                
                <Box ml={2} fontSize={14}>
                    { date[0] }
                </Box>

                <Box ml={1} fontSize={14}>
                    { time[0] }
                </Box>

                <Box onClick={linkReport} ml={1.5} pt={0.5} sx={{cursor: 'pointer'}}>
                    <ReportGmailerrorredRoundedIcon color='error' />
                </Box>
            </Box>

            <Box className='note-comment-text' mx={2} display='flex' mt={1.5} fontSize={15}>
                { comment.description }
            </Box>
        </Box>
    )
}

export default NoteComment