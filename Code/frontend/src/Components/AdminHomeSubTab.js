import React from 'react'
import { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const AdminHomeSubTab = ({ url }) => {
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
            black: {
                main: '#000',
                contrastText: '#FFF',
            }
        }
    });

    const linkCreateNotice = () => {
        navigate('/admin/notices/create');
    }

    const searchUsers = () => {
        if (search.length === 0) {
            setError('搜索栏不能为空哦');
            setDialog(true);
        } else {
            navigate(`/admin/users/search/${search}/1`)
        }
    }

    const closeDialog = () => {
        setDialog(false);
    }

    return (
        <Box mx={10} mt={4} alignItems='center' display='flex'>
            <Box display='flex' width='92%'>
                { url === 'notices' ? 
                    <Box>
                        { tab === 'latest' ?
                            <Box display='flex'>
                                <Box onClick={() => navigate('/admin/notices/latest/1')} fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    最新
                                </Box>
                                <Box onClick={() => navigate('/admin/notices/all/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                            </Box> : ''
                        }

                        { tab === 'all' ?
                            <Box display='flex'>
                                <Box onClick={() => navigate('/admin/notices/latest/1')} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    最新
                                </Box>
                                <Box onClick={() => navigate('/admin/notices/all/1')} fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                            </Box> : ''
                        }
                    </Box> : ''
                }

                { url === 'reports' ?
                    <Box>
                        { tab === 'unfinished' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => navigate('/admin/reports/unfinished/1')} fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    未处理
                                </Box>
                                <Box onClick={() => navigate('/admin/reports/completed/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    已处理
                                </Box>
                                <Box onClick={() => navigate('/admin/reports/rejected/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    已拒绝
                                </Box>
                                <Box onClick={() => navigate('/admin/reports/all/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                            </Box>
                            : ''
                        }

                        { tab === 'completed' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => navigate('/admin/reports/unfinished/1')} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    未处理
                                </Box>
                                <Box onClick={() => navigate('/admin/reports/completed/1')} fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    已处理
                                </Box>
                                <Box onClick={() => navigate('/admin/reports/rejected/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    已拒绝
                                </Box>
                                <Box onClick={() => navigate('/admin/reports/all/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                            </Box>
                            : ''
                        }

                        { tab === 'rejected' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => navigate('/admin/reports/unfinished/1')} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    未处理
                                </Box>
                                <Box onClick={() => navigate('/admin/reports/completed/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    已处理
                                </Box>
                                <Box onClick={() => navigate('/admin/reports/rejected/1')} fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    已拒绝
                                </Box>
                                <Box onClick={() => navigate('/admin/reports/all/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                            </Box>
                            : ''
                        }

                        { tab === 'all' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => navigate('/admin/reports/unfinished/1')} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    未处理
                                </Box>
                                <Box onClick={() => navigate('/admin/reports/completed/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    已处理
                                </Box>
                                <Box onClick={() => navigate('/admin/reports/rejected/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    已拒绝
                                </Box>
                                <Box onClick={() => navigate('/admin/reports/all/1')} fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                            </Box>
                            : ''
                        }
                    </Box> : ''
                }

                { url === 'bugs' ?
                    <Box>
                        { tab === 'unfinished' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => navigate('/admin/bugs/unfinished/1')} fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    未处理
                                </Box>
                                <Box onClick={() => navigate('/admin/bugs/completed/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    已处理
                                </Box>
                                <Box onClick={() => navigate('/admin/bugs/all/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                            </Box>
                            : ''
                        }

                        { tab === 'completed' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => navigate('/admin/bugs/unfinished/1')} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    未处理
                                </Box>
                                <Box onClick={() => navigate('/admin/bugs/completed/1')} fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    已处理
                                </Box>
                                <Box onClick={() => navigate('/admin/bugs/all/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                            </Box>
                            : ''
                        }

                        { tab === 'all' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => navigate('/admin/bugs/unfinished/1')} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    未处理
                                </Box>
                                <Box onClick={() => navigate('/admin/bugs/completed/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    已处理
                                </Box>
                                <Box onClick={() => navigate('/admin/bugs/all/1')} fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                            </Box>
                            : ''
                        }
                    </Box> : ''
                }

                { url === 'users' ?
                    <Box>
                        { tab === 'all' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => {setSearch(''); navigate('/admin/users/all/1')}} fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/admin/users/active/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    活跃用户
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/admin/users/banned/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    封锁用户
                                </Box>
                                <Box ml={35} borderRadius={5} display='flex' alignItems='center'>
                                    <input 
                                        className='search-user'
                                        value={search}
                                        onChange={event => setSearch(event.target.value)}
                                        type='text'
                                        placeholder='搜索用户的用户名' 
                                        maxLength='15' required/>  
                                    <Box ml={2}>
                                        <SearchIcon fontSize='medium' sx={{cursor: 'pointer'}} onClick={searchUsers}/>
                                    </Box>  
                                </Box>
                            </Box>
                            : ''
                        }

                        { tab === 'active' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => {setSearch(''); navigate('/admin/users/all/1')}} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/admin/users/active/1')}} fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    活跃用户
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/admin/users/banned/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    封锁用户
                                </Box>
                                <Box ml={35} borderRadius={5} display='flex' alignItems='center'>
                                    <input 
                                        className='search-user'
                                        value={search}
                                        onChange={event => setSearch(event.target.value)}
                                        type='text'
                                        placeholder='搜索用户的用户名' 
                                        maxLength='15' required/>  
                                    <Box ml={2}>
                                        <SearchIcon fontSize='medium' sx={{cursor: 'pointer'}} onClick={searchUsers}/>
                                    </Box>  
                                </Box>
                            </Box>
                            : ''
                        }

                        { tab === 'banned' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => {setSearch(''); navigate('/admin/users/all/1')}} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/admin/users/active/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    活跃用户
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/admin/users/banned/1')}} fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    封锁用户
                                </Box>
                                <Box ml={35} borderRadius={5} display='flex' alignItems='center'>
                                    <input 
                                        className='search-user'
                                        value={search}
                                        onChange={event => setSearch(event.target.value)}
                                        type='text'
                                        placeholder='搜索用户的用户名' 
                                        maxLength='15' required/>  
                                    <Box ml={2}>
                                        <SearchIcon fontSize='medium' sx={{cursor: 'pointer'}} onClick={searchUsers}/>
                                    </Box>  
                                </Box>
                            </Box>
                            : ''
                        }

                        { tab === 'search' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => {setSearch(''); navigate('/admin/users/all/1')}} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/admin/users/active/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    活跃用户
                                </Box>
                                <Box onClick={() => {setSearch(''); navigate('/admin/users/banned/1')}} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    封锁用户
                                </Box>
                                <Box ml={35} borderRadius={5} display='flex' alignItems='center'>
                                    <input 
                                        className='search-user'
                                        value={search}
                                        onChange={event => setSearch(event.target.value)}
                                        type='text'
                                        placeholder='搜索用户的用户名' 
                                        maxLength='15' required/>  
                                    <Box ml={2}>
                                        <SearchIcon fontSize='medium' sx={{cursor: 'pointer'}} onClick={searchUsers}/>
                                    </Box>  
                                </Box>
                            </Box>
                            : ''
                        }
                    </Box> : ''
                }
            </Box>

            { url === 'notices' ? 
                <Box width='8%'>
                    <ThemeProvider theme={theme}>
                        <Button onClick={linkCreateNotice} variant="contained" size="small" color="black" style={{ borderRadius: 13, width: 140 }}> 
                            <Box sx={{fontSize: 18, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>发布公告</Box>
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

export default AdminHomeSubTab