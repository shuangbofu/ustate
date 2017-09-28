import axios from 'axios'
export default {
	insertReport(payload, cb) {
		let url = 'http://118.89.182.253:8080/ustate/report'
		axios({
			method: 'post',
			url: url,
			data: {
				defId: payload.defId,
				typeId: payload.typeId,
				contentId: payload.contentId
			},
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		}).then((response) => cb(response.data))
	},
	insertFeedback(content, cb) {
		let url = 'http://118.89.182.253:8080/ustate/feedback'
		axios({
			method: 'post',
			url: url,
			data: {
				content: content
			},
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		}).then((response) => cb(response.data))
	}
}
