import cmtApi from '../../api/cmtApi'
import profApi from '../../api/profApi'
import * as types from '../mutation-types'
import router from '../../router'
import {commonCommit1, commonCommit2} from '../../common/js/commonCommit'

const state = {
	comments: [],
	commented: [],
	index: -1,
	profile: {
	},
	self: false,
	commentLoading: false
}

const getters = {
	comments: (state) => state.comments,
	commented: (staet) => state.commented,
	commentLoading: state => state.commentLoading
}

const actions = {
	initComments ({commit}, paylaod) {
		var stmtId = paylaod.id
		var _this = paylaod._this
		commit(types.UPDATE_COMMENT_LOADING, true)
		cmtApi.getComments(stmtId, data => {
			commit(types.SET__COMMENTS, {data})
			if (_this !== undefined) {
				_this.$nextTick(() => {
					_this._initScroll()
					_this._calculateHeight()
				})
			}
			commit(types.UPDATE_COMMENT_LOADING, false)
		})
	},
	sendComment ({commit}, paylaod) {
		var _this = paylaod._this
		commit(types.PUBLISHING, true)
		cmtApi.insertComment(paylaod, data => {
			commit(types.PUBLISHING, false)
			if (data > 0) {
				commit(types.ADD_COMMENT, {data, paylaod})
				commit(types.ADD_COMMENT_COUNT)
				_this.$nextTick(() => {
					_this._initScroll()
					_this._calculateHeight()
				})
				commit(types.SHOW_TOP_POPUP, '评论成功！')
			} else {
				commit(types.SHOW_TOP_POPUP, '评论失败！')
			}
		})
	},
	initCommentProfile ({commit}) {
		profApi.getProfile(data => {
			commit(types.INIT_COMMENT_PROFILE, {data})
			if (data.profId === 0) {
				commit(types.SHOW_TOP_POPUP, '请先登录！')
				setTimeout(() => {
					router.replace({name: 'login'})
				}, 1000)
			}
		})
	},
	initCommented ({commit}, paylaod) {
		var fromId = paylaod.fromId
		var _this = paylaod._this
		var refresh = paylaod.refresh
		commonCommit1({commit}, refresh)
		cmtApi.getCommented(fromId, data => {
			commit(types.INIT_COMMENTED, {data, fromId})
			commonCommit2({commit}, data, _this)
		})
	},
	removeCommented({commit}, id) {
		cmtApi.deleteComment(id, data => {
			if (data > 0) {
				commit(types.REMOVE_COMMENTED)
				commit(types.DECLARE_COMMENTED_COUNT)
				commit(types.SHOW_TOP_POPUP, '删除评论成功！')
			} else {
				commit(types.SHOW_TOP_POPUP, '删除评论失败！')
			}
		})
	},
	deleteComment({commit}, id) {
		cmtApi.deleteComment(id, data => {
			if (data > 0) {
				commit(types.DELETE_COMMENT)
				commit(types.DECLARE_COMMENT_COUNT)
				commit(types.SHOW_TOP_POPUP, '删除评论成功！')
			} else {
				commit(types.SHOW_TOP_POPUP, '删除评论失败！')
			}
		})
	}
}

const mutations = {
	[types.SET__COMMENTS] (state, {data}) {
		state.comments = data
	},
	[types.ADD_COMMENT](state, {data, paylaod}) {
		if (paylaod.sercret === 1) {
			state.profile.id = 0
			state.profile.avatar = state.profile.gender ? 'http://118.89.182.253/img/avatar_male.jpg' : 'http://118.89.182.253/img/avatar_female.jpg'
			state.profile.nickname = '某同学'
		}
		var comment = {
			'id': data,
			'createtime': new Date().getTime(),
			'content': paylaod.content,
			'liked': 0,
			'likeCount': 0,
			'author': 1,
			'sercret': paylaod.sercret,
			'stmtId': paylaod.stmtId,
			'profile': state.profile
		}
		state.comments.push(comment)
	},
	[types.INIT_COMMENT_PROFILE](state, {data}) {
		state.profile = data
	},
	[types.INIT_COMMENT_INDEX](state, data) {
		state.index = data
	},
	[types.DELETE_LIKE_C](state) {
		if (state.index !== -1) {
			if (state.self) {
				state.commented[state.index].liked = 0
				state.commented[state.index].likeCount --
			} else {
				state.comments[state.index].liked = 0
				state.comments[state.index].likeCount --
			}
		} else {
			state.comments.liked = 0
			state.comments.likeCount --
		}
	},
	[types.ADD_LIKE_C](state) {
		if (state.index !== -1) {
			if (state.self) {
				state.commented[state.index].liked = 1
				state.commented[state.index].likeCount ++
			} else {
				state.comments[state.index].liked = 1
				state.comments[state.index].likeCount ++
			}
		} else {
			state.comments.liked = 1
			state.comments.likeCount ++
		}
	},
	[types.INIT_COMMENTED](state, {data, fromId}) {
		if (fromId === 0) {
			state.commented = data
		} else {
			state.commented = state.commented.concat(data)
		}
	},
	[types.SET_COMMENT_SELF](state, data) {
		state.self = data
	},
	[types.REMOVE_COMMENTED] (data) {
		state.commented.splice(state.index, 1)
	},
	[types.UPDATE_COMMENT_LOADING] (state, data) {
		state.commentLoading = data
	},
	[types.DELETE_COMMENT] (state) {
		state.comments.splice(state.index, 1)
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
