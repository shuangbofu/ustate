<template>
	<div class="personalInfo">
		<div class="personalInfo-header">
			<mt-header fixed title="个人信息">
					<router-link :to="{name: 'index'}" slot="left" replace>
						<mt-button icon="back">返回</mt-button>
					</router-link>
			</mt-header>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
		}
	},
	methods: {
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
