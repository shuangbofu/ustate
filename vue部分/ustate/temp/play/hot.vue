<template>
	<div class="hot">
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :topDropText="'释放立即刷新'"  :topLoadingText="'正在刷新...'" :bottomPullText="'加载更多'" :bottomDropText="'释放加载'" :bottomLoadingText="'正在加载...'">
			<div class="index-content">
				<ul>
					<li v-for="item in 100" class="item">
						{{item}}
					</li>
				</ul>
			</div>
		</mt-loadmore>
	</div>

	</div>
</template>

<script>
export default {
	data () {
		return {
			allLoaded: false
		}
	},
	methods: {
		loadTop () {
		},
		loadBottom () {
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.hot
	color #8F8F8F
	overflow scroll
	overflow-x hidden
	position absolute
	top 37px
	bottom 0px
	width 100%
	.item
		font-size 12px
		text-align center
		padding 10px
</style>
