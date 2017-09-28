<template>
	<div class="profile">
		<div class="profile-header">
			<div class="info">
				<div class="more" @click="more">
					<button class="button-more">
						<i class="icon-more10"></i>
					</button>
				</div>
				<div class="avatar">
					<img :src="data.avatar" height="72" width="72">
				</div>	
				<div class="text">
					<h2 class="name">{{data.nickname}}</h2>
					<h2 class="gender" :class="{'female':!data.gender>0}">{{data.gender?'♂':'♀'}}</h2>
				</div>
			</div>
		</div>
		<div class="profile-record">
			<div class="record1" @click="enterPosted">
				发表<h2>{{data.postsCount}}</h2>
			</div>
			<div class="record2" @click="enterCommented">
				评论<h2>{{data.commentPostsCount}}</h2>
			</div>
			<div class="record3" @click="enterLiked">
				喜欢<h2>{{data.likePostsCount}}</h2>
			</div>
			<div class="record4" @click="enterNotice">
				消息<h2>{{data.noticeTotalCount}}</h2>
			</div>
		</div>
		<div class="notice" v-if="count > 0">
			<div class="main" @click="enterNotice">
				<i class="icon-speaker85"></i>
				<h2>{{count}}条新消息</h2>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="title-bar">
			发现更多
		</div>
		<div class="section">
			<router-link to="/searchCard">
				<div class="item">
					<img class="icon" src="../common/assets/card.png" width="32" height="32">
					<h2 class="title">寻找校园卡</h2>
				</div>
			</router-link>
			<router-link to="/profile">
				<div class="item">
					<img class="icon" src="../common/assets/talk.png" width="32" height="32">
					<h2 class="title">专题卧谈会</h2>
				</div>
			</router-link>
			<router-link to="/profile">
				<div class="item">
					<img class="icon" src="../common/assets/dog.png" width="32" height="32">
					<h2 class="title">单身狗专区</h2>
				</div>
			</router-link>
			<router-link to="/profile">
				<div class="item">
					<img class="icon" src="../common/assets/run.png" width="32" height="32">
					<h2 class="title">一起约跑步</h2>
				</div>
			</router-link>
			<router-link to="/profile">
				<div class="item">
					<img class="icon" src="../common/assets/logo.png" width="32" height="32">
					<h2 class="title">王者的荣耀</h2>
				</div>
			</router-link>
			<router-link to="/profile">
				<div class="item">
					<img class="icon" src="../common/assets/lrs.png" width="32" height="32">
					<h2 class="title">每周狼人杀</h2>
				</div>
			</router-link>
		</div>	
		<div style="position: relative; padding: 5px; color:black; font-size: 10px; text-align: center">
			以下待完成的功能：（需要第三方接口，需要申请，暂时无法完成）<br>
			分享，到指定赞数量自动转发到qq空间/微博/微信<br>
			微信微博第三方登录和退出<br>
		</div>
		<tab-bar></tab-bar>
		<popup></popup>
		<action-sheet :profile="true" ref="sheet"></action-sheet>
		<loading :profile="true"></loading>
	</div>
</template>

<script>
import TabBar from '@/components/tabbar'
import loading from '@/components/loading'
import actionSheet from '@/components/actionSheet'
import popup from '@/components/popup'
export default {
	data () {
		return {
			flag: false
		}
	},
	components: {
		TabBar,
		loading,
		actionSheet,
		popup
	},
	computed: {
		data () {
			return this.$store.getters.profile
		},
		count () {
			return this.$store.getters.count
		}
	},
	methods: {
		enterPosted () {
			this.$router.push({path: '/posted'})
		},
		enterCommented () {
			this.$router.push({path: '/commented'})
		},
		enterLiked () {
			this.$router.push({path: '/liked'})
		},
		enterNotice () {
			this.$router.push({path: '/notice'})
		},
		more () {
			this.$refs.sheet.show()
		}
	},
	created () {
		if (this.$store.getters.profile.profId === undefined || this.$store.getters.profile.profId === 0) {
			this.$store.dispatch('initProfile')
		}
		this.$store.dispatch('initCount')
		this.flag = true
	},
	activated () {
		if (!this.flag && (this.$store.getters.profile.profId === 0 || this.$store.getters.profile.profId === undefined)) {
			this.$router.replace({name: 'login'})
		}
		this.flag = false
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.profile
	color #26A2FF
	overflow hidden
	position absolute
	top 0
	bottom 50px
	width 100%
	background #fff
	.profile-header
		padding  16px 20px 0 20px
		background #fff
		.more
			display block
			.button-more
				float right
				outline none
				border none
				background #fff
				color rgba(0, 0, 0, 0.8)
				font-size 22px
		.info
			.avatar
				margin-left 36px
				text-align center
				img
					border-radius 50%
			.text
				margin-top 4px
				font-size 18px
				color rgba(0, 0, 0, 0.8)
				text-align center
				.name, .gender
					padding 5px 0
					display inline-block
				.gender
					color #26A2FF
					padding-left 0
					&.female
						color #FF83FA
				.name
					text-align center
					padding-right 0
	.profile-record
		padding-top 10px
		display flex
		background #fff
		.record1, .record2, .record3, .record4
			flex 1
			font-size 15px
			color #999
			text-align center
			h2
				margin-top 4px
				color rgba(0, 0, 0, 0.8)
				font-size 24px
		.record1, .record2, .record3
			border-right 1px solid #D4D4D4
	.notice
		padding-top 10px
		display block
		text-align center
		font-size 15px
		color #fff
		background  #fff
		.main
			background rgba(0, 0, 0, 0.4)
			margin 0 auto
			width 130px
			padding 8px 0px 5px 8px
			border-radius 6px
			font-size 0
			.icon-speaker85
				display inline-block
				font-size 18px
				line-height 15px
				margin-right 3px
				vertical-align top
			h2
				font-size 15px
				line-height 13px
				display inline-block
				letter-spacing 1.2px
				vertical-align top
			.icon-keyboard_arrow_right
				font-size 21px
				line-height 14px
				vertical-align top
	.title-bar
		margin-top 18px
		background #F5F5F5	
		color #949494
		padding 10px
	.section
		display flex
		flex-wrap wrap
		a
			flex 0 0 33.333%
			.item
				border-right 1px solid #D4D4D4
				border-bottom 1px solid #D4D4D4
				text-align center
				padding 16px 0
				.icon
					margin-bottom 4px
</style>
