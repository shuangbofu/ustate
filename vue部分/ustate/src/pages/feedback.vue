<template>
	<div class="feedback">
		<div class="feedback-header">
			<my-header title="意见和建议">
				<div class="send" @click="sendFeedback">
					<h2 :class="{'publishing': publishing}">{{publishing?'提交中':'提交'}}</h2>
				</div>
			</my-header>
		</div>
		<div class="feedback-text-area">
			<textarea class="text" placeholder="写下您的意见和建议..." autofocus="autofocus" draggable="false" v-model="content"></textarea>
		</div>
		<popup></popup>
	</div>
</template>

<script>
import myHeader from '@/components/header'
import popup from '@/components/popup'
export default {
	data () {
		return {
			content: ''
		}
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		sendFeedback () {
			if (!this.publishing) {
				if (this.content === '') {
					this.$store.commit('SHOW_TOP_POPUP', '反馈内容不能为空！')
					return
				} else if (this.length < 0) {
					this.$store.commit('SHOW_TOP_POPUP', '字数超过限制！')
					return
				} else {
					this.$store.dispatch('sendFeedback', this.content)
				}
			}
		}
	},
	components: {
		myHeader,
		popup
	},
	computed: {
		publishing() {
			return this.$store.getters.publishing
		},
		length () {
			return 512 - this.content.length
		}
	},
	creaed () {
		if (this.$store.getters.profile.profId === undefined) {
			this.$store.dispatch('initProfile_bak')
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.feedback
	position absolute
	top 40px
	width 100%
	overflow hidden
	width 100%
	.feedback-text-area
		width 100%
		padding-top 5px
		.text
			box-sizing border-box
			overflow hidden
			width 100%
			font-size 16px
			border none
			resize vertical
			height 150px
			background #fff
			padding 8px 14px 0 14px
			outline-color #26A2FF
</style>
