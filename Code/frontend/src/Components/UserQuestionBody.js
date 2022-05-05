import React from 'react'
import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import Question from './Question'
import api from '../Api/api'

const UserQuestionBody = () => {
    // const navigate = useNavigate();
    const { tab, page, search } = useParams();
    const [questions, setQuestions] = useState();

    useEffect(() => {
        const fetchAllQuestionsByPage = async() => {
            const data = await api.questionGetAllByPage(page);
            setQuestions(data.data);
        }

        const fetchPopularQuestionsByPage = async() => {
            const data = await api.questionGetPopularByPage(page);
            setQuestions(data.data);
        }

        const fetchLatestQuestionsByPage = async() => {
            const data = await api.questionGetLatestByPage(page);
            setQuestions(data.data);
        }

        const fetchSearchQuestionsByPage = async() => {
            const data = await api.questionSearchByPage(search, page);
            setQuestions(data.data);
        }

        if (tab === 'all') {
            fetchAllQuestionsByPage();
        } else if (tab === 'popular') {
            fetchPopularQuestionsByPage();
        } else if (tab === 'latest') {
            fetchLatestQuestionsByPage();
        } else if (tab === 'search') {
            fetchSearchQuestionsByPage();
        }
    }, [tab, page, search])

    return (
        <Box height={580} mt={5} ml={10} mr={2}>
            { questions !== undefined && questions.length > 0 ?
                <Box display='flex' flexWrap='wrap'>
                    {questions.map((question, index) => (
                        <Question key={index} question={question}/>
                    ))}
                </Box> :
                <Box>
                    { tab === 'search' ? 
                        <Box>
                            <Box mt={12} fontSize={150} fontWeight='bold' color='#DDC3A5'>
                                404
                            </Box>

                            <Box fontSize={24} fontWeight='bold'>
                                抱歉，此搜索没有任何结果
                            </Box> 
                        </Box> :
                        <Box>
                            <Box mt={12} fontSize={150} fontWeight='bold' color='#DDC3A5'>
                                0
                            </Box>

                            <Box fontSize={24} fontWeight='bold'>
                                抱歉，此时还未有任何房间
                            </Box> 
                        </Box>
                    }
                </Box>
            }
        </Box>
    )
}

export default UserQuestionBody