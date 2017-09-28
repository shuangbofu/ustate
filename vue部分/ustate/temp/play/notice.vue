<template>
	<div class="notice">
	</div>
</template>

<script>
export default {
	data () {
		return {
		}
	},
	methods: {
	},
	created () {
		console.log(this.axios)
		this.$http.get('http://192.168.0.166:8080/ustate/statement/list.action').then(function(response) {
			console.log(response)
		})
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.notice
	color #8F8F8F
	overflow scroll
	overflow-x hidden
	position absolute
	top 37px
	bottom 0px
	width 100%
	.item
		font-size 12px
		text-align center
		padding 10px
</style>
