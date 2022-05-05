import React from 'react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert, Box } from '@mui/material';
import api from '../Api/api';
import Navbar from '../Components/Navbar';
import './GeneralUser.css'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';

const UserRegisterPage = () => {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [conpassword, setConPassword] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let color_1 = "FFFFFF";
        let color_2 = "DDC3A5";
        document.body.style.background = "linear-gradient(to bottom right, #"+ color_1 +", #"+ color_2 +")";
    }, []);

    const validUsername = /^[A-Za-z0-9._]+$/;
    const validPassword = /^[A-Za-z0-9._]+$/;

    const Register = async(e) => {
        e.preventDefault();

        if (!validUsername.test(username)) {
            setError('用户名仅支持 [A-Z, a-z, 0-9, ., _]');
        } else if (!validPassword.test(password)) {
            setError('密码仅支持 [A-Z, a-z, 0-9, ., _]');
        } else if (password !== conpassword) {
            setError('密码与确认密码不一致');
        } else {
            var data = await api.userRegister(username, password);
            console.log(data.data[0]);

            if (data.errorCode === 400) {
                setError('用户名已被注册');
            } else {
                Cookies.set('user_id', data.data[0].id);
                Cookies.set('username', data.data[0].username);
                navigate('/rooms/public/1')
            }
        }
    }

    const linkLogin = () => {
        navigate('/login')
    }

    // automatically send registered user to home page
    let user = Cookies.get('username');

    if (user !== undefined) {
        return <Navigate to='/rooms/all/1'/>
    }

    return (
        <div>
            <Navbar />

            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 14}}>
                <Box sx={{backgroundColor: 'white', width: '40%', minWidth: '400px', borderRadius: '30px', height: '650px'}}>
                    <form onSubmit={Register}>
                        <Box sx={{mt: 6}}>
                            <h1 className='login-text'>注册</h1>
                        </Box>

                        { error?
                        <Box sx={{mt: 5, mb: 5}}>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Alert sx={{width: '260px', justifyContent: 'center', borderRadius: '15px'}} severity="error" >{error}</Alert>
                            </Box>
                        </Box> : ''
                        }

                        { error? 
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4}}>
                                <Box>
                                    <PersonRoundedIcon sx={{ mr: 2 }} />
                                </Box>
                                
                                <Box>
                                    <input 
                                    className='login-input-box'
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
                                    type='username'
                                    placeholder='用户名' 
                                    maxLength='15' required/>
                                </Box>
                            </Box> :
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 10}}>
                                <Box>
                                    <PersonRoundedIcon sx={{ mr: 2 }} />
                                </Box>
                                
                                <Box>
                                    <input 
                                    className='login-input-box'
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
                                    type='username'
                                    placeholder='用户名'
                                    maxLength='15' required/>
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

                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2}}>
                            <Box>
                                <VpnKeyRoundedIcon sx={{ mr: 2, mt: 2 }} />
                            </Box>
                            
                            <Box sx={{mt: 3}}>
                                <input 
                                className='login-input-box'
                                value={conpassword}
                                onChange={event => setConPassword(event.target.value)}
                                type='password'
                                placeholder='确认密码' required/>
                            </Box>
                        </Box>
                        
                        { error? 
                            <Box>
                                <Box sx={{mt: 5}}>
                                    <button onSubmit={Register} type='submit' className='login-button'>注册</button>
                                </Box>

                                <Box sx={{mt: 3}}>
                                    <small onClick={linkLogin} className='register-link'>已有账户？点此登录</small>
                                </Box>
                            </Box> :
                            <Box>
                                <Box sx={{mt: 11}}>
                                    <button onSubmit={Register} type='submit' className='login-button'>注册</button>
                                </Box>

                                <Box sx={{mt: 3}}>
                                    <small onClick={linkLogin} className='register-link'>已有账户？点此登录</small>
                                </Box>
                            </Box> 
                        }
                    </form>
                </Box>
            </Box>

                
        </div>
    )
}

export default UserRegisterPage