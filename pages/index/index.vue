<template>
	<view class="home">
		<view class="nav-top">
			<up-sticky>
				<up-tabs
				:list="tabsList"
				 lineWidth="30"
				:activeStyle="{
					color:'#303133',
					fontWeight:'bold',
					transform:'scale(1.1)'
				}"
				:inactiveStyle="{
					color: '#606266',
					transform: 'scale(1)'
				}"
				@change="tabsChange"
				v-model:current="current"
				>
					
				</up-tabs>
			</up-sticky>
		</view>
		<view class="content">
			<view class="new" v-show="current===0">
				<TabNews></TabNews>
			</view>
			<view class="mine" v-if="current===1">
				<TabMine></TabMine>
			</view>
		</view>
		<view class="create" @click="handleAdd">
			<text class="iconfont icon-chuangzuo"></text>
		</view>

	</view>
</template>

<script setup>
import { reactive,ref } from 'vue';
import {onShow} from "@dcloudio/uni-app"
import TabNews from "@/pages/index/TabNews.vue"
import TabMine from "@/pages/index/TabMine.vue"
import { checkLogin } from '@/utils/user';


	const tabsList=reactive([
		{name:'最新',value:'new'},
		{name:'我的',value:'mine'}
	])
	const current=ref(0);
	const dataList=ref([])
	onShow(()=>{
		if(current.value===1){
			toLogin()
		}
	})
	// 切换tabs
	const tabsChange=(e)=>{
		if(current.value===1){
			toLogin()
		}
	}
	const toLogin=()=>{
		const isLogin=checkLogin()
		if(!isLogin){
			uni.redirectTo({
				url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"
			})
		}
	}
	// 新增文章
	const handleAdd=()=>{
		uni.navigateTo({
			url:"/blog-pages/add-blog/add-blog"
		})
	}

</script>

<style lang="scss" scoped>
.home{
	
	// .icon_style{
	// 	font-size: 36rpx;
	// 	color: #2979ff;
	// }
	.nav-top{
		margin-bottom: 30rpx;
	}
	.create{
		width: 120rpx;
		height: 120rpx;
		border-radius: 50% 50%;
	    box-shadow: 0 0 20rpx $u-primary;
		background-color: $custom-dark-primary;
		position: fixed;
		right:80rpx;
		bottom: 160rpx;
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		.iconfont{
			font-size: 42rpx;
		}
	}
}
</style>
