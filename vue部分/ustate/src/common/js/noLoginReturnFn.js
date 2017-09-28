import router from '@/router'
import store from '@/store'
export default function noLoginReturnFn (cb) {
	let profId = store.getters.profile.profId
	if (profId === 0 || profId === undefined) {
		store.commit('SHOW_TOP_POPUP', '请先登录！')
		setTimeout(() => {
			router.replace({name: 'login'})
		}, 1000)
	} else {
		cb()
	}
}
