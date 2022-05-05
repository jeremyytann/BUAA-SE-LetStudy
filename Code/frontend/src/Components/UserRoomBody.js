import React from 'react'
import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import Room from './Room';
import api from '../Api/api'

const UserRoomBody = ({ type }) => {
    // const navigate = useNavigate();
    const { tab, page, roomname } = useParams();
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

        const fetchSearchRooms = async() => {
            const data = await api.roomSearchByName(roomname, page);
            setRooms(data.data);
        }

        if (tab === 'public') {
            fetchPublicRooms();
        } else if (tab === 'private') {
            fetchPrivateRooms();
        } else if (tab === 'search') {
            fetchSearchRooms();
        }
    }, [tab, page, roomname])


    return (
        <Box height={580} mt={5} ml={10} mr={2}>
            { rooms !== undefined && rooms.length > 0 ?
                <Box display='flex' flexWrap='wrap'>
                    {rooms.map((room, index) => (
                        <Room key={index} room={room}/>
                    ))}
                </Box> :
                <Box>
                    { tab === 'search' ? 
                        <Box>
                            <Box mt={12} fontSize={150} fontWeight='bold' color='#DDC3A5'>
                                404
                            </Box>

                            <Box fontSize={24} fontWeight='bold'>
                                抱歉，此搜索没有任何结果
                            </Box> 
                        </Box> :
                        <Box>
                            <Box mt={12} fontSize={150} fontWeight='bold' color='#DDC3A5'>
                                0
                            </Box>

                            <Box fontSize={24} fontWeight='bold'>
                                抱歉，此处还未有任何房间
                            </Box> 
                        </Box>
                    }
                </Box>
            }
        </Box>
    )
}

export default UserRoomBody