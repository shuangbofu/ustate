<template>
	<div class="liked">
		<div class="liked-header">
			<my-header title="我的喜欢"></my-header>
		</div>
		<list @init="initData" @cal="_calculateHeight" :maxHeight="maxHeight" @load="loadMore" ref="list">
			<div slot="list" class="liked-content">
				<li v-for="(like, index) in data" class="like-item" ref="listWrapper">
					<div class="content-header">
						<formatTime :time="like.createtime" complete="true"></formatTime>
						<i @click.stop.prevent="remove(like.defId, index)" class="icon-heart280"> 取消</i>
					</div>
					<div class="originContent" @click.stop.prevent="enter(like.defId)">
						<p v-if="like.originContent!==''" v-html="like.originContent"></p>
						<p v-else>该发言已被删除</p>
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
			this.$store.dispatch('initLiked', {
				fromId: 0,
				refresh: true,
				_this: _this
			})
		},
		enter(id) {
			if (id === 0) {
				return
			}
			this.$router.push({name: 'detail', params: {id: id}})
		},
		remove (id, index) {
			this.$store.commit('INIT_LIKE_INDEX', index)
			this.$store.dispatch('removeLiked', id)
		},
		loadMore (_this) {
			if (this.data.length > 0) {
				var id = this.data[this.data.length - 1].id
			} else {
				id = 0
			}
			this.$store.dispatch('initLiked', {
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
	components: {
		myHeader,
		formatTime,
		like,
		loading,
		list,
		popup
	},
	computed: {
		data () {
			return this.$store.getters.liked
		},
		loadedAll () {
			return this.$store.getters.loadedAll
		}
	},
	activated () {
		if (this.$store.getters.inOrOut[3] && this.flag) {
			this.initData()
			this.$store.commit('updateLogInOrOut', 3)
		}
		this.flag = true
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.liked
	color #8F8F8F
	position absolute
	overflow hidden
	top 40px
	bottom 0px
	width 100%
	.liked-content
		background #fff
		.like-item
			padding 0 20px 20px 20px
			border-bottom 10px solid #f2f2f2
			.content-header
				padding 10px 0
			.icon-heart280
				color #ED4956
				float right
			.originContent
				display block
				padding 0
				letter-spacing 1.5px
				p
					background #FAFAFA
					padding 10px
	.no-data-tip
		position absolute
		top 10px
		left 0px
		width 100%
		text-align center
		font-size 16px
		color #8f8f8f
</style>
