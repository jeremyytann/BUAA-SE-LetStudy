import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;
const proxy = window.location.protocol + '//' + window.location.hostname + '/api'

class Api {
    // GET, POST, PUT, DELETE API
    async get(path) {
        try {
            const res = await axios.get(proxy + path);
            const res_data = await res.data;
            return res_data;
        } catch (err) {
            console.log(err);
        }
    }

    async post(path, item) {
        try {
            const res = await axios.post(proxy + path,item);
            const res_data = await res.data;
            return res_data;
        } catch (err) {
            console.log(err);
        }
    }

    async put(path, item) {
        try {
            const res = await axios.put(proxy + path,item);
            const res_data = await res.data;
            return res_data;
        } catch (err) {
            console.log(err);
        }

    }

    async delete(path) {
        try {
            const res = await axios.delete(proxy + path);
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

    answerDelete = async(answerId) => {
        let data = await this.delete(`/answer/${answerId}/delete/`);
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

    bugEdit = async(id, status, reason) => {
        let data = await this.put(`/bug/${id}/edit/`, {status, reason});
        return data;
    }

    bugGet = async(bugId) => {
        let data = await this.get(`/bug/${bugId}/`);
        return data;
    }

    bugGetAllByUser = async(page) => {
        let data = await this.get(`/bug/all/page/${page}/`);
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

    /* ———————————————————— Category API ———————————————————— */
    categoryGetAll = async() => {
        let data = await this.get('/category/');
        return data;
    }

    /* ———————————————————— Chat API ———————————————————— */
    chatCreate = async(roomId, content) => {
        let data = await this.post(`/chat/create/`, {roomId, content});
        return data;
    }

    chatGetByRoom = async(roomId) => {
        let data = await this.get(`/chat/room/${roomId}/`);
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

    collectionGetAllByUser = async(username, page) => {
        let data = await this.get(`/collection/all/user/${username}/page/${page}/`);
        return data;
    }

    collectionGetCount = async(noteId) => {
        let data = await this.get(`/collection/count/${noteId}/`);
        return data;
    }

    collectionGetCountByUser = async(username) => {
        let data = await this.get(`/collection/count/${username}/`);
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

    commentDelete = async(commentId) => {
        let data = await this.delete(`/comment/${commentId}/delete/`);
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

    followshipGetCountByUser = async(username) => {
        let data = await this.get(`/followship/count/${username}/`);
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
    
    userGetAllByPage = async(page, count) => {
        let data = await this.get(`/user/all/page/${page}/count/${count}/`);
        return data;
    }

    userGetAllPageCount = async(count) => {
        let data = await this.get(`/user/all/page_count/count/${count}/`);
        return data;
    }

    userGetByStatus = async(status, page, count) => {
        let data = await this.get(`/user/${status}/page/${page}/count/${count}/`);
        return data;
    }

    userSearchByUsername = async(username, page, count) => {
        let data = await this.get(`/user/search/${username}/page/${page}/count/${count}/`);
        return data;
    }

    userSearchPageCount = async(username) => {
        let data = await this.get(`/user/search/${username}/page_count/`)
        return data;
    }

    userGetStatusPageCount = async(status, count) => {
        let data = await this.get(`/user/${status}/page_count/count/${count}/`);
        return data;
    }

    userBan = async(id) => {
        let data = await this.put(`/user/${id}/ban/`);
        return data;
    }

    userUnban = async(id) => {
        let data = await this.put(`/user/${id}/unban/`);
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

    likeGetCountByUser = async(username) => {
        let data = await this.get(`/like/count/${username}/`);
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

    noteEdit = async(noteId, title, description, category) => {
        let data = await this.put(`/note/${noteId}/edit/`, {title, description, category});
        return data;
    }

    noteDelete = async(noteId) => {
        let data = await this.delete(`/note/${noteId}/delete/`);
        return data;
    }

    noteGetAllByPage = async(page) => {
        let data = await this.get(`/note/all/page/${page}/`);
        return data;
    }

    noteGetAllByUser = async(username, page) => {
        let data = await this.get(`/note/all/user/${username}/page/${page}/`);
        return data;
    }

    noteGetAllPageCount = async() => {
        let data = await this.get('/note/all/page_count/');
        return data;
    }

    noteGetAllCountByUser = async(username) => {
        let data = await this.get(`/note/all/count/${username}/`)
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

    noteSearchByPage = async(search, page) => {
        let data = await this.get(`/note/search/${search}/page/${page}/`);
        return data;
    }

    noteGetSearchPageCount = async(search) => {
        let data = await this.get(`/note/search/${search}/page_count/`);
        return data;
    }

    noteCategoryByPage = async(search, page) => {
        let data = await this.get(`/note/category/${search}/page/${page}/`);
        return data;
    }

    noteGetCategoryPageCount = async(search) => {
        let data = await this.get(`/note/category/${search}/page_count/`);
        return data;
    }

    /* ———————————————————— NoteImage API ———————————————————— */
    noteImageCreate = async(noteId, form) => {
        let data = await axios({
            method: 'post',
            url: `/api/note_image/${noteId}/create/`,
            data: form
        })

        return data;
    }

    noteImageGet = async(noteId) => {
        let data = await this.get(`/note_image/${noteId}/`);
        return data;
    }

    noteImageEdit = async(noteId, form) => {
        let data = await axios({
            method: 'put',
            url: `/api/note_image/${noteId}/edit/`,
            data: form
        })

        return data;
    }

    /* ———————————————————— Notice API ———————————————————— */
    noticeCreate = async(title, description) => {
        let data = await this.post('/notice/create/', {title, description})
        return data;
    }

    noticeGet = async(id) => {
        let data = await this.get(`/notice/${id}/`);
        return data;
    }

    noticeDelete = async(id) => {
        let data = await this.delete(`/notice/${id}/delete/`);
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

    /* ———————————————————— Participant API ———————————————————— */
    participantCountByRoom = async(roomId) => {
        let data = await this.get(`/participant/room/${roomId}/count/`);
        return data;
    }

    participantByRoom = async(roomId) => {
        let data = await this.get(`/participant/room/${roomId}/`);
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

    questionEdit = async(questionId, title, description, category) => {
        let data = await this.put(`/question/${questionId}/edit/`, {title, description, category})
        return data;
    }

    questionDelete = async(questionId) => {
        let data = await this.delete(`/question/${questionId}/delete/`);
        return data;
    }

    questionGetAllByPage = async(page) => {
        let data = await this.get(`/question/all/page/${page}/`);
        return data;
    }

    questionGetAllByUser = async(username, page) => {
        let data = await this.get(`/question/all/user/${username}/page/${page}/`);
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
    
    questionSearchByPage = async(search, page) => {
        let data = await this.get(`/question/search/${search}/page/${page}/`);
        return data;
    }

    questionGetSearchPageCount = async(search) => {
        let data = await this.get(`/question/search/${search}/page_count/`);
        return data;
    }

    questionCategoryByPage = async(search, page) => {
        let data = await this.get(`/question/category/${search}/page/${page}/`);
        return data;
    }

    questionGetCategoryPageCount = async(search) => {
        let data = await this.get(`/question/category/${search}/page_count/`);
        return data;
    }

    /* ———————————————————— Report API ———————————————————— */
    reportCreate = async(type, id, description, title) => {
        let data = await this.post('/report/create/', {type, id, description, title});
        return data;
    }

    reportGet = async(id) => {
        let data = await this.get(`/report/${id}/`);
        return data;
    }

    reportEdit = async(id, status, reason) => {
        let data = await this.put(`/report/${id}/edit/`, {status, reason});
        return data;
    }

    reportGetAllByUser = async(page) => {
        let data = await this.get(`/report/all/page/${page}/`);
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

    /* ———————————————————— Room API ———————————————————— */
    roomCreate = async(name, type, lock, password) => {
        let data = await this.post('/room/create/', {name, type, lock, password});
        return data;
    }

    roomGet = async(id) => {
        let data = await this.get(`/room/${id}/`);
        return data;
    }

    roomSearchByName = async(name, page) => {
        let data = await this.get(`/room/search/${name}/page/${page}/`);
        return data;
    }

    roomJoin = async(id, lock, password) => {
        let data = await this.post(`/room/${id}/join/`, {lock, password});
        return data;
    }

    roomQuit = async(id, type) => {
        let data = await this.post(`/room/${id}/quit/`, {type});
        return data;
    }

    roomGetPublic = async() => {
        let data = await this.get('/room/public/');
        return data;
    }

    roomGetPrivateByPage = async(page) => {
        let data = await this.get(`/room/private/${page}/`);
        return data;
    }

    roomGetPrivatePageCount = async() => {
        let data = await this.get('/room/private/page_count');
        return data;
    }
}

const api = new Api();
export default api;