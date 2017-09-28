import axios from 'axios'
export default {
	getCount(cb) {
		let url = 'http://118.89.182.253:8080/ustate/count'
		axios.get(url, {
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	getNotices(fromId, cb) {
		let url = 'http://118.89.182.253:8080/ustate/notices/' + fromId
		axios.get(url, {
			withCredentials: true
		}).then((response) => cb(response.data))
	}
}
