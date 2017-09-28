import axios from 'axios'
export default {
	getProfId(cb) {
		axios.get('http://192.168.0.166:8080/ustate/user/getProfId.action', {
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	login (payload, cb) {
		axios.get('http://192.168.0.166:8080/ustate/user/login.action', {
			params: {
				userLoginname: payload.userLoginname,
				userPassword: payload.userPassword
			}
		}).then((response) => cb(response.data))
	}
}
