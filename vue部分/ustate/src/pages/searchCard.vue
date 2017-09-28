<template>
	<div class="searchCard">
		<div class="searchCard-header">
			<my-header title="寻找校园卡">
				<div class="more">
					<button class="button-more" @click="add">
						<i class="icon-add154" style="font-size: 22px; line-height: 26px"></i>
					</button>
				</div>
			</my-header>
		</div>
		<list @init="initData" @cal="_calculateHeight" :maxHeight="maxHeight" @load="loadMore" ref="list">
			<div slot="list" class="searchCard-content">
				<li v-for="(item, index) in data" class="search-item"  ref="listWrapper">
					<div class="type" :class="{'red': item.type === 1}">
						<div class="desc">
							{{item.type === 1 ? '丢': '捡'}}
						</div>
					</div>
					<div class="info" >
						<div class="card-info">
							<div><h2 class="title">卡号：</h2>{{item.number}}</div>
							<div><h2 class="title">姓名：</h2>{{item.name}}</div>
						</div>
						<div class="concat-info">
							<div><h2 class="title">QQ：</h2>{{item.qq | filter}}</div>
							<div><h2 class="title">手机号：</h2>{{item.phone | filter}}</div>
						</div>
					</div>
					<div class="remark"><h2 class="title">备注：</h2>{{item.remark}}</div>
					<div class="author">
						 <h2 class="content">发布人：{{item.profNickname}}</h2>
					</div>
					<div class="footer">
						<button class="button-more" @click="more(index, item.id, item.author, 2)">
							<i class="icon-more10"></i>
						</button>
						<format-time :time="item.createtime"></format-time>
					</div>
				</li>
			</div>
		</list>
		<transition name="fold">
			<div class="add-panel" v-if="panelShow">
				<div class="panel-header"@touchstart="touchstart($refs.add)" @touchend="touchend($refs.add)" ref="add" @click.stop.prevent="send">
					<h1 :class="{'publishing': publishing}">{{publishing? '正在发布中...' : '点击发布新消息'}}</h1>
				</div>
				<div class="panel-form">
					<div class="item"><h2 class="title">卡号：</h2><input type="text" v-model="number" placeholder="校园卡号..."></input></div>
					<div class="item"><h2 class="title">姓名：</h2><input type="text" v-model="name" placeholder="校园卡上的姓名..."></input></div>
					<div class="item"><h2 class="title">手机号：</h2><input type="text" v-model="phone" placeholder="手机号..."></input></div>
					<div class="item"><h2 class="title">QQ：</h2><input type="text" v-model="qq" placeholder="qq..."></input></div>
					<div class="item"><h2 class="title">备注：</h2><input type="text" v-model="remark" placeholder="备注..."></input></div>
					<div class="item">
						<h2 class="title radio">类型：</h2>
						<input type="radio" class="radio" value="1" v-model.number="type">丢</input><input type="radio" class="radio" value="0" v-model.number="type">捡</input>
					</div>
				</div>
				<div class="close"><i  class="icon-cross80" @click="close"></i></div>
			</div>
		</transition>
		<action-sheet ref="sheet"></action-sheet>
		<loading></loading>
		<popup></popup>
	</div>
</template>

<script>
import formatTime from '@/components/formatTime'
import myHeader from '@/components/header'
import loading from '@/components/loading'
import list from '@/components/list'
import actionSheet from '@/components/actionSheet'
import popup from '@/components/popup'
export default {
	data () {
		return {
			maxHeight: 0,
			flat: false,
			panelShow: false,
			number: '',
			name: '',
			phone: '',
			qq: '',
			type: 1,
			remark: ''
		}
	},
	components: {
		myHeader,
		formatTime,
		loading,
		list,
		actionSheet,
		popup
	},
	computed: {
		data () {
			return this.$store.getters.cards
		},
		publishing () {
			return this.$store.getters.publishing
		}
	},
	methods: {
		initData (_this) {
			this.$store.dispatch('initCards', {
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
			this.$store.dispatch('initCards', {
				fromId: id,
				refresh: false,
				_this: _this
			})
		},
		_calculateHeight () {
			let list = this.$refs.listWrapper
			let height = 0
			for (let i = 0; i < list.length; i++) {
				let item = list[i]
				height += item.clientHeight
			}
			this.maxHeight = height
		},
		close () {
			this.panelShow = false
		},
		add () {
			this.panelShow = true
			this.number = ''
			this.name = ''
			this.phone = ''
			this.qq = ''
			this.type = 1
			this.remark = ''
			this.flag = true
		},
		send () {
			if (!this.publishing) {
				this.$store.dispatch('addCard', {
					number: this.number,
					name: this.name,
					phone: this.phone,
					qq: this.qq,
					type: this.type,
					remark: this.remark,
					_this: this
				})
			}
		},
		touchstart (add) {
			if (add !== undefined) {
				add.style.background = '#f2f2f2'
			}
		},
		touchend (add) {
			if (add !== undefined) {
				add.style.background = '#fff'
			}
		},
		more (index, id, author, type) {
			let actionSheet = this.$refs.sheet
			actionSheet.init(index, id, author, type)
			actionSheet.show()
		}
	},
	filters: {
		filter (str) {
			if (str === '') {
				return '未填'
			} else {
				return str
			}
		}
	},
	activated () {
		if (this.flag) {
			this.$refs.list.updateData()
		}
		this.flag = true
	},
	deactivated () {
		this.panelShow = false
	},
	watch: {
		'$route': function (val, oldVal) {
			if (val.name === 'searchCard') {
				this.$refs.list.setTop()
			}
		},
		'publishing': function(val, oldVal) {
			if (!val) {
				this.panelShow = false
			}
		}
	},
	created () {
		if (this.$store.getters.profile.nickname === undefined) {
			this.$store.dispatch('initProfile_bak')
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.searchCard
	position absolute
	overflow hidden
	top 40px
	bottom 0
	width 100%
	.searchCard-content
		width 100%
		.search-item
			position relative
			box-sizing border-box
			width 100%
			padding 12px 12px 4px 12px
			background #fff
			border-bottom 15px solid #f2f2f2
			display flex
			flex-direction column 
			.info
				font-size 16px
				background #FAFAFA
				padding 5px 5px 0 5px
				display flex
				.card-info
					flex 0 0 45%
					color #000
					padding-left 5px
				.concat-info
					flex  0 0 55%
					padding 0 10px
				.title
					padding 4px 0
					display inline-block
					font-weight bold
			.remark, .author
				font-size 16px
				background #FAFAFA
				padding 5px
				display block
				.title
					padding 0 5px
					display inline-block
					font-weight bold
				.content
					float right
					color #4C4C4C
					font-size 16px
			.type
				position absolute
				top 0
				right 0
				border-top 50px solid #26A2FF
				border-left 50px solid transparent
				&.red
					border-top 50px solid #ED4956
				.desc
					position absolute
					top -40px
					right 5px
					color #fff
					font-size 18x
			.footer
				margin-top 8px
				.button-more
					float right
					outline none
					border none
					background #fff
					.icon-more10
						font-size 22px
						line-height 18px
	.add-panel
		z-index 51
		position fixed
		bottom 0px
		left 0px
		height 100%
		width 100%
		background #fff
		transform translate3d(0, 0, 0)
		&.fold-enter-active, &.fold-leave-active
			transition all .4s
		&.fold-enter, &.fold-leave-active
			transform  translate3d(0, 100%, 0)
		.panel-header
			padding 16px
			text-align center
			font-size 22px
			color #4C4C4C
			background #fff
			border-bottom 1px solid #f2f2f2
		.panel-form
			padding 0 40px
			display flex
			flex-direction column
			border-bottom 1px solid #f2f2f2
			.item
				display flex
				padding 6px 0
				input
					width 100%
					border 1px solid #8f8f8f
					border-radius 10px
					outline none
					height 20px
					font-size 18px
					padding 4px 6px
					&.radio
						width 40px
						height 1\20px
						border 1px solid #000
				.title
					flex 0 0 80px
					font-size 20px
					line-height 32px
					color #4c4c4c
					&.radio
						line-height 20px
		.close
			position absolute
			bottom 20px
			left 0
			width 100%
			display block
			text-align center
			i
				color #8f8f8f
				font-size 40px
</style>
