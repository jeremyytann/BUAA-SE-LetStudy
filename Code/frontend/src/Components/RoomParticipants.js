import { Box } from '@mui/material'
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import api from '../Api/api'
import RoomParticipant from './RoomParticipant';

const RoomParticipants = ({ host }) => {
    const { id } = useParams();
    const [participants, setParticipants] = useState();

    useEffect(() => {
        const fetchParticipants = async() => {
            const data = await api.participantByRoom(id);

            setParticipants(data.data);
        }

        const interval = setInterval(() => {
            fetchParticipants();
        }, 1000)

        return () => clearInterval(interval);
    }, [id])

    return (
        <Box borderRadius={10} sx={{backgroundColor: 'white', height: '725px', width: '100%'}}>
            <Box paddingTop={3.5} sx={{fontSize: '40px', fontWeight: 'bold'}}>
                <small>在线成员</small>
            </Box>

            <Box mx={3} mt={4} sx={{borderTop: '1px solid black'}}>
                { 
                    participants !== undefined && participants.length > 0 ? 
                        <Box mt={4} mx={3}>
                            {participants.map((participant, index) => (
                                <RoomParticipant key={index} participant={participant} host={host}/>
                            ))}
                        </Box>
                    : ''
                }
            </Box>
        </Box>
    )
}

export default RoomParticipants