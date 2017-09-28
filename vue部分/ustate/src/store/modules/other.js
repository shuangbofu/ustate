import * as types from '../mutation-types'
import otherApi from '../../api/otherApi'
import router from '../../router'

const state = {
	popupMessage: '',
	popupVisible: false,
	repType: -1,
	position: '',
	id: -1
}

const getters = {
	popupVisible: state => state.popupVisible,
	position: state => state.position,
	popupMessage: state => state.popupMessage,
	repType: state => state.repType,
	id: state => state.id
}

const actions = {
	report ({commit, state}, index) {
		commit(types.CLOSE_POPUP)
		otherApi.insertReport({
			defId: state.id,
			typeId: state.repType,
			contentId: index
		}, (data) => {
			commit(types.SHOW_TOP_POPUP, '举报成功！')
		})
	},
	sendFeedback ({commit}, content) {
		commit(types.PUBLISHING, true)
		otherApi.insertFeedback(content, (data) => {
			commit(types.PUBLISHING, false)
			if (data > 0) {
				router.replace({name: 'profile'})
				setTimeout(() => {
					commit(types.SHOW_TOP_POPUP, '提交反馈成功！')
				}, 500)
			}
		})
	}
}

const mutations = {
	[types.INIT_POPUP] (state, payload) {
		state.id = payload.id
		state.repType = payload.type
	},
	[types.SHOW_CENTER_POPUP] (state) {
		state.position = 'center'
		state.popupVisible = true
	},
	[types.CLOSE_POPUP] (state) {
		state.popupVisible = false
	},
	[types.SHOW_TOP_POPUP] (state, message) {
		state.popupMessage = message
		state.position = 'top'
		state.popupVisible = true
		setTimeout(() => {
			state.popupVisible = false
		}, 1000)
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
