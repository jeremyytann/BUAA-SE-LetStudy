import React from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const QuestionCategory = ({ question }) => {
    const navigate = useNavigate();

    const linkQuestion = () => {
        navigate(`/question/${question.id}`)
    }

    return (
        <Box onClick={linkQuestion} display='flex' mb={1.6} fontSize={18} mx={5} textAlign='left' maxWidth={350} sx={{cursor: 'pointer'}}>
            <Box className='same-type-questions' borderBottom={1}>{question.title}</Box>
        </Box>
    )
}

export default QuestionCategory