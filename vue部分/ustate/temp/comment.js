import commentApi from '../../api/commentApi'
import * as types from '../mutation-types'
const state = {
	currStatementComments: []
}

const getters = {
	currStatementComments: state => state.currStatementComments,
	currStatementCommentCount: state => state.currStatementComments.length
}

const actions = {
	initComments ({commit}, stmtId) {
		commentApi.getComments(stmtId, data => {
			commit(types.SET_CURRSTATEMENT_COMMENTS, {data})
		})
	},
	addComment ({commit}, payload) {
		commentApi.addComment(payload, () => {
			commit(types.ADD_STATEMENT_STMTCOMMENTCOUNT)
		})
	},
	deleteComment ({commit}, payload) {
		commentApi.deleteComment(payload, () => {
			commit(types.DECLARE_STATEMENT_STMTCOMMENTCOUNT)
			commit(types.DELETE_COMMENT, payload.cmtId)
		})
	}
}

const mutations = {

	[types.SET_CURRSTATEMENT_COMMENTS] (state, {data}) {
		state.currStatementComments = data
	},
	[types.DELETE_COMMENT] (state, cmtId) {
		for (let i = 0; i < state.currStatementComments.length; i++) {
			if (state.currStatementComments[i].cmtId === cmtId) {
				state.currStatementComments.splice(i, 1)
			}
		}
	},
	[types.UPDATE_CMTPRAISECOUNT] (state, payload) {
		let count = payload.isPraised ? -1 : 1
		state.currStatementComments.find(c => c.cmtId === payload.cmtId).cmtPraiseCount += count
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
