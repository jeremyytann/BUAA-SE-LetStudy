import axios from 'axios';
import Cookies from 'js-cookie';

const proxy = "http://127.0.0.1:8000";

axios.defaults.withCredentials = true;

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

    // GeneralUser API
	userRegister = async(username, password) => {
		let data = await this.post('/users/create/', {username, password});
		return data;
	}

    userLogin = async (username, password) => {
        let data = await this.post('/users/login/', {username, password});
		console.log(data);
        if (data['errorCode'] === 0) {
            const cookies = data['cookies'];
            Cookies.set('user_id', cookies['user_id']);
            Cookies.set('username', cookies['username']);
			
        }
		
        return data;
    }

    userLogout = async() => {
        let data = await this.get('/users/logout/');

		// clear cookies and logout
		Cookies.remove('username');
		Cookies.remove('user_id');

        return data;
    }

	userGetByUsername = async (username) => {
		let data = await this.get(`/users/${username}/`);
		return data;
	}
}

const api = new Api();
export default api;