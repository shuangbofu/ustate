<template>
  <div class="tabbar">
   <div class="tab">
    <div class="tab-wrapper">
     <div class="tab-item">
      <div class="item-wrapper">
       <router-link to="/index" replace>
        <i class="icon-house128" ></i>
        <!-- <span class="item-content">首页</span> -->
       </router-link>
      </div>
     </div>
      <div class="tab-item">
      <div class="item-wrapper">
       <router-link to="/publish">
        <i class="icon-arrow591"></i>
        <!-- <span class="item-content">发现</span> -->
       </router-link>
      </div>
     </div>
     <div class="tab-item">
       <div class="item-wrapper">
       <router-link to="/profile" replace>
        <i class="icon-user"></i>
        <!-- <span class="item-content">我的</span> -->
        <h2 v-if="count>0" class="count">{{count}}</h2>
       </router-link>
      </div>
     </div>
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
  computed: {
    count () {
      return this.$store.getters.count
    }
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../common/css/icon.css';
.tab
  z-index 20
  position fixed
  bottom 0
  width 100%
.tab-wrapper
	border-top 1px solid rgba(0, 0, 0, 0.098)
	background #FFFFFF
	display flex
	.tab-item 
		flex 1
		text-align center
		.item-wrapper 
			a 
				&.router-link-active
					color #26A2FF
				color rgb(170, 170, 170)
				i
                            display block
                            font-size 0
                      .item-content
                            font-size 10px
                            display block
                            margin-bottom 4px
                .icon-arrow591
                  display inline-block
                  font-size 29px
                  margin 12px 0 8px 0
                .icon-user
                  display inline-block
                  font-size 34px
                  margin 8px 0 7px 0 !important
                .icon-house128
                   display inline-block
                   font-size 28px
                   margin 12px 0 9px 0
                .count
                  width 18px
                  height 18px
                  display inline-block
                  position relative
                  top -20px
                  left -16px
                  background rgb(239, 64, 86)
                  border-radius 50%
                  color #fff
                  font-size 13px
                  line-height 20px
                  &
                    margin-right -23px
</style>
