<template>
	<div class="detail">
		<div class="detail-header">
			<my-header title="Ustate">
				<div class="more" @click.stop.prevent="more(index, data.id, data.author, 1)">
					<button class="button-more">
						<i class="icon-more10"></i>
					</button>
				</div>
			</my-header>
		</div>
		<div class="detail-wrapper" ref="detailWrapper"> 
			<ul>
				<div v-if="data" class="detail-content" ref="stmtWrapper">
					<profile-bar :profile="data.profile"></profile-bar>
					<format-time :time="data.createtime" complete="true"></format-time>
					<div class="content">
						<div class="text">
							<p v-html="data.content"></p>
						</div>
					</div>
					<div class="footer">
						<like :id="data.id" :liked="data.liked" :count="data.likeCount"></like>
						<div class="comments" :class="{'active': data.commentCount > 0}">
							<i class="icon" :class="{'icon-comment43':data.commentCount >0, 'icon-comment42': data.commentCount <=0}"></i>
							<span class="number">{{data.commentCount}}</span>
						</div>
					</div>
				</div>
				<div class="comment-wrapper" ref="commentWrapper">
					<ul v-if="comments.length> 0">
						<li v-for="(cmt, index) in comments" class="cmt-item">
							<profile-bar :profile="cmt.profile"></profile-bar>
							<div class="more" @click.stop.prevent="more(index, cmt.id, cmt.author, 0)">
								<button class="button-more">
									<i class="icon-more10"></i>
								</button>
							</div>
							<div class="content">
								<div class="text">
									<p v-html="cmt.content"></p>
								</div>
							</div>
							<format-time :time="cmt.createtime"></format-time>
							<div class="floor">#{{index+1}}</div>
							<like :id="cmt.id" :count="cmt.likeCount" type="comment" :index="index" :liked="cmt.liked"></like>
						</li>
					</ul>
					<div v-if="commentLoading" style="padding-top: 10px; text-align: center">
						<img src="http://118.89.182.253/img/ring-alt.gif" height="30px" width="30px">
					</div>
					<div class="no-comment-tip" v-if="comments.length === 0 && !commentLoading" >还没有人评论</div>
				</div>
			</ul>
		</div>
		<div class="comment">
			<div class="switch">
				<button :class="{'active': sercret}" @click="toggleSercret">{{sercret?'匿名中':'未匿名'}}</button>
			</div>
			<div class="text">
				<textarea placeholder="写评论..." v-model="content" @focus="getProfile"></textarea>
			</div>
			<div class="sendButton">
				<button :class="{'active': content!=='', 'publishing': publishing}" @click="sendComment">{{publishing?'发送中...':'发送'}}</button>
			</div>
		</div>
		<action-sheet ref="sheet"></action-sheet>
		<popup></popup>
		<loading :detail="true"></loading>
	</div>
</template>

<script>
import profileBar from '@/components/profileBar'
import formatTime from '@/components/formatTime'
import like from '@/components/like'
import myHeader from '@/components/header'
import actionSheet from '@/components/actionSheet'
import loading from '@/components/loading'
import popup from '@/components/popup'
import BScroll from 'better-scroll'
export default {
	data () {
		return {
			sercret: false,
			content: '',
			height: 0
		}
	},
	components: {
		profileBar,
		formatTime,
		like,
		myHeader,
		actionSheet,
		loading,
		popup
	},
	computed: {
		data () {
			return this.$store.getters.detail
		},
		comments () {
			return this.$store.getters.comments
		},
		commentLoading () {
			return this.$store.getters.commentLoading
		},
		index () {
			return this.$store.getters.index
		},
		publishing() {
			return this.$store.getters.publishing
		},
		length () {
			return 512 - this.content.replace(/\n/g, '<br>').length
		}
	},
	methods: {
		sendComment () {
			if (!this.publishing) {
				if (this.content === '') {
					this.$store.commit('SHOW_TOP_POPUP', '评论内容不能为空！')
					return
				} else if (this.length < 0) {
					this.$store.commit('SHOW_TOP_POPUP', '字数超过限制！')
					return
				} else {
					this.$store.dispatch('sendComment', {
						stmtId: this.data.id,
						content: this.content.replace(/\n/g, '<br>'),
						sercret: this.sercret ? 1 : 0,
						_this: this
					})
					this.content = ''
					this.sercret = false
				}
			}
		},
		toggleSercret () {
			this.sercret = !this.sercret
		},
		getProfile () {
			this.$store.dispatch('initCommentProfile')
		},
		more (index, id, author, type) {
			let actionSheet = this.$refs.sheet
			actionSheet.init(index, id, author, type)
			actionSheet.show()
		},
		_initScroll () {
			if (!this.detailScroll) {
				this.detailScroll = new BScroll(this.$refs.detailWrapper, {
					click: true,
					probeType: 3
				})
			} else {
				this.detailScroll.refresh()
			}
		},
		_calculateHeight () {
			this.height = this.$refs.stmtWrapper.clientHeight + this.$refs.commentWrapper.clientHeight
		}
	},
	activated () {
		if (this.$store.getters.index === -1) {
			this.$store.dispatch('initStatement', {
				id: this.$route.params.id,
				_this: this
			})
		}
		this.sercret = false
		this.content = ''
		this.$store.dispatch('initComments', {
			id: this.$route.params.id,
			_this: this
		})
	},
	created () {
		if (this.$store.getters.profile.profId === undefined) {
			this.$store.dispatch('initProfile_bak')
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.detail
	color #8F8F8F
	overflow hidden
	position absolute
	top 40px
	bottom 44px
	width 100%
	.detail-wrapper
		width 100%
		height 100%
		.detail-content
			padding 10px 15px 6px 15px
			color #26A2FF
			border-bottom 15px solid #f2f2f2
			font-size 0
			.content
				padding 10px 0 10px 4px
				border-bottom 1px solid #f2f2f2
				.text
					font-size 16px
					line-height 18px
					color black
					letter-spacing 1.5px
			.time
				padding-top 10px
				display block
				height 12px
				float right
				font-size 15px
				color #999999
			.footer
				padding  12px 0 0
				display block
				height 20px
				.comments
					margin-right 10px
					font-size 18px
					float right
					display inline-block
					&.active
						color #26A2FF
					.number
						vertical-align top
						font-size 18px
		.comment-wrapper
			padding 6px 15px
			.cmt-item
				padding 4px 0
				border-bottom 1px solid #f2f2f2
				color #26A2FF
				font-size 0
				.more
					display inline-block
					float right
					.button-more
						border none
						outline none
						background none
						color #26A2FF
						.icon-more10
							font-size 20px
				.content
					padding 10px 0 4px 4px
					.text
						font-size 16px
						line-height 18px
						color #000
						letter-spacing 1.5px
				.floor
					margin 0 5px
					display inline-block
					font-size 15px
					line-height 17px
					color #888888
					vertical-align top
				.time
					display inline-block
					font-size 14px
					color #999999
					padding 2px 0 2px
					h2
						padding 0px 0
			.no-comment-tip
				padding-top 10px
				text-align center
	.comment
		width 100%
		position fixed
		bottom 0px
		border-top 1px solid #f2f2f2
		height 44px
		background #fff
		display flex
		.switch
			flex 0 0 60px
			padding 6px 0
			text-align center
			button
				text-align center
				outline none
				border none
				height 32px
				color #6B6B6B
				border-radius 10px
				font-size 13px
				font-weight bold
				background #fff
				&.active
					color #26A2FF
		.text
			padding 6px 4px 6px 0
			flex 1 1 auto
			textarea
				box-sizing border-box
				overflow hidden
				padding 6px 10px
				height 32px
				width 100%
				outline none
				resize none
				border none
				background #f2f2f2
				border-radius 4px
				font-size 17px
		.sendButton
			padding 6px 0px
			width 46px
			flex 0 0 50px
			float right
			button
				height 32px
				outline none
				border none
				border-radius 10px
				color #6B6B6B
				font-size 15px
				background #fff
				&.active
					color #26A2FF
				&.publishing
					color #8c8c8c
					font-size 10px
</style>
