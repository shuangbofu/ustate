<template>
	<div :class="position" class="popup">
		<transition :name="position">
			<div class="content"  v-if="popupVisible" :class="position">
				<h2 >{{popupMessage}}</h2>
				<div class="action-item" @touchstart="touchstart($refs.reason1.style)" @touchend="touchend($refs.reason1.style)" ref="reason1" @click="report(1)">
					垃圾信息
				</div>
				<div class="action-item" @touchstart="touchstart($refs.reason2.style)" @touchend="touchend($refs.reason2.style)" ref="reason2" @click="report(2)">
					内容不当
				</div>
				<div class="action-item" @touchstart="touchstart($refs.reason3.style)" @touchend="touchend($refs.reason3.style)" ref="reason3" @click="report(3)">
					其他
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="mask" :class="position" v-if="popupVisible" @click.stop.prevent="close" ></div>
		</transition>
	</div>
</template>

<script>
export default {
	data () {
		return {
		}
	},
	computed: {
		popupVisible () {
			return this.$store.getters.popupVisible
		},
		position () {
			return this.$store.getters.position
		},
		type () {
			return this.$store.getters.repType
		},
		id () {
			return this.$store.getters.id
		},
		popupMessage () {
			return this.$store.getters.popupMessage
		}
	},
	methods: {
		close () {
			this.$store.commit('CLOSE_POPUP')
		},
		touchstart (style) {
			style.background = '#f2f2f2'
		},
		touchend (style) {
			style.background = '#fff'
		},
		report (index) {
			this.$store.dispatch('report', index)
		}
	},
	deactivated () {
		this.$store.commit('CLOSE_POPUP')
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.popup
	.content
		z-index 52
		opacity 1
		width 100%
		&.center-enter-active, &.center-leave-active
			transition all .4s
		&.center-enter, &.center-leave-active
			opacity 0
		&.center
			position absolute
			top 40%
			left 30%
			text-align center
			height 123px
			width 40%
			.action-item
				line-height 40px
				height 40px
				background #fff
				text-align center
				font-size 16px
				color  #000
				border-bottom 1px solid #e0e0e0
			h2
				display none		
		&.top
			position fixed
			top 0px
			width 100%
			height 40px
			color #fff
			background #26A2FF
			transform translate3d(0, 0,  0)			
			&.top-enter-active, &.top-leave-active
				transform  translate3d(0,  0, 0)
				transition all .2s linear
			&.top-enter, &.top-leave-active
				transform translate3d(0, -100%,  0)
			h2
				text-align center
				line-height 40px
				font-size 18px
			.action-item
				display none
	.mask
		position fixed
		top 0px	
		left 0px
		width 100%
		height 100%
		z-index 40
		background #000
		opacity 1
		background rgba(2, 17, 27,  .6)
		&.fade-enter-active, &.fade-leave-active
			transition all 0.4s
		&.fade-enter, &.fade-leave-active
			opacity 0
			background rgba(7, 17, 27, 0)
		&.top
			display none
</style>
