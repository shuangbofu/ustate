<template>
	<div class="more">
		<button class="button-more" @click="toggleMore(item)">
		<h2>.</h2>
		<h2>.</h2>
		<h2>.</h2>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		item: {
			type: Object
		}
	},
	data () {
		return {
			sheetVisible: false
		}
	},
	methods: {
		toggleMore (item) {
			this.$emit('more', item)
		},
		report (item) {
			this.$emit('report', item)
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.more
	display block
	padding-bottom 5px
	width 100%
	.button-more
		border none
		outline none
		background none
		color #26A2FF
		h2
			display block
			font-size 24px
			line-height 5px
</style>
