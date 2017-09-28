<template>
	<div class="publish">
		<div class="publish-header">
			<my-header title="Ustate">
				<div class="send" @click="publish">
					<h2 :class="{'publishing': publishing}">{{publishing?'发表中...':'发表'}}</h2>
				</div>
			</my-header>
		</div>
		<div class="publish-text-area">
			<textarea class="text" placeholder="发表..." autofocus="autofocus" draggable="false" v-model="content"></textarea>
		</div>
		<div class="sercret">
			<button :class="{'active': sercret}" class="sercretButton" @click="toggle">{{sercret?'匿名中':'未匿名'}}</button>
		</div>
		<div class="length">
			字数：<h2 :class="{'active': length < 0}">{{length}}</h2>
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
			content: '',
			sercret: false
		}
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		publish () {
			if (!this.publishing) {
				if (this.content === '') {
					this.$store.commit('SHOW_TOP_POPUP', '发表内容不能为空！')
					return
				} else if (this.length < 0) {
					this.$store.commit('SHOW_TOP_POPUP', '字数超过限制！')
					return
				}
				this.$store.dispatch('addStatement', {
					sercret: this.sercret ? 1 : 0,
					content: this.content.replace(/\n/g, '<br>')
				})
			}
		},
		toggle () {
			this.sercret = !this.sercret
		}
	},
	activated() {
		this.content = ''
		this.sercret = false
		this.$store.dispatch('initStatementProfile')
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
			return 512 - this.content.replace(/\n/g, '<br>').length
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.publish
	position absolute
	top 40px
	width 100%
	overflow hidden
	width 100%
	.publish-text-area
		width 100%
		padding-top 5px
		.text
			box-sizing border-box
			overflow hidden
			width 100%
			font-size 16px
			border 1px solid #26A2FF
			resize vertical
			height 150px
			background #fff
			padding 8px 14px 0 14px
			outline-color #26A2FF
	.sercret
		display inline-block
		padding 6px
		.sercretButton
			outline none
			border none
			border-radius 10px
			padding 6px  10px
			background #f2f2f2
			font-size 16px
			color #000
			&.active
				background rgb(38, 162, 255)
				color #fff
	.length
		display inline-block
		float right
		line-height 50px
		margin-right 10px
		font-size 16px
		h2
			display inline-block
			color #26A2FF
			&.active
				color #ED4956
</style>
