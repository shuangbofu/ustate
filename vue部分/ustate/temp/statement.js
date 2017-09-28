import statementApi from '../../api/statementApi'
import * as types from '../mutation-types'

const state = {
	statements: [],
	selectedIndex: 0,
	currStatement: {
		type: Object
	}
}

const getters = {
	statements: state => state.statements,
	selectedStatement: state => state.currStatement,
	selectedIndex: state => state.selectedIndex
}

const actions = {
	initStatements ({commit}) {
		statementApi.getStatements(data => {
			commit(types.INIT_STATEMENTS, {data})
		})
	},
	initCurrStatement ({commit}, currStmtId) {
		statementApi.getCurrStatement(currStmtId, data => {
			commit(types.SET_CURRSTATEMENT, {data})
		})
	},
	deleteStatement ({commit}, payload) {
		statementApi.deleteStatement(payload.stmtId, payload.profId, () => {
			commit(types.DELETE_CURRSTATEMENT, payload.stmtId)
		})
	},
	addStatement ({commit}, payload) {
		statementApi.addStatement(payload, (data) => {
			commit(types.ADD_STATEMENT, {data})
		})
	}
}

const mutations = {
	[types.INIT_STATEMENTS] (state, {data}) {
		state.statements = data
	},
	initSelectedIndex (state, data) {
		state.selectedIndex = data
	},
	[types.SET_CURRSTATEMENT] (state, {data}) {
		state.currStatement = data
	},
	[types.UPDATE_STMTPRAISECOUNT] (state, payload) {
		let count = payload.isPraised ? -1 : 1
		state.currStatement.stmtPraiseCount += count
		if (state.statements.length > 0) {
			state.statements[payload.index].stmtPraiseCount += count
		}
	},
	[types.ADD_STATEMENT_STMTCOMMENTCOUNT] (state) {
		if (state.statements.length > 0) {
			state.statements[state.selectedIndex].stmtCommentCount ++
		}
	},
	[types.DECLARE_STATEMENT_STMTCOMMENTCOUNT] (state) {
		state.currStatement.stmtCommentCount --
		if (state.statements.length > 0) {
			state.statements[state.selectedIndex].stmtCommentCount --
		}
	},
	[types.DELETE_CURRSTATEMENT] (state, stmtId) {
		state.statements.splice(state.selectedIndex, 1)
	},
	[types.ADD_STATEMENT] (state, {data}) {
		state.statements.unshift(data)
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
