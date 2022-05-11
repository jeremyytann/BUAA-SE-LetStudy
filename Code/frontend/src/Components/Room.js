import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../Api/api'
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import PersonIcon from '@mui/icons-material/Person';

const Room = ({ room }) => {
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [count, setCount] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomMemberCount = async() => {
            const data = await api.participantCountByRoom(room.id);

            if (data.count > 999 && data.count <= 9999) {
                setCount((data.count / 1000).toFixed(1) + "k")
            } else if (data.count > 9999) {
                setCount((data.count / 10000).toFixed(1) + "w")
            } else if (data.count <= 999) {
                setCount(data.count)
            }
        }

        fetchRoomMemberCount();
    }, [room])

    const handleClose = () => {
        setOpen(false);
    };

    const joinRoom = async() => {
        if (room.lock === false) {
            const data = await api.roomJoin(room.id, 0);

            if (data.errorCode === 0) {
                navigate(`/room/${room.id}`);
            }
        } else if (room.lock === true) {
            if (open === false) {
                setOpen(true);
            }
        }
    }

    const joinPrivateRoom = async() => {
        const data = await api.roomJoin(room.id, 1, password);

        if (data.errorCode === 0) {
            navigate(`/room/${room.id}`);
        }
    }

    return (
        <Box className='question-view-background' border={1} height={130} width={870} mr={2.5} mb={2.2} borderRadius={5} onClick={joinRoom} sx={{cursor: 'pointer'}}>
            { room.type === 1 ?
            <Box mt={2.5} mx={3} display='flex' height={35}>
                <Box display='flex' width={680}>
                    <Box className='question-view-title' maxWidth={650} fontWeight='bold' fontSize={18}>
                        {room.name}
                    </Box>

                    { room.lock ? 
                        <Box ml={1}>
                            <LockRoundedIcon fontSize='small' />
                        </Box> : ''
                    }
                </Box>
            </Box> :
            <Box mt={2.5} mx={3} display='flex' height={68}>
                <Box display='flex' width={680}>
                    <Box className='question-view-title' maxWidth={650} fontWeight='bold' fontSize={18}>
                        {room.name}
                    </Box>

                    { room.lock ? 
                        <Box ml={1}>
                            <LockRoundedIcon fontSize='small' />
                        </Box> : ''
                    }
                </Box>
            </Box>
            }

            { room.type === 1 ? 
                <Box ml={80} display='flex' alignItems='center' fontWeight='bold'>
                    <Box mr={1} mt={0.7}>
                        <PersonIcon />
                    </Box>
                    
                    <Box>
                        {room.user}
                    </Box>
                </Box> : ''
            }
            

            <Box ml={80} display='flex' alignItems='center' fontWeight='bold'>
                <Box mr={1} mt={0.5}>
                    <FiberManualRecordRoundedIcon color='success' />
                </Box>
                
                <Box>
                    在线人数：{count}
                </Box>
            </Box>

            <Dialog fullWidth={true} open={open} maxWidth='md'>
                <DialogTitle fontWeight='bold'>加入房间 {room.name}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    请输入房间的密码
                </DialogContentText>
                <TextField
                    autoFocus
                    type='password'
                    margin="dense"
                    value={password}
                    fullWidth
                    onChange={event => setPassword(event.target.value)}
                    variant="standard"
                    inputProps={{ maxLength: 30 }}
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={joinPrivateRoom}>加入</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Room