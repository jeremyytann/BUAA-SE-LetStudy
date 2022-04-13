import React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Api/api'
import Cookies from 'js-cookie'

const UserTerminate = () => {
    const [dialog, setDialog] = useState(false)
    const navigate = useNavigate();

    const theme = createTheme ({
        typography: {
            button: {
                textTransform: 'none',
            }
        },

        palette: {
            pink: {
                main: '#FF8E88',
                contrastText: '#fff',
            },
            white: {
                main: '#fff',
                contrastText: '#000000',
            }
        }
    });

    const toggleDialog = () => {
        setDialog(!dialog);
    }

    const closeDialog = () => {
        setDialog(false);
    }

    const terminateAccount = async(e) => {
        e.preventDefault();
        let user_id = Cookies.get('user_id')
        const data = await api.userDelete(user_id)
        
        // confirm done terminate account, navigate back to login page
        if (data.errorCode === 0) {
            navigate('/login')
        }
    }

    return (
        <Box>
            <Box paddingTop={9}sx={{width: '100%'}}>
                <Box display='flex' paddingLeft={10}>
                    <Box>
                        <Box display='flex' sx={{fontSize: '40px', fontWeight: 'bold'}}>
                            <small>注销账户</small>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box alignItems='center' mt={7}>
                <Box sx={{width: '345px', fontSize: '20px', mr: 8}}>
                    想注销您的账户吗？
                </Box>
            </Box>

            <Box display='flex' alignItems='center' mt={4}>
                <Box paddingLeft={10}>
                    <ThemeProvider theme={theme}>
                        <Button onClick={toggleDialog} variant="contained" color="pink" size="medium" style={{ borderRadius: 10 }}>
                            <Box sx={{fontSize: 18, fontWeight: 'bold', height: '30px', minWidth: '200px'}}>注销我的账户</Box>
                        </Button>
                    </ThemeProvider>
                </Box>
            </Box>

            <Dialog
                open={dialog}
                onClose={closeDialog}>
                <DialogTitle id="alert-dialog-title">
                    {"注意事项"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        点击确定，即同意系统删除与该账户相关的所有资料。
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog}>不了</Button>
                    <Button onClick={terminateAccount} autoFocus>
                        确定
                    </Button>
                </DialogActions>
            </Dialog>

            {/* <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop}>
                confirm?
            </Backdrop> */}
        </Box>
    )
}

export default UserTerminate