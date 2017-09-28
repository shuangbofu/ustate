import axios from 'axios'
export default {
	getComments(stmtId, cb) {
		axios.get('http://192.168.0.166:8080/ustate/comment/selectById.action', {
			params: {
				stmtId: stmtId
			}
		}).then((response) => {
			cb(response.data)
		})
	},
	addComment(payload, cb) {
		axios.get('http://192.168.0.166:8080/ustate/comment/addComment.action', {
			params: {
				stmtId: payload.stmtId,
				profId: payload.profId,
				content: payload.content
			}
		}).then((response) => cb())
	},
	deleteComment(payload, cb) {
		axios.get('http://192.168.0.166:8080/ustate/comment/deleteComment.action', {
			params: {
				cmtId: payload.cmtId,
				profId: payload.profId
			}
		}).then(() => cb())
	}
}
