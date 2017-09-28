<template>
	<div class="list">
		<div class="main-wrapper" ref="mainWrapper">
			<ul>
				<refresh-tip :scrollY="scrollY"></refresh-tip>
				<slot name="header"></slot>
				<slot name="list"></slot>
				<div v-if="loading && ! refresh" style="padding-top: 10px; text-align: center">
					<img src="http://118.89.182.253/img/ring-alt.gif" height="30px" width="30px">
				</div>
				<div v-if="loadedAll" style="padding: 10px; text-align: center; color: #8A8A8A">
					没有更多数据
				</div>
			</ul>
		</div>
	</div>
</template>

<script>
import refreshTip from '@/components/refreshTip'
import BScroll from 'better-scroll'
export default {
	data () {
		return {
			scrollY: 0,
			clientHeight: 0
		}
	},
	props: {
		maxHeight: 0
	},
	mounted () {
		this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
		this.initData()
	},
	activated () {
		this._initScroll()
		this.$store.commit('UPDATE_LOADED_ALL', false)
		this.mainScroll.scrollTo(0, this.scrollY)
	},
	methods: {
		initData() {
			this.$emit('init', this)
		},
		_initScroll () {
			if (!this.mainScroll) {
				this.mainScroll = new BScroll(this.$refs.mainWrapper, {
					click: true,
					probeType: 3
				})
				this.mainScroll.on('scroll', (pos) => {
					this.scrollY = pos.y
				})
				this.mainScroll.on('touchend', (pos) => {
					if (-pos.y > this.maxHeight - 500 && !this.loadedAll && this.maxHeight > this.clientHeight && !this.loading) {
						this.loadMore()
					}
					if (pos.y > 80) {
						this.initData()
					}
				})
			} else {
				this.mainScroll.refresh()
			}
		},
		_calculateHeight () {
			this.$emit('cal')
		},
		loadMore () {
			this.$emit('load', this)
		},
		setTop () {
			this.scrollY = 0
		},
		updateData () {
			this.initData()
		}
	},
	components: {
		refreshTip
	},
	computed: {
		loading () {
			return this.$store.getters.loading
		},
		loadedAll () {
			return this.$store.getters.loadedAll
		},
		refresh () {
			return this.$store.getters.refresh
		}
	},
	watch: {
		'$route': function(val, oldVal) {
			if (val.name === 'notice' && oldVal.name === 'profile') {
				this.setTop()
			}
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.list
	width 100%
	height 100%
	.main-wrapper
		width 100%
		height 100%
</style>
