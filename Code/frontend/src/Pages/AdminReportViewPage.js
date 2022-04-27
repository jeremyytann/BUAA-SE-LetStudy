import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PageTitle from '../Components/PageTitle'
import api from '../Api/api'

const AdminReportViewPage = () => {
    const { id } = useParams();
    const [report, setReport] = useState();
    const [reportType, setReportType] = useState('');
    const [reason, setReason] = useState('');
    const [reportReason, setReportReason] = useState('');
    const [path, setPath] = useState('');
    const [status, setStatus] = useState('')
    const [open, setOpen] = useState(false);
    const [dialog, setDialog] = useState(false)
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setReason('');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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

    useEffect(() => {
        const fetchReport = async() => {
            const data = await api.reportGet(id);
            setReport(data.data[0]);
            setReportReason(data.data[0].reason);

            if (data.data[0].status !== 1) {
                if (data.data[0].type === 1) {
                    setReportType('笔记');
                    setPath(`/note/${data.data[0].note.id}`)
                } else if (data.data[0].type === 2) {
                    setReportType('留言');
                    setPath(`/note/${data.data[0].comment.note.id}`)
                } else if (data.data[0].type === 3) {
                    setReportType('问题');
                    setPath(`/question/${data.data[0].question.id}`)
                } else if (data.data[0].type === 4) {
                    setReportType('回答');
                    setPath(`/question/${data.data[0].answer.question.id}`)
                } else if (data.data[0].type === 5) {
                    setReportType('用户');
                    setPath(`/profile/${data.data[0].user.username}`)
                }
            } else {
                if (data.data[0].type === 1) {
                    setReportType('笔记');
                } else if (data.data[0].type === 2) {
                    setReportType('留言');
                } else if (data.data[0].type === 3) {
                    setReportType('问题');
                } else if (data.data[0].type === 4) {
                    setReportType('回答');
                } else if (data.data[0].type === 5) {
                    setReportType('用户');
                }
            }

            if (data.data[0].status === 0) {
                setStatus('未处理')
            } else if (data.data[0].status === 1) {
                setStatus('已处理')
            } else if (data.data[0].status === 2) {
                setStatus('已拒绝')
            }
        }

        fetchReport();
    }, [id])  
    
    const completeReport = async() => {
        if (reportType === '笔记') {
            // delete note
            const data = await api.noteDelete(report.note.id)
            const data2 = await api.reportEdit(id, 1, reason);

            if (data.errorCode === 0 && data2.errorCode === 0) {
                window.location.reload(false)
            }
        } else if (reportType === '留言') {
            // delete comment
            const data = await api.commentDelete(report.comment.id)
            const data2 = await api.reportEdit(id, 1, reason);
            
            if (data.errorCode === 0 && data2.errorCode === 0) {
                window.location.reload(false)
            }
        } else if (reportType === '问题') {
            // delete question
            const data = await api.questionDelete(report.question.id)
            const data2 = await api.reportEdit(id, 1, reason);
            
            if (data.errorCode === 0 && data2.errorCode === 0) {
                window.location.reload(false)
            }
        } else if (reportType === '回答') {
            // delete answer
            const data = await api.answerDelete(report.answer.id)
            const data2 = await api.reportEdit(id, 1, reason);
            
            if (data.errorCode === 0 && data2.errorCode === 0) {
                window.location.reload(false)
            }
        } else if (reportType === '用户') {
            // ban user
            const data = await api.userBan(report.profile.id)
            const data2 = await api.reportEdit(id, 1, reason);
            
            if (data.errorCode === 0 && data2.errorCode === 0) {
                window.location.reload(false)
            }
        }
    }

    const rejectReport = async() => {
        let data = await api.reportEdit(id, 2, reason);
        
        if (data.errorCode === 0) {
            window.location.reload(false)
        }
    }

    const toggleDialog = () => {
        setDialog(!dialog);
    }

    const closeDialog = () => {
        setDialog(false);
    }

    const linkReport = () => {
        navigate('/admin/reports/unfinished/1');
    }

    const linkPath = () => {
        window.open(path, "_blank")
    }

    return (
        <Box>
            <Navbar />

            <PageTitle title={'查看举报'}/>
            
            <Box borderRadius={10} height={725} display='flex' mt={3} mx={10} sx={{backgroundColor: '#fff'}}>
                <Box mx={7}>
                    <Box mt={7} display='flex' alignItems='center'>
                        <Box display='flex' fontSize={28} fontWeight='bold' width={140}>
                            举报人
                        </Box>

                        <Box className='report-view-username'>
                            { report !== undefined ? report.user.username : ''}
                        </Box>
                    </Box>

                    <Box mt={6.5} display='flex' alignItems='center'>
                        <Box display='flex' fontSize={28} fontWeight='bold' width={140}>
                            类型
                        </Box>

                        <Box className='report-view-username'>
                            {reportType}
                        </Box>
                    </Box>

                    <Box mt={6.5} display='flex' alignItems='center'>
                        <Box display='flex' fontSize={28} fontWeight='bold' width={140}>
                            链接
                        </Box>

                        {
                            report !== undefined ? report.status !== 1 ?
                            <Box onClick={linkPath} className='report-view-title'>
                                <Box borderBottom={1} sx={{cursor: 'pointer'}}>
                                    {report !== undefined ? report.title : ''}
                                </Box>
                            </Box> :
                            <Box>
                                <Box className='report-view-username'>
                                    {report !== undefined ? report.title : ''}
                                </Box>
                            </Box> : ''
                        }
                    </Box>

                    <Box mt={6.5} display='flex'>
                        <Box display='flex' fontSize={28} mt={2} fontWeight='bold' width={140}>
                            原因
                        </Box>

                        <Box className='report-description' textAlign='left' >
                            {report !== undefined ? report.description : ''}
                        </Box>
                    </Box>

                    <Box mt={6.5} display='flex' alignItems='center'>
                        <Box display='flex' fontSize={28} fontWeight='bold' width={140}>
                            状态
                        </Box>

                        <Box className='report-view-status' textAlign='left' >
                            { status === '未处理' ?
                                <Box fontWeight='bold'>
                                    {status}
                                </Box> : ''
                            }

                            { status === '已处理' ?
                                <Box fontWeight='bold' sx={{color: '#3CB043'}}>
                                    { reportType === '笔记' ? status + ' ( 管理员已删除此笔记 )' : ''}
                                    { reportType === '留言' ? status + ' ( 管理员已删除此留言 )' : ''}
                                    { reportType === '问题' ? status + ' ( 管理员已删除此问题 )' : ''}
                                    { reportType === '回答' ? status + ' ( 管理员已删除此回答 )' : ''}
                                    { reportType === '用户' ? status + ' ( 管理员已封锁此用户 )' : ''}
                                </Box> : ''
                            }

                            { status === '已拒绝' ?
                                <Box fontWeight='bold' sx={{color: '#BC544B'}}>
                                    {reportReason ? status + ' ( ' + reportReason + ' )' : status + ' ( 管理员忘了输入拒绝理由 )'}
                                </Box> : ''
                            }
                        </Box>
                    </Box>

                    <Box mt={7} display='flex'>
                        { status === '未处理' ? 
                            <Box display='flex'>
                                <Box>
                                    <ThemeProvider theme={theme}>
                                        <Button onClick={toggleDialog} variant="contained" size="small" color="gold" style={{ borderRadius: 13, width: 140 }}> 
                                            { reportType === '笔记' ? <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>删除笔记</Box> : ''}
                                            { reportType === '留言' ? <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>删除留言</Box> : ''}
                                            { reportType === '问题' ? <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>删除问题</Box> : ''}
                                            { reportType === '回答' ? <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>删除回答</Box> : ''}
                                            { reportType === '用户' ? <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>封锁用户</Box> : ''}
                                        </Button>
                                    </ThemeProvider>
                                </Box>
                                
                                <Box ml={3}>
                                    <ThemeProvider theme={theme}>
                                        <Button onClick={handleClickOpen} variant="contained" size="small" color='pink' style={{ borderRadius: 13, width: 140 }}> 
                                            <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>拒绝</Box>
                                        </Button>
                                    </ThemeProvider>
                                </Box>

                                <Box ml={3}>
                                    <ThemeProvider theme={theme}>
                                        <Button onClick={linkReport} variant="contained" size="small" color='black' style={{ borderRadius: 13, width: 140 }}> 
                                            <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>返回</Box>
                                        </Button>
                                    </ThemeProvider>
                                </Box>
                            </Box> :
                            <Box>
                                <ThemeProvider theme={theme}>
                                    <Button onClick={linkReport} variant="contained" size="small" color='black' style={{ borderRadius: 13, width: 140 }}> 
                                        <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>返回</Box>
                                    </Button>
                                </ThemeProvider>
                            </Box>
                        }
                        
                    </Box>
                </Box>
            </Box>
            
            <Box>
                <Dialog fullWidth={true} open={open} onClose={handleClose} maxWidth='md'>
                    <DialogTitle>拒绝此举报</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        请输入你拒绝此举报的理由。
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        value={reason}
                        fullWidth
                        onChange={event => setReason(event.target.value)}
                        variant="standard"
                        inputProps={{ maxLength: 30 }}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>取消</Button>
                        <Button onClick={rejectReport}>提交</Button>
                    </DialogActions>
                </Dialog>
            </Box>

            <Box>
                <Dialog
                    fullWidth={true}
                    open={dialog}
                    maxWidth='xs'
                    onClose={closeDialog}>
                    <DialogTitle id="alert-dialog-title">
                        {"注意事项"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            是否确定执行此操作？
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={closeDialog}>取消</Button>
                        <Button onClick={completeReport} autoFocus>
                            确定
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    )
}

export default AdminReportViewPage