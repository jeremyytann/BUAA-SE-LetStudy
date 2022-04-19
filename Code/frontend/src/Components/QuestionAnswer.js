import React from 'react'
import { Box } from '@mui/material'
import '../Pages/GeneralUser.css'

const QuestionAnswer = ({ answer }) => {
    let date = answer.created_date.split('T')
    let time = date[1].split('.')

    return (
        <Box mx={2} mb={3} height={60}>
            <Box display='flex' mx={1} mt={1}>
                <Box fontWeight='bold'>
                    { answer.user.username }
                </Box>
                
                <Box ml={2} fontSize={14}>
                    { date[0] }
                </Box>

                <Box ml={1} fontSize={14}>
                    { time[0] }
                </Box>
            </Box>
            
            <Box mx={1} mt={1} height={25}  className='answer-description-text' display='flex' textAlign='left'>
                { answer.description }
            </Box>
        </Box>
    )
}

export default QuestionAnswer