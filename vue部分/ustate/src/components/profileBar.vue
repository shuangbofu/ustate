<template>
	<div class="profilebar" :class="{'small': small}">
		<div class="profile">
			<div class="avatar">
				<img :src="profile.avatar" width="38" height="38">
			</div>
			<div class="info">
				<h2 class="name">{{profile.nickname}}</h2>
				<h2 class="gender" :class="{'female':!profile.gender>0}">{{profile.gender?'♂':'♀'}}</h2>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		profile: {
			type: Object,
			default () {
				return {
					avatar: '',
					nickname: '',
					gender: ''
				}
			}
		},
		small: false
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.profilebar
	display inline-block
	.profile
		padding 2px
		display flex
		.avatar
			margin-right 10px
			width 40px
			height 40px
			flex 0 0 40px
			display inline-block
			img
				padding 2px
				border-radius 50%
		.info
			flex 1
			height 40px
			display block
			h2
				display inline-block
				padding 15px 0
				line-height 16px
				font-size 16px
				font-size 1700
				&.female
					color #FF83FA
			.name
				color black
				margin-right 3px
			.gender
				color #26A2FF
				
	&.small
		.profile
			font-size 0
			.avatar
				width 32px
				height 32px
				flex 0 0 32px
				img
					width 30px
					height 30px
					padding 1px 0
			.name
				height 32px
				margin-left 5px
				display block
				h2
					padding 2px 0
					line-height 12px
					font-size 12px
					vertical-align middle
				.gender
					height 32px
					margin-left 3px
					h2
						padding 10px 0
						line-height 16px
						font-size 14px
</style>
