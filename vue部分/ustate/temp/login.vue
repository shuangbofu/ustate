<template>
	<div class="login">
		<div class="login-header">
			<h1>Ustate</h1>
			<div class="u">n+</div>
			<h2>欢迎登录</h2>
		</div>
		<div class="form">
			<form>
				账号: <input type="text" v-model="userLoginname" placeholder="请输入用户名..." ><br>
				密码: <input type="password" v-model="userPassword" placeholder="请输入密码..."><br>
			</form>
			<button class="loginButton" @click="login" >登录</button>
		</div>
		<!-- <button class="showButton" @click="toggle">{{listShow?'闭合':'展开'}}</button>
		<div v-show="listShow" class="foot-profile-list">
			<div class="tip">以下是用户列表，点击头像选择用户登录</div>
			<li v-for="profile in data" class="profile-item">
				<img :src="profile.profAvatar" width="30px" height="30px" @click="selectProfile(profile.profId, profile.profUsername)">
				<h2>{{profile.profUsername}}</h2>
			</li>
		</div> -->
	</div>
</template>

<script>
import axios from 'axios'
// import {Indicator, MessageBox} from 'mint-ui'
export default {
	data () {
		return {
			data: {
				type: Array
			},
			userLoginname: '',
			userPassword: ''
			// listShow: false
		}
	},
	methods: {
		// getData () {
		// 	axios.get('http://192.168.0.166:8080/ustate/profile/selectAll.action').then((response) => {
		// 		this.data = response.data
		// 	})
		// },
		selectProfile (profId, profUsername) {
			this.selectedProfId = profId
			this.selectedProfUsername = profUsername
		},
		login () {
			// if (this.selectedProfId === '') {
			// 	alert('请选择用户')
			// } else {
			// 	this.$store.commit('setProfId', this.selectedProfId)
			// 	this.$router.push({path: '/index'})
			// }
			// this.$store.dispatch('login', {
			// 	userLoginname: this.userLoginname,
			// 	userPassword: this.userPassword
			// })
			// if (this.userLoginname === '' || this.userLoginname === '') {
			// 	MessageBox('提示', '用户名或密码不能为空！')
			// }
			// Indicator.open({
			// 	text: '登录中...',
			// 	spinnerType: 'snake'
			// })
			// alert('ddd')
			// axios.post('http://192.168.0.166:8080/ustate/user/login.action', {
			// 	data: {
			// 		userLoginname: this.userLoginname,
			// 		userPassword: this.userPassword
			// 	},
			// 	headers: {
			// 		'Content-Type': 'application/json;charset=utf-8'
			// 	},
			// 	withCredentials: true
			// }).then((response) => {
			// 	if (response.data === 'success') {
			// 		this.$store.dispatch('initProfId')
			// 		this.$router.replace({path: '/index'})
			// 	} else {
			// 		// MessageBox('提示', '用户名或密码错误！')
			// 		this.userPassword = ''
			// 	}
			// })
			// if (this.$store.getters.getIsLogin) {
			// 	this.$router.push({path: '/index'})
			// }
			axios({
				url: 'http://192.168.0.166:8080/ustate/user/login.action',
				method: 'post',
				data: {
					userLoginname: this.userLoginname,
					userPassword: this.userPassword
				},
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				},
				withCredentials: true
			}).then((response) => {
				if (response.data === 'success') {
					this.$store.dispatch('initProfId')
					this.$router.replace({path: '/index'})
				} else {
					// MessageBox('提示', '用户名或密码错误！')
					this.userPassword = ''
				}
			})
			// alert('ddd')
		},
		toggle () {
			this.listShow = !this.listShow
		}
	},
	created () {
		// this.getData()
	},
	beforeCreate () {
		// console.log('beforeCreate')
		// this.$store.dispatch('initProfId')
		// console.log(this.$store.getters.getProfId)
		// if (this.$store.getters.getProfId !== '') {
		// 	console.log(this.$store.getters.getProfId)
		// 	this.$router.replace({path: '/index'})
		// }
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.login
	overflow hidden
	position absolute
	top 0px
	bottom 0px
	width 100%
	.login-header
		background #26A2FF
		color #fff
		text-align center
		padding 25px
		.u
			margin-top 8px
			padding 3px
			text-align center
			position absolute
			display inline-block
			font-size 10px
			border-radius 40%
			background #F74C31
		h1
			display inline-block
			font-size 68px
		h2
			margin-top 10px
			font-size 18px
	.showButton
		border none
		outline none
		background #fff
		font-size 12px
		font-weight 700
		text-decoration underline
	.form
		margin-top 6px
		padding 10px 0
		background #fff
		text-align center
		color #26A2FF
		font-weight 700
		border-bottom 1px solid #f2f2f2
		input
			width 200px
			height 24px
			padding 5px
			font-size 16px
			outline none
			background #f2f2f2
			margin 8px
			border-radius 4px
		.loginButton
			margin 10px 0
			width 75%
			padding 6px 0
			outline none
			border none
			background #26A2FF
			color #fff
			border-radius 10px
			font-size 20px
	.foot-profile-list
		background #f2f2f2
		.tip
			padding 10px
			font-size 12px
			text-align center
		.profile-item
			padding 0 10px 10px 10px
			display inline-block
			border 1 solid black
			img
				margin-bottom 10px
			h2
				font-size 10px
				color black
</style>
