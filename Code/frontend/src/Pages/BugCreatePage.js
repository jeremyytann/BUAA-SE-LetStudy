import React from 'react'
import { useState } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../Api/api'
import Navbar from '../Components/Navbar'
import PageTitle from '../Components/PageTitle'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom'
import './GeneralUser.css'

const BugCreatePage = () => {
    const categories = [
        '系统漏洞',
        '账户问题',
        '房间问题',
        '笔记问题',
        '问答问题'
    ]

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [dialog, setDialog] = useState(false);
    const [dialog2, setDialog2] = useState(false);
    const [dialog3, setDialog3] = useState(false);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

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

    const createBugReport = async(e) => {
        e.preventDefault();

        if (title === '') {
            setError('系统反馈主题不能为空哦');
            setDialog2(true);
        } else if (description === '') {
            setError('系统反馈内容不能为空哦');
            setDialog2(true);
        } else {
            const bug = await api.bugCreate(selectedCategory, title, description);

            if (bug.errorCode === 0) {
                if (dialog3 === false) {
                    setDialog3(true);
                }
            }
        }
    }

    const handleDialogOpen = () => {
        setDialog(true);
    }

    const handleDialogClose = () => {
        setDialog(false);
    }

    const closeDialog2 = () => {
        setDialog2(false);
    }

    const handleSelectCategory = (value) => {
        setDialog(false);
        setSelectedCategory(value);
    }

    const linkHomeQuestion = () => {
        navigate('/questions/all/1');
    }

    return (
        <Box>
            <Navbar />
            <PageTitle title={'提交系统反馈'}/>

            <form onSubmit={createBugReport}>
                <Box borderRadius={10} height={725} display='flex' mt={3} mx={10} sx={{backgroundColor: '#fff'}}>
                    <Box mx={7}>
                        <Box display='flex'>
                            <Box mt={5}>
                                <Box display='flex' fontSize={16} fontWeight='bold' ml={1} mb={2}>
                                    系统反馈分类
                                </Box>

                                <Box display='flex' className='create-note-category' alignItems='center'>
                                    <Box width={190} fontSize={18}>
                                        <span>{selectedCategory}</span>
                                    </Box>

                                    <Box pt={0.5}>
                                        <MoreHorizIcon onClick={handleDialogOpen} sx={{cursor: 'pointer'}}/>
                                    </Box>
                                </Box>
                            </Box>
                            
                            <Box ml={5} mt={5}>
                                <Box display='flex' fontSize={16} fontWeight='bold' ml={1} mb={2}>
                                    系统反馈主题
                                </Box>

                                <Box display='flex' alignItems='center'>
                                    <Box fontSize={18}>
                                        <input 
                                            className='create-question-title'
                                            value={title}
                                            onChange={event => setTitle(event.target.value)}
                                            type='text'
                                            placeholder='输入系统反馈主题' 
                                            maxLength='30' required/>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box mt={4}>
                            <Box display='flex' fontSize={16} fontWeight='bold' ml={1} mb={2}>
                                系统反馈内容
                            </Box>

                            <Box display='flex'>
                                <Box fontSize={18}>
                                    <Box>
                                        <textarea 
                                            className='create-question-description'
                                            value={description}
                                            onChange={event => setDescription(event.target.value)}
                                            type='text'
                                            placeholder='输入系统反馈内容'
                                            maxLength='128' required/>
                                    </Box>
                                    
                                </Box>
                            </Box>
                        </Box>

                        <Box mt={4} display='flex'>
                            <Box>
                                <ThemeProvider theme={theme}>
                                    <Button onClick={createBugReport} variant="contained" size="small" color="gold" style={{ borderRadius: 13, width: 140 }}> 
                                        <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>提交</Box>
                                    </Button>
                                </ThemeProvider>
                            </Box>
                            
                            <Box ml={3}>
                                <ThemeProvider theme={theme}>
                                    <Button onClick={linkHomeQuestion} variant="contained" size="small" color='black' style={{ borderRadius: 13, width: 140 }}> 
                                        <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>取消</Box>
                                    </Button>
                                </ThemeProvider>
                            </Box>
                        </Box>
                    </Box>
                    
                    <Dialog onClose={handleDialogClose} open={dialog}>
                        <DialogTitle fontWeight='bold' ml={1} width={300}>请选择您的问题分类</DialogTitle>
                        <List sx={{ mx: 2, borderRadius: 10, mb: 1 }}>
                            {categories.map((category) => (
                                <ListItem button onClick={() => handleSelectCategory(category)} key={category}>
                                    <ListItemAvatar>
                                        <MenuRoundedIcon ml={5}/>
                                    </ListItemAvatar>
                                    <ListItemText primary={category} />
                                </ListItem>
                            ))}
                        </List>
                    </Dialog>

                    <Dialog
                        fullWidth={true}
                        open={dialog2}
                        maxWidth='sm'
                        onClose={closeDialog2}>
                        <DialogTitle id="alert-dialog-title">
                            {"数据错误"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {error}
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={closeDialog2}>知道了</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        fullWidth={true}
                        open={dialog3}
                        maxWidth='sm'>
                        <DialogTitle id="alert-dialog-title">
                            {"反馈成功"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {'你的反馈已成功提交到管理员手中'}
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => navigate('/settings/bugs')}>知道了</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </form>
        </Box>
    )
}

export default BugCreatePage