import './AdminUser.css'
import React from 'react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../Api/api'
import Navbar from '../Components/Navbar';
import { Alert, Box } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import AdminNavbar from '../Components/AdminNavbar';

const AdminLoginPage = () => {
    // navigate user to login if not logged in yet
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let color_1 = "FFFFFF";
        let color_2 = "D5D5D5";
        document.body.style.background = "linear-gradient(to bottom right, #"+ color_1 +", #"+ color_2 +")";
    }, []);

    // login page details
    const Login = async(e) => {
        e.preventDefault();

        if (username === '') {
            setError('用户名不能为空')
        } else if (password === '') {
            setError('密码不能为空')
        } else {
            const data = await api.adminLogin(username, password);

            if (data.errorCode === 403) {
                setPassword('');
                setError('用户名或密码错误');
            } else {
                navigate('/admin/notices/latest/1');
            }
        }
    }

    // redirect logged in user to home page
    let user = Cookies.get('username');
    let admin = Cookies.get('admin')
    
    if (user !== undefined && admin) {
        return <Navigate to='/admin/notices/latest/1' />
    } else if (user !== undefined && !admin) {
        return <Navigate to='/rooms/public/1' />
    }

    const linkRegister = () => {
        navigate('/register')
    }

    return (
        <Box height='100%'>
            <AdminNavbar />
            
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 14}}>
                <Box sx={{backgroundColor: 'white', width: '40%', minWidth: '400px', borderRadius: '30px', height: '650px'}}>
                    <form onSubmit={Login}>
                        <Box sx={{mt: 6}}>
                            <h1 className='admin-login-text'>管理员登录</h1>
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
                                    className='admin-login-input-box'
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
                                    className='admin-login-input-box'
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
                                className='admin-login-input-box'
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                type='password'
                                placeholder='密码' required/>
                            </Box>
                        </Box>
                        
                        { error? 
                            <Box>
                                <Box sx={{mt: 10}}>
                                    <button onSubmit={Login} type='submit' className='admin-login-button'>登录</button>
                                </Box>
                            </Box> :
                            <Box>
                                <Box sx={{mt: 15}}>
                                    <button onSubmit={Login} type='submit' className='admin-login-button'>登录</button>
                                </Box>
                            </Box> 
                        }
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default AdminLoginPage

