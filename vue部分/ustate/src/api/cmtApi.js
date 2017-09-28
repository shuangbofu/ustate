import axios from 'axios'
export default {
	getComments(stmtId, cb) {
		let url = 'http://118.89.182.253:8080/ustate/comment/' + stmtId
		axios.get(url, {
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	insertComment(paylaod, cb) {
		let url = 'http://118.89.182.253:8080/ustate/comment/' + paylaod.stmtId
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
	getCommented (fromId, cb) {
		let url = 'http://118.89.182.253:8080/ustate/comment/self/' + fromId
		axios.get(url, {
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	deleteComment(id, cb) {
		let url = 'http://118.89.182.253:8080/ustate/comment/' + id
		axios.delete(url, {
			withCredentials: true
		}).then((response) => cb(response.data))
	}
}
