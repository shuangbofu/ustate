import axios from 'axios'
export default {
	insertLikeS(id, cb) {
		let url = 'http://118.89.182.253:8080/ustate/like/' + id
		axios.post(url, {
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	deleteLikeS(id, cb) {
		let url = 'http://118.89.182.253:8080/ustate/like/' + id
		axios.delete(url, {
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	insertLikeC(id, cb) {
		let url = 'http://118.89.182.253:8080/ustate/like/comment/' + id
		axios.post(url, {
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	deleteLikeC(id, cb) {
		let url = 'http://118.89.182.253:8080/ustate/like/comment/' + id
		axios.delete(url, {
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	getLiked (fromId, cb) {
		let url = 'http://118.89.182.253:8080/ustate/like/self/' + fromId
		axios.get(url, {
			withCredentials: true
		}).then((response) => cb(response.data))
	}
}
