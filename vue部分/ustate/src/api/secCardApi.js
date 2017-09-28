import axios from 'axios'
export default {
	getCards (fromId, cb) {
		let url = 'http://118.89.182.253:8080/ustate/search/posts/' + fromId
		axios({
			url: url,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	addCard (paylaod, cb) {
		let url = 'http://118.89.182.253:8080/ustate/search/post'
		axios({
			url: url,
			method: 'POST',
			data: {
				number: paylaod.number,
				name: paylaod.name,
				phone: paylaod.phone,
				qq: paylaod.qq,
				type: paylaod.type,
				remark: paylaod.remark
			}
		}).then((response) => cb(response.data))
	},
	deleteCard (id, cb) {
		let url = 'http://118.89.182.253:8080/ustate/search/post/' + id
		axios.delete(url).then((response) => cb(response.data))
	}
}
