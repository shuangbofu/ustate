<template>
	<div class="index">
			<list @init="initData" @cal="_calculateHeight" :maxHeight="maxHeight" @load="loadMore" ref="list">
				<div slot="header" class="index-header" ref="headerWrapper">
					<div class="nav">
						<router-link to="/index" replace><button>最新</button></router-link>
						<router-link to="/hot" replace><button>热门</button></router-link>
					</div>
				</div>
				<div slot="list" class="index-content">
					<li v-for="(stmt, index) in data" class="stmt-item" ref="listWrapper">
						<profile-bar :profile="stmt.profile"></profile-bar>
						<div class="more" @click.stop.prevent="more(index, stmt.id, stmt.author, 1)">
							<button class="button-more">
								<i class="icon-more10"></i>
							</button>
						</div>
						<div class="content" @click="enter(stmt.id, index)">
							<div class="text">
								<p v-html="stmt.content"></p>
							</div>
						</div>
						<div class="footer">
							<format-time :time="stmt.createtime"></format-time>
							<like :id="stmt.id" :liked="stmt.liked" :count="stmt.likeCount" :index="index"></like>
							<div class="comments" :class="{'active': stmt.commentCount > 0}" @click="enter(stmt.id, index)">
								<i class="icon" :class="{'icon-comment43':stmt.commentCount >0, 'icon-comment42': stmt.commentCount <=0}"></i>
								<span class="number">{{stmt.commentCount}}</span>
							</div>
						</div>
					</li>
				</div>
			</list>
		<tab-bar></tab-bar>
		<popup></popup>
		<action-sheet ref="sheet"></action-sheet>
		<loading></loading>
	</div>
</template>

<script>
import TabBar from '@/components/tabbar'
import formatTime from '@/components/formatTime'
import profileBar from '@/components/profileBar'
import like from '@/components/like'
import actionSheet from '@/components/actionSheet'
import loading from '@/components/loading'
import list from '@/components/list'
import popup from '@/components/popup'
export default {
	data () {
		return {
			maxHeight: 0
		}
	},
	methods: {
		initData (_this) {
			this.$store.dispatch('initCount')
			this.$store.dispatch('initStatements', {
				fromId: 0,
				refresh: true,
				_this: _this
			})
		},
		loadMore (_this) {
			if (this.data.length > 0) {
				var id = this.data[this.data.length - 1].id
			} else {
				id = 0
			}
			this.$store.dispatch('initStatements', {
				fromId: id,
				refresh: false,
				_this: _this
			})
		},
		enter(id, index) {
			this.$store.commit('INIT_INDEX', index)
			this.$router.push({name: 'detail', params: {id: id}})
		},
		_calculateHeight () {
			let list = this.$refs.listWrapper
			let height = 0
			for (let i = 0; i < list.length; i++) {
				let item = list[i]
				height += item.clientHeight
			}
			this.maxHeight = height + this.$refs.headerWrapper.clientHeight
		},
		more (index, id, author, type) {
			let actionSheet = this.$refs.sheet
			actionSheet.init(index, id, author, type)
			actionSheet.show()
		}
	},
	activated () {
		if (this.$store.getters.inOrOut[0]) {
			this.initData()
			this.$store.commit('updateLogInOrOut', 0)
		}
		this.$store.commit('INIT_TYPE', 0)
	},
	watch: {
		'$route': function(val, oldVal) {
			if (oldVal.name === 'index' && val.name !== 'detail' && val.name !== 'hot') {
				this.$store.dispatch('initStatements', {
					fromId: 0,
					refresh: true
				})
			}
			if ((oldVal.name === 'profile' || oldVal.name === 'publish') && val.name === 'index') {
				this.$refs.list.setTop()
			}
			this._calculateHeight()
		}
	},
	components: {
		TabBar,
		formatTime,
		profileBar,
		like,
		loading,
		list,
		actionSheet,
		popup
	},
	computed: {
		data () {
			return this.$store.getters.statements
		}
	},
	created () {
		if (this.$store.getters.profile.profId === undefined) {
			this.$store.dispatch('initProfile_bak')
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.index
	position absolute
	top 0px
	bottom 50px
	width 100%
	overflow hidden
	.index-header
		margin 0
		padding 0
		background #fff
		height 40px
		width 100%
		color #26A2FF
		text-align center
		.nav
			margin 0
			padding-top 6px
			font-size 0px
			button
				margin 0
				padding 5px 12px
				border 1px solid #26A2FF
				color rgb(170, 170, 170)
				background #fff
				outline none
				font-size 16px
			.router-link-active button
				background #26A2FF
				color #fff
	.index-content
		background #fff
		font-size 0
		.stmt-item
			padding 10px 15px 1px 15px
			border-bottom 15px solid #f2f2f2
			color #26A2FF
			.more
				float right
				display inline-block
				.button-more
					border none
					outline none
					background none
					color #26A2FF
					.icon-more10
						font-size 20px
			.content
				padding 10px 0 10px 4px
				border-bottom 1px solid #f2f2f2
				.text
					font-size 16px
					line-height 18px
					color #000
					letter-spacing 1.5px
			.footer
				padding  12px 0 6px 0
				height 20px
				.comments
						font-size 18px
						float right
						margin-right 10px
						display inline-block
						color #8F8F8F
						&.active
							color #26A2FF
					.number
						vertical-align top
						font-size 18px
</style>
