import React from 'react'
import { Box } from '@mui/material'
import '../Pages/GeneralUser.css'

const UserNotice = ({ notice }) => {
    let date = notice.created_date.split('T')
    let time = date[1].split('.')

    return (
        <Box className='notice-view-background' borderRadius={5} mb={3} height={130} maxHeight={130} width={1150} maxWidth={1150} border={1}>
            <Box display='flex' textAlign='left' mx={2.5} mt={2} height={15} color='darkgrey' fontSize={14}>
                {date[0] + ' ' + time[0]}
            </Box>
            <Box display='flex' textAlign='left' fontWeight='bold' fontSize={16} mt={1.5} ml={2.5}>
                {notice.title}
            </Box>
            <Box display='flex' textAlign='left' mx={2.5} mt={1} height={40} fontSize={16}>
                {notice.description}
            </Box>
        </Box>
    )
}

export default UserNotice