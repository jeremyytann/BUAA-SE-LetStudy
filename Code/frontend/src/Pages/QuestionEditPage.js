import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../Api/api'
import Navbar from '../Components/Navbar'
import PageTitle from '../Components/PageTitle'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate, useParams } from 'react-router-dom'
import './GeneralUser.css'

const QuestionEditPage = () => {
    const { id } = useParams();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [dialog, setDialog] = useState(false);
    const [dialog2, setDialog2] = useState(false);
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

    useEffect(() => {
        const fetchAllCategory = async() => {
            const data = await api.categoryGetAll();
            setCategories(data.data);
            setSelectedCategory(data.data[0].name);
        }

        const fetchQuestion = async() => {
            const data = await api.questionGet(id);
            console.log(data.data[0]);
            setTitle(data.data[0].title)
            setDescription(data.data[0].description)
            setSelectedCategory(data.data[0].category.name)
        }

        fetchQuestion();
        fetchAllCategory();
    }, [id])

    const editQuestion = async(e) => {
        e.preventDefault();

        if (title === '') {
            setError('问题主题不能为空哦');
            setDialog2(true);
        } else if (description === '') {
            setError('问题内容不能为空哦');
            setDialog2(true);
        } else {
            const question = await api.questionEdit(id, title, description, selectedCategory)
            
            navigate(`/question/${question.data[0].id}`)
        }
    }

    const handleDialogOpen = () => {
        setDialog(true);
    }

    const handleDialogClose = () => {
        setDialog(false);
    }

    const handleSelectCategory = (value) => {
        setDialog(false);
        setSelectedCategory(value);
    }

    const linkHomeQuestion = () => {
        navigate('/questions/all/1');
    }
    
    const closeDialog2 = () => {
        setDialog2(false);
    }

    return (
        <Box>
            <Navbar />
            <PageTitle title={'修改问题'}/>

            <form onSubmit={editQuestion}>
                <Box borderRadius={10} height={725} display='flex' mt={3} mx={10} sx={{backgroundColor: '#fff'}}>
                    <Box mx={7}>
                        <Box display='flex'>
                            <Box mt={5}>
                                <Box display='flex' fontSize={16} fontWeight='bold' ml={1} mb={2}>
                                    问题分类
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
                                    问题主题
                                </Box>

                                <Box display='flex' alignItems='center'>
                                    <Box fontSize={18}>
                                        <input 
                                            className='create-question-title'
                                            value={title}
                                            onChange={event => setTitle(event.target.value)}
                                            type='text'
                                            placeholder='输入问题主题' 
                                            maxLength='30' required/>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box mt={4}>
                            <Box display='flex' fontSize={16} fontWeight='bold' ml={1} mb={2}>
                                问题内容
                            </Box>

                            <Box display='flex'>
                                <Box fontSize={18}>
                                    <Box>
                                        <textarea 
                                            className='create-question-description'
                                            value={description}
                                            onChange={event => setDescription(event.target.value)}
                                            type='text'
                                            placeholder='输入问题内容'
                                            maxLength='128' required/>
                                    </Box>
                                    
                                </Box>
                            </Box>
                        </Box>

                        <Box mt={4} display='flex'>
                            <Box>
                                <ThemeProvider theme={theme}>
                                    <Button onClick={editQuestion} variant="contained" size="small" color="gold" style={{ borderRadius: 13, width: 140 }}> 
                                        <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>修改</Box>
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
                                <ListItem button onClick={() => handleSelectCategory(category.name)} key={category.name}>
                                    <ListItemAvatar>
                                        <MenuRoundedIcon ml={5}/>
                                    </ListItemAvatar>
                                    <ListItemText primary={category.name} />
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
                </Box>
            </form>
        </Box>
    )
}

export default QuestionEditPage