<template>
	<div class="about">
		<div class="about-header">
			<my-header title="关于我和作品"></my-header>
		</div>
		<div class="about-content">
			<div class="section" style="padding: 0; text-align: center;">
				<span class="title" style="margin: 0; padding: 10px">放在前面的话：</span>
				<div>
					<h2>成功是热爱一件事并且用心做好它</h2>
					<h2>一个人的优秀是来自于内心的想要变得更加优秀的强烈的渴望和对生命追求的火热的激情</h2>
				</div>
			</div>
			<div class="section">
				<span class="title" style="margin-top: 0">
					个人信息：
				</span>
				<h2>ERIC, 男，20， 大二</h2>
				<h2>学校：常熟理工学院</h2>
				<h2>专业：计算机科学与技术</h2>
				<h2>QQ/微信：786183073</h2>
			</div>
			<div class="section" style="padding-top: 0">
				<span class="title">初衷</span>
				<p>
				&nbsp;&nbsp;时间过的很快，不知不觉大二就快剩个暑假了，不过从去年开始自己学习java-->javaee、前端基础、mysql、jdbc...-->主流javaee框架SSM-->jquery、ajax-->现在也已经有一年多了，前后也算是做了两次简单的后台管理系统，想独立从头到尾彻彻底底完成一个综合项目，心里也一直有想做一个校园社交类型的平台。
				<br>&nbsp;&nbsp;最初手头上的javaee和jquery也无从下手，直到今年4月开始学习vue，到当时也快1个月了，也理所应当的想开始实现它，并把它作为一个综合项目来综合练习所学的技术并从中获得经验提升自己
				</p>
				<h3 style="float: right">作者：ERIC</h3>
			</div>
			<div class="section">
				<span class="title">开发实现过程记录：</span>
					1.	初步设想该作品（项目）定位，并思考其名称、logo<br>
					2.	思考移动端页面如何排版，搜索并参考优秀移动端页面结构<br>
					3.	使用vue-cli脚手架，尝试初步编写页面，模拟json数据来渲染页面<br>
					4.	初步编写了路由跳转，以及index，profile页面（后重写）<br>
					5.	初步思考如何设计处理发表点赞评论问题（后修改）<br>
					6.	初步设计数据库表，模拟数据，使用sql检验合理性<br>
					7.	配置javaee框架，简单测试后台成功运行<br>
					8.	尝试深入编写后台API<br>
					9.	为进行更好地数据渲染，根据后台返回的json数据重新修改前端页面结构<br>
					10.	封装了部分重复功能的组件，并重新修改了页面结构<br>
					11.	编写基础功能<br>
					12.	尝试增加模拟登陆功能（重写后暂时去掉了）<br>
					13.	因为设计不合理导致部分重要功能无法实现、资源浪费严重、效率低决定进行大重写<br>
					14.	一次推倒大重写（包括前端页面、后端API、数据库表设计）<br>
					&nbsp;&nbsp;a)	参考了微博移动端、scuinfo、移动版虎扑体育的后台请求以及api返回的数据格式，全部推倒重新编写了RESTful风格的API，重写后的API更加清晰明了<br>
					&nbsp;&nbsp;b)	参考了scuinfo的页面结构，去掉了不必要的功能（比如查看点赞列表），使用最初的页面，在此基础上保留部分样式，修改页面结构<br>
					&nbsp;&nbsp;c)	根据前后端的修改，重新设计数据库表，修改了数据库表的结构<br>
					15.	期间对部分mybatis中sql语句进行简单优化查询、纠正未成功返回所需要的数据的sql<br>
					16.	整理vuex相关代码，按照vuex文档中推荐的文件结构进行整理完善<br>
					17.	将api调用全部按照vuex文档中推荐文件结构整理并写到了特定的api文件夹中<br>
					18.	购买腾讯云服务器，并配置jdk、tomcat、mysql、nginx<br>
					19.	打包vue、javaweb project并尝试部署到服务器上，测试设备能否访问<br>
					20.	根据习惯，参考、编写消息通知功能，并进行多次修改渐趋向合理<br>
					21.	修改了发表、评论、喜欢等三个页面的后台API、数据库查询语句、前端页面结构修复错误查询、api调用带来的bug<br>
					22.	尝试增加滚动条、下拉刷新、上拉加载、loading提示时因为路由跳转第三方组件没达到需求等带来了问题，三天的时间里使用了数款类似的vue的滚动组件，以失败告终<br>
					23.	经过三天的尝试，积累的部分经验，使用最初的组件根据自己明确的需求成功实现了滚动以及loading提示<br>
					24.	乘势增加了下拉刷新、上拉加载<br>
					25.	继续完善基础功能<br>
					26.	处理多次异步调用带来的资源浪费，修复其他bug<br>
					27.	完善更多菜单，增加举报功能<br>
					28. 	增加反馈功能<br>
					29.	增加各项操作后的通知栏<br>
					30.	增加模拟登录退出功能<br>
					31.	修改通知表结构并修改mybatis消息部分sql<br>
					32.	增了账号密码登录，并将登录相关整理到vuex，并将api放到api文件夹中<br>
					33.	增加了校园卡寻找模块
					34.	未完待续......<br>
			</div>
			<div class="section">
				<span class="title" style="margin-top: 0">主要使用到的技术：</span>
				<p>
					前端渲染：vue.js+vue-router+vuex+axios<br>
					后端API(RESTful风格API)：Java+ssm(springmvc+spring+mybatis)<br>
					第三方接口：功能未实现，暂未使用<br>
					数据库：MySQL<br>
					服务器：nginx + Tomcat<br>
				</p>
				<span class="title">主机配置：</span>
				<p>
					主机：腾讯云主机：配置：<br>
					地域：上海（上海一区）<br>
					机型：系列1、标准型S1、1核CPU、1G内存<br>
					镜像：CentOS 7.2 64位<br>
					存储：系统盘（20G云硬盘）无数据盘<br>
					网络：基础网络<br>
					带宽：宽带1Mbps<br>
				</p>
			</div>
		</div>
		<popup></popup>
	</div>
</template>

<script>
import myHeader from '@/components/header'
import popup from '@/components/popup'
export default {
	data () {
		return {
			content: '关于我'
		}
	},
	components: {
		myHeader,
		popup
	},
	created () {
		if (this.$store.getters.profile.profId === undefined) {
			this.$store.dispatch('initProfile_bak')
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.about
	position absolute
	top 40px
	bottom 0px
	width 100%
	.about-content
		font-size 16px
		padding 10px 20px
		.section
			padding 10px
			letter-spacing 1.5px
			line-height 18px
			h2
				color #000
				padding 5px
			.title
				font-weight bold
				display block
				margin 10px 0
</style>

