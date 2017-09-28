import axios from 'axios'
export default {
	login (payload, cb) {
		let url = 'http://118.89.182.253:8080/ustate/user/login'
			axios({
				url: url,
				method: 'post',
				data: {
					loginname: payload.loginname,
					password: payload.password
				},
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			}).then((response) => cb(response.data))
	},
	logout (cb) {
		axios.post('http://118.89.182.253:8080/ustate/user/logout').then((response) => cb(response.data))
	}
}
