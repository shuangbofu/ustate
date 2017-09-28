import axios from 'axios'
export default {
	getStatements(cb) {
		axios.get('http://192.168.0.166:8080/ustate/statement/list.action').then((response) => cb(response.data))
	},
	getCurrStatement(currStmtId, cb) {
		axios.get('http://192.168.0.166:8080/ustate/statement/selectById.action', {
			params: {
				stmtId: currStmtId
			}
		}).then((response) => cb(response.data))
	},
	deleteStatement(stmtId, profId, cb) {
		axios.get('http://192.168.0.166:8080/ustate/statement/deleteStatement.action', {
			params: {
				stmtId: stmtId,
				profId: profId
			}
		}).then(() => cb())
	},
	addStatement (payload, cb) {
		axios.get('http://192.168.0.166:8080/ustate/statement/addStatement.action', {
			params: {
				profId: payload.profId,
				stmtContent: payload.stmtContent
			}
		}).then((response) => {
			axios.get('http://192.168.0.166:8080/ustate/statement/selectById.action', {
				params: {
					stmtId: response.data
				}
			}).then((response) => cb(response.data))
		})
	}
}
