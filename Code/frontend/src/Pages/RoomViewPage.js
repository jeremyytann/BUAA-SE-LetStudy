import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import RoomParticipants from '../Components/RoomParticipants'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../Api/api'
import Chat from '../Components/Chat'

const RoomViewPage = () => {
    const { id } = useParams();
    const [room, setRoom] = useState([]);
    const [error, setError] = useState(0);
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const [checkMessages, setCheckMessages] = useState([]);
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
        }
    });

    function updateScroll(){
        var element = document.getElementById("scrolling-message");
        element.scrollTop = element.scrollHeight;
    }

    useEffect(() => {
        const fetchRoom = async() => {
            const data = await api.roomGet(id);

            if (data.errorCode === 0) {
                setRoom(data.data[0]);
            } else if (data.errorCode === 404) {
                setError(404);
            }
        }

        const fetchRoomMessages = async() => {
            const data = await api.chatGetByRoom(id);
            setMessages(data.data);
        }

        if (room.length === 0) {
            fetchRoom();
        }

        if (checkMessages.length !== messages.length) {
            updateScroll();
            setCheckMessages(messages);
        }
        
        const interval = setInterval(() => {
            if (error === 0) {
                fetchRoomMessages();
            }
        }, 1000)

        return () => clearInterval(interval);
    }, [id, error, messages, checkMessages.length])

    if (error === 404) {
        return <Navigate to='/404' />
    }

    const quitRoom = async() => {
        if (room.type === 0) {
            const data = await api.roomQuit(room.id, 0);

            if (data.errorCode === 0) {
                navigate('/rooms/public/1');
            }
        } else {
            const data = await api.roomQuit(room.id, 1);

            if (data.errorCode === 0) {
                navigate('/rooms/private/1');
            }
        }
    }

    const createMessage = async() => {
        if (message.length > 0) {
            const data = await api.chatCreate(room.id, message);
        
            if (data.errorCode === 0) {
                setMessage('');
            }
        }
    }

    const clearMessage = () => {
        setMessage('')
    }

    return (
        <Box>
            <Navbar />
            
            <Box display='flex' mt={6} mx={10}>
                <Box display='flex' fontSize={40} fontWeight='bold' width={1010}>
                    {room !== undefined ? room.name : ''}
                </Box>

                <Box ml={5}>
                    <ThemeProvider theme={theme}>
                        <Button onClick={quitRoom} variant="contained" size="small" color='black' style={{ borderRadius: 13, width: 140 }}> 
                            <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>退出房间</Box>
                        </Button>
                    </ThemeProvider>
                </Box>
            </Box>

            { room !== undefined ? 
                <Box mt={5} mx={10}>
                    <Grid container>
                        <Grid item xs={8.5}>
                            <Box borderRadius={10} sx={{backgroundColor: 'white', height: '725px', width: '95%'}}>
                                <Box id='scrolling-message' pt={5} mx={4} height={540} overflow='auto' display='flow-root' borderBottom={1}>
                                    {
                                        messages !== undefined ?
                                            messages.map((message, index) => (
                                                <Chat key={index} message={message} />
                                            ))
                                        : ''
                                    }
                                </Box>

                                <Box>
                                    <Box mx={3} mt={1.5} borderRadius={5}>
                                        <input 
                                            className='create-room-message'
                                            value={message}
                                            onChange={event => setMessage(event.target.value)}
                                            onSubmit={createMessage}
                                            type='text'
                                            placeholder='输入信息内容' 
                                            maxLength='64' required/>             
                                    </Box>

                                    <Box mt={1.5} mx={4.5} display='flex'>
                                    <Box>
                                        <ThemeProvider theme={theme}>
                                            <Button onClick={createMessage} variant="contained" size="small" color='gold' style={{ borderRadius: 13, width: 100, height: 35 }}> 
                                                <Box sx={{fontSize: 18, minWidth: '50px', fontWeight: 'bold'}}>提交</Box>
                                            </Button>
                                        </ThemeProvider>
                                    </Box>
                                    
                                    <Box ml={2}>
                                        <ThemeProvider theme={theme}>
                                            <Button onClick={clearMessage} variant="contained" size="small" color='black' style={{ borderRadius: 13, width: 100, height: 35 }}> 
                                                <Box sx={{fontSize: 18, minWidth: '50px', fontWeight: 'bold'}}>消除</Box>
                                            </Button>
                                        </ThemeProvider>
                                    </Box>
                                </Box>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={3.5}>
                            <RoomParticipants host={room.user} />
                        </Grid>
                    </Grid>
                </Box> : ''
            }
        </Box>
    )
}

export default RoomViewPage