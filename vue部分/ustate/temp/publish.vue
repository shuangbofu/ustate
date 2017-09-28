<template>
	<div class="publish">
		<div class="publish-header">
			<mt-header fixed title="发表状态">
				<mt-button icon="back" slot="left" @click="back">返回</mt-button>
				<mt-button @click="publish" slot="right">发送</mt-button>
			</mt-header>
		</div>
		<div class="publish-text-area">
			<textarea class="text" placeholder="发表状态..." autofocus="autofocus" draggable="false" v-model="content"></textarea>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			content: ''
		}
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		publish () {
			// let stmtId = this.$route.params.statementId
			// let profId = this.$route.params.profileId
			// this.$store.dispatch('addComment', {
			// 	stmtId: stmtId,
			// 	profId: profId,
			// 	content: this.content
			// })
			// this.$router.replace({name: 'commentList', params: {profileId: profId, statementId: stmtId}})
			this.$store.dispatch('addStatement', {
				profId: this.$route.params.profileId,
				stmtContent: this.content.replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;')
			})
			this.$router.replace({name: 'index'})
		}
	},
	activated() {
		this.content = ''
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.publish
	position absolute
	top 40px
	width 100%
	overflow hidden
	width 100%
	.publish-text-area
		width 100%
		padding-top 5px
		.text
			box-sizing border-box
			overflow hidden
			width 100%
			font-size 16px
			border none
			resize vertical
			height 150px
			background #fff
			padding 8px 14px 0 14px
			outline-color #26A2FF
</style>
