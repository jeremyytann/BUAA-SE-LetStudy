import React from 'react'
import Navbar from '../Components/Navbar'
import { useState, useEffect } from 'react'
import { Box, Grid, Button, Pagination } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../Api/api'
import './GeneralUser.css'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import QuestionAnswer from '../Components/QuestionAnswer'
import QuestionsCategory from '../Components/QuestionsCategory'

const QuestionViewPage = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState();
    const [answersCount, setAnswersCount] = useState(0)
    const [answers, setAnswers] = useState([])
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('')
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(0)
    const [status, setStatus] = useState(false)
    const navigate = useNavigate();

    const theme = createTheme ({
        typography: {
            button: {
                textTransform: 'none',
            }
        },

        palette: {
            gold: {
                main: '#E0A96D',
                contrastText: '#fff',
            },
            black: {
                main: '#000000',
                contrastText: '#fff',
            },
            pink: {
                main: '#FA9285',
                contrastText: '#fff',
            },
            yellow: {
                main: '#F2DB36'
            }
        }
    }); 

    const createAnswer = async(e) => {
        e.preventDefault();

        if (answer.length === 0) {
            setError('请输入内容');
        } else {
            const tempAnswer = await api.answerCreate(answer, id);
            
            if (tempAnswer.errorCode === 0) {
                setStatus(!status)
                setPage(1)
                setAnswer('')
            }
        }
    }
    
    const clearReply = () => {
        setAnswer('')
    }

    useEffect(() => {
        const fetchQuestion = async() => {
            const data = await api.questionGet(id);
            return data;
        }

        const fetchAllAnswerByPage = async() => {
            const data = await api.answerGetAllByPage(id, page);
            return data;
        }

        const getQuestion = async() => {
            const questionFromServer = await fetchQuestion();
            setQuestion(questionFromServer.data[0])
        }
        
        const getAllAnswerByPage = async() => {
            const answersFromServer = await fetchAllAnswerByPage();
            setAnswers(answersFromServer.data)
            setMaxPage(answersFromServer.page)
            setAnswersCount(answersFromServer.count)
        }

        getQuestion();
        getAllAnswerByPage();
    }, [id, page, status])

    const linkQuestionCreate = () => {
        navigate('/questions/create')
    }

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    const linkUserProfile = () => {
        navigate(`/profile/${question.user.username}`)
    }

    return (
        <Box>
            <Navbar />

            { question !== undefined ? 
                <Box mt={5} mx={10}>
                    <Grid container>
                        <Grid item xs={9}>
                            <Box>
                                <Box borderRadius={10} sx={{backgroundColor: 'white', height: '220px', width: '96%'}}>
                                    <Box mx={5} paddingTop={4} fontSize={20} fontWeight='bold' display='flex'>
                                        { question.title }
                                    </Box>

                                    <Box className='question-description-text' display='flex' mx={5} mt={2} height={75} fontSize={18} textAlign='left'>
                                        { question.description }
                                    </Box>

                                    <Box display='flex' alignItems='center'>
                                        <Box display='flex' width='95%' mt={2.5} mx={5}>
                                            <Box display='flex'>
                                                <Box>
                                                    <AccessTimeRoundedIcon fontSize='small' />
                                                </Box>

                                                <Box ml={1} fontSize={15}>
                                                    { question.created_date.split('T')[0] }
                                                </Box>
                                            </Box>

                                            <Box display='flex' ml={3} fontSize={16}>
                                                <Box>
                                                    <MenuRoundedIcon fontSize='small'/>
                                                </Box>
                                                
                                                <Box ml={1}>
                                                    {question.category.name}
                                                </Box>
                                            </Box>

                                            <Box display='flex' ml={3} fontSize={16}>
                                                <Box>
                                                    <PersonRoundedIcon fontSize='small'/>
                                                </Box>
                                                
                                                <Box onClick={linkUserProfile} ml={1} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                                    {question.user.username}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box borderRadius={10} mt={6} sx={{backgroundColor: 'white', height: '550px', width: '96%'}}>
                                    <Box display='flex' alignItems='center'>
                                        <Box display='flex' ml={6} pt={4} sx={{fontSize: '40px', fontWeight: 'bold'}}>
                                            <small>所有回答</small>
                                        </Box>

                                        <Box display='flex' ml={4} pt={4} color='darkgrey'>
                                            共 {answersCount} 个回答
                                        </Box>

                                        {maxPage > 0 ?
                                            <Box ml={3} mt={4}>
                                                <ThemeProvider theme={theme}>
                                                    <Pagination count={maxPage} color='gold' showFirstButton showLastButton page={page} onChange={handlePageChange}/>
                                                </ThemeProvider>
                                            </Box> : ''
                                        }
                                    </Box>
                                    

                                    <Box display='flex' mx={5} mt={3} sx={{fontSize: '40px', fontWeight: 'bold', borderTop: '1px solid black'}}>
                                    </Box>

                                    <Box mx={4} mt={3} height='55%'>
                                        { answers !== undefined ? 
                                            <Box>
                                                <Box height={400} maxHeight={400}>
                                                    { answers.map((answer, index) => (
                                                        <QuestionAnswer key={index} answer={answer} />
                                                    )) }
                                                </Box>
                                            </Box> : ''
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={3}>
                            <Box onClick={linkQuestionCreate} className='ask-button' alignItems='center' borderRadius={10} sx={{backgroundColor: 'white', height: '80px', width: '100%'}}>
                                <Box pt={2.2} display='flex' justifyContent='center' fontSize={26} fontWeight='bold' >
                                    点此提问
                                </Box>
                                <Box display='flex' mx={22} mt={1} sx={{fontSize: '40px', fontWeight: 'bold', borderTop: '1px solid black'}}>
                                </Box>
                            </Box>

                            <Box mt={6} borderRadius={10} sx={{backgroundColor: 'white', height: '320px', width: '100%'}}>
                                <Box display='flex' mx={5} pt={4} sx={{fontSize: '35px', fontWeight: 'bold'}}>
                                    <small>回答问题</small>
                                </Box>
                                
                                <Box mx={3} mt={1.5} borderRadius={5}>
                                    <textarea 
                                        className='create-question-reply'
                                        value={answer}
                                        onChange={event => setAnswer(event.target.value)}
                                        type='text'
                                        placeholder='输入回答内容' 
                                        maxLength='128' required/>             
                                </Box>

                                <Box mt={1.5} mx={4.5} display='flex'>
                                    <Box>
                                        <ThemeProvider theme={theme}>
                                            <Button onClick={createAnswer} variant="contained" size="small" color='gold' style={{ borderRadius: 13, width: 100, height: 35 }}> 
                                                <Box sx={{fontSize: 18, minWidth: '50px', fontWeight: 'bold'}}>提交</Box>
                                            </Button>
                                        </ThemeProvider>
                                    </Box>
                                    
                                    <Box ml={2}>
                                        <ThemeProvider theme={theme}>
                                            <Button onClick={clearReply} variant="contained" size="small" color='black' style={{ borderRadius: 13, width: 100, height: 35 }}> 
                                                <Box sx={{fontSize: 18, minWidth: '50px', fontWeight: 'bold'}}>消除</Box>
                                            </Button>
                                        </ThemeProvider>
                                    </Box>
                                </Box>
                            </Box>

                            <QuestionsCategory />
                        </Grid>
                    </Grid>
                </Box> : ''
            }
        </Box>
    )
}

export default QuestionViewPage