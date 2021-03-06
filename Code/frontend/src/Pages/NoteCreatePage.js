import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { Box, Button, Grid, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material'
import PageTitle from '../Components/PageTitle'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './GeneralUser.css'
import { useNavigate } from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import api from '../Api/api'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import uploadPng from '../Statics/upload.png'

const NoteCreatePage = () => {
    const [image, setImage] = useState([]);
    const [imagePath, setImagePath] = useState([]);
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

    const createNote = async(e) => {
        e.preventDefault();

        if (image.length === 0) {
            setError('照片不能为空哦');
            setDialog2(true)
        } else if (title === '') {
            setError('笔记主题不能为空哦');
            setDialog2(true)
        } else if (description === '') {
            setError('笔记内容不能为空哦');
            setDialog2(true)
        } else {
            const form = new FormData();
            form.append('image', image);
            
            const note = await api.noteCreate(title, description, selectedCategory);
            await api.noteImageCreate(note.data[0].id, form);

            // should navigate to that note page
            navigate(`/note/${note.data[0].id}`)
        }
    }

    const linkHomeNote = () => {
        navigate('/notes/all/1');
    }

    useEffect(() => {
        const fetchAllCategory = async() => {
            const data = await api.categoryGetAll();
            setCategories(data.data);
            setSelectedCategory(data.data[0].name);
        }

        fetchAllCategory();
    }, [])

    return (
        <Box>
            <Navbar />
            <PageTitle title={'创建笔记'}/>
            
            <form onSubmit={createNote}>
                <Box borderRadius={10} height={725} display='flex' mt={3} mx={10} sx={{backgroundColor: '#fff'}}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Box>
                                <Box display='flex' justifyContent='center' alignItems='center'>
                                    { imagePath.length > 0 ?
                                        <Box border={1} backgroundColor='#D5D5D5' mt={5} borderRadius={10} height={360} width={360}>
                                            <img className='create-note-image' src={imagePath} alt='preview-img'/>
                                        </Box> :
                                        <Box mt={5} borderRadius={10} height={360} width={360}>
                                            <img className='create-note-image' src={uploadPng} alt='preview-img'/>
                                        </Box>
                                    }
                                </Box>

                                <Box fontSize={20} mt={4}>
                                    <label className="custom-image-upload">
                                        <input 
                                            name={image}
                                            onChange={event => {setImage(event.target.files[0]); setImagePath(URL.createObjectURL(event.target.files[0]))}}
                                            type="file"
                                            accept='image/*' required/>
                                        上传图片
                                    </label>
                                </Box>
                                
                                <Box mt={8}>
                                    <ThemeProvider theme={theme}>
                                        <Button onClick={createNote} variant="contained" size="small" color="gold" style={{ borderRadius: 13, width: 140 }}> 
                                            <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>分享</Box>
                                        </Button>
                                    </ThemeProvider>
                                </Box>

                                <Box mt={4}>
                                    <ThemeProvider theme={theme}>
                                        <Button onClick={linkHomeNote} variant="contained" size="small" color='black' style={{ borderRadius: 13, width: 140 }}> 
                                            <Box sx={{fontSize: 20, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>取消</Box>
                                        </Button>
                                    </ThemeProvider>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={9}>
                            <Box ml={1}>
                                <Box display='flex'>
                                    <Box mt={5}>
                                        <Box display='flex' fontSize={16} fontWeight='bold' ml={1} mb={2}>
                                            笔记分类
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
                                            笔记主题
                                        </Box>

                                        <Box display='flex' alignItems='center'>
                                            <Box fontSize={18}>
                                                <input 
                                                    className='create-note-title'
                                                    value={title}
                                                    onChange={event => setTitle(event.target.value)}
                                                    type='text'
                                                    placeholder='输入笔记主题' 
                                                    maxLength='30' required/>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box mt={4}>
                                    <Box display='flex' fontSize={16} fontWeight='bold' ml={1} mb={2}>
                                        笔记内容
                                    </Box>

                                    <Box display='flex'>
                                        <Box fontSize={18}>
                                            <Box>
                                                <textarea 
                                                    className='create-note-description'
                                                    value={description}
                                                    onChange={event => setDescription(event.target.value)}
                                                    type='text'
                                                    placeholder='输入笔记内容' 
                                                    maxLength='512' required/>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                <Dialog onClose={handleDialogClose} open={dialog}>
                                    <DialogTitle fontWeight='bold' ml={1} width={300}>请选择您的笔记分类</DialogTitle>
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
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Box>
    )
}

export default NoteCreatePage