import React from 'react'
import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../Api/api'
import Note from './Note'

const UserNoteBody = () => {
    // const navigate = useNavigate();
    const { tab, page } = useParams();
    const [notes, setNotes] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllNotesByPage = async() => {
            const data = await api.noteGetAllByPage(page);
            return data;
        }

        const fetchPopularNotesByPage = async() => {
            const data = await api.noteGetPopularByPage(page);
            setNotes(data.data)
        }

        const fetchLatestNotesByPage = async() => {
            const data = await api.noteGetLatestByPage(page);
            return data;
        }

        const getAllNotesByPage = async() => {
            const notesFromServer = await fetchAllNotesByPage();
            setNotes(notesFromServer.data);
        }

        const getLatestNotesByPage = async() => {
            const notesFromServer = await fetchLatestNotesByPage();
            setNotes(notesFromServer.data);
        }

        if (tab === 'all') {
            getAllNotesByPage();
        } else if (tab === 'popular') {
            fetchPopularNotesByPage();
        } else if (tab === 'latest') {
            getLatestNotesByPage();
        }
    }, [tab, page])

    return (
        <Box height={580} mt={5} ml={10} mr={5}>
            { notes !== undefined ?
                <Box display='flex' flexWrap='wrap'>
                    {notes.map((note, index) => (
                        <Note key={index} note={note}/>
                    ))}
                </Box> : ''
            }
        </Box>
    )
}

export default UserNoteBody