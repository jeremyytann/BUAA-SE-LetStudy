import React from 'react'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import { Box } from '@mui/material'
import api from '../Api/api'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const NoteFavLike = ({ noteUserId }) => {
    const { id } = useParams();
    const [like, setLike] = useState([])
    const [likeCount, setLikeCount] = useState([])
    const [collection, setCollection] = useState([])
    const [collectionCount, setCollectionCount] = useState([])

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
        const fetchLike = async() => {
            const data = await api.likeGet(id, noteUserId);

            if (data.errorCode === 404) {
                setLike(false);
            } else {
                setLike(true);
            }
        }

        const fetchLikeCount = async() => {
            const data = await api.likeGetCount(id);

            if (data.errorCode === 404) {
                // error
            } else {
                setLikeCount(data.count)
            }
        }

        const fetchCollection = async() => {
            const data = await api.collectionGet(id, noteUserId);
            
            if (data.errorCode === 404) {
                setCollection(false);
            } else {
                setCollection(true);
            }
        }

        const fetchCollectionCount = async() => {
            const data = await api.collectionGetCount(id);
            
            if (data.errorCode === 404) {
                // error
            } else {
                setCollectionCount(data.count);
            }
        }

        fetchLike();
        fetchLikeCount();
        fetchCollection();
        fetchCollectionCount();
    }, [id, noteUserId, like, collection])

    const handleLike = async() => {
        if (like) {
            // delete like
            const data = await api.likeDelete(id);

            if (data.errorCode === 0) {
                setLike(false);
            }
        } else {
            // create like
            const data = await api.likeCreate(id, noteUserId)

            if (data.errorCode === 0) {
                setLike(true);
            }
        }
    }

    const handleCollection = async() => {
        if (collection) {
            // delete collection
            const data = await api.collectionDelete(id);

            if (data.errorCode === 0) {
                setCollection(false);
            }
        } else {
            // create collection
            const data = await api.collectionCreate(id, noteUserId)

            if (data.errorCode === 0) {
                setCollection(true);
            }
        }
    }

    return (
        <Box>
            <Box mt={6} display='flex' alignItems='center' mx={14}>
                <Box display='flex' width={35} ml={4}>
                    { like ? 
                        <FavoriteRoundedIcon onClick={handleLike} color='error' fontSize='small' sx={{cursor: 'pointer'}}/> :
                        <FavoriteBorderRoundedIcon onClick={handleLike} color='error' fontSize='small' sx={{cursor: 'pointer'}}/>
                    }
                </Box>

                <Box fontSize={18} width={40}>
                    {likeCount}
                </Box>

                <Box ml={1.5}>
                    赞
                </Box>
            </Box>

            <Box mt={4} display='flex' alignItems='center' mx={14}>
                <Box display='flex' width={35} ml={4}>
                    { collection ?
                        <ThemeProvider theme={theme}>
                            <StarRoundedIcon onClick={handleCollection} color='yellow' sx={{cursor: 'pointer'}} />
                        </ThemeProvider> :
                        <ThemeProvider theme={theme}>
                            <StarOutlineRoundedIcon onClick={handleCollection} color='yellow' sx={{cursor: 'pointer'}} />
                        </ThemeProvider>
                    }
                </Box>

                <Box fontSize={18} width={40}>
                    {collectionCount}
                </Box>

                <Box ml={1.5}>
                    收藏
                </Box>
            </Box>
        </Box>
    )
}

export default NoteFavLike