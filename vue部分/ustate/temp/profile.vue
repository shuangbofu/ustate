<template>
	<div class="profile">
		<div class="header">
			<mt-header fixed title="我的">
			</mt-header>
		</div>
		<div class="profile-header">
			<div class="avatar">
				<img :src="data.profile.avatar" width="66" height="66">
			</div>
			<div class="info">
				<span class="name">{{data.profile.name}}</span>
				<div class="gender">
					<h2 :class="{'active':!data.profile.gender}">{{data.profile.gender?'♂':'♀'}}</h2>
				</div>
				<div class="birthday">
					{{data.profile.birthday}}
				</div>
				<div class="address">
					{{data.profile.address}}
				</div>
			</div>
			<div class="operation">
				<button>编辑个人资料</button>
			</div>
		</div>
		<div class="tab">
			<div class="tab-item">
				<router-link to="/profile/notification" replace>
				<i class="icon icon-speaker85"></i>
				<h2>消息通知</h2>
				</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/profile/myStatements" replace>
					<i class="icon icon-file63"></i>
					<h2>我的发表</h2>
				</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/profile/myComments" replace>
					<i class="icon icon-comment42"></i>
					<h2>我的评论</h2>
				</router-link>
			</div>
		</div>
		<div class="view">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			data: {
				profile: {
					avatar: 'http://tva3.sinaimg.cn/crop.0.1.750.750.180/49dd64e2jw8f0ebj1wrlpj20ku0kw74z.jpg',
					name: '薛之谦',
					gender: true,
					birthday: '1983-7-17',
					address: '中国上海'
				}
			}
		}
	},
	methods: {
	},
	created () {
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.profile
	color #26A2FF
	overflow hidden
	overflow-x hidden
	position absolute
	top 40px
	bottom 50px
	width 100%
	.profile-header
		display flex
		padding 6px 8px
		border-bottom 1px solid #f2f2f2
		font-size 0
		.avatar
			flex 0 0 80px
		.info
			flex 1
			.name, .gender
				padding 4px
				display inline-block
				font-size 16px
				display inline-block
				color #5C5C5C
				font-weight 700
			.gender
				padding-left 0
			.birthday, .address
				padding 1px 4px
				font-size 12px
				color #5C5C5C
			.gender
				h2
					color #26A2FF
					&.active
						color #FF83FA
		.operation
			float right
			display inline-block
			padding 2px 0 2px 2px
			button
				padding 4px 10px
				border none
				outline none
				font-size 14px
				background #26A2FF
				color #fff
				// border-radius 6px
	.tab
		display flex
		border-bottom 1px solid #f2f2f2
		overflow-x auto
		.tab-item
			flex 1
			padding 8px 0
			text-align center
			font-size 14px
			a
				&.router-link-active
					color #26A2FF
			h2
				display inline-block
				vertical-align bottom
			.icon
				display inline-block
				font-size 16px
				vertical-align middle
</style>
