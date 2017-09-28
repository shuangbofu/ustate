<template>
	<div class="play">
		<div class="index-header">
			<mt-header fixed title="发现">
			</mt-header>
		</div>
		<div class="section" @touchstart="touchstart" @touchend="touchend" ref="section">
			<div class="icon">
				<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493216300780&di=0545c84b377202073bb17ac753c3eb64&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-11-24%2F040311186.jpg" width="40" height="40">
			</div>
			<div class="title">
				<h2>单身狗</h2>
			</div>
		</div>
		<div class="section">
			<div class="icon">
				<img src="../common/assets/run.jpg" width="40" height="40">
			</div>
			<div class="title">
				<h2>跑步</h2>
			</div>
		</div>
		<div class="section">
			<div class="icon">
				<img src="../common/assets/search.jpg" width="40" height="40">
			</div>
			<div class="title">
				<h2>找饭卡</h2>
			</div>
		</div>	
		<div class="section">
			<div class="icon">
				<img src="http://tva4.sinaimg.cn/crop.0.0.1024.1024.180/006CT89Hjw8f9w48cseqhj30sg0sgjuz.jpg" width="40" height="40">
			</div>
			<div class="title">
				<h2>狼人杀</h2>
			</div>
		</div>
		<div class="section">
			<div class="icon">
				<img src="http://tva4.sinaimg.cn/crop.0.0.150.150.180/006dCke7jw8exc29553vsj3046046mxn.jpg" width="40" height="40">
			</div>
			<div class="title">
				<h2>王者荣耀</h2>
			</div>
		</div>
		<div class="section">
			<div class="icon">
				<img src="http://tva3.sinaimg.cn/crop.0.0.180.180.180/658d8c8bjw1e8qgp5bmzyj2050050aa8.jpg" width="40" height="40">
			</div>
			<div class="title">
				<h2>三国杀</h2>
			</div>
		</div>	
		<div class="section">
			<div class="icon">
				<img src="../common/assets/talk.jpg" width="40" height="40">
			</div>
			<div class="title">
				<h2>卧谈会</h2>
			</div>
		</div>	
	</div>
</template>

<script>
export default {
	data () {
		return {
		}
	},
	methods: {
		touchstart () {
			// alert('ddd')
			this.$refs.section.style.background = '#f2f2f2'
		},
		touchend () {
			this.$refs.section.style.background = ''
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.play
	// color #26A2FF
	overflow hidden
	overflow-x hidden
	position absolute
	top 40px
	bottom 50px
	width 100%
	overflow-y scroll
	.section
		padding 10px
		border-bottom 1px solid #f2f2f2
		display flex
		.icon
			flex 0 0 50px
			display inline-block
			img
				border-radius 10%
		.title
			display inline-block
			h2
				font-size 18px
				color #5c5c5c
</style>
