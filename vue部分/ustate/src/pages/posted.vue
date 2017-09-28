<template>
	<div class="posted">
		<div class="posted-header">
			<my-header title="我的发表"></my-header>
		</div>
		<div class="posted-wrapper" ref="postedWrapper">
			<list @init="initData" @cal="_calculateHeight" :maxHeight="maxHeight" @load="loadMore" ref="list">
				<div slot="list" class="posted-content">
					<li v-for="(stmt, index) in data" class="stmt-item" ref="listWrapper">
						<profile-bar :profile="stmt.profile"></profile-bar>
						<div class="more" @click.stop.prevent="more(index, stmt.id, stmt.author, 1)">
							<button class="button-more">
								<i class="icon-more10"></i>
							</button>
						</div>
						<div class="content" @click.stop.prevent="enter(stmt.id, index)">
							<div class="text">
								<p v-html="stmt.content"></p>
							</div>
						</div>
						<div class="footer">
							<format-time :time="stmt.createtime"></format-time>
							<like :id="stmt.id" :liked="stmt.liked" :count="stmt.likeCount" :index="index"></like>
							<div class="comments" :class="{'active': stmt.commentCount > 0}" @click.stop.prevent="enter(stmt.id, index)">
								<i class="icon" :class="{'icon-comment43':stmt.commentCount >0, 'icon-comment42': stmt.commentCount <=0}"></i>
								<span class="number">{{stmt.commentCount}}</span>
							</div>
						</div>
					</li>
				</div>
			</list>
			<div v-if="!loadedAll && data.length === 0" class="no-data-tip">
				没有更多数据
			</div>
			<popup></popup>
			<action-sheet ref="sheet"></action-sheet>
			<loading></loading>
		</div>
	</div>
</template>

<script>
import formatTime from '@/components/formatTime'
import profileBar from '@/components/profileBar'
import like from '@/components/like'
import myHeader from '@/components/header'
import loading from '@/components/loading'
import list from '@/components/list'
import actionSheet from '@/components/actionSheet'
import popup from '@/components/popup'
export default {
	data () {
		return {
			maxHeight: 0,
			flag: false
		}
	},
	methods: {
		initData (_this) {
			this.$store.dispatch('initPosted', {
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
			this.$store.dispatch('initPosted', {
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
			if (list !== undefined) {
				for (let i = 0; i < list.length; i++) {
					let item = list[i]
					height += item.clientHeight
				}
				this.maxHeight = height
			}
		},
		more (index, id, author, type) {
			let actionSheet = this.$refs.sheet
			actionSheet.init(index, id, author, type)
			actionSheet.show()
		}
	},
	activated () {
		if (this.$store.getters.inOrOut[1] && this.flag) {
			this.initData()
			this.$store.commit('updateLogInOrOut', 1)
		}
		this.$store.commit('INIT_TYPE', 2)
		this.flag = true
	},
	components: {
		formatTime,
		profileBar,
		like,
		myHeader,
		loading,
		list,
		actionSheet,
		popup
	},
	computed: {
		data () {
			return this.$store.getters.posted
		},
		loadedAll () {
			return this.$store.getters.loadedAll
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
.posted
	color #8F8F8F
	overflow hidden
	position absolute
	top 40px
	bottom 0px
	width 100%
	.posted-wrapper
		width 100%
		height 100%
		.posted-content
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
		.no-data-tip
			position absolute
			top 10px
			left 0px
			width 100%
			text-align center
			font-size 16px
			color #8f8f8f
</style>
