import React from 'react'
import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import api from '../Api/api'
import { useNavigate } from 'react-router-dom'
import '../Pages/GeneralUser.css'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const Note = ({ note }) => {
    const [image, setImage] = useState([]);
    const [likeCount, setLikeCount] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNoteImage = async() => {
            const data = await api.noteImageGet(note.id);
            return data;
        }

        const fetchLikeCount = async() => {
            const data = await api.likeGetCount(note.id);

            if (data.count > 999 && data.count <= 9999) {
                setLikeCount((data.count / 1000).toFixed(1) + "k")
            } else if (data.count > 9999) {
                setLikeCount((data.count / 10000).toFixed(1) + "w")
            } else if (data.count <= 999) {
                setLikeCount(data.count)
            }
        }

        const getNoteImage = async() => {
            const image = await fetchNoteImage();

            if (image !== undefined) {
                setImage(image.data[0]);
            } else {
                setImage([]);
            }
        }

        fetchLikeCount();
        getNoteImage();
    }, [note])

    const linkNote = () => {
        navigate(`/note/${note.id}`)
    }

    return (
        <Box borderRadius='20px' mr={2.6} mb={2.2} border={1} onClick={linkNote} sx={{cursor: 'pointer'}}>
            <Box>
                <Box height='200px' sx={{borderRadius: '20px 20px 0 0'}}>
                    <img className='note-view-image' src={ image? image.image_url : '0'} alt='img' />
                </Box>
                
                <Box>
                    <Box display='flex' height={40} alignItems='center' sx={{backgroundColor: 'white', borderTop: '1px solid black'}}>
                        <Box className='note-view-title' display='flex' mx={2} width='100%' maxWidth='165px' fontSize={15}>
                            {note.title}
                        </Box>
                    </Box>

                    <Box display='flex' height={40} alignItems='center' sx={{borderRadius: '0 0 20px 20px', backgroundColor: 'white'}}>
                        <Box mb={1} display='flex' width='100%'>
                            <Box display='flex' alignItems='center' ml={2} mr={1.5} width='60%' >
                                <PersonRoundedIcon fontSize='small'/>

                                <Box className='note-view-username' maxWidth='75px' display='flex' ml={0.7} mb={0.2} fontSize={14} width='100%'>
                                    {note.user.username}
                                </Box>
                            </Box>

                            <Box width='40%' display='flex' alignItems='center'>
                                <FavoriteRoundedIcon fontSize='small' color='error' />
                                <Box ml={0.7} mb={0.2} fontSize={14}>
                                    {likeCount}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Note