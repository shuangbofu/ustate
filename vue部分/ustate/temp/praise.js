import * as types from '../mutation-types'
import praiseApi from '../../api/praiseApi'
const state = {
	praisedSArray: [],
	praisedCArray: [],
	currStatementPraises: []
}

const getters = {
	praisedSArray: state => state.praisedSArray,
	praisedCArray: state => state.praisedCArray,
	currStatementPraises: state => state.currStatementPraises,
	currStatementPraiseCount: state => state.currStatementPraises.length
}

const actions = {
	initPraises ({commit}, stmtId) {
		praiseApi.getPraises(stmtId, data => {
			commit(types.SET_CURRSTATEMENT_PRAISES, {data})
		})
	},
	initPraisedSArray ({commit}, profId) {
		praiseApi.getPraisedSArray(profId, data => {
			commit(types.INIT_ISPRAISE_S_ARRAY, {data})
		})
	},
	initPraisedCArray ({commit}, profId) {
		praiseApi.getPraisedCArray(profId, data => {
			commit(types.INIT_ISPRAISE_C_ARRAY, {data})
		})
	},
	toggleStmtPraisedAction ({commit, dispatch}, payload) {
		praiseApi.toggleStmtPraised(payload, () => {
			commit(types.TOGGLE_STMTPRAISED, payload)
			commit(types.UPDATE_STMTPRAISECOUNT, payload)
			dispatch('initPraises', payload.stmtId)
		})
	},
	toggleCmtPraisedAction ({commit}, payload) {
		praiseApi.toggleCmtPraised(payload, () => {
			commit(types.TOGGLE_CMTPRAISED, payload)
			commit(types.UPDATE_CMTPRAISECOUNT, payload)
		})
	}
}
Array.prototype.remove = function (val) {
	let index = this.indexOf(val)
	if (index > -1) {
		this.splice(index, 1)
	}
}
const mutations = {
	[types.SET_CURRSTATEMENT_PRAISES] (state, {data}) {
		state.currStatementPraises = data
	},
	[types.INIT_ISPRAISE_S_ARRAY] (state, {data}) {
		state.praisedSArray = data
	},
	[types.INIT_ISPRAISE_C_ARRAY] (state, {data}) {
		state.praisedCArray = data
	},
	[types.TOGGLE_STMTPRAISED] (state, payload) {
		payload.isPraised ? state.praisedSArray.remove(payload.stmtId) : state.praisedSArray.push(payload.stmtId)
	},
	[types.TOGGLE_CMTPRAISED] (state, payload) {
		payload.isPraised ? state.praisedCArray.remove(payload.cmtId) : state.praisedCArray.push(payload.cmtId)
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
