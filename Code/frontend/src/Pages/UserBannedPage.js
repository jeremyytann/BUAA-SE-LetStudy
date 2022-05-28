import React from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../Api/api';
import Navbar from '../Components/Navbar';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const UserBannedPage = () => {
    const navigate = useNavigate();

    const userLogout = async(e) => {
        e.preventDefault();

        await api.userLogout();
        navigate('/login');
        window.location.reload(false);
    }

    return (
        <Box>
            <Navbar />

            <Dialog
                fullWidth={true}
                open={true}
                maxWidth='sm'
                onClose={userLogout}>
                <DialogTitle id="alert-dialog-title">
                    {"账户封锁"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        你的账户已被管理员封锁
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={userLogout}>好的</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default UserBannedPage