<template>
	<div class="infooperationbar">
		<div class="extrainfo">
			<div class="time">
				发表于{{statement.content.time}}
			</div>
		</div>
		<div class="operation">
			<div class="praise" @click.stop.prevent="togglePraised(content)" :class="{'active': isPraised}">
				<i class="icon" :class="{'icon-heart280':isPraised, 'icon-heart281':!isPraised}"></i>
				<span class="number">{{statement.content.praisedCount}}</span>
			</div>
			<div class="comments" @click.stop.prevent="comment" :class="{'active': statement.content.commentCount > 0}">
				<i class="icon" :class="{'icon-comment43':statement.content.commentCount >0, 'icon-comment42': statement.content.commentCount<=0}"></i>
				<span class="number">{{statement.content.commentCount}}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		statement: {
			type: Object
		}
	},
	data () {
		return {
			isPraised: false,
			profileId: '#ddd'
		}
	},
	methods: {
		togglePraised (content) {
			this.isPraised = !this.isPraised
			if (this.isPraised) {
				this.content.praisedCount += 1
			} else {
				this.content.praisedCount -= 1
			}
		},
		comment () {
			this.$router.push({name: 'comment', params: {profileId: this.profileId, statementId: this.statement.statementId}})
		},
		fetchData () {
			console.log(this.statement.content)
			this.content = this.statement.content
		}
	},
	created () {
		// this.fetchData()
	},
	watch: {
		/* '$route': function(val, oldVal) {
			console.log(val.name + 'infooperationbar')
			if (val.name === 'index') {
				this.fetchData()
			}
		} */
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.infooperationbar
	height 24px
	.operation
		float right
		font-size 14px
		line-height 14px
		padding 6px 6px 3px 6px
		display inline-block
		color #999999
		.praise
			float right
			display inline-block
			&.active
				color #ED4956
		.comments
			font-size 15px
			float right
			margin-right 10px
			display inline-block
			&.active
				color #26A2FF
		.number
			vertical-align top
	.extrainfo
		padding 8px 6px 2px 6px
		display inline-block
		color #999999
		.time
			margin-right 20px
			display inline-block
			font-size 11px
</style>
