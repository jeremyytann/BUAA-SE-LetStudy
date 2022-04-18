import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../Api/api'
import Navbar from '../Components/Navbar';
import { Alert, Box } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import './GeneralUser.css'

const UserLoginPage = () => {
    // navigate user to login if not logged in yet
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // login page details
    const Login = async(e) => {
        e.preventDefault();
        const data = await api.userLogin(username, password);

        if (data.errorCode === 403) {
            setPassword('');
            setError('用户名或密码错误');
        } else {
            navigate('/rooms/public/1');
        }
    }

    // redirect logged in user to home page
    let user = Cookies.get('username');
    
    if (user !== undefined) {
        return <Navigate to='/rooms/public/1' />
    }

    const linkRegister = () => {
        navigate('/register')
    }

    return (
        <Box>
            <Navbar />
            
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 14}}>
                <Box sx={{backgroundColor: 'white', width: '40%', minWidth: '400px', borderRadius: '30px', height: '650px'}}>
                    <form onSubmit={Login}>
                        <Box sx={{mt: 6}}>
                            <h1 className='login-text'>登录</h1>
                        </Box>
                        
                        { error?
                        <Box sx={{mt: 8, mb: 6}}>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Alert sx={{width: '260px', justifyContent: 'center', borderRadius: '15px'}} severity="error" >{error}</Alert>
                            </Box>
                        </Box> : ''
                        }

                        { error? 
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2}}>
                                <Box>
                                    <PersonRoundedIcon sx={{ mr: 2 }} />
                                </Box>
                                
                                <Box>
                                    <input 
                                    className='login-input-box'
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
                                    type='username'
                                    placeholder='用户名' required/>
                                </Box>
                            </Box> : 
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 15}}>
                                <Box>
                                    <PersonRoundedIcon sx={{ mr: 2 }} />
                                </Box>
                                
                                <Box>
                                    <input 
                                    className='login-input-box'
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
                                    type='username'
                                    placeholder='用户名' required/>
                                </Box>
                            </Box>
                        }
                        
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2}}>
                            <Box>
                                <VpnKeyRoundedIcon sx={{ mr: 2, mt: 2 }} />
                            </Box>
                            
                            <Box sx={{mt: 3}}>
                                <input 
                                className='login-input-box'
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                type='password'
                                placeholder='密码' required/>
                            </Box>
                        </Box>
                        
                        { error? 
                            <Box>
                                <Box sx={{mt: 10}}>
                                    <button onSubmit={Login} type='submit' className='login-button'>登录</button>
                                </Box>

                                <Box sx={{mt: 3}}>
                                    <small onClick={linkRegister} className='register-link'>没有账户？点此注册</small>
                                </Box>
                            </Box> :
                            <Box>
                                <Box sx={{mt: 15}}>
                                    <button onSubmit={Login} type='submit' className='login-button'>登录</button>
                                </Box>

                                <Box sx={{mt: 3}}>
                                    <small onClick={linkRegister} className='register-link'>没有账户？点此注册</small>
                                </Box>
                            </Box> 
                        }
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default UserLoginPage