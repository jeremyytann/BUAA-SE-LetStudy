import React from 'react'
import { Box } from '@mui/material'
import '../Pages/GeneralUser.css'

const NoteComment = ({ comment }) => {
    let date = comment.created_date.split('T')
    let time = date[1].split('.')

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
            </Box>

            <Box className='note-comment-text' mx={2} display='flex' mt={1.5} fontSize={15}>
                { comment.description }
            </Box>
        </Box>
    )
}

export default NoteComment