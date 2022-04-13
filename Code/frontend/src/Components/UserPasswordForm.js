import React from 'react'
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, Alert } from '@mui/material';
import api from '../Api/api';
import Cookies from 'js-cookie'

const UserPasswordForm = () => {
    let user_id = Cookies.get('user_id');
    let user = Cookies.get('username');
    const [newpass, setNewPass] = useState([]);
    const [conpassword, setConPassword] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const validPassword = /^[A-Za-z0-9._]+$/;

    const ChangePassword = async(e) => {
        e.preventDefault();

        if (!validPassword.test(newpass)) {
            setError('密码仅支持 [A-Z, a-z, 0-9, ., _]');
        } else if (newpass !== conpassword) {
            setError('密码与确认密码不一致');
        } else {
            let data = await api.userChangePass(user_id, newpass);
            
            if (data.errorCode === 0) {
                setSuccess('密码修改成功')
                setNewPass('')
                setConPassword('')
            }
        }
    }

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
            white: {
                main: '#fff',
                contrastText: '#000000',
            }
        }
    });

    return (
        <Box>
            <Box paddingTop={9}sx={{width: '100%'}}>
                <Box display='flex' paddingLeft={10}>
                    <Box>
                        <Box display='flex' sx={{fontSize: '40px', fontWeight: 'bold'}}>
                            <small>账户信息</small>
                        </Box>
                    </Box>
                </Box>
            </Box>

            { success?
                <Box sx={{mt: 5, mb: 3}}>
                    <Box paddingLeft={10} sx={{display: 'flex', alignItems: 'center'}}>
                        <Alert sx={{width: '260px', justifyContent: 'center', borderRadius: '15px', height: '35px'}} severity="success" >{success}</Alert>
                    </Box>
                </Box> : ''
            }

            { error?
                <Box sx={{mt: 5, mb: 3}}>
                    <Box paddingLeft={10} sx={{display: 'flex', alignItems: 'center'}}>
                        <Alert sx={{width: '260px', justifyContent: 'center', borderRadius: '15px', height: '35px'}} severity="error" >{error}</Alert>
                    </Box>
                </Box> : ''
            }
            
            <Box display='flex' alignItems='center' mt={6} sx={{width: '100%'}}>
                <Box paddingLeft={10} sx={{width: '100px', fontSize: '20px', mr: 8}}>学习 ID</Box>
                
                <Box>
                    <input 
                    className='password-disabled-box'
                    value={'#' + user_id} disabled/>
                </Box>
            </Box>

            <Box display='flex' alignItems='center' mt={5} sx={{width: '100%'}}>
                <Box paddingLeft={10} sx={{width: '100px', fontSize: '20px', mr: 8}}>用户名</Box>
                
                <Box>
                    <input 
                    className='password-disabled-box'
                    value={user} disabled/>
                </Box>
            </Box>

            <form onSubmit={ChangePassword}>
                <Box display='flex' alignItems='center' mt={5} sx={{width: '100%'}}>
                    <Box paddingLeft={10} sx={{width: '100px', fontSize: '20px', mr: 8}}>新密码</Box>
                    
                    <Box>
                        <input 
                        className='password-input-box'
                        value={newpass} 
                        onChange={event => setNewPass(event.target.value)}
                        type='password' required/>
                    </Box>
                </Box>

                <Box display='flex' alignItems='center' mt={5} sx={{width: '100%'}}>
                    <Box paddingLeft={10} sx={{width: '100px', fontSize: '20px', mr: 8}}>确认密码</Box>
                    
                    <Box>
                        <input 
                        className='password-input-box'
                        value={conpassword} 
                        onChange={event => setConPassword(event.target.value)}
                        type='password' required/>
                    </Box>
                </Box>

                <Box display='flex' alignItems='center' mt={7} sx={{width: '100%'}}>
                    <Box paddingLeft={10}>
                        <ThemeProvider theme={theme}>
                            <Button onClick={ChangePassword} variant="contained" color="gold" size="medium" style={{ borderRadius: 10 }}>
                                <Box sx={{fontSize: 18, fontWeight: 'bold', height: '30px', minWidth: '200px'}}>更换密码</Box>
                            </Button>
                        </ThemeProvider>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}

export default UserPasswordForm