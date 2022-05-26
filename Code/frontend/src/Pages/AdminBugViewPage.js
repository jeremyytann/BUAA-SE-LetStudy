import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PageTitle from '../Components/PageTitle'
import api from '../Api/api'

const AdminBugViewPage = () => {
    const { id } = useParams();
    const [bug, setBug] = useState();
    const [status, setStatus] = useState('');
    const [reason, setReason] = useState('');
    const [bugReason, setBugReason] = useState('');
    const [open, setOpen] = useState(false);
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

    const completeBug = async() => {
        var str = reason;

        if (str.length > 0 && str.replace(/\s/g, '').length !== 0) {
            let data = await api.bugEdit(id, 1, reason);

            if (data.errorCode === 0) {
                window.location.reload(false)
            }
        }
    }

    const linkBug = () => {
        navigate('/admin/bugs/unfinished/1');
    }

    return (
        <Box>
            <Navbar />

            <PageTitle title={'查看反馈'}/>

            <Box borderRadius={10} height={725} display='flex' mt={3} mx={10} sx={{backgroundColor: '#fff'}}>
                <Box mx={7}>
                    <Box mt={7} display='flex' alignItems='center'>
                        <Box display='flex' fontSize={28} fontWeight='bold' width={140}>
                            反馈人
                        </Box>

                        <Box className='report-view-username'>
                            { bug !== undefined ? bug.user.username : ''}
                        </Box>
                    </Box>

                    <Box mt={6.5} display='flex' alignItems='center'>
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
                                    {status + ' ( ' + bugReason + ' )'}
                                </Box> : ''
                            }
                        </Box>
                    </Box>

                    <Box mt={7} display='flex'>
                        { status === '未处理' ? 
                            <Box display='flex'>
                                <Box>
                                    <ThemeProvider theme={theme}>
                                        <Button onClick={handleClickOpen} variant="contained" size="small" color="gold" style={{ borderRadius: 13, width: 140 }}> 
                                            <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>完成</Box>
                                        </Button>
                                    </ThemeProvider>
                                </Box>

                                <Box ml={3}>
                                    <ThemeProvider theme={theme}>
                                        <Button onClick={linkBug} variant="contained" size="small" color='black' style={{ borderRadius: 13, width: 140 }}> 
                                            <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>返回</Box>
                                        </Button>
                                    </ThemeProvider>
                                </Box>
                            </Box> :
                            <Box>
                                <ThemeProvider theme={theme}>
                                    <Button onClick={linkBug} variant="contained" size="small" color='black' style={{ borderRadius: 13, width: 140 }}> 
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
                    <DialogTitle>回应此反馈</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        请输入你对此反馈做出了什么操作。
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
                        <Button onClick={completeBug}>提交</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    )
}

export default AdminBugViewPage