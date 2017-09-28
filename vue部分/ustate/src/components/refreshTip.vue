<template>
	<div class="refreshTip" style="padding: 20px 0; text-align: center">
		{{content}}
	</div>
</template>

<script>
export default {
	props: {
		scrollY: 0
	},
	data () {
		return {
			content: ''
		}
	},
	watch: {
		'scrollY': function(val, oldVal) {
			if (val > 10) {
				this.content = '下拉刷新'
			}
			if (val > 80) {
				this.content = '释放立即刷新'
			}
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.refreshTip
	position fixed
	width 100%
	top -40px
	color #8A8A8A
</style>
