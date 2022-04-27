import { Box, Button } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PageTitle from '../Components/PageTitle'
import api from '../Api/api'

const BugViewPage = () => {
    const { id } = useParams();
    const [bug, setBug] = useState();
    const [status, setStatus] = useState('');
    const [bugReason, setBugReason] = useState('');
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
        const fetchBug = async() => {
            const data = await api.bugGet(id);
            setBug(data.data[0]);
            setBugReason(data.data[0].reason);

            if (data.data[0].status === 0) {
                setStatus('未处理')
            } else if (data.data[0].status === 1) {
                setStatus('已处理')
            }
        }

        fetchBug();
    }, [id])

    const linkBug = () => {
        navigate('/settings/bugs');
    }

    return (
        <Box>
            <Navbar />

            <PageTitle title={'查看反馈'}/>
            
            <Box borderRadius={10} height={725} display='flex' mt={3} mx={10} sx={{backgroundColor: '#fff'}}>
                <Box mx={7}>
                    <Box mt={7} display='flex' alignItems='center'>
                        <Box display='flex' fontSize={28} fontWeight='bold' width={140}>
                            类型
                        </Box>

                        <Box className='report-view-username'>
                            { bug !== undefined ? bug.type : ''}
                        </Box>
                    </Box>

                    <Box mt={6.5} display='flex' alignItems='center'>
                        <Box display='flex' fontSize={28} fontWeight='bold' width={140}>
                            主题
                        </Box>

                        <Box className='report-view-username'>
                            { bug !== undefined ? bug.title : ''}
                        </Box>
                    </Box>

                    <Box mt={6.5} display='flex'>
                        <Box display='flex' fontSize={28} mt={2} fontWeight='bold' width={140}>
                            描述
                        </Box>

                        <Box className='report-description' textAlign='left' >
                            {bug !== undefined ? bug.description : ''}
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
                                    {status}
                                </Box> : ''
                            }
                        </Box>
                    </Box>

                    <Box mt={6.5} display='flex' alignItems='center'>
                        <Box display='flex' fontSize={28} fontWeight='bold' width={140}>
                            回应
                        </Box>

                        <Box className='bug-view-reason' textAlign='left' >
                            { status === '未处理' ?
                                <Box fontWeight='bold'>
                                    暂无
                                </Box> : ''
                            }

                            { status === '已处理' ?
                                <Box fontWeight='bold'>
                                    {bugReason}
                                </Box> : ''
                            }
                        </Box>
                    </Box>

                    <Box mt={7} display='flex'>
                        <Box>
                            <ThemeProvider theme={theme}>
                                <Button onClick={linkBug} variant="contained" size="small" color='black' style={{ borderRadius: 13, width: 140 }}> 
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

export default BugViewPage