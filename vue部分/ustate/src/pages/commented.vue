<template>
	<div class="commented">
		<div class="commented-header">
			<my-header title="我的评论"></my-header>
		</div>
		<list @init="initData" @cal="_calculateHeight" :maxHeight="maxHeight" @load="loadMore" ref="list">
			<div slot="list" class="commented-wrapper">
				<li ref="listWrapper" v-for="(cmt, index) in data" class="cmt-item" @click="enterDetial(cmt.stmtId)">
					<div class="content-header">
						<format-time :time="cmt.createtime" complete="true"></format-time>
						<like :id="cmt.id" :count="cmt.likeCount" type="comment" :index="index" :liked="cmt.liked"></like>
						<a @click.stop.prevent="remove(cmt.id, index, $event)" class="delete">删除该条评论</a>
					</div>
					<div class="content">
						<h2 v-html="cmt.content"></h2>
					</div>
					<div class="originContent">
						<h2 v-if="cmt.originContent!==''" v-html="cmt.originContent"></h2>
						<h2 v-else>该发表已被删除</h2>
					</div>
				</li>
			</div>
		</list>
		<div v-if="!loadedAll && data.length === 0" class="no-data-tip">
			没有更多数据
		</div>
		<popup></popup>
		<loading></loading>
	</div>
</template>

<script>
import myHeader from '@/components/header'
import formatTime from '@/components/formatTime'
import profileBar from '@/components/profileBar'
import like from '@/components/like'
import loading from '@/components/loading'
import list from '@/components/list'
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
			this.$store.dispatch('initCommented', {
				fromId: 0,
				refresh: true,
				_this: _this
			})
		},
		enterDetial (id) {
			if (id === 0) {
				return
			}
			this.$router.push({name: 'detail', params: {id: id}})
		},
		remove (id, index, event) {
			if (!event._constructed) {
				return
			}
			this.$store.commit('INIT_COMMENT_INDEX', index)
			this.$store.dispatch('removeCommented', id)
		},
		loadMore (_this) {
			if (this.data.length > 0) {
				var id = this.data[this.data.length - 1].id
			} else {
				id = 0
			}
			this.$store.dispatch('initCommented', {
				fromId: id,
				refresh: false,
				_this: _this
			})
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
		}
	},
	activated () {
		if (this.$store.getters.inOrOut[2] && this.flag) {
			this.initData()
			this.$store.commit('updateLogInOrOut', 2)
		}
		this.$store.commit('SET_COMMENT_SELF', true)
		this.flag = true
	},
	watch: {
		'$route': function(val, oldVal) {
			if (oldVal.name === 'commented') {
				this.$store.commit('SET_COMMENT_SELF', false)
			}
			if (val.name === 'commented') {
				this.$refs.list.setTop()
			}
		}
	},
	components: {
		myHeader,
		formatTime,
		profileBar,
		like,
		loading,
		list,
		popup
	},
	computed: {
		data () {
			return this.$store.getters.commented
		},
		loadedAll () {
			return this.$store.getters.loadedAll
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.commented
	color #8F8F8F
	position absolute
	overflow hidden
	top 40px
	bottom 0px
	width 100%
	.commented-wrapper
		width 100%
		height 100%
		background #fff
		.cmt-item
			padding 0 20px 20px 20px
			border-bottom 10px solid #f2f2f2
			.content-header
				padding 10px 0
				.delete
					margin-left 10px
					color rgb(239, 64, 86)
					background #fff
					font-size 15px
					font-weight bold
			.content
				padding-bottom 10px
				h2
					color #000
			.originContent
				padding 10px
				letter-spacing 1.5px
				background #FAFAFA
	.no-data-tip
		position absolute
		top 10px
		left 0px
		width 100%
		text-align center
		font-size 16px
		color #8f8f8f
</style>
