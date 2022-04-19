import React from 'react'
import { Box } from '@mui/material'
import api from '../Api/api'
import { useNavigate } from 'react-router-dom'
import '../Pages/GeneralUser.css'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import InsertCommentRoundedIcon from '@mui/icons-material/InsertCommentRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const Question = ({ question }) => {
    let date = question.created_date.split('T')
    let time = date[1].split('.')

    const navigate = useNavigate();

    const linkQuestion = () => {
        navigate(`/question/${question .id}`)
    }

    return (
        <Box className='question-view-background' border={1} height={130} width={870} mr={2.5} mb={2.2} borderRadius={5} onClick={linkQuestion} sx={{cursor: 'pointer'}}>
            <Box mt={2.5} mx={3} display='flex'>
                <Box display='flex' width={680}>
                    <Box className='question-view-title' maxWidth={650} fontWeight='bold' fontSize={18}>
                        {question.title}
                    </Box>
                </Box>
            </Box>

            <Box className='question-view-description' ml={3} mt={2} display='flex' width={750} maxWidth={750} height={30}>
                {question.description}
            </Box>

            <Box display='flex' alignItems='center'>
                <Box display='flex' width={730} mt={0.5} ml={3}>
                    <Box display='flex'>
                        <Box>
                            <AccessTimeRoundedIcon fontSize='small' />
                        </Box>

                        <Box ml={1} fontSize={15}>
                            {date[0]}
                        </Box>
                    </Box>

                    <Box display='flex' ml={3} fontSize={16}>
                        <Box>
                            <MenuRoundedIcon fontSize='small'/>
                        </Box>
                        
                        <Box ml={1}>
                            {question.category.name}
                        </Box>
                    </Box>

                    <Box display='flex' ml={3} fontSize={16}>
                        <Box>
                            <PersonRoundedIcon fontSize='small'/>
                        </Box>
                        
                        <Box ml={1}>
                            {question.user.username}
                        </Box>
                    </Box>
                </Box>
                
                <Box mt={0.5}>
                    <Box display='flex' ml={3} fontSize={16}>
                        <Box>
                            <InsertCommentRoundedIcon fontSize='small'/>
                        </Box>
                        
                        <Box ml={1.1}>
                            1.1w
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Question