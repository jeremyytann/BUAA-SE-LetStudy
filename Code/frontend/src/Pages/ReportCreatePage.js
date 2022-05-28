import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { Box, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PageTitle from '../Components/PageTitle'
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import api from '../Api/api'
import Cookies from 'js-cookie'

const ReportCreatePage = () => {
    const { type, id } = useParams();
    const [reportCategory, setReportCategory] = useState('');
    const [reportTitle, setReportTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [dialog, setDialog] = useState('');
    const [dialog2, setDialog2] = useState('');
    const [path, setPath] = useState('');
    const navigate = useNavigate();

    let user = Cookies.get('username')

    const banCheck = async() => {
        const data = api.userGetByUsername(user)

        if (data.data[0].status === 0) {
            return <Navigate to='/banned'/>
        }
    }

    banCheck();

    useEffect(() => {
        const fetchNote = async() => {
            const data = await api.noteGet(id);
            setReportTitle(data.data[0].title);
        }

        const fetchComment = async() => {
            const data = await api.commentGet(id);
            setReportTitle(data.data[0].description);
        }

        const fetchQuestion = async() => {
            const data = await api.questionGet(id);
            setReportTitle(data.data[0].title);
        }

        const fetchAnswer = async() => {
            const data = await api.answerGet(id);
            setReportTitle(data.data[0].description);
        }

        const fetchUser = async() => {
            const data = await api.userGet(id);
            setReportTitle(data.data[0].username);
        }
        
        if (type === 'note') {
            setReportCategory('笔记');
            fetchNote();
        } else if (type === 'comment') {
            setReportCategory('留言');
            fetchComment();
        } else if (type === 'question') {
            setReportCategory('问题');
            fetchQuestion();
        } else if (type === 'answer') {
            setReportCategory('回答');
            fetchAnswer();
        } else if (type === 'user') {
            setReportCategory('用户');
            fetchUser();
        }
    }, [type, id])
    
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
            }
        }
    });

    const closeDialog = () => {
        setDialog(false);
    }

    const closeDialog2 = () => {
        setDialog2(false);
        navigate(path);
    }

    const createReport = async(e) => {
        e.preventDefault();

        if (description === '') {
            setError('举报内容不能为空哦');
            setDialog(true);
        } else {
            let report = null

            if (type === 'note') {
                report = await api.reportCreate(1, id, description, reportTitle);
                setPath(`/note/${id}`);
            } else if (type === 'comment') {
                report = await api.reportCreate(2, id, description, reportTitle);
                let noteId = report.data[0].comment.note.id;
                setPath(`/note/${noteId}`);
            } else if (type === 'question') {
                report = await api.reportCreate(3, id, description, reportTitle);
                setPath(`/question/${id}`);
            } else if (type === 'answer') {
                report = await api.reportCreate(4, id, description, reportTitle);
                let questionId = report.data[0].answer.question.id;
                setPath(`/question/${questionId}`);
            } else if (type === 'user') {
                report = await api.reportCreate(5, id, description, reportTitle);
                let username = report.data[0].profile.username;
                setPath(`/profile/${username}/notes`);
            }

            if (report.errorCode === 0) {
                setDialog2(true);
            }
        }
    }

    const linkPreviousPage = async() => {
        if (type === 'note') {
            navigate(`/note/${id}`);
        } else if (type === 'comment') {
            const comment = await api.commentGet(id);
            navigate(`/note/${comment.data[0].note.id}`);
        } else if (type === 'question') {
            navigate(`/question/${id}`);
        } else if (type === 'answer') {
            const answer = await api.answerGet(id);
            navigate(`/question/${answer.data[0].question.id}`);
        } else if (type === 'user') {
            const user = await api.userGet(id);
            navigate(`/profile/${user.data[0].username}/notes`);
        }
    }

    return (
        <div>
            <Navbar />

            <PageTitle title={'创建举报'}/>
            
            <form onSubmit={createReport}>
                <Box borderRadius={10} height={725} display='flex' mt={3} mx={10} sx={{backgroundColor: '#fff'}}>
                    <Box mx={7}>
                        <Box display='flex'>
                            <Box mt={5}>
                                <Box display='flex' fontSize={16} fontWeight='bold' ml={1} mb={2}>
                                    举报分类
                                </Box>

                                <Box display='flex' className='create-report-category' alignItems='center' justifyContent='center'>
                                    <Box fontWeight='bold'>
                                        {reportCategory}
                                    </Box>
                                </Box>
                            </Box>
                            
                            <Box ml={5} mt={5}>
                                <Box display='flex' fontSize={16} fontWeight='bold' ml={1} mb={2}>
                                    举报主题
                                </Box>

                                <Box display='flex' alignItems='center'>
                                    <Box className='create-report-title'>
                                        <span className='create-report-title-text'>{reportTitle}</span>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box mt={4}>
                            <Box display='flex' fontSize={16} fontWeight='bold' ml={1} mb={2}>
                                举报内容
                            </Box>

                            <Box display='flex'>
                                <Box fontSize={18}>
                                    <Box>
                                        <textarea 
                                            className='create-question-description'
                                            value={description}
                                            onChange={event => setDescription(event.target.value)}
                                            type='text'
                                            placeholder='输入举报内容'
                                            maxLength='128' required/>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box mt={4} display='flex'>
                            <Box>
                                <ThemeProvider theme={theme}>
                                    <Button onClick={createReport} variant="contained" size="small" color="gold" style={{ borderRadius: 13, width: 140 }}> 
                                        <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>提交</Box>
                                    </Button>
                                </ThemeProvider>
                            </Box>
                            
                            <Box ml={3}>
                                <ThemeProvider theme={theme}>
                                    <Button onClick={linkPreviousPage} variant="contained" size="small" color='black' style={{ borderRadius: 13, width: 140 }}> 
                                        <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>取消</Box>
                                    </Button>
                                </ThemeProvider>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </form>

            <Dialog
                fullWidth={true}
                open={dialog}
                maxWidth='sm'
                onClose={closeDialog}>
                <DialogTitle id="alert-dialog-title">
                    {"数据错误"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {error}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog}>知道了</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                fullWidth={true}
                open={dialog2}
                maxWidth='sm'
                onClose={closeDialog2}>
                <DialogTitle id="alert-dialog-title">
                    {"举报成功"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"你的举报已成功提交，现在将返回至上一个页面。"}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog2}>好的</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ReportCreatePage