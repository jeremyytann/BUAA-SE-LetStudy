import { Grid, Box, Button } from '@mui/material'
import React from 'react'
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import api from '../Api/api'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BugReportIcon from '@mui/icons-material/BugReport';

const Navbar = () => {
    let user = Cookies.get('username')
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
            },
            white: {
                main: '#fff',
                contrastText: '#000000',
            }
        }
    });

    let admin = Cookies.get('admin')

    const Logout = async(e) => {
        e.preventDefault();

        if (admin) {
            await api.adminLogout();
            navigate('/admin/login')
            window.location.reload(false)
        } else {
            await api.userLogout();
            navigate('/login')
            window.location.reload(false)
        }
    }

    const linkProfile = () => {
        if (!admin) {
            navigate(`/profile/${user}`)
        }
    }

    const linkSettings = () => {
        if (admin) {
            navigate('/admin/settings/password')
        } else {
            navigate('/settings/password')
        }
    }

    const linkBugCreate = () => {
        navigate('/bugs/create')
    }

    const linkNotices = () => {
        navigate('/notices/latest')
    }

    const linkHome = () => {
        if (admin) {
            navigate('/admin/notices/latest/1')
        } else {
            navigate('/rooms/public/1')
        }
    }

    if (user === undefined) {
        return (
            <Box sx={{alignItems: 'center', margin: '10px 0px 0px 0px'}}>
                <Grid container alignItems='center'>
                    <Grid item xs={4}>
                        
                    </Grid>
    
                    <Grid item xs={4}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <MenuBookRoundedIcon color="action" fontSize="large"/>
                            
                            <Box sx={{fontSize: 24, fontWeight: 'bold', color: 'text.secondary', margin: '0px 0px 0px 7px'}}>
                                共同学习
                            </Box>
                        </Box>
                    </Grid>
    
                    <Grid item xs={4}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                            <NotificationsIcon onClick={linkNotices} fontSize='small' style={{ margin: '0px 15px 0px 0px', cursor: 'pointer'}}/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    return (
        <Box sx={{margin: '10px 0px 0px 0px'}}>
            <Grid container alignItems='center'>
                <Grid item xs={4}>
                    
                </Grid>

                <Grid item xs={4}>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <MenuBookRoundedIcon onClick={linkHome} color="action" fontSize="large" style={{ cursor: 'pointer' }}/>
                        
                        <Box onClick={linkHome} sx={{fontSize: 24, fontWeight: 'bold', color: 'text.secondary', margin: '0px 0px 0px 7px', cursor: 'pointer'}}>
                            共同学习
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                        {admin ? 
                            '' :
                            <Box>
                                <BugReportIcon onClick={linkBugCreate} fontSize='small' style={{ margin: '4px 15px 0px 0px', cursor: 'pointer'}}/>
                                <NotificationsIcon onClick={linkNotices} fontSize='small' style={{ margin: '4px 15px 0px 0px', cursor: 'pointer'}}/>
                            </Box>
                        }
                        
                        <SettingsIcon onClick={linkSettings} fontSize="small" style={{ margin: '4px 15px 0px 0px', cursor: 'pointer'}}/>

                        <Box sx={{ margin: '0px 15px 0px 0px'}}>
                            <ThemeProvider theme={theme}>
                                <Button onClick={linkProfile} variant="contained" color="white" size="small" style={{ borderRadius: 10 }}>
                                    <Box sx={{fontSize: 15, margin: '0px 8px 0px 8px', minWidth: '50px'}}>{user}</Box>
                                </Button>
                            </ThemeProvider>
                        </Box>
                        
                        <Box sx={{ margin: '0px 15px 0px 0px'}}>
                            <ThemeProvider theme={theme}>
                                <Button onClick={Logout} variant="contained" color="black" size="small" style={{ borderRadius: 10 }}>
                                    <Box sx={{fontSize: 15, fontWeight: 'bold', margin: '0px 3px 0px 3px', minWidth: '50px'}}>登出</Box>
                                </Button>
                            </ThemeProvider>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Navbar