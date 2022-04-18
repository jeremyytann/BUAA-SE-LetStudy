import React from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'

const UserRoomBody = () => {
    // const navigate = useNavigate();
    const { tab } = useParams();

    return (
        <Box>
            <Box border={1} display='flex' mt={6} mx={10}>
                {tab}
            </Box>
        </Box>
    )
}

export default UserRoomBody