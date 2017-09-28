<template>
	<div class="notice">
		<div class="notice-header">
			<my-header title="我的消息"></my-header>
		</div>
		<list @init="initData" @cal="_calculateHeight" :maxHeight="maxHeight" @load="loadMore" ref="list">
			<div class="notice-wrapper" slot="list">
				<li v-for="note in data" class="notice-item" ref="listWrapper">
					<div class="content-header">
						<i :class="{'icon-heart280' :note.type<3, 'icon-comment43':note.type===3}"></i>
						<h2 v-if="note.type === 3">有人回复了你</h2>
						<h2 v-if="note.type === 2">有人赞了你的发表</h2>
						<h2 v-if="note.type === 1">有人赞了你的评论</h2>
						<format-time :time="note.createtime" complete="true"></format-time>
					</div>
					<div v-if="note.type === 3" class="reply">
						<h2 v-if="note.content !==''" v-html="note.content"></h2>
						<h2 v-else style="color: #8F8F8F">该评论已被删除</h2>
					</div>
					<div class="content" @click="enterDetial(note.stmtId)">
						<h2 v-if="note.type === 1" v-html="note.content"></h2>
						<h2 v-else v-html="note.originContent"></h2>
						<h2 v-if="note.type !==1 && note.originContent === ''">该发表已被删除</h2>
						<h2 v-if="note.type ===1 && note.content ===''">该评论已被删除</h2>
					</div>
				</li>
			</div>
		</list>
		<loading></loading>
	</div>
</template>

<script>
import myHeader from '@/components/header'
import formatTime from '@/components/formatTime'
import loading from '@/components/loading'
import list from '@/components/list'
export default {
	data () {
		return {
			maxHeight: 0
		}
	},
	computed: {
		data () {
			return this.$store.getters.notices
		}
	},
	components: {
		myHeader,
		formatTime,
		loading,
		list
	},
	methods: {
		enterDetial (id) {
			if (id === 0) {
				return
			}
			this.$store.commit('INIT_INDEX', -1)
			this.$router.push({name: 'detail', params: {id: id}})
		},
		initData (_this) {
			this.$store.commit('RESET_COUNT')
			this.$store.dispatch('initNotices', {
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
			this.$store.dispatch('initNotices', {
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
	watch: {
		'$route': function(val, oldVal) {
			if (val.name === 'notice' && oldVal.name === 'profile') {
				this.$store.commit('RESET_COUNT')
				this.$store.dispatch('initNotices', {
					fromId: 0,
					refresh: true,
					_this: this.$refs.list
				})
			}
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.notice
	color #8F8F8F
	position absolute
	overflow hidden
	top 40px
	bottom 0px
	width 100%
	.notice-wrapper
		background #fff
		.notice-item
			border-bottom 10px solid #f2f2f2
			padding 5px 20px 15px 20px
			font-size 15px
			.content-header
				padding 10px 0
				.time
					float right
					vertical-align top
					font-size 12px
				h2, i
					display inline-block
					vertical-align top
				.icon-heart280
					color #ED4956
				.icon-comment43
					color #26A2FF
			.reply
				padding-bottom 10px
				color #000
			.content
				background #FAFAFA
				padding 10px
				letter-spacing 1.5px
</style>
