import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
import Hot from '@/pages/hot'
import Publish from '@/pages/publish'

import Profile from '@/pages/profile'

import Detail from '@/pages/detail'

import Posted from '@/pages/posted'
import Commented from '@/pages/commented'
import Liked from '@/pages/liked'

import Notice from '@/pages/notice'

import About from '@/pages/about'
import Feedback from '@/pages/feedback'

import Login from '@/pages/login'

import SearchCard from '@/pages/searchCard'

Vue.use(Router)
export default new Router({
	mode: 'history',
	base: '/ustate/',
	routes: [
		{
			path: '/',
			redirect: '/index'
		},
		{
			path: '/index',
			name: 'index',
			component: Index
		},
		{
			path: '/hot',
			name: 'hot',
			component: Hot
		},
		{
			path: '/publish',
			name: 'publish',
			component: Publish
		},
		{
			path: '/profile',
			name: 'profile',
			component: Profile
		},
		{
			path: '/detail/:id',
			name: 'detail',
			component: Detail
		},
		{
			path: '/posted',
			name: 'posted',
			component: Posted
		},
		{
			path: '/commented',
			name: 'commented',
			component: Commented
		},
		{
			path: '/liked',
			name: 'liked',
			component: Liked
		},
		{
			path: '/notice',
			name: 'notice',
			component: Notice
		},
		{
			path: '/about',
			name: 'about',
			component: About
		},
		{
			path: '/feedback',
			name: 'feedback',
			component: Feedback
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/searchCard',
			name: 'searchCard',
			component: SearchCard
		}
	]
})
