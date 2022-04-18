import React from 'react'
import { Box } from '@mui/material'

const PageTitle = ({ title }) => {
  return (
    <Box display='flex' mt={6} mx={10}>
        <Box fontSize={40} fontWeight='bold'>
            {title}
        </Box>
    </Box>
  )
}

export default PageTitle