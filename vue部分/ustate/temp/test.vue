<template>
	<div>
		<!-- <button @click="add">点击增加</button>
		<button @click="refresh">还原</button>
		<button @click="click(100)">To 100</button>
		<button @click="click(0)">To 0</button>{{scrollY}} -->
		<div class="play">
			<!-- <button @click="click">点击</button> -->
			<div class="play-wrapper" ref="playWrapper">
				<ul>
					<li v-for="item in 100" class="item">
						{{item}}
						<button @click="scrollTo">跳转</button>
					</li>
				</ul>
			</div>
			<!-- <div class="playe-wrapper" ref="playeWrapper">
				<ul>
					<li v-for="item in items" class="item">
						{{item}}
					</li>
				</ul>
			</div> -->
		</div>
	</div>
</template>

<script>
// import BScroll from 'better-scroll'
export default {
	data () {
		return {
			// items: [],
			// scrollY: 0
		}
	},
	methods: {
		scrollTo () {
			window.scrollTo(0, 0)
		}
		// _initScroll () {
		// 	// console.log('dddd')
		// 	if (!this.playScroll) {
		// 		this.playScroll = new BScroll(this.$refs.playWrapper, {
		// 			// click: true
		// 			probeType: 3
		// 		})
		// 		this.playeScroll = new BScroll(this.$refs.playeWrapper, {
		// 			probeType: 3
		// 		})
		// 		// console.log(this.playScroll)
		// 	} else {
		// 		this.playScroll.refresh()
		// 	}
		// 	this.playScroll.on('scroll', (pos) => {
		// 		this.scrollY = Math.abs(Math.round(pos.y))
		// 		// console.log(this.scrollY)
		// 	})
		// 	this.playeScroll.on('scroll', (pos) => {
		// 		this.scrollY = Math.abs(Math.round(pos.y))
		// 	})
		// 	this.playScroll.on('touchend', (pos) => {
		// 		if (pos.y > 60) {
		// 			setTimeout(() => {
		// 				this.add()
		// 			}, 1000)
		// 		}
		// 	})
		// 	this.playeScroll.on('touchend', (pos) => {
		// 		console.log(pos.y)
		// 	})
		// 	/* this.playScroll.on('scrollEnd', () => {
		// 		// console.log('ddd')
		// 		this.items.push(666)
		// 		this.$nextTick(() => {
		// 			this.playScroll.refresh()
		// 			this.playeScroll.refresh()
		// 		})
		// 	}) */
		// },
		// click (y) {
		// 	this.playScroll.scrollTo(0, y)
		// },
		// add () {
		// 	var index = this.items.length + 1
		// 	this.items.push(index)
		// 	this.$nextTick(() => {
		// 		this.playScroll.refresh()
		// 		this.playScroll.refresh()
		// 	})
		// },
		// refresh () {
		// 	setTimeout(() => {
		// 		this.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		// 		this.$nextTick(() => {
		// 			this.playScroll.refresh()
		// 		})
		// 		alert('还原成功')
		// 	}, 1000)
		// }
	},
	created () {
		// this.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		// this.$nextTick(() => {
		// 	this._initScroll()
		// })
	}
}
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
.play
	position absolute
	top 0px
	bottom 0px
	width 100%
	overflow-y scroll
	display flex
	.play-wrapper, .playe-wrapper
		flex 1
		text-align center
		width 80%
		margin 0 auto
		background #f3f5f7
		height 100%
		.item
			display table
			border-bottom 1px solid black
			display block
			padding 20px
			height 20px
			line-height 20px
	.play-wrapper ul
		:nth-child(odd)
			background #fff
	.playe-wrapper ul
		:nth-child(even)
			background #fff
</style>

