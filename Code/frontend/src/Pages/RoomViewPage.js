import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import RoomParticipants from '../Components/RoomParticipants'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../Api/api'

const RoomViewPage = () => {
    const { id } = useParams();
    const [room, setRoom] = useState([]);
    const navigate = useNavigate();

    const theme = createTheme ({
        typography: {
            button: {
                textTransform: 'none',
            }
        },

        palette: {
            black: {
                main: '#000000',
                contrastText: '#fff',
            }
        }
    });

    useEffect(() => {
        const fetchRoom = async() => {
            const data = await api.roomGet(id);
            setRoom(data.data[0]);
        }

        fetchRoom();
    }, [id])

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
                                <Box mx={5} height={620} borderBottom={1}>

                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={3.5}>
                            <RoomParticipants />
                        </Grid>
                    </Grid>
                </Box> : ''
            }
        </Box>
    )
}

export default RoomViewPage