import { Box } from '@mui/material'
import React from 'react'
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../Api/api'
import { useState, useEffect } from 'react'

const ProfileAchievement = ({ user }) => {
    const [noteCount, setNoteCount] = useState();
    const [likeCount, setLikeCount] = useState();
    const [collectionCount, setCollectionCount] = useState();

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

    useEffect(() => {
        const fetchNoteCount = async() => {
            const data = await api.noteGetAllCountByUser(user.username);

            if (data.count > 999 && data.count <= 9999) {
                setNoteCount((data.count / 1000).toFixed(1) + "k")
            } else if (data.count > 9999) {
                setNoteCount((data.count / 10000).toFixed(1) + "w")
            } else if (data.count <= 999) {
                setNoteCount(data.count)
            }
        }

        const fetchLikeCount = async() => {
            const data = await api.likeGetCountByUser(user.username);

            if (data.count > 999 && data.count <= 9999) {
                setLikeCount((data.count / 1000).toFixed(1) + "k")
            } else if (data.count > 9999) {
                setLikeCount((data.count / 10000).toFixed(1) + "w")
            } else if (data.count <= 999) {
                setLikeCount(data.count)
            }
        }

        const fetchCollectionCount = async() => {
            const data = await api.collectionGetCountByUser(user.username);

            if (data.count > 999 && data.count <= 9999) {
                setCollectionCount((data.count / 1000).toFixed(1) + "k")
            } else if (data.count > 9999) {
                setCollectionCount((data.count / 10000).toFixed(1) + "w")
            } else if (data.count <= 999) {
                setCollectionCount(data.count)
            }
        }

        fetchNoteCount();
        fetchLikeCount();
        fetchCollectionCount();
    }, [user])

    return (
        <Box>
            <Box pt={5} fontSize={28} fontWeight='bold'>
                成就
            </Box>

            <Box mt={6} display='flex'>
                <Box width={85} display='flex' justifyContent='flex-end'> 
                    <ThemeProvider theme={theme}>
                        <MailRoundedIcon fontSize='small' color='gold' />
                    </ThemeProvider>
                </Box>
                
                <Box ml={2} mt={0.1} fontSize={18} justifyContent='center' width={70}>
                    已分享
                </Box>

                <Box ml={0.5} mt={0.1} fontSize={18} justifyContent='center' width={50}>
                    { noteCount }
                </Box>

                <Box ml={0.5} mt={0.1} fontSize={18} justifyContent='center' width={50}>
                    笔记
                </Box>
            </Box>

            <Box mt={4.5} display='flex'>
                <Box width={85} display='flex' justifyContent='flex-end'> 
                    <FavoriteRoundedIcon fontSize='small' color='error' />
                </Box>
                
                <Box ml={2} mt={0.1} fontSize={18} justifyContent='center' width={70}>
                    获得
                </Box>

                <Box ml={0.5} mt={0.1} fontSize={18} justifyContent='center' width={50}>
                    {likeCount}
                </Box>

                <Box ml={0.5} mt={0.1} fontSize={18} justifyContent='center' width={50}>
                    赞
                </Box>
            </Box>

            <Box mt={4.5} display='flex'>
                <Box width={87} display='flex' justifyContent='flex-end'> 
                    <ThemeProvider theme={theme}>
                        <StarRoundedIcon color='yellow' />
                    </ThemeProvider>
                </Box>
                
                <Box ml={2} mt={0.1} fontSize={18} justifyContent='center' width={68}>
                    获得
                </Box>

                <Box ml={0.5} mt={0.1} fontSize={18} justifyContent='center' width={50}>
                    {collectionCount}
                </Box>

                <Box ml={0.5} mt={0.1} fontSize={18} justifyContent='center' width={50}>
                    收藏
                </Box>
            </Box>
        </Box>
    )
}

export default ProfileAchievement