import axios from 'axios'
export default {
	getPraisedSArray (profId, cb) {
		axios.get('http://192.168.0.166:8080/ustate/praiseS/getIsPraiseSArray.action', {
			params: {
				profId: profId
			}
		}).then((response) => cb(response.data))
	},
	getPraisedCArray (profId, cb) {
		axios.get('http://192.168.0.166:8080/ustate/praiseC/getIsPraiseCArray.action', {
			params: {
				profId: profId
			}
		}).then((response) => cb(response.data))
	},
	toggleStmtPraised (payload, cb) {
		axios.get('http://192.168.0.166:8080/ustate/praiseS/togglePraised.action', {
			params: {
				isPraised: payload.isPraised,
				profId: payload.profId,
				stmtId: payload.stmtId
			}
		}).then(() => cb())
	},
	toggleCmtPraised (payload, cb) {
		axios.get('http://192.168.0.166:8080/ustate/praiseC/togglePraised.action', {
			params: {
				isPraised: payload.isPraised,
				profId: payload.profId,
				cmtId: payload.cmtId
			}
		}).then(() => cb())
	},
	getPraises(stmtId, cb) {
		axios.get('http://192.168.0.166:8080/ustate/praiseS/selectByStmtId.action', {
			params: {
				stmtId: stmtId
			}
		}).then((response) => cb(response.data))
	}
}
