import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material'
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import PageTitle from '../Components/PageTitle'
import api from '../Api/api'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const AdminNoticeViewPage = () => {
    const { id } = useParams();
    const [notice, setNotice] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [dialog, setDialog] = useState(false)
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
        const fetchNotice = async() => {
            const data = await api.noticeGet(id);
            setNotice(data.data[0]);
            setDate(data.data[0].created_date.split('T'))
            setTime(data.data[0].created_date.split('T')[1].split('.'))
        }

        fetchNotice();
    }, [id])

    const linkNotice = () => {
        navigate('/admin/notices/latest/1');
    }

    const toggleDialog = () => {
        setDialog(!dialog);
    }

    const closeDialog = () => {
        setDialog(false);
    }

    const noticeDelete = async() => {
        const data = await api.noticeDelete(id);

        if (data.errorCode === 0) {
            navigate('/admin/notices/latest/1');
        }
    }

    return (
        <Box>
            <Navbar />

            <PageTitle title='查看公告' />

            <Box borderRadius={10} height={725} display='flex' mt={3} mx={10} sx={{backgroundColor: '#fff'}}>
                <Box mx={7}>
                    <Box mt={7} display='flex' alignItems='center'>
                        <Box display='flex' fontSize={28} fontWeight='bold' width={140}>
                            时间
                        </Box>

                        <Box display='flex' className='report-view-username'>
                            <Box>
                                {date !== undefined ? date[0] : ''}
                            </Box>

                            <Box>
                                {time !== undefined ? time[0] : ''}
                            </Box>
                        </Box>
                    </Box>

                    <Box mt={6.5} display='flex' alignItems='center'>
                        <Box display='flex' fontSize={28} fontWeight='bold' width={140}>
                            主题
                        </Box>

                        <Box className='report-view-username'>
                            {notice !== undefined ? notice.title : ''}
                        </Box>
                    </Box>

                    <Box mt={6.5} display='flex'>
                        <Box display='flex' fontSize={28} mt={2} fontWeight='bold' width={140}>
                            内容
                        </Box>

                        <Box className='notice-description' textAlign='left' >
                            {notice !== undefined ? notice.description : ''}
                        </Box>
                    </Box>

                    <Box mt={7} display='flex'>
                        <Box display='flex'>
                            <Box>
                                <ThemeProvider theme={theme}>
                                    <Button onClick={toggleDialog} variant="contained" size="small" color="error" style={{ borderRadius: 13, width: 140 }}> 
                                    <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>删除公告</Box>
                                    </Button>
                                </ThemeProvider>
                            </Box>

                            <Box ml={3}>
                                <ThemeProvider theme={theme}>
                                    <Button onClick={linkNotice} variant="contained" size="small" color='black' style={{ borderRadius: 13, width: 140 }}> 
                                        <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>返回</Box>
                                    </Button>
                                </ThemeProvider>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Dialog
                fullWidth={true}
                open={dialog}
                maxWidth='sm'
                onClose={closeDialog}>
                <DialogTitle id="alert-dialog-title">
                    {"删除公告注意事项"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        你是否确定要删除此公告？
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog}>不了</Button>
                    <Button onClick={noticeDelete} autoFocus>
                        确定
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default AdminNoticeViewPage