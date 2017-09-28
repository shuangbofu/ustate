<template>
	<div class="actionSheet">
		<transition name="fold">
			<div class="main"  v-if="sheetVisible">
				<div class="content">
					<div v-if="!profile" class="actions">
						<div v-if="author > 0" class="action-item" @click.stop.prevent="deleteItem" @touchstart="touchstart($refs.delete.style)" @touchend="touchend($refs.delete.style)" ref="delete">
							删除
						</div >
						<div class="action-item" @click.stop.prevent="reportItem" @touchstart="touchstart($refs.report.style)" @touchend="touchend($refs.report.style)" ref="report">
							举报
						</div>
					</div>
					<div v-if="profile" class="actions">
						<div class="action-item" @touchstart="touchstart($refs.about.style)" @touchend="touchend($refs.about.style)" ref="about">
						<router-link to="/about"><div style="color: #000">关于我和作品</div></router-link>
						</div>
						<div class="action-item" @touchstart="touchstart($refs.feedback.style)" @touchend="touchend($refs.feedback.style)" ref="feedback">
						<router-link to="/feedback"><div style="color: #000">反馈</div></router-link>
						</div>
						<div class="action-item" @click="logout" @touchstart="touchstart($refs.logout.style)" @touchend="touchend($refs.logout.style)" ref="logout">
						退出
						</div>
					</div>
					<div class="cancel" @click="close" @touchstart="touchstart($refs.cancel.style)" @touchend="touchend($refs.cancel.style)" ref="cancel">
						<h2>取消</h2>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="mask" v-if="sheetVisible" @click="close" ></div>
		</transition>
	</div>
</template>

<script>
import noLoginReturnFn from '@/common/js/noLoginReturnFn'
export default {
	props: {
		profile: false
	},
	data () {
		return {
			sheetVisible: false,
			id: -1,
			author: -1,
			type: -1,
			index: -1
		}
	},
	methods: {
		close () {
			this.sheetVisible = false
		},
		show () {
			this.sheetVisible = true
		},
		touchstart (style) {
			style.background = '#f2f2f2'
		},
		touchend (style) {
			style.background = '#fff'
		},
		deleteItem () {
			if (this.type === 2) {
				this.$store.commit('INIT_CARD_INDEX', this.index)
				this.$store.dispatch('deleteCard', this.id)
			} else if (this.type === 1) {
				this.$store.commit('INIT_INDEX', this.index)
				this.$store.dispatch('deleteStatement', this.id)
			} else {
				this.$store.commit('INIT_COMMENT_INDEX', this.index)
				this.$store.dispatch('deleteComment', this.id)
			}
			this.sheetVisible = false
		},
		init (index, id, author, type) {
			this.index = index
			this.id = id
			this.author = author
			this.type = type
		},
		reportItem () {
			this.sheetVisible = false
			noLoginReturnFn(() => {
				this.$store.commit('INIT_POPUP', {
					id: this.id,
					type: this.type
				})
				this.$store.commit('SHOW_CENTER_POPUP')
			})
		},
		logout () {
			this.$store.dispatch('logout')
		}
	},
	deactivated () {
		this.sheetVisible = false
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.actionSheet
	.main
		position fixed
		left 0px
		bottom 0px
		z-index 50
		width 100%
		transform translate3d(0, 0, 0)
		&.fold-enter-active, &.fold-leave-active
			transition all .4s
		&.fold-enter, &.fold-leave-active
			transform  translate3d(0, 100%, 0)
		.content
			background #E0E0E0
			color #333
			line-height 45px
			text-align center
			font-size 18px
			.actions
				margin-bottom 5px
				.action-item
					height 45px
					width 100%
					background #fff
					border-bottom 1px solid #e0e0e0
				:last-child
					border none
			.cancel
				height 45px
				width 100%
				font-size 18px
				background #fff
			.reportActions
				position fixed
				top 50%
				text-align center
				width 60%
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
</style>
