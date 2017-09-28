import * as types from '../mutation-types'
import likeApi from '../../api/likeApi'
import {commonCommit1, commonCommit2} from '../../common/js/commonCommit'

const state = {
	liked: [],
	self: false,
	index: -1
}

const getters = {
	liked: state => state.liked
}

const actions = {
	toggleLikeS({commit}, payload) {
		if (payload.liked) {
			commit(types.DELETE_LIKE_S)
			likeApi.deleteLikeS(payload.id, data => {
			})
		} else {
			commit(types.ADD_LIKE_S)
			likeApi.insertLikeS(payload.id, data => {
			})
		}
	},
	toggleLikeC({commit}, payload) {
		if (payload.liked) {
			commit(types.DELETE_LIKE_C)
			likeApi.deleteLikeC(payload.id, data => {
			})
		} else {
			commit(types.ADD_LIKE_C)
			likeApi.insertLikeC(payload.id, data => {
			})
		}
	},
	initLiked ({commit}, payload) {
		var fromId = payload.fromId
		var _this = payload._this
		var refresh = payload.refresh
		commonCommit1({commit}, refresh)
		likeApi.getLiked(fromId, data => {
			commit(types.INIT_LIKED, {data, fromId})
			commonCommit2({commit}, data, _this)
		})
	},
	removeLiked({commit}, id) {
		commit(types.REMOVE_LIKED)
		commit(types.DECLARE_LIKED_COUNT)
		likeApi.deleteLikeS(id, data => {
			if (data > 0) {
				commit(types.SHOW_TOP_POPUP, '取消喜欢成功！')
			}
		})
	}
}

const mutations = {
	[types.INIT_LIKED](state, {data, fromId}) {
		if (fromId === 0) {
			state.liked = data
		} else {
			state.liked = state.liked.concat(data)
		}
	},
	[types.INIT_LIKE_INDEX](state, data) {
		state.index = data
	},
	[types.REMOVE_LIKED](state) {
		state.liked.splice(state.index, 1)
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
