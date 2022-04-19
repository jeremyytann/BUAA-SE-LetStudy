import React from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const QuestionCategory = ({ question }) => {
    const navigate = useNavigate();

    const linkQuestion = () => {
        navigate(`/question/${question.id}`)
    }

    return (
        <Box onClick={linkQuestion} className='same-type-questions' mb={1.6} fontSize={18} mx={5} textAlign='left' width={350} sx={{cursor: 'pointer'}}>
            {question.title}
        </Box>
    )
}

export default QuestionCategory