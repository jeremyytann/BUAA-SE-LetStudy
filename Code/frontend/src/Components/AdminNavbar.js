import React from 'react'
import { Grid, Box } from '@mui/material'
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
    const navigate = useNavigate();

    const linkLogin = () => {
        navigate('/admin/login');
    }

    return (
        <Box sx={{alignItems: 'center', margin: '10px 0px 0px 0px'}}>
            <Grid container alignItems='center'>
                <Grid item xs={4}>
                    
                </Grid>

                <Grid item xs={4}>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <MenuBookRoundedIcon onClick={linkLogin} color="action" fontSize="large" style={{ cursor: 'pointer' }}/>
                        
                        <Box className='web-title' onClick={linkLogin} sx={{fontSize: 24, fontWeight: 'bold', color: 'text.secondary', margin: '0px 0px 0px 7px', cursor: 'pointer'}}>
                            共同学习
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    
                </Grid>
            </Grid>
        </Box>
    )
}

export default AdminNavbar