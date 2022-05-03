import { Box, Checkbox, Button } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../Api/api'

const RoomCreateBody = () => {
    const [name, setName] = useState('')
    const [lock, setLock] = useState(false);
    const [password, setPassword] = useState('');
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

    const handleLockChange = (event) => {
        setLock(event.target.checked)
    }

    const createRoom = async() => {
        const data = await api.roomCreate(name, '1', lock, password);

        if (data.errorCode === 0) {
            navigate(`/room/${data.data[0].id}`)
        }
    }

    const linkPrivateRoom = () => {
        navigate('/rooms/private/1')
    }

    return (
        <Box height={580} mt={5} ml={10} mr={8} borderRadius={10} sx={{backgroundColor: 'white'}}>
            <form onSubmit={createRoom}>
                <Box mt={5} ml={5}>
                    <Box pt={5} ml={1} display='flex' fontWeight='bold' fontSize={35}>
                        创建房间
                    </Box>

                    <Box display='flex' alignItems='center' pt={5}>
                        <Box fontSize={25} fontWeight='bold' ml={1} width={125}>
                            房间名
                        </Box>

                        <Box ml={5} display='flex' alignItems='center'>
                            <Box fontSize={18}>
                                <input 
                                    className='create-room-name'
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                    type='text'
                                    placeholder='输入房间名' 
                                    maxLength='30' required/>
                            </Box>
                        </Box>
                    </Box>

                    <Box display='flex' alignItems='center' mt={3}>
                        <Box fontSize={25} fontWeight='bold' ml={1} width={125}>
                            设置密码
                        </Box>

                        <Box ml={5} display='flex' alignItems='center'>
                            <Box fontSize={18}>
                                <Checkbox 
                                    checked = {lock}
                                    onChange={handleLockChange}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
                                    color='default'
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Box height={170} mt={3}>
                        { lock === true ? 
                            <Box display='flex' alignItems='center'>
                                <Box fontSize={25} fontWeight='bold' ml={1} width={125}>
                                    密码
                                </Box>

                                <Box ml={5} display='flex' alignItems='center'>
                                    <Box fontSize={18}>
                                        <input 
                                            className='create-room-name'
                                            value={password}
                                            onChange={event => setPassword(event.target.value)}
                                            type='password'
                                            placeholder='输入密码' 
                                            maxLength='30' required/>
                                    </Box>
                                </Box>
                            </Box> : ''
                        }
                    </Box>

                    <Box mt={4} ml={2} display='flex'>
                        <Box>
                            <ThemeProvider theme={theme}>
                                <Button onClick={createRoom} variant="contained" size="small" color="gold" style={{ borderRadius: 13, width: 140 }}> 
                                    <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>创建</Box>
                                </Button>
                            </ThemeProvider>
                        </Box>
                        
                        <Box ml={5}>
                            <ThemeProvider theme={theme}>
                                <Button onClick={linkPrivateRoom} variant="contained" size="small" color='black' style={{ borderRadius: 13, width: 140 }}> 
                                    <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>取消</Box>
                                </Button>
                            </ThemeProvider>
                        </Box>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}

export default RoomCreateBody