import { Box } from '@mui/material'
import React from 'react'

const RoomParticipants = () => {
    return (
        <Box borderRadius={10} sx={{backgroundColor: 'white', height: '725px', width: '100%'}}>
            <Box paddingTop={3.5} sx={{fontSize: '40px', fontWeight: 'bold'}}>
                <small>在线成员</small>
            </Box>

            <Box mx={3} mt={4} sx={{borderTop: '1px solid black'}}>

            </Box>
        </Box>
    )
}

export default RoomParticipants