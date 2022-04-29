import { Box, Grid } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../Api/api'

const User = ({ user }) => {
    const [follower, setFollower] = useState();
    const [noteCount, setNoteCount] = useState();
    const navigate = useNavigate();

    const theme = createTheme ({
        palette: {
            gold: {
                main: '#E0A96D',
                contrastText: '#fff',
            }
        }
    });

    useEffect(() => {
        const fetchFollowerCount = async() => {
            const data = await api.followshipGetCountByUser(user.username);

            if (data.errorCode === 0) {
                if (data.count > 999 && data.count <= 9999) {
                    setFollower((data.count / 1000).toFixed(1) + "k")
                } else if (data.count > 9999) {
                    setFollower((data.count / 10000).toFixed(1) + "w")
                } else if (data.count <= 999) {
                    setFollower(data.count)
                }
            }
        }

        const fetchNoteCount = async() => {
            const data = await api.noteGetAllCountByUser(user.username);

            if (data.count > 999 && data.count <= 9999) {
                setNoteCount((data.count / 1000).toFixed(1) + "k")
            } else if (data.count > 9999) {
                setNoteCount((data.count / 10000).toFixed(1) + "w")
            } else if (data.count <= 999) {
                setNoteCount(data.count)
            }
        }

        fetchFollowerCount();
        fetchNoteCount();
    }, [user])

    const linkProfile = () => {
        navigate(`/profile/${user.username}/notes`)
    }

    return (
        <Box className='question-view-background' border={1} height={150} width={400} mr={6.3} mb={6.3} borderRadius={5} onClick={linkProfile} sx={{cursor: 'pointer'}}>
            <Box margin={2.0} ml={3}>
                <Box display='flex' fontWeight='bold' fontSize={20} alignItems='center'>
                    <Box>
                        {user.username}
                    </Box>
                    
                    <Box ml={1} mt={0.5}>
                        { user.status === 1 ? 
                            <FiberManualRecordRoundedIcon fontSize='small' color='success' /> :
                            <FiberManualRecordRoundedIcon fontSize='small' color='error' /> 
                        }
                    </Box>
                </Box>

                <Grid container>
                    <Grid item xs={8.5}>
                        <Box display='flex' mt={1}>
                            {'#' + user.id}
                        </Box>
                        
                        <Box display='flex' mt={5}>
                            注册于 {user.created_date}
                        </Box>
                    </Grid>

                    <Grid item xs={3.5}>
                        <Box display='flex' mt={2.5}>
                            <PeopleRoundedIcon />

                            <Box ml={2} mt={0.1} fontSize={18} fontWeight='bold'>
                                {follower}
                            </Box>
                        </Box>

                        <Box display='flex' mt={2}>
                            <ThemeProvider theme={theme}>
                                <MailRoundedIcon color='gold' />
                            </ThemeProvider>

                            <Box ml={2} mt={0.1} fontSize={18} fontWeight='bold'>
                                {noteCount}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                
            </Box>
        </Box>
    )
}

export default User