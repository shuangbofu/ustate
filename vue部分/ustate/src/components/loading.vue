<template>
	<div class="loading" v-if="loading && refresh">
		<div class="main">
			<img src="http://118.89.182.253/img/ring-alt2.gif" height="40px" width="40px">
		</div>
	</div>
</template>

<script>
export default {
	props: {
		profile: {
			type: Boolean
		},
		detail: {
			type: Boolean
		},
		login: {
			type: Boolean
		}
	},
	computed: {
		loading () {
			if (this.profile) {
				return this.$store.getters.profileLoading
			} else if (this.login) {
				return this.$store.getters.loginLoading
			} else {
				return this.$store.getters.loading
			}
		},
		refresh () {
			if (this.profile || this.detail || this.login) {
				return true
			} else {
				return this.$store.getters.refresh
			}
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.loading
	position fixed
	left 0px
	top 0px
	height 100%
	width 100%
	z-index 10
	font-size 20px
	text-align center
	padding 50% 0
	background #f2f2f2
</style>
