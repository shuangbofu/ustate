<template>
	<div class="operationbar">
		<div class="comments" :class="{'active': content.stmtCommentCount > 0}">
			<i class="icon" :class="{'icon-comment43':content.stmtCommentCount>0, 'icon-comment42':content.stmtCommentCount<=0}"></i>
			<h2><router-link :to="{name: 'comment', params: {profileId: profileId, statementId: id}}">发表评论</router-link></h2>
		</div>
		<div class="praise" @click.stop.prevent="togglePraised(content)" :class="{'active': isPraised}">
			<i class="icon" :class="{'icon-heart280':isPraised, 'icon-heart281':!isPraised}"></i>
			<h2>{{isPraised?'取消赞':'赞'}}</h2>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		content: {
			type: Object
		},
		isPraised: false,
		id: ''
	},
	data () {
		return {
			profileId: '#ddd'
		}
	},
	methods: {
		togglePraised(content) {
			this.$emit('toggle')
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.operationbar
	border-top 1px solid #f2f2f2
	height 40px
	background #fff
	width 100%
	display flex
	.praise,.comments
		padding 12px
		flex 1
		font-size 18px
		text-align center
		color #26A2FF
		h2
			display inline-block
			font-size 17px
			vertical-align top
		.icon
			vertical-align top
	.praise
		color #ED4956
</style>
