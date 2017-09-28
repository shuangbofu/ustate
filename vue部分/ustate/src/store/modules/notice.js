import * as types from '../mutation-types'
import noticeApi from '../../api/noticeApi'
import {commonCommit1, commonCommit2} from '../../common/js/commonCommit'

const state = {
	count: 0,
	notices: []
}

const getters = {
	count: state => state.count,
	notices: state => state.notices
}

const actions = {
	initCount({commit}, state) {
		if (state === undefined) {
			noticeApi.getCount(data => {
				commit(types.INIT_COUNT, {data})
			})
		}
	},
	initNotices({commit}, payload) {
		var fromId = payload.fromId
		var _this = payload._this
		var refresh = payload.refresh
		commonCommit1({commit}, refresh)
		noticeApi.getNotices(fromId, data => {
			commit(types.INIT_NOTICES, {data, fromId})
			commonCommit2({commit}, data, _this)
		})
	}
}

const mutations = {
	[types.INIT_COUNT](state, {data}) {
		state.count = data
	},
	[types.RESET_COUNT](state) {
		state.count = 0
	},
	[types.INIT_NOTICES](state, {data, fromId}) {
		if (fromId === 0) {
			state.notices = data
		} else {
			state.notices = state.notices.concat(data)
		}
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
