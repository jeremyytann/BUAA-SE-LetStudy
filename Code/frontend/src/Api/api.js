import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

class Api {
    // GET, POST, PUT, DELETE API
    async get(path) {
        try {
            const res = await axios.get(path);
            const res_data = await res.data;
            return res_data;
        } catch (err) {
            console.log(err);
        }
    }

    async post(path, item) {
        try {
            const res = await axios.post(path,item);
            const res_data = await res.data;
            return res_data;
        } catch (err) {
            console.log(err);
        }
    }

    async put(path, item) {
        try {
            const res = await axios.put(path,item);
            const res_data = await res.data;
            return res_data;
        } catch (err) {
            console.log(err);
        }

    }

    async delete(path) {
        try {
            const res = await axios.delete(path);
            const res_data = await res.data;
            return res_data;
        } catch (err) {
            console.log(err);
        }
    }

    /* ———————————————————— AdminUser API ———————————————————— */
    adminLogin = async (username, password) => {
        let data = await this.post('/admin_user/login/', {username, password});

        if (data['errorCode'] === 0) {
            const cookies = data['cookies'];
            Cookies.set('user_id', cookies['user_id']);
            Cookies.set('username', cookies['username']);
            Cookies.set('admin', true);
        }
        
        return data;
    }

    adminLogout = async() => {
        let data = await this.get('/admin_user/logout/');
        
        // clear cookies and logout
        Cookies.remove('username');
        Cookies.remove('user_id');
        Cookies.remove('admin')

        return data;
    }

    adminChangePass = async(id, newpass) => {
        let data = await this.put(`/admin_user/${id}/edit/`, {newpass})
        return data;
    }

    adminGetByUsername = async (username) => {
        let data = await this.get(`/admin_user/${username}/`);
        return data;
    }

    /* ———————————————————— Answer API ———————————————————— */
    answerCreate = async(description, questionId) => {
        let data = await this.post('/answer/create/', {description, questionId});
        return data;
    }

    answerGet = async(answerId) => {
        let data = await this.get(`/answer/${answerId}/`);
        return data;
    }

    answerGetAllByPage = async(questionId, page) => {
        let data = await this.get(`/answer/${questionId}/page/${page}/`);
        return data;
    }

    answerGetCount = async(questionId) => {
        let data = await this.get(`/answer/${questionId}/count/`);
        return data;
    }

    /* ———————————————————— Bug API ———————————————————— */
    bugCreate = async(type, title, description) => {
        let data = await this.post('/bug/create/', {type, title, description});
        return data;
    }

    bugGetAllByPage = async(page, count) => {
        let data = await this.get(`/bug/all/page/${page}/count/${count}/`);
        return data;
    }

    bugGetAllPageCount = async(count) => {
        let data = await this.get(`/bug/all/page_count/count/${count}/`);
        return data;
    }

    bugGetByStatusAndPage = async(status, page, count) => {
        let data = await this.get(`/bug/status/${status}/page/${page}/count/${count}/`);
        return data;
    }

    bugGetStatusPageCount = async(status, count) => {
        let data = await this.get(`/bug/status/${status}/page_count/count/${count}/`);
        return data;
    }

    /* ———————————————————— Collection API ———————————————————— */
    collectionCreate = async(noteId, noteUserId) => {
        let data = await this.post('/collection/create/', {noteId, noteUserId});
        return data;
    }

    collectionGet = async(noteId) => {
        let data = await this.get(`/collection/${noteId}/`);
        return data;
    }

    collectionGetCount = async(noteId) => {
        let data = await this.get(`/collection/count/${noteId}/`);
        return data;
    }

    collectionDelete = async(noteId) => {
        let data = await this.delete(`/collection/delete/${noteId}`);
        return data;
    }

    /* ———————————————————— Comment API ———————————————————— */
    commentCreate = async(description, noteId) => {
        let data = await this.post('/comment/create/', {description, noteId});
        return data;
    }

    commentGet = async(commentId) => {
        let data = await this.get(`/comment/${commentId}/`);
        return data;
    }

    commentGetByPage = async(noteId, page) => {
        let data = await this.get(`/comment/${noteId}/page/${page}/`);
        return data;
    }

    /* ———————————————————— Followship API ———————————————————— */
    followshipCreate = async(followingId) => {
        let data = await this.post('/followship/create/', {followingId});
        return data;
    }

    followshipGet = async(followingUsername) => {
        let data = await this.get(`/followship/${followingUsername}/`);
        return data;
    }

    followshipDelete = async(followingId) => {
        let data = await this.delete(`/followship/delete/${followingId}/`);
        return data;
    }

    /* ———————————————————— GeneralUser API ———————————————————— */
    userRegister = async(username, password) => {
        let data = await this.post('/user/create/', {username, password});
        return data;
    }

    userChangePass = async(id, newpass) => {
        let data = await this.put(`/user/${id}/edit/`, {newpass})
        return data;
    }

    userDelete = async(id) => {
        let data = await this.delete(`/user/${id}/delete/`)

        // clear cookies and return to login page
        Cookies.remove('username');
        Cookies.remove('user_id');
        Cookies.remove('sessionid');

        return data
    }

    userLogin = async (username, password) => {
        let data = await this.post('/user/login/', {username, password});

        if (data['errorCode'] === 0) {
            const cookies = data['cookies'];
            Cookies.set('user_id', cookies['user_id']);
            Cookies.set('username', cookies['username']);
        }
        
        return data;
    }

    userLogout = async() => {
        let data = await this.get('/user/logout/');
        
        // clear cookies and logout
        Cookies.remove('username');
        Cookies.remove('user_id');

        return data;
    }

    userGet = async (id) => {
        let data = await this.get(`/user/${id}/`);
        return data;
    }

    userGetByUsername = async (username) => {
        let data = await this.get(`/user/${username}/`);
        return data;
    }

    /* ———————————————————— Like API ———————————————————— */
    likeCreate = async(noteId, noteUserId) => {
        let data = await this.post('/like/create/', {noteId, noteUserId});
        return data;
    }

    likeGet = async(noteId) => {
        let data = await this.get(`/like/${noteId}/`);
        return data;
    }

    likeGetCount = async(noteId) => {
        let data = await this.get(`/like/count/${noteId}/`);
        return data;
    }

    likeDelete = async(noteId) => {
        let data = await this.delete(`/like/delete/${noteId}`);
        return data;
    }

    /* ———————————————————— Note API ———————————————————— */
    noteCreate = async(title, description, category) => {
        let data = await this.post('/note/create/', {title, description, category});
        return data;
    }

    noteGet = async(noteId) => {
        let data = await this.get(`/note/${noteId}/`);
        return data;
    }

    noteGetAllByPage = async(page) => {
        let data = await this.get(`/note/all/page/${page}/`);
        return data;
    }

    noteGetAllPageCount = async() => {
        let data = await this.get('/note/all/page_count/');
        return data;
    }

    noteGetPopularByPage = async(page) => {
        let data = await this.get(`/note/popular/page/${page}/`);
        return data;
    }

    noteGetPopularPageCount = async() => {
        let data = await this.get('/note/popular/page_count/');
        return data;
    }

    noteGetLatestByPage = async(page) => {
        let data = await this.get(`/note/latest/page/${page}/`);
        return data;
    }

    noteGetLatestPageCount = async() => {
        let data = await this.get('/note/latest/page_count/');
        return data;
    }

    /* ———————————————————— NoteImage API ———————————————————— */
    noteImageCreate = async(noteId, form) => {
        let data = await axios({
            method: 'post',
            url: `/note_image/${noteId}/create/`,
            data: form
        })

        return data;
    }

    noteImageGet = async(noteId) => {
        let data = await this.get(`/note_image/${noteId}/`);
        return data;
    }

    /* ———————————————————— NoteImage API ———————————————————— */
    categoryGetAll = async() => {
        let data = await this.get('/category/');
        return data;
    }

    /* ———————————————————— Notice API ———————————————————— */
    noticeCreate = async(title, description) => {
        let data = await this.post('/notice/create/', {title, description})
        return data;
    }
    
    noticeGetAllByPage = async(page, count) => {
        let data = await this.get(`/notice/all/page/${page}/${count}/`);
        return data;
    }

    noticeGetAllPageCount = async(count) => {
        let data = await this.get(`/notice/all/page_count/${count}/`);
        return data;
    }

    noticeGetLatestByPage = async(page, count) => {
        let data = await this.get(`/notice/latest/page/${page}/${count}/`);
        return data;
    }

    noticeGetLatestPageCount = async(count) => {
        let data = await this.get(`/notice/latest/page_count/${count}/`);
        return data;
    }

    /* ———————————————————— Question API ———————————————————— */
    questionCreate = async(title, description, category) => {
        let data = await this.post('/question/create/', {title, description, category})
        return data;
    }

    questionGet = async(questionId) => {
        let data = await this.get(`/question/${questionId}/`);
        return data;
    }

    questionGetAllByPage = async(page) => {
        let data = await this.get(`/question/all/page/${page}/`);
        return data;
    }

    questionGetAllPageCount = async() => {
        let data = await this.get('/question/all/page_count/');
        return data;
    }

    questionGetPopularByPage = async(page) => {
        let data = await this.get(`/question/popular/page/${page}/`);
        return data;
    }

    questionGetPopularPageCount = async() => {
        let data = await this.get('/question/popular/page_count/');
        return data;
    }

    questionGetLatestByPage = async(page) => {
        let data = await this.get(`/question/latest/page/${page}/`);
        return data;
    }

    questionGetLatestPageCount = async() => {
        let data = await this.get('/question/latest/page_count/');
        return data;
    }

    questionGetByRandom = async(count) => {
        let data = await this.get(`/question/random/${count}/`);
        return data;
    }

    /* ———————————————————— Report API ———————————————————— */
    reportCreate = async(type, id, description) => {
        let data = await this.post('/report/create/', {type, id, description});
        return data;
    }

    reportGetAllByPage = async(page, count) => {
        let data = await this.get(`/report/all/page/${page}/count/${count}/`);
        return data;
    }

    reportGetAllPageCount = async(count) => {
        let data = await this.get(`/report/all/page_count/count/${count}/`);
        return data;
    }

    reportGetByStatusAndPage = async(status, page, count) => {
        let data = await this.get(`/report/status/${status}/page/${page}/count/${count}/`);
        return data;
    }

    reportGetStatusPageCount = async(status, count) => {
        let data = await this.get(`/report/status/${status}/page_count/count/${count}/`);
        return data;
    }
}

const api = new Api();
export default api;