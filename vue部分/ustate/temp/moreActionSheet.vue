<template>
	<div class="moreActionSheet">
		<div class="report">
			<mt-popup v-model="popupVisibleReport" popup-transition="popup-fade">
				<mt-cell is-link>垃圾信息</mt-cell>
				<mt-cell is-link>内容不当</mt-cell>
			</mt-popup>
		</div>
		<div class="more">
			<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
			</mt-popup>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			popupVisibleReport: false,
			sheetVisible: false
		}
	},
	computed: {
		actions () {
			// console.log(this.$store.getters.getActions)
			return this.$store.getters.getActioins
		}
	},
	methods: {
		more () {
			console.log('ddddd')
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
