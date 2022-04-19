import React from 'react'
import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import api from '../Api/api'
import { useParams } from 'react-router-dom'
import QuestionCategory from '../Components/QuestionCategory'

const QuestionsCategory = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState();

    useEffect(() => {
        const fetchRandomQuestions = async() => {
            const data = await api.questionGetByRandom(6);
            setQuestions(data.data);
        }

        fetchRandomQuestions();
    }, [id])

    return (
        <Box mt={6} borderRadius={10} sx={{backgroundColor: 'white', height: '320px', width: '100%'}}>
            <Box display='flex' mx={5} pt={4} sx={{fontSize: '35px', fontWeight: 'bold'}}>
                <small>其他问题</small>
            </Box>

            <Box mt={3}>
                { questions !== undefined ? 
                    <Box>
                        <Box height={400} maxHeight={400}>
                            { questions.map((question, index) => (
                                <QuestionCategory key={index} question={question} />
                            )) }
                        </Box>
                    </Box> : ''
                }
            </Box>
        </Box>
    )
}

export default QuestionsCategory