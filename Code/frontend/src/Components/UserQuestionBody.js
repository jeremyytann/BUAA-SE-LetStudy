import React from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'

const UserQuestionBody = () => {
    // const navigate = useNavigate();
    const { tab } = useParams();

    return (
        <Box border={1} height={580} mt={5} mx={10}>
            <Box border={1}>
                {tab}
            </Box>
        </Box>
    )
}

export default UserQuestionBody