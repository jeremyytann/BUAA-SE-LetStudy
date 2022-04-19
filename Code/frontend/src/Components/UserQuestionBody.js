import React from 'react'
import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Question from './Question'
import api from '../Api/api'

const UserQuestionBody = () => {
    // const navigate = useNavigate();
    const { tab, page } = useParams();
    const [questions, setQuestions] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllQuestionsByPage = async() => {
            const data = await api.questionGetAllByPage(page);
            setQuestions(data.data);
        }

        const fetchPopularQuestionsByPage = async() => {
            const data = await api.questionGetPopularByPage(page);
            setQuestions(data.data)
        }

        const fetchLatestQuestionsByPage = async() => {
            const data = await api.questionGetLatestByPage(page);
            setQuestions(data.data);
        }

        if (tab === 'all') {
            fetchAllQuestionsByPage();
        } else if (tab === 'popular') {
            fetchPopularQuestionsByPage();
        } else if (tab === 'latest') {
            fetchLatestQuestionsByPage();
        }
    }, [tab, page])

    return (
        <Box height={580} mt={5} ml={10} mr={2}>
            { questions !== undefined ?
                <Box display='flex' flexWrap='wrap'>
                    {questions.map((question, index) => (
                        <Question key={index} question={question}/>
                    ))}
                </Box> : ''
            }
        </Box>
    )
}

export default UserQuestionBody