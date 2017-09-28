import axios from 'axios'
export default {
	getProfile(cb) {
		let url = 'http://118.89.182.253:8080/ustate/profile'
		axios.get(url, {
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	getProfileLists (cb) {
		let url = 'http://118.89.182.253:8080/ustate/profile/lists'
		axios.get(url, {
				withCredentials: true
			}).then((response) => cb(response.data))
	},
	simulateLogin (cb, profId) {
		let url = 'http://118.89.182.253:8080/ustate/profile/login/' + profId
		axios.post(url, {
			withCredentials: true
		}).then((response) => cb(response.data))
	}
}
