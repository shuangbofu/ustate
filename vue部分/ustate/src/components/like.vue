<template>
		<div class="praise" @click.stop.prevent="toggle()" :class="{'active': liked}">
			<i class="icon" :class="{'icon-heart280':liked, 'icon-heart281':!liked}"></i>
			<span class="number">{{count}}</span>
		</div>
</template>

<script>
import noLoginReturnFn from '@/common/js/noLoginReturnFn'
export default {
	props: {
		count: {
			default: 0
		},
		id: {
			type: Number
		},
		liked: {
			default: 0
		},
		index: {
			type: Number,
			default: -1
		},
		type: ''
	},
	data () {
		return {
		}
	},
	methods: {
		toggle () {
			noLoginReturnFn(() => {
				if (this.index !== -1 && this.type !== 'comment') {
					this.$store.commit('INIT_INDEX', this.index)
				}
				if (this.type === 'comment') {
					this.$store.commit('INIT_COMMENT_INDEX', this.index)
					this.$store.dispatch('toggleLikeC', {
						liked: this.liked,
						id: this.id
					})
				} else {
					this.$store.dispatch('toggleLikeS', {
						liked: this.liked,
						id: this.id
					})
				}
			})
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.praise
	color #999999
	font-size 17px
	line-height 17px
	float right
	display inline-block
	&.active
		color #ED4956
	.number
		font-size 18px
		vertical-align top
</style>
