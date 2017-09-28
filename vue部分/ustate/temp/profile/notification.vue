<template>
	<div class="notification">
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :topDropText="'释放立即刷新'"  :topLoadingText="'正在刷新...'" :bottomPullText="'加载更多'" :bottomDropText="'释放加载'" :bottomLoadingText="'正在加载...'">
			<div class="notification-content">
				<ul>
					<li v-for="item in data" class="notification-item">
						<!-- <mt-cell-swipe :right="[{content: 'Delete', style: { background: 'red', color: '#fff' }, handler: () => this.$messagebox('delete')}]"> -->
							<div class="profile-info">
								<div class="avatar">
									<img :src="item.profile.avatar" width="30" height="30">
								</div>
								<div class="name">
									<h2>{{item.profile.name}}</h2>
									<div class="gender">
										<h2 :class="{'active':!item.profile.gender}">{{item.profile.gender?'♂':'♀'}}</h2>
									</div>
								</div>
								<div class="time">
									{{item.time}}
								</div>
							</div>
							<div v-if="item.type === 'praise'" class="action">
								<i class="icon icon-heart280"></i><span class="fixedText">赞了你一下</span>
							</div>
							<div v-if="item.type === 'comment'" class="action">
								<i class="icon icon-comment43"></i><span class="fixedText">评论了你</span>
								<h2 class="comment-content">"{{item.comment}}"</h2>
							</div>
							<div class="statement">
								{{item.statement.content.text}}
							</div>
					<!-- 	</mt-cell-swipe> -->
					</li>
				</ul>
			</div>
		</mt-loadmore>
	</div>
</template>

<script>
export default {
	data () {
		return {
			allLoaded: false,
			data: {
				type: Array
			}
		}
	},
	methods: {
		loadTop () {
		},
		loadBottom () {
		},
		getData () {
			return {
				notifications: [
					{
						profile: {
							avatar: 'http://tva3.sinaimg.cn/crop.8.0.733.733.180/5f0b4dafjw8fa4tsvmhatj20ku0kdaco.jpg',
							name: '郭顶',
							isAnonymous: false,
							gender: true
						},
						statement: {
							content: {
								img: 'http://i1.tuoo.ymfile01.com/uploads/tuoo/06/17/y1_1.1434509133_960_540_118164-550.jpg',
								text: '重蹈覆辙.....和上次一摸一样.....我最没底气的依旧是《暧昧》....自嗨《高尚》超爱《动物世界》就像当年我都不想发《演员》了但独爱《下雨了》还期待着《绅士》能红.. 一模一样... '
							}
						},
						time: '2秒钟前',
						type: 'praise'
					},
					{
						profile: {
							avatar: 'http://img5.imgtn.bdimg.com/it/u=785610095,2402278722&fm=23&gp=0.jpg',
							name: '我是你们的小姐姐啊',
							isAnonymous: false,
							gender: false
						},
						statement: {
							content: {
								img: 'http://i1.tuoo.ymfile01.com/uploads/tuoo/06/17/y1_1.1434509133_960_540_118164-550.jpg',
								text: '重蹈覆辙.....和上次一摸一样.....我最没底气的依旧是《暧昧》....自嗨《高尚》超爱《动物世界》就像当年我都不想发《演员》了但独爱《下雨了》还期待着《绅士》能红.. 一模一样... '
							}
						},
						time: '8分钟前',
						type: 'comment',
						comment: '《暧昧》炒鸡好听！！！'

					},
					{
						profile: {
							avatar: 'http://img.tcgame.com.cn/cpic/38/0406172738.jpg',
							name: '京州市市委书记李达康',
							isAnonymous: false,
							gender: true
						},
						statement: {
							content: {
								img: 'http://i1.tuoo.ymfile01.com/uploads/tuoo/06/17/y1_1.1434509133_960_540_118164-550.jpg',
								text: '重蹈覆辙.....和上次一摸一样.....我最没底气的依旧是《暧昧》....自嗨《高尚》超爱《动物世界》就像当年我都不想发《演员》了但独爱《下雨了》还期待着《绅士》能红.. 一模一样... '
							}
						},
						time: '13分钟前',
						type: 'praise'
					},
					{
						profile: {
							avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492407756386&di=cae3e9589a93abfa6268f6b6e09b1bba&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D412edc12570fd9f9a0175561152cd42b%2Ffdb1297adab44aed84a54d8ab51c8701a08bfb1b.jpg',
							name: '萌萌哒小可爱',
							isAnonymous: false,
							gender: false
						},
						statement: {
							content: {
								img: 'http://i1.tuoo.ymfile01.com/uploads/tuoo/06/17/y1_1.1434509133_960_540_118164-550.jpg',
								text: '重蹈覆辙.....和上次一摸一样.....我最没底气的依旧是《暧昧》....自嗨《高尚》超爱《动物世界》就像当年我都不想发《演员》了但独爱《下雨了》还期待着《绅士》能红.. 一模一样... '
							}
						},
						time: '37分钟前',
						type: 'praise'
					},
					{
						profile: {
							avatar: 'http://tva2.sinaimg.cn/crop.0.0.180.180.180/6694d955jw1e8qgp5bmzyj2050050aa8.jpg',
							name: '网易云音乐',
							isAnonymous: false,
							gender: false
						},
						statement: {
							content: {
								img: 'http://i1.tuoo.ymfile01.com/uploads/tuoo/06/17/y1_1.1434509133_960_540_118164-550.jpg',
								text: '重蹈覆辙.....和上次一摸一样.....我最没底气的依旧是《暧昧》....自嗨《高尚》超爱《动物世界》就像当年我都不想发《演员》了但独爱《下雨了》还期待着《绅士》能红.. 一模一样... '
							}
						},
						time: '53分钟前',
						type: 'comment',
						comment: '全新单曲《暧昧》来啦！！！薛之谦包办《暧昧》词曲创作，更大程度展现“薛氏情歌”的特点！饱满深情又蕴涵张力的声线唱出想要不将就的内心，但又舍不得放手的无奈。[心][心]不知不觉中引发共鸣，让人沉浸其中。试听>>'

					},
					{
						profile: {
							avatar: 'http://tva2.sinaimg.cn/crop.0.0.996.996.180/006qa0p5jw8f21g7s18dpj30ro0roaao.jpg',
							name: 'Vue.js',
							isAnonymous: false,
							gender: true
						},
						statement: {
							content: {
								img: 'http://i1.tuoo.ymfile01.com/uploads/tuoo/06/17/y1_1.1434509133_960_540_118164-550.jpg',
								text: '重蹈覆辙.....和上次一摸一样.....我最没底气的依旧是《暧昧》....自嗨《高尚》超爱《动物世界》就像当年我都不想发《演员》了但独爱《下雨了》还期待着《绅士》能红.. 一模一样... '
							}
						},
						time: '13分钟前',
						type: 'praise'
					}
				]
			}
		}
	},
	created () {
		this.data = this.getData().notifications
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.notification
	color #8F8F8F
	overflow scroll
	overflow-x hidden
	position absolute
	top 110px
	bottom 0px
	width 100%
	.notification-content
		padding 0 4px 4px 4px
		.notification-item
			border-top 1px solid #f3f5f7
			padding 6px 2px
			.profile-info
				padding 0 4px 3px 6px
				display flex
				height 30px
				.avatar
					flex 0 0 40px
					img
						border-radius 50%
				.name
					flex 1
					font-size 14px
					h2
						display inline-block
					.gender
						height 30px
						display inline-block
						h2
							padding 8px 0
							line-height 16px
							font-size 14px
							font-weight 1600
							color #26A2FF
							&.active
								color #FF83FA
				.time
					padding 2px 0
					display inline-block
					float right
					font-size 10px
					color #999999
			.action
				padding 2px 4px
				font-size 12px
				line-height 12px
				.icon
					color #ED4956
					margin 0 4px 0 2px
					font-size 11px
					vertical-align top
				.fixedText
					font-size 12px
					line-height 12px
					vertical-align top
				.icon-comment43
					color #26A2FF
					font-size 13px
					vertical-align middle
				.comment-content
					padding 2px 0 2px 0
					margin-left 5px
					display inline-block
					font-size 11px
					line-height 12px
					vertical-align top
					color black
					letter-spacing 1px
			.statement
				border 1px solid #f2f2f2
				padding 8px
				font-size 12px
				overflow hidden
				text-overflow: ellipsis
				white-space: nowrap
				border-bottom 2px solid #f2f2f2
</style>
