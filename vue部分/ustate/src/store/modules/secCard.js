import * as types from '../mutation-types'
import secCardApi from '../../api/secCardApi'
import profApi from '../../api/profApi'
import {commonCommit1, commonCommit2} from '../../common/js/commonCommit'
import store from '@/store/index'

const state = {
	cards: [],
	index: -1
}

const getters = {
	cards: state => state.cards
}

const actions = {
	initCards ({commit}, payload) {
		var fromId = payload.fromId
		var _this = payload._this
		var refresh = payload.refresh
		commonCommit1({commit}, refresh)
		secCardApi.getCards(fromId, data => {
			commit(types.INIT_CARDS, {data, fromId})
			commonCommit2({commit}, data, _this)
		})
	},
	addCard ({commit}, payload) {
		var _this = payload._this
		commit(types.PUBLISHING, true)
		secCardApi.addCard(payload, data => {
			commit(types.PUBLISHING, false)
			if (data > 0) {
				_this.$nextTick(() => {
					_this.$refs.list._initScroll()
				})
				commit(types.ADD_CARD, {data, payload})
				setTimeout(() => {
					commit(types.SHOW_TOP_POPUP, '发布成功！')
				}, 500)
			} else {
				setTimeout(() => {
					commit(types.SHOW_TOP_POPUP, '发布成功！')
				}, 500)
			}
		})
	},
	initProfile_bak ({commit}) {
		profApi.getProfile(data => {
			commit(types.INIT_PROFILE, {data})
		})
	},
	deleteCard ({commit}, id) {
		secCardApi.deleteCard(id, data => {
			if (data > 0) {
				commit(types.DELETE_CARD)
				commit(types.SHOW_TOP_POPUP, '删除成功！')
			} else {
				commit(types.SHOW_TOP_POPUP, '删除失败！')
			}
		})
	}
}

const mutations = {
	[types.INIT_CARDS] (state, {data, fromId}) {
		if (fromId === 0) {
			state.cards = data
		} else {
			state.cards = state.cards.concat(data)
		}
	},
	[types.ADD_CARD] (state, {data, payload}) {
		var card = {
			'id': data,
			'number': payload.number,
			'name': payload.name,
			'phone': payload.phone,
			'qq': payload.qq,
			'type': payload.type,
			'remark': payload.remark,
			'createtime': new Date().getTime(),
			'author': 1,
			'profNickname': store.getters.profile.nickname
		}
		state.cards.unshift(card)
	},
	[types.INIT_CARD_INDEX](state, data) {
		state.index = data
	},
	[types.DELETE_CARD] (state) {
		state.cards.splice(state.index, 1)
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
