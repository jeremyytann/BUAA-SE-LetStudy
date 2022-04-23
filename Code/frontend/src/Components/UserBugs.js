import React from 'react'
import { Box } from '@mui/material';

const UserReports = () => {
    return (
        <Box>
            <Box paddingTop={9}sx={{width: '100%'}}>
                <Box display='flex' paddingLeft={10}>
                    <Box>
                        <Box display='flex' sx={{fontSize: '40px', fontWeight: 'bold'}}>
                            <small>我的反馈</small>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default UserReports