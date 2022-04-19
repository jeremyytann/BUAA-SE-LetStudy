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
            return data;
        }

        const fetchLatestQuestionsByPage = async() => {
            const data = await api.questionGetLatestByPage(page);
            return data;
        }

        const getAllQuestionsByPage = async() => {
            const questionsFromServer = await fetchAllQuestionsByPage();
            setQuestions(questionsFromServer.data);
        }

        const getLatestQuestionsByPage = async() => {
            const questionsFromServer = await fetchLatestQuestionsByPage();
            setQuestions(questionsFromServer.data);
        }

        if (tab === 'all') {
            getAllQuestionsByPage();
        } else if (tab === 'popular') {
            setQuestions([])
        } else if (tab === 'latest') {
            getLatestQuestionsByPage();
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