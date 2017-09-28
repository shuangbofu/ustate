import * as types from '../mutation-types'
import profApi from '../../api/profApi'
import router from '../../router'

const state = {
	profile: {
		type: Object
	},
	profileLoading: false,
	profileLists: []
}

const getters = {
	profile: state => state.profile,
	profileLoading: state => state.profileLoading,
	profileLists: state => state.profileLists
}

const actions = {
	initProfile({commit}) {
		commit(types.UPDATE_PROFILE_LOADING, true)
		profApi.getProfile(data => {
			commit(types.INIT_PROFILE, {data})
			commit(types.UPDATE_PROFILE_LOADING, false)
			if (data.profId === 0) {
				router.replace({name: 'login'})
			} else {
				router.replace({name: 'profile'})
			}
		})
	},
	initProfileLists ({commit}) {
		commit(types.UPDATE_LOGIN_LOADING, true)
		profApi.getProfileLists(data => {
			commit(types.UPDATE_LOGIN_LOADING, false)
			commit('initProfileLists', {data})
		})
	},
	simulateLogin ({commit, dispatch}, profId) {
		commit(types.UPDATE_LOGIN_LOADING, true)
		profApi.simulateLogin(data => {
			commit(types.UPDATE_LOGIN_LOADING, false)
			if (data > 0) {
				dispatch('initProfile')
				dispatch('initCount')
				commit('resetLogInOrOut')
				setTimeout(() => {
					commit(types.SHOW_TOP_POPUP, '登录成功！')
				}, 500)
			} else {
				commit(types.SHOW_TOP_POPUP, '登录失败！')
			}
		}, profId)
	}
}

const mutations = {
	[types.INIT_PROFILE](state, {data}) {
		state.profile = data
	},
	[types.DECLARE_LIKED_COUNT](state) {
		if (state.profile.likePostsCount !== undefined) {
			state.profile.likePostsCount --
		}
	},
	[types.DECLARE_COMMENTED_COUNT](state) {
		if (state.profile.commentPostsCount !== undefined) {
			state.profile.commentPostsCount --
		}
	},
	[types.UPDATE_PROFILE_LOADING] (state, data) {
		state.profileLoading = data
	},
	resetProfile (state) {
		state.profile = {}
	},
	initProfileLists (state, {data}) {
		state.profileLists = data
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
