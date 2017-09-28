import * as types from '../mutation-types'
import userApi from '../../api/userApi'
import router from '../../router'

const state = {
	loginLoading: false
}

const getters = {
	loginLoading: state => state.loginLoading
}

const actions = {
	login ({commit, dispatch}, payload) {
		commit(types.UPDATE_LOGIN_LOADING, true)
		userApi.login(payload, data => {
			if (data > 0) {
				dispatch('initProfile')
				dispatch('initCount')
				commit('resetLogInOrOut')
				setTimeout(() => {
					commit(types.SHOW_TOP_POPUP, '登录成功！')
				}, 500)
			} else {
				commit(types.SHOW_TOP_POPUP, '账号或密码错误，登录失败！')
			}
		})
	},
	logout ({commit, dispatch}) {
		userApi.logout(data => {
			if (data > 0) {
				commit('resetProfile')
				commit('resetLogInOrOut')
				router.replace({name: 'index'})
				setTimeout(() => {
					commit(types.SHOW_TOP_POPUP, '退出成功！')
				}, 500)
			} else {
				commit(types.SHOW_TOP_POPUP, '退出失败！')
			}
		})
	}
}

const mutations = {
	[types.UPDATE_LOGIN_LOADING](state, data) {
		state.loginLoading = data
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
