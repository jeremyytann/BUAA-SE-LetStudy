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

	/* ———————————————————— Comment API ———————————————————— */
	commentCreate = async(description, noteId) => {
		let data = await this.post('/comment/create/', {description, noteId});
		return data;
	}

	commentGetByPage = async(noteId, page) => {
		let data = await this.get(`/comment/${noteId}/page/${page}/`);
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

	userGetByUsername = async (username) => {
		let data = await this.get(`/user/${username}/`);
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

	noteGetAllPageCount = async() => {
		let data = await this.get('/note/all/page_count/');
		return data;
	}

	noteGetAllByPage = async(page) => {
		let data = await this.get(`/note/all/page/${page}/`);
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
}

const api = new Api();
export default api;