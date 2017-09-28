import * as types from '../mutation-types'
import stmtApi from '../../api/stmtApi'
import profApi from '../../api/profApi'
import {commonCommit1, commonCommit2} from '../../common/js/commonCommit'
import router from '../../router'

const state = {
	statements: [],
	hotStatements: [],
	statement: {
		type: Object
	},
	posted: [],
	type: 0,
	index: -1,
	profile: {
	}
}

const getters = {
	statements: state => state.statements,
	hotStatements: state => state.hotStatements,
	index: state => state.index,
	detail: (state) => {
		if (state.index !== -1) {
			if (state.type === 0) {
				return state.statements[state.index]
			} else if (state.type === 1) {
				return state.hotStatements[state.index]
			} else {
				return state.posted[state.index]
			}
		} else {
			return state.statement
		}
	},
	posted: state => state.posted,
	type: staet => state.type
}

const actions = {
	initStatements ({commit}, payload) {
		var fromId = payload.fromId
		var _this = payload._this
		var refresh = payload.refresh
		commonCommit1({commit}, refresh)
		stmtApi.getStatements(fromId, data => {
			commit(types.INIT_STATEMENTS, {data, fromId})
			commonCommit2({commit}, data, _this)
		})
	},
	initHotStatements ({commit}, payload) {
		var fromId = payload.fromId
		var _this = payload._this
		var refresh = payload.refresh
		commonCommit1({commit}, refresh)
		stmtApi.getHotStatements(fromId, data => {
			commit(types.INIT_HOT_STATEMENTS, {data, fromId})
			commonCommit2({commit}, data, _this)
		})
	},
	initStatement ({commit}, payload) {
		var id = payload.id
		var _this = payload._this
		commit(types.UPDATE_LOADING, true)
		stmtApi.getStatement(id, data => {
			commit(types.INIT_STATEMENT, {data})
			if (_this !== undefined) {
				_this.$nextTick(() => {
					_this._initScroll()
				})
			}
			commit(types.UPDATE_LOADING, false)
		})
	},
	initPosted ({commit}, payload) {
		var fromId = payload.fromId
		var _this = payload._this
		var refresh = payload.refresh
		commonCommit1({commit}, refresh)
		stmtApi.getPosted(fromId, data => {
			commit(types.INIT_POSTED, {data, fromId})
			commonCommit2({commit}, data, _this)
		})
	},
	addStatement ({commit}, payload) {
		commit(types.PUBLISHING, true)
		stmtApi.addStatement(payload, data => {
			commit(types.PUBLISHING, false)
			if (data > 0) {
				commit(types.ADD_STATEMENT, {data, payload})
				router.replace({name: 'index'})
				setTimeout(() => {
					commit(types.SHOW_TOP_POPUP, '发表成功！')
				}, 500)
			} else {
				router.replace({name: 'index'})
				setTimeout(() => {
					commit(types.SHOW_TOP_POPUP, '发表成功！')
				}, 500)
			}
		})
	},
	initStatementProfile ({commit}) {
		profApi.getProfile(data => {
			commit(types.INIT_STATEMENT_PROFILE, {data})
			if (data.profId === 0) {
				commit(types.SHOW_TOP_POPUP, '请先登录！')
				setTimeout(() => {
					router.replace({name: 'login'})
				}, 1000)
			}
		})
	},
	deleteStatement ({commit, state}, id) {
		stmtApi.deleteStatement(id, data => {
			if (data > 0) {
				commit(types.DELETE_STATEMENT)
				if (state.type < 1) {
					router.replace({name: 'index'})
					setTimeout(() => {
						commit(types.SHOW_TOP_POPUP, '删除成功！')
					}, 500)
				} else if (state.type === 2) {
					router.replace({name: 'posted'})
					setTimeout(() => {
						commit(types.SHOW_TOP_POPUP, '删除成功！')
					})
				} else {
					commit(types.SHOW_TOP_POPUP, '删除成功！')
				}
			}
		})
	}
}

const mutations = {
	[types.INIT_INDEX](state, data) {
		state.index = data
	},
	[types.INIT_STATEMENTS](state, {data, fromId}) {
		if (fromId === 0) {
			state.statements = data
		} else {
			state.statements = state.statements.concat(data)
		}
	},
	[types.INIT_HOT_STATEMENTS](state, {data, fromId}) {
		if (fromId === 0) {
			state.hotStatements = data
		} else {
			state.hotStatements = state.hotStatements.concat(data)
		}
	},
	[types.INIT_STATEMENT](state, {data}) {
		state.statement = data
	},
	[types.DELETE_LIKE_S](state) {
		if (state.index !== -1) {
			if (state.type === 0) {
				state.statements[state.index].liked = 0
				state.statements[state.index].likeCount --
			} else if (state.type === 1) {
				state.hotStatements[state.index].liked = 0
				state.hotStatements[state.index].likeCount --
			} else {
				state.posted[state.index].liked = 0
				state.posted[state.index].likeCount --
			}
		} else {
			state.statement.liked = 0
			state.statement.likeCount --
		}
	},
	[types.ADD_LIKE_S](state) {
		if (state.index !== -1) {
			if (state.type === 0) {
				state.statements[state.index].liked = 1
				state.statements[state.index].likeCount ++
			} else if (state.type === 1) {
				state.hotStatements[state.index].liked = 1
				state.hotStatements[state.index].likeCount ++
			} else {
				state.posted[state.index].liked = 1
				state.posted[state.index].likeCount ++
			}
		} else {
			state.statement.liked = 1
			state.statement.likeCount ++
		}
	},
	[types.ADD_COMMENT_COUNT](state) {
		if (state.index !== -1) {
			if (state.type === 0) {
				state.statements[state.index].commentCount ++
			} else if (state.type === 1) {
				state.hotStatements[state.index].commentCount ++
			} else {
				state.posted[state.index].commentCount ++
			}
		} else {
			state.statement.commentCount ++
		}
	},
	[types.DECLARE_COMMENT_COUNT](state) {
		if (state.index !== -1) {
			if (state.type === 0) {
				state.statements[state.index].commentCount --
			} else if (state.type === 1) {
				state.hotStatements[state.index].commentCount --
			} else {
				state.posted[state.index].commentCount --
			}
		} else {
			state.statement.commentCount --
		}
	},
	[types.INIT_POSTED](state, {data, fromId}) {
		if (fromId === 0) {
			state.posted = data
		} else {
			state.posted = state.posted.concat(data)
		}
	},
	[types.INIT_TYPE](state, data) {
		state.type = data
	},
	[types.ADD_STATEMENT](state, {data, payload}) {
		if (payload.sercret === 1) {
			state.profile.id = 0
			state.profile.avatar = state.profile.gender ? 'http://118.89.182.253/img/avatar_male.jpg' : 'http://118.89.182.253/img/avatar_female.jpg'
			state.profile.nickname = '某同学'
		}
		var statement = {
			'id': data,
			'createtime': new Date().getTime(),
			'content': payload.content,
			'liked': 0,
			'likeCount': 0,
			'author': 1,
			'commentCount': 0,
			'sercret': payload.sercret,
			'profile': state.profile
		}
		state.statements.unshift(statement)
	},
	[types.INIT_STATEMENT_PROFILE](state, {data}) {
		state.profile = data
	},
	[types.DELETE_STATEMENT](state) {
		if (state.type === 0) {
			state.statements.splice(state.index, 1)
		} else if (state.type === 1) {
			state.hotStatements.splice(state.index, 1)
		} else {
			state.posted.splice(state.index, 1)
		}
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
