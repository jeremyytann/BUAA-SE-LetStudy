import { Box, Button } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PageTitle from '../Components/PageTitle'
import api from '../Api/api'

const ReportViewPage = () => {
    const { id } = useParams();
    const [report, setReport] = useState();
    const [reportType, setReportType] = useState('');
    const [reportReason, setReportReason] = useState('');
    const [error, setError] = useState(0)
    const [path, setPath] = useState('');
    const [status, setStatus] = useState('')
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

    useEffect(() => {
        const fetchReport = async() => {
            const data = await api.reportGet(id);

            if (data.errorCode === 0) {
                setReport(data.data[0]);
                setReportReason(data.data[0].reason)

                if (data.data[0].status !== 1) {
                    if (data.data[0].type === 1) {
                        if (data.data[0].note !== undefined) {
                            setReportType('笔记');
                            setPath(`/note/${data.data[0].note.id}`)
                        } else {
                            setReportType('笔记');
                            setPath('')
                        }
                    } else if (data.data[0].type === 2) {
                        if (data.data[0].comment !== undefined) {
                            setReportType('留言');
                            setPath(`/note/${data.data[0].comment.note.id}`)
                        } else {
                            setReportType('留言');
                            setPath('')
                        }
                    } else if (data.data[0].type === 3) {
                        if (data.data[0].question !== undefined) {
                            setReportType('问题');
                            setPath(`/question/${data.data[0].question.id}`)
                        } else {
                            setReportType('问题');
                            setPath('')
                        }
                    } else if (data.data[0].type === 4) {
                        if (data.data[0].answer !== undefined) {
                            setReportType('回答');
                            setPath(`/question/${data.data[0].answer.question.id}`)
                        } else {
                            setReportType('回答');
                            setPath('')
                        }
                    } else if (data.data[0].type === 5) {
                        if (data.data[0].user !== undefined) {
                            setReportType('用户');
                            setPath(`/profile/${data.data[0].user.username}`)
                        } else {
                            setReportType('用户');
                            setPath('')
                        }
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
            } else if (data.errorCode === 404) {
                setError(404);
            }
        }

        fetchReport();
    }, [id])

    if (error === 404) {
        return <Navigate to='/404' />
    }

    const linkReport = () => {
        navigate('/settings/reports');
    }

    const linkPath = () => {
        navigate(path);
    }

    return (
        <Box>
            <Navbar />

            <PageTitle title={'查看举报'}/>
            
            <Box borderRadius={10} height={725} display='flex' mt={3} mx={10} sx={{backgroundColor: '#fff'}}>
                <Box mx={7}>
                    <Box mt={7} display='flex' alignItems='center'>
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
                            report !== undefined ? 
                                report.status !== 1 ? 
                                    path !== '' ?
                                        <Box onClick={linkPath} className='report-view-title'>
                                            <Box className='report-view-title-text' borderBottom={1} sx={{cursor: 'pointer'}}>
                                                {report !== undefined ? report.title : ''}
                                            </Box>
                                        </Box> :
                                        <Box>
                                            <Box className='report-view-username'>
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
                                    { reportType === '笔记' ? status : ''}
                                    { reportType === '留言' ? status : ''}
                                    { reportType === '问题' ? status : ''}
                                    { reportType === '回答' ? status : ''}
                                    { reportType === '用户' ? status : ''}
                                </Box> : ''
                            }

                            { status === '已拒绝' ?
                                <Box fontWeight='bold' sx={{color: '#BC544B'}}>
                                    {status}
                                </Box> : ''
                            }
                        </Box>
                    </Box>

                    <Box mt={6.5} display='flex' alignItems='center'>
                        <Box display='flex' fontSize={28} fontWeight='bold' width={140}>
                            回应
                        </Box>

                        <Box className='report-view-reason' textAlign='left' >
                            { status === '未处理' ?
                                <Box fontWeight='bold'>
                                    暂无
                                </Box> : ''
                            }

                            { status === '已处理' ?
                                <Box fontWeight='bold'>
                                    { reportType === '笔记' ? '管理员已删除此笔记' : ''}
                                    { reportType === '留言' ? '管理员已删除此留言' : ''}
                                    { reportType === '问题' ? '管理员已删除此问题' : ''}
                                    { reportType === '回答' ? '管理员已删除此回答' : ''}
                                    { reportType === '用户' ? '管理员已封锁此用户' : ''}
                                </Box> : ''
                            }

                            { status === '已拒绝' ?
                                <Box fontWeight='bold'>
                                    {reportReason}
                                </Box> : ''
                            }
                        </Box>
                    </Box>

                    <Box mt={6.5} display='flex'>                    
                        <Box>
                            <ThemeProvider theme={theme}>
                                <Button onClick={linkReport} variant="contained" size="small" color='black' style={{ borderRadius: 13, width: 140 }}> 
                                    <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>返回</Box>
                                </Button>
                            </ThemeProvider>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ReportViewPage