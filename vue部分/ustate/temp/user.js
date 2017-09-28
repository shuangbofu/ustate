// import axios from 'axios'
import userApi from '../../api/userApi'
// import Vue from 'vue'

const state = {
	profId: ''
	// isLogin: {
	// 	type: Boolean
	// }
}

const getters = {
	// getProfPraiseSs(state) {
	// 	return state.user.profPraiseSs
	// },
	getProfId (state) {
		// return state.profId
		// return localStorage.getItem('profId')
		return state.profId
	}
	// getIsLogin (state) {
	// 	return state.isLogin
	// }
}

const actions = {
	initProfId ({commit}) {
		userApi.getProfId(data => {
			commit('setProfId', {data})
		})
	},
	login ({commit, dispatch}, payload) {
		userApi.login(payload, data => {
			// commit('setIsLogin', data)
			dispatch('initProfId')
		})
	}
	// queryProfPraiseSs (context, profId) {
	// 	axios.get('http://localhost:8080/ustate/praiseS/getIsPraseSArray.action', {
	// 		params: {
	// 			profId: profId
	// 		}
	// 	}).then((response) => {
	// 		context.commit('setProfPraiseSs', response.data)
	// 	})
	// }
}

const mutations = {
	// setProfPraiseSs (state, data) {
	// 	Vue.set(state.user, 'profPraiseSs', data)
	// },
	setProfId (state, {data}) {
		// console.log(data)
		state.profId = data
		// console.log('设置成功')
		// localStorage.setItem('profId', data)
		// alert('已设置为' + data)
	}
	// setIsLogin (state, data) {
	// 	if (data === 'success') {
	// 		state.isLogin = true
	// 	} else {
	// 		state.isLogin = false
	// 	}
	// }
}

export default {
	state,
	getters,
	actions,
	mutations
}
