import React from 'react'
import Navbar from '../Components/Navbar'
import { useState, useEffect } from 'react'
import { Box, Grid, Button, Pagination, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../Api/api'
import './GeneralUser.css'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import QuestionAnswer from '../Components/QuestionAnswer'
import QuestionsCategory from '../Components/QuestionsCategory'
import Cookies from 'js-cookie'

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
    const [dialog, setDialog] = useState(false)
    const [dialog2, setDialog2] = useState(false);
    let username = Cookies.get('username');
    let admin = Cookies.get('admin');

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
            setError('回答内容不能为空哦');
            setDialog2(true);
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

            if (data.errorCode === 0) {
                setQuestion(data.data[0]);
            } else if (data.errorCode === 404) {
                setError(404);
            }
        }

        const fetchAllAnswerByPage = async() => {
            const data = await api.answerGetAllByPage(id, page);
            setAnswers(data.data)
            setMaxPage(data.page)
        }

        const fetchAnswerCount = async() => {
            const data = await api.answerGetCount(id);
    
            if (data.count > 999 && data.count <= 9999) {
                setAnswersCount((data.count / 1000).toFixed(1) + "k")
            } else if (data.count > 9999) {
                setAnswersCount((data.count / 10000).toFixed(1) + "w")
            } else if (data.count <= 999) {
                setAnswersCount(data.count)
            }
        }

        fetchQuestion();
        fetchAnswerCount();
        fetchAllAnswerByPage();
    }, [id, page, status])

    if (error === 404) {
        return <Navigate to='/404' />
    }

    const toggleDialog = () => {
        setDialog(!dialog);
    }

    const closeDialog = () => {
        setDialog(false);
    }

    const closeDialog2 = () => {
        setDialog2(false);
    }

    const linkQuestionCreate = () => {
        navigate('/questions/create');
    }

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const linkUserProfile = () => {
        navigate(`/profile/${question.user.username}/notes`);
    }

    const linkReport = () => {
        navigate(`/report/create/question/${id}`);
    }

    const linkQuestionEdit = () => {
        navigate(`/question/${id}/edit`);
    }

    const questionDelete = async() => {
        const data = await api.questionDelete(id);

        if (data.errorCode === 0) {
            navigate('/questions/all/1');
        }
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
                                    <Box display='flex'>
                                        { username === question.user.username ? 
                                            <Box ml={5} paddingTop={4} fontSize={20} width='76%' fontWeight='bold' display='flex'>
                                                { question.title }
                                            </Box> :
                                            <Box ml={5} paddingTop={4} fontSize={20} width='85%' fontWeight='bold' display='flex'>
                                                { question.title }
                                            </Box>
                                        }

                                        <Box ml={2} paddingTop={3.5}>
                                            { username === question.user.username ? 
                                                <Box display='flex'>
                                                    <Box>
                                                        <ThemeProvider theme={theme}>
                                                            <Button onClick={linkQuestionEdit} variant="contained" size='small' height={5} color='black' style={{ borderRadius: 13, width: 100 }}> 
                                                                <Box sx={{fontSize: 15, minWidth: '50px', fontWeight: 'bold'}}>修改</Box>
                                                            </Button>
                                                        </ThemeProvider>
                                                    </Box>

                                                    <Box ml={2}>
                                                        <ThemeProvider theme={theme}>
                                                            <Button onClick={toggleDialog} variant="contained" size='small' height={5} color='error' style={{ borderRadius: 13, width: 100 }}> 
                                                                <Box sx={{fontSize: 15, minWidth: '50px', fontWeight: 'bold'}}>删除</Box>
                                                            </Button>
                                                        </ThemeProvider>
                                                    </Box>
                                                </Box> :
                                                <Box>
                                                    { admin ? 
                                                        <ThemeProvider theme={theme}>
                                                            <Button disabled onClick={linkReport} variant="contained" size='small' height={5} color='pink' style={{ borderRadius: 13, width: 100 }}> 
                                                                <Box sx={{fontSize: 15, minWidth: '50px', fontWeight: 'bold'}}>举报</Box>
                                                            </Button>
                                                        </ThemeProvider> :
                                                        <ThemeProvider theme={theme}>
                                                            <Button onClick={linkReport} variant="contained" size='small' height={5} color='pink' style={{ borderRadius: 13, width: 100 }}> 
                                                                <Box sx={{fontSize: 15, minWidth: '50px', fontWeight: 'bold'}}>举报</Box>
                                                            </Button>
                                                        </ThemeProvider>
                                                    }
                                                </Box>
                                            }
                                        </Box>
                                    </Box>

                                    <Box className='question-description-text' display='flex' mx={5} mt={2} height={75} fontSize={18} textAlign='left'>
                                        { question.description }
                                    </Box>

                                    <Box display='flex'>
                                        <Box display='flex' alignItems='center' width='95%' mt={2} mx={5}>
                                            <Box display='flex'>
                                                <Box>
                                                    <AccessTimeRoundedIcon fontSize='small' />
                                                </Box>

                                                <Box ml={1} fontSize={15}>
                                                    { question.edited ? 
                                                        '已修改于 ' + question.created_date.split('T')[0]
                                                        : question.created_date.split('T')[0]
                                                    }
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
                                        { answers !== undefined && answers.length > 0 ? 
                                            <Box>
                                                <Box height={400} maxHeight={400}>
                                                    { answers.map((answer, index) => (
                                                        <QuestionAnswer key={index} answer={answer} />
                                                    )) }
                                                </Box>
                                            </Box> :
                                            <Box>
                                                <Box pt={20} fontSize={24} fontWeight='bold' color='darkgrey'>
                                                    此处未有任何回答
                                                </Box> 
                                            </Box>
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

            <Dialog
                fullWidth={true}
                open={dialog}
                maxWidth='sm'
                onClose={closeDialog}>
                <DialogTitle id="alert-dialog-title">
                    {"删除问题注意事项"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        你是否确定要删除此问题？
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog}>不了</Button>
                    <Button onClick={questionDelete} autoFocus>
                        确定
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                fullWidth={true}
                open={dialog2}
                maxWidth='sm'
                onClose={closeDialog2}>
                <DialogTitle id="alert-dialog-title">
                    {"数据错误"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {error}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog2}>知道了</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default QuestionViewPage