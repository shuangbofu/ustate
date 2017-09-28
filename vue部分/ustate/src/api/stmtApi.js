import axios from 'axios'
export default {
	getStatements(fromId, cb) {
		let url = 'http://118.89.182.253:8080/ustate/posts/' + fromId
		axios({
			url: url,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	getHotStatements(fromId, cb) {
		let url = 'http://118.89.182.253:8080/ustate/hot/' + fromId
		axios({
			url: url,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	getStatement(id, cb) {
		let url = 'http://118.89.182.253:8080/ustate/post/' + id
		axios.get(url, {
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	getPosted (fromId, cb) {
		let url = 'http://118.89.182.253:8080/ustate/posts/self/' + fromId
		axios.get(url, {
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	addStatement (paylaod, cb) {
		let url = 'http://118.89.182.253:8080/ustate/post'
		axios({
			method: 'post',
			url: url,
			data: {
				content: paylaod.content,
				sercret: paylaod.sercret
			},
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		}).then((response) => cb(response.data))
	},
	deleteStatement (id, cb) {
		let url = 'http://118.89.182.253:8080/ustate/post/' + id
		axios.delete(url, {
			withCredentials: true
		}).then((response) => cb(response.data))
	}
}
