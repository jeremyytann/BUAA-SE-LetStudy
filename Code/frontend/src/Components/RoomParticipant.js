import { Box } from '@mui/material'
import React from 'react'
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const RoomParticipant = ({ participant, host }) => {
    const theme = createTheme ({
        typography: {
            button: {
                textTransform: 'none',
            }
        },

        palette: {
            gold: {
                main: '#E0A96D',
                contrastText: '#fff',
            },
            black: {
                main: '#000000',
                contrastText: '#fff',
            },
            pink: {
                main: '#FA9285',
                contrastText: '#fff',
            },
            yellow: {
                main: '#F2DB36'
            }
        }
    }); 

    return (
        <Box mb={2}>
            <Box display='flex'>
                <Box>
                    { host === participant.user.username ? 
                        <ThemeProvider theme={theme}>
                            <StarRoundedIcon color='yellow' sx={{cursor: 'pointer'}} />
                        </ThemeProvider> : <FiberManualRecordRoundedIcon color='success' />
                    }
                </Box>

                <Box ml={3} fontSize={18}>
                    {participant.user.username}
                </Box>
            </Box>
        </Box>
    )
}

export default RoomParticipant