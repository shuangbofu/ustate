<template>
	<div class="header">
		<div class="back" @click="back">
			<i class="icon-arrow_lift"></i>
			<h2>返回</h2>
		</div>
		<div class="title">
			<h1>{{title}}</h1>
		</div>
		<slot><div class="default"></div></slot>
	</div>
</template>

<script>
export default {
	props: {
		title: ''
	},
	methods: {
		back () {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.header	
	z-index 20	
	position fixed
	top 0px
	background #26A2FF
	width 100%
	height 40px
	display flex
	.back
		flex 1
		padding 12px 0
		line-height 18px
		vertical-align top
		color #fff
		font-size 0px
		.icon-arrow_lift
			margin-left 6px
			display inline-block
			font-size 16px
		h2
			margin-left 4px
			font-size 18px
			display inline-block
			padding-right 10px
	.title
		flex 1
		padding 11px 0
		text-align center
		font-size 18px
		color #fff
		h1
			font-weight bold
	.more
		flex 1
		.button-more
			float right
			outline none
			border none
			background #26A2FF
			color #fff
			font-size 20px
			padding 6px 12px
	.send
		flex 1
		h2
			padding 10px
			float right
			font-size 18px
			color #fff
			&.publishing
				color #f2f2f2
	.default
		flex 1
</style>
