import React from 'react'
import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import api from '../Api/api'
import Note from './Note'

const UserNoteBody = () => {
    // const navigate = useNavigate();
    const { tab, page, searchVal } = useParams();
    const [notes, setNotes] = useState()

    useEffect(() => {
        const fetchAllNotesByPage = async() => {
            const data = await api.noteGetAllByPage(page);
            setNotes(data.data)
        }

        const fetchPopularNotesByPage = async() => {
            const data = await api.noteGetPopularByPage(page);
            setNotes(data.data)
        }

        const fetchLatestNotesByPage = async() => {
            const data = await api.noteGetLatestByPage(page);
            setNotes(data.data)
        }

        const fetchSearchNotesByPage = async() => {
            const data = await api.noteSearchByPage(searchVal, page);
            setNotes(data.data);
        }

        const fetchCategoryNotesByPage = async() => {
            const data = await api.noteCategoryByPage(searchVal, page);
            setNotes(data.data);
        }

        if (tab === 'all') {
            fetchAllNotesByPage();
        } else if (tab === 'popular') {
            fetchPopularNotesByPage();
        } else if (tab === 'latest') {
            fetchLatestNotesByPage();
        } else if (tab === 'search') {
            fetchSearchNotesByPage();
        } else if (tab === 'category') {
            fetchCategoryNotesByPage();
        }
    }, [tab, page, searchVal])

    return (
        <Box height={580} mt={5} ml={10} mr={5}>
            { notes !== undefined && notes.length > 0 ?
                <Box display='flex' flexWrap='wrap'>
                    {notes.map((note, index) => (
                        <Note key={index} note={note}/>
                    ))}
                </Box> :
                <Box>
                    { tab === 'search' ? 
                        <Box>
                            <Box mt={12} fontSize={150} fontWeight='bold' color='#DDC3A5'>
                                404
                            </Box>

                            <Box fontSize={24} fontWeight='bold'>
                                抱歉，此搜索没有任何结果
                            </Box> 
                        </Box> :
                        <Box>
                            <Box mt={12} fontSize={150} fontWeight='bold' color='#DDC3A5'>
                                0
                            </Box>

                            <Box fontSize={24} fontWeight='bold'>
                                抱歉，此时还未有任何房间
                            </Box> 
                        </Box>
                    }
                </Box>
            }
        </Box>
    )
}

export default UserNoteBody