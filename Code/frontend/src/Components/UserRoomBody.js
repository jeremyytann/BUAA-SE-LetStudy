import React from 'react'
import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import Room from './Room';
import api from '../Api/api'

const UserRoomBody = ({ type }) => {
    // const navigate = useNavigate();
    const { tab, page } = useParams();
    const [rooms, setRooms] = useState();

    // private
    useEffect(() => {
        const fetchPublicRooms = async() => {
            const data = await api.roomGetPublic();
            setRooms(data.data);
        }

        const fetchPrivateRooms = async() => {
            const data = await api.roomGetPrivateByPage(page);
            setRooms(data.data);
        }

        if (tab === 'public') {
            fetchPublicRooms();
        } else if (tab === 'private') {
            fetchPrivateRooms(page);
        }
    }, [tab, page])


    return (
        <Box height={580} mt={5} ml={10} mr={2}>
            { rooms !== undefined ?
                <Box display='flex' flexWrap='wrap'>
                    {rooms.map((room, index) => (
                        <Room key={index} room={room}/>
                    ))}
                </Box> : ''
            }
        </Box>
    )
}

export default UserRoomBody