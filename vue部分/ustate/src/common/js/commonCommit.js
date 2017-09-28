import * as types from '../../store/mutation-types'

export function commonCommit1({commit}, refresh) {
	commit(types.UPDATE_REFRESH, refresh)
	commit(types.UPDATE_LOADING, true)
}
export function commonCommit2({commit}, data, _this) {
	if (_this !== undefined) {
		_this.$nextTick(() => {
			_this._initScroll()
			_this._calculateHeight()
		})
	}
	commit(types.UPDATE_REFRESH, false)
	commit(types.UPDATE_LOADING, false)
	if (data.length === 0) {
		commit(types.UPDATE_LOADED_ALL, true)
	}
}
