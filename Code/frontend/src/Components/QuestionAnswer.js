import React from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import '../Pages/GeneralUser.css'
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';

const QuestionAnswer = ({ answer }) => {
    let date = answer.created_date.split('T')
    let time = date[1].split('.')
    const navigate = useNavigate();

    const linkReport = () => {
        navigate(`/report/create/answer/${answer.id}`);
    }

    return (
        <Box mx={2} mb={3} height={60}>
            <Box display='flex' alignItems='center' mx={1}>
                <Box fontWeight='bold'>
                    { answer.user.username }
                </Box>
                
                <Box ml={2} fontSize={14}>
                    { date[0] }
                </Box>

                <Box ml={1} fontSize={14}>
                    { time[0] }
                </Box>

                <Box onClick={linkReport} ml={1.5} pt={0.3} sx={{cursor: 'pointer'}}>
                    <ReportGmailerrorredRoundedIcon color='error' />
                </Box>
            </Box>
            
            <Box mx={1} mt={1} height={25}  className='answer-description-text' display='flex' textAlign='left'>
                { answer.description }
            </Box>
        </Box>
    )
}

export default QuestionAnswer