import React from 'react'
import { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const HomeSubTab = ({ url }) => {
    const navigate = useNavigate();
    const { tab } = useParams();
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [dialog, setDialog] = useState(false);

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
            }
        }
    });

    const linkCreateRoom = () => {
        navigate('/rooms/create');
    }

    const linkCreateNote = () => {
        navigate('/notes/create');
    }

    const linkCreateQuestion = () => {
        navigate('/questions/create');
    }

    const linkPrivateRooms = () => {
        navigate('/rooms/private/1');
    }

    const closeDialog = () => {
        setDialog(false);
    }

    const searchRooms = () => {
        if (search.length === 0) {
            setError('搜索栏不能为空哦');
            setDialog(true);
        } else {
            setSearch(''); 
            navigate(`/rooms/search/${search}/1`);
        }
    }

    const searchNotes = () => {
        if (search.length === 0) {
            setError('搜索栏不能为空哦');
            setDialog(true);
        } else {
            setSearch(''); 
            navigate(`/notes/search/${search}/1`);
        }
    }

    const searchQuestions = () => {
        if (search.length === 0) {
            setError('搜索栏不能为空哦');
            setDialog(true);
        } else {
            setSearch(''); 
            navigate(`/questions/search/${search}/1`);
        }
    }

    return (
        <Box mx={10} mt={4} alignItems='center' display='flex'>
            <Box display='flex' width='92%'>
                { url === 'rooms' ? 
                    <Box>
                        { tab === 'public' ?
                            <Box display='flex'>
                                <Box onClick={() => navigate('/rooms/public/1')} color='#E0A96D' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    公共房间
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/rooms/private/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    私人房间
                                </Box>
                            </Box> : ''
                        }

                        { tab === 'private' ?
                            <Box display='flex'>
                                <Box onClick={() => navigate('/rooms/public/1')} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    公共房间
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/rooms/private/1')}} color='#E0A96D' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    私人房间
                                </Box>
                                <Box ml={50} borderRadius={5} display='flex' alignItems='center'>
                                    <input 
                                        className='search-user'
                                        value={search}
                                        onChange={event => setSearch(event.target.value)}
                                        type='text'
                                        placeholder='搜索房间名称' 
                                        maxLength='15' required/>  
                                    <Box ml={2}>
                                        <SearchIcon fontSize='medium' sx={{cursor: 'pointer'}} onClick={searchRooms}/>
                                    </Box>  
                                </Box>
                            </Box> : ''
                        }

                        { tab === 'search' ?
                            <Box display='flex'>
                                <Box onClick={() => {setSearch(''); navigate('/rooms/public/1')}} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    公共房间
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/rooms/private/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    私人房间
                                </Box>
                                <Box ml={50} borderRadius={5} display='flex' alignItems='center'>
                                    <input 
                                        className='search-user'
                                        value={search}
                                        onChange={event => setSearch(event.target.value)}
                                        type='text'
                                        placeholder='搜索房间名称' 
                                        maxLength='15' required/>  
                                    <Box ml={2}>
                                        <SearchIcon fontSize='medium' sx={{cursor: 'pointer'}} onClick={searchRooms}/>
                                    </Box>  
                                </Box>
                            </Box> : ''
                        }
                    </Box> : ''
                }

                { url === 'roomsCreate' ?
                    <Box display='flex'>
                        <Box onClick={() => navigate('/rooms/public/1')} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                            公共房间
                        </Box>
                        <Box onClick={() => navigate('/rooms/private/1')} color='#E0A96D' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                            私人房间
                        </Box>
                    </Box> : ''
                }

                { url === 'notes' ?
                    <Box>
                        { tab === 'all' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => {setSearch(''); navigate('/notes/all/1')}} color='#E0A96D' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/notes/popular/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    热门
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/notes/latest/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    最新
                                </Box>
                                <Box ml={55} borderRadius={5} display='flex' alignItems='center'>
                                    <input 
                                        className='search-user'
                                        value={search}
                                        onChange={event => setSearch(event.target.value)}
                                        type='text'
                                        placeholder='搜索笔记' 
                                        maxLength='15' required/>  
                                    <Box ml={2}>
                                        <SearchIcon fontSize='medium' sx={{cursor: 'pointer'}} onClick={searchNotes}/>
                                    </Box>
                                </Box>
                            </Box>
                            : ''
                        }

                        { tab === 'popular' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => {setSearch(''); navigate('/notes/all/1')}} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/notes/popular/1')}} color='#E0A96D' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    热门
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/notes/latest/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    最新
                                </Box>
                                <Box ml={55} borderRadius={5} display='flex' alignItems='center'>
                                    <input 
                                        className='search-user'
                                        value={search}
                                        onChange={event => setSearch(event.target.value)}
                                        type='text'
                                        placeholder='搜索笔记' 
                                        maxLength='15' required/>  
                                    <Box ml={2}>
                                        <SearchIcon fontSize='medium' sx={{cursor: 'pointer'}} onClick={searchNotes}/>
                                    </Box>
                                </Box>
                            </Box>
                            : ''
                        }

                        { tab === 'latest' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => {setSearch(''); navigate('/notes/all/1')}} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/notes/popular/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    热门
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/notes/latest/1')}} color='#E0A96D' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    最新
                                </Box>
                                <Box ml={55} borderRadius={5} display='flex' alignItems='center'>
                                    <input 
                                        className='search-user'
                                        value={search}
                                        onChange={event => setSearch(event.target.value)}
                                        type='text'
                                        placeholder='搜索笔记' 
                                        maxLength='15' required/>  
                                    <Box ml={2}>
                                        <SearchIcon fontSize='medium' sx={{cursor: 'pointer'}} onClick={searchNotes}/>
                                    </Box>
                                </Box>
                            </Box>
                            : ''
                        }

                        { tab === 'search' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => {setSearch(''); navigate('/notes/all/1')}} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/notes/popular/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    热门
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/notes/latest/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    最新
                                </Box>
                                <Box ml={55} borderRadius={5} display='flex' alignItems='center'>
                                    <input 
                                        className='search-user'
                                        value={search}
                                        onChange={event => setSearch(event.target.value)}
                                        type='text'
                                        placeholder='搜索笔记' 
                                        maxLength='15' required/>  
                                    <Box ml={2}>
                                        <SearchIcon fontSize='medium' sx={{cursor: 'pointer'}} onClick={searchNotes}/>
                                    </Box>
                                </Box>
                            </Box>
                            : ''
                        }
                    </Box> : ''
                }

                { url === 'questions' ? 
                    <Box>
                    { tab === 'all' ?
                        <Box display='flex' alignItems='center'>
                            <Box onClick={() => {setSearch(''); navigate('/questions/all/1')}} color='#E0A96D' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                全部
                            </Box>
                            <Box onClick={() => {setSearch(''); navigate('/questions/popular/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                热门
                            </Box>
                            <Box onClick={() => {setSearch(''); navigate('/questions/latest/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                最新
                            </Box>
                            <Box ml={55} borderRadius={5} display='flex' alignItems='center'>
                                <input 
                                    className='search-user'
                                    value={search}
                                    onChange={event => setSearch(event.target.value)}
                                    type='text'
                                    placeholder='搜索问题' 
                                    maxLength='15' required/>  
                                <Box ml={2}>
                                    <SearchIcon fontSize='medium' sx={{cursor: 'pointer'}} onClick={searchQuestions}/>
                                </Box>
                            </Box>
                        </Box>
                        : ''
                    }

                    { tab === 'popular' ?
                        <Box display='flex' alignItems='center'>
                            <Box onClick={() => {setSearch(''); navigate('/questions/all/1')}} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                全部
                            </Box>
                            <Box onClick={() => {setSearch(''); navigate('/questions/popular/1')}} color='#E0A96D' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                热门
                            </Box>
                            <Box onClick={() => {setSearch(''); navigate('/questions/latest/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                最新
                            </Box>
                            <Box ml={55} borderRadius={5} display='flex' alignItems='center'>
                                <input 
                                    className='search-user'
                                    value={search}
                                    onChange={event => setSearch(event.target.value)}
                                    type='text'
                                    placeholder='搜索问题' 
                                    maxLength='15' required/>  
                                <Box ml={2}>
                                    <SearchIcon fontSize='medium' sx={{cursor: 'pointer'}} onClick={searchQuestions}/>
                                </Box>
                            </Box>
                        </Box>
                        : ''
                    }

                    { tab === 'latest' ?
                        <Box display='flex' alignItems='center'>
                            <Box onClick={() => {setSearch(''); navigate('/questions/all/1')}} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                全部
                            </Box>
                            <Box onClick={() => {setSearch(''); navigate('/questions/popular/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                热门
                            </Box>
                            <Box onClick={() => {setSearch(''); navigate('/questions/latest/1')}} color='#E0A96D' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                最新
                            </Box>
                            <Box ml={55} borderRadius={5} display='flex' alignItems='center'>
                                <input 
                                    className='search-user'
                                    value={search}
                                    onChange={event => setSearch(event.target.value)}
                                    type='text'
                                    placeholder='搜索问题' 
                                    maxLength='15' required/>  
                                <Box ml={2}>
                                    <SearchIcon fontSize='medium' sx={{cursor: 'pointer'}} onClick={searchQuestions}/>
                                </Box>
                            </Box>
                        </Box>
                        : ''
                    }

                    { tab === 'search' ?
                        <Box display='flex' alignItems='center'>
                            <Box onClick={() => {setSearch(''); navigate('/questions/all/1')}} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                全部
                            </Box>
                            <Box onClick={() => {setSearch(''); navigate('/questions/popular/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                热门
                            </Box>
                            <Box onClick={() => {setSearch(''); navigate('/questions/latest/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                最新
                            </Box>
                            <Box ml={55} borderRadius={5} display='flex' alignItems='center'>
                                <input 
                                    className='search-user'
                                    value={search}
                                    onChange={event => setSearch(event.target.value)}
                                    type='text'
                                    placeholder='搜索问题' 
                                    maxLength='15' required/>  
                                <Box ml={2}>
                                    <SearchIcon fontSize='medium' sx={{cursor: 'pointer'}} onClick={searchQuestions}/>
                                </Box>
                            </Box>
                        </Box>
                        : ''
                    }
                </Box> : ''
                }
            </Box>

            { url === 'rooms' ? 
                <Box width='8%'>
                    { tab === 'private' || tab === 'search' ? 
                        <ThemeProvider theme={theme}>
                            <Button onClick={linkCreateRoom} variant="contained" size="small" color="gold" style={{ borderRadius: 13, width: 140 }}> 
                                <Box sx={{fontSize: 18, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>创建房间</Box>
                            </Button>
                        </ThemeProvider> : ''
                    }
                </Box> : ''
            }

            { url === 'roomsCreate' ? 
                <Box width='8%'>
                    <ThemeProvider theme={theme}>
                        <Button onClick={linkPrivateRooms} variant="contained" size="small" color="black" style={{ borderRadius: 13, width: 140 }}> 
                            <Box sx={{fontSize: 18, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>返回</Box>
                        </Button>
                    </ThemeProvider>
                </Box> : ''
            }

            { url === 'notes' ? 
                <Box width='8%'>
                    <ThemeProvider theme={theme}>
                        <Button onClick={linkCreateNote} variant="contained" size="small" color="gold" style={{ borderRadius: 13, width: 140 }}> 
                            <Box sx={{fontSize: 18, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>分享笔记</Box>
                        </Button>
                    </ThemeProvider>
                </Box> : ''
            }

            { url === 'questions' ? 
                <Box width='8%'>
                <ThemeProvider theme={theme}>
                    <Button onClick={linkCreateQuestion} variant="contained" size="small" color="gold" style={{ borderRadius: 13, width: 140 }}> 
                        <Box sx={{fontSize: 18, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>提问</Box>
                    </Button>
                </ThemeProvider>
            </Box> : ''
            }

            <Dialog
                fullWidth={true}
                open={dialog}
                maxWidth='sm'
                onClose={closeDialog}>
                <DialogTitle id="alert-dialog-title">
                    {"数据错误"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {error}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog}>知道了</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default HomeSubTab