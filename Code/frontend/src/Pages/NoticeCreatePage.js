import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Button, Grid } from '@mui/material'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../Components/PageTitle'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../Api/api'

const NoticeCreatePage = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
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
            }
        }
    });

    const createNotice = async(e) => {
        e.preventDefault();

        if (title === '') {
            setError('请输入笔记主题');
        } else if (description === '') {
            setError('请输入笔记内容');
        } else {
            const notice = await api.noticeCreate(title, description);

            // should navigate to that note page
            navigate('/admin/notices/latest/1');
        }
    }

    const linkAdminHome = () => {
        navigate('/admin/notices/latest/1');
    }

    return (
        <Box>
            <Navbar />
            <PageTitle title={'创建公告'}/>
            
            <form onSubmit={createNotice}>
                <Box borderRadius={10} height={725} display='flex' mt={3} mx={10} sx={{backgroundColor: '#fff'}}>
                    <Box mx={7}>
                        <Box display='flex'>
                            <Box mt={5}>
                                <Box display='flex' fontSize={16} fontWeight='bold' ml={1} mb={2}>
                                    公告主题
                                </Box>

                                <Box display='flex' alignItems='center'>
                                    <Box fontSize={18}>
                                        <input 
                                            className='create-notice-title'
                                            value={title}
                                            onChange={event => setTitle(event.target.value)}
                                            type='text'
                                            placeholder='输入公告主题' 
                                            maxLength='30' required/>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box mt={4}>
                            <Box display='flex' fontSize={16} fontWeight='bold' ml={1} mb={2}>
                                公告内容
                            </Box>

                            <Box display='flex'>
                                <Box fontSize={18}>
                                    <Box>
                                        <textarea 
                                            className='create-notice-description'
                                            value={description}
                                            onChange={event => setDescription(event.target.value)}
                                            type='text'
                                            placeholder='输入公告内容'
                                            maxLength='128' required/>
                                    </Box>
                                </Box>
                            </Box>

                            <Box mt={4} display='flex'>
                                <Box>
                                    <ThemeProvider theme={theme}>
                                        <Button onClick={createNotice} variant="contained" size="small" color="gold" style={{ borderRadius: 13, width: 140 }}> 
                                            <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>发布</Box>
                                        </Button>
                                    </ThemeProvider>
                                </Box>
                                
                                <Box ml={3}>
                                    <ThemeProvider theme={theme}>
                                        <Button onClick={linkAdminHome} variant="contained" size="small" color='black' style={{ borderRadius: 13, width: 140 }}> 
                                            <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>取消</Box>
                                        </Button>
                                    </ThemeProvider>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}

export default NoticeCreatePage