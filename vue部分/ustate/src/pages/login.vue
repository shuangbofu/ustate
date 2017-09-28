<template>
	<div class="login">
		<div class="tip">
			选择以下方式登录Ustate
		</div>
		<div class="methods">
			<div class="item" @click="loginOther" @touchstart="touchstart($refs.weixin.style)" @touchend="touchend($refs.weixin.style)" ref="weixin">
				<img src="../common/assets/wechat-icon.png" width="25" height="25"><h2>使用微信登录</h2>
			</div>
			<div class="item" @click="loginOther" @touchstart="touchstart($refs.qq.style)" @touchend="touchend($refs.qq.style)" ref="qq">
				<img src="../common/assets/qq-icon.png" width="20" height="20" style="margin-right: 20px"></i><h2>使用QQ登录</h2>
			</div>
			<div class="item" @click="loginOther" @touchstart="touchstart($refs.weibo.style)" @touchend="touchend($refs.weibo.style)" ref="weibo">
				<img src="../common/assets/weibo-icon.png" width="25" height="25"><h2>使用微博登录</h2>
			</div>
			<div class="item" @click="simulateLoginList" @touchstart="touchstart($refs.simulation.style)" @touchend="touchend($refs.simulation.style)" ref="simulation">
				<img src="../common/assets/logo.png" width="25" height="25"><h2>使用模拟登录</h2>
			</div>
			<div class="item" @click="accountLogin" @touchstart="touchstart($refs.account.style)" @touchend="touchend($refs.account.style)" ref="account">
				<i class="icon-user"  style="font-size: 25px; margin-right: 10px"></i><h2>账号密码登录</h2>
			</div>
		</div>
		
		<div class="panel" v-if="show" >
		<h2 v-if="show" style="text-align: center; padding: 15px; color: #8f8f8f; font-weight: bold; background: #f2f2f2; font-size: 16px">选择以下用户模拟登录</h2>
			<ul class="content">
				<li v-for="prof in data" class="prof-item">
					<div class="name" style="padding-bottom: 4px">{{prof.nickname}}</div>
					<div class="avatar" @click="simulateLogin(prof.profId)"><img :src="prof.avatar" width="50" height="50"></div>
				</li>
			</ul>
			<div class="cancel"><i  class="icon-cross80" @click="cancel"></i></div>
		</div>
		<div class="panel" v-if="show3">
			<h2 v-if="show3" style="text-align: center; padding: 15px; color: #8f8f8f; font-weight: bold; background: #f2f2f2; font-size: 16px">
			输入账号密码登录</h2>
			<div class="accountLogin">
				<div class="account"><h2>账号：</h2><input type="text" v-model="account" placeholder="输入账号..."></input></div>
				<div class="password"><h2>密码：</h2><input type="password" v-model="password" placeholder="输入密码..."></input></div>
				<button :class="{'active': account.length !== 0}" @click="login">登录</button>
			</div>
			<div class="cancel"><i  class="icon-cross80" @click="cancel3"></i></div>
		</div>
		<div v-if="show2" class="message" style="text-align: center; font-size: 20px; color: #ED4956">
			需要申请第三方API，暂时无法完成
		</div>
		<popup></popup>
		<loading :login="true"></loading>
		<tab-bar></tab-bar>
	</div>
</template>

<script>
import TabBar from '@/components/tabbar'
import popup from '@/components/popup'
import loading from '@/components/loading'
export default {
	data () {
		return {
			show: false,
			show2: false,
			show3: false,
			account: '',
			password: ''
		}
	},
	components: {
		TabBar,
		popup,
		loading
	},
	created () {
		this.$store.dispatch('initProfile')
	},
	methods: {
		simulateLoginList () {
			this.$store.dispatch('initProfileLists')
			this.show = true
			this.show2 = false
		},
		cancel () {
			this.show = false
		},
		cancel3 () {
			this.show3 = false
		},
		loginOther () {
			this.show = false
			this.show2 = true
			setTimeout(() => {
				this.show2 = false
			}, 1000)
		},
		touchstart (style) {
			style.background = '#f2f2f2'
		},
		touchend (style) {
			style.background = '#fff'
		},
		simulateLogin (profId) {
			if (profId === 6) {
				alert('开发者账号需要账号密码登录')
			} else {
				this.$store.dispatch('simulateLogin', profId)
			}
		},
		login () {
			if (this.account === '') {
				this.$store.commit('SHOW_TOP_POPUP', '账号不能为空！')
				return
			}
			this.$store.dispatch('login', {
				loginname: this.account,
				password: this.password
			})
			this.account = ''
			this.password = ''
		},
		accountLogin () {
			this.show3 = true
		}
	},
	activated () {
		this.show2 = false
		this.show = false
		this.show3 = false
		this.$store.commit('UPDATE_LOGIN_LOADING', false)
	},
	computed: {
		data () {
			return this.$store.getters.profileLists
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.login
	background #fff
	.tip
		height 60px
		text-align center
		line-height 60px
		font-size 18px
		font-weight bold
		background #f2f2f2
		color #8f8f8f
	.methods
		text-align center
		margin-top 30px
		display flex
		flex-direction column
		justify-content center
		align-items center
		.item
			display flex
			justify-content center
			align-items center
			padding 10px 22px
			height 40px
			border 1px solid #8f8f8f
			height 20px
			font-size 14px
			border-radius 70px
			margin-bottom 25px
			img
				margin-right 10px
	.panel
		position fixed
		top 0px
		width 100%
		height 100%
		background #fff
		.content
			display flex
			flex-wrap wrap
			.prof-item
				flex 0 0 20%
				display block
				font-size 14px
				color #000
				padding 6px 0
				.avatar, .name
					display block
					text-align center
		.accountLogin
			text-align center
			display flex
			flex-direction column
			justify-content center
			align-items center
			margin-top 20px			
			.account, .password
				display flex
				width 80%
				padding 10px 0
				h2
					flex 0 0 60px
					display inline-block
					font-size 18px
					line-height 32px
					color #8f8f8f
				input
					width 100%
					border 1px solid #f2f2f2
					padding 6px
					border-radius 10px
					outline none
			button
				margin-top 10px
				outline none
				border none
				color #fff
				padding 4px
				font-size 20px
				border-radius 10px
				width 80%
				&.active
					background #26A2FF
		.cancel
			position absolute
			bottom 60px
			left 0px
			width 100%
			display block
			text-align center
			i
				color #8f8f8f
				font-size 40px
</style>
