<template>
	<view class="mine">
		<view class="login">
			<view class="login-logo">
				<image src="/static/image/icons/mine.png" @click="handleLogin" v-if="!isLogin"></image>
				<image v-else :src="userAvatar" @click="goUserInfo"></image>
			</view>
			<view class="login-nickname">
				<text v-if="isLogin" style="color: #fff;">{{userInfo.nickname||userInfo.username}}</text>
				<up-button v-else type="primary" @click="handleLogin"> 去登录 <up-icon name="arrow-right-double" color="#fff"></up-icon></up-button>
			</view>
			
		</view>
		<view class="user-bg" v-if="isLogin">
			<image :src="userAvatar" ></image>
		</view>
	</view>
</template>

<script setup>
	import {ref,computed} from "vue"
	import {onShow} from "@dcloudio/uni-app"
	import { checkLogin } from "../../utils/user";
	const isLogin=ref(false);
	const userInfo=ref({
		username:''
	})
	onShow(()=>{
	  isLogin.value=checkLogin()
	  if(isLogin.value){
		 userInfo.value=uni.getStorageSync('uni-id-pages-userInfo')
	  }
	})
	const userAvatar=computed(()=>{
		return userInfo.value.avatar_file?userInfo.value.avatar_file.url:'/static/user_icon.png';
		// return  '/static/user_icon.png';
	})	
	// 跳转到登录页
	const handleLogin=()=>{
		uni.navigateTo({
			url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"
		})
	}
	// 用户信息
	const goUserInfo=()=>{
		uni.navigateTo({
			url:"/uni_modules/uni-id-pages/pages/userinfo/userinfo?showLoginManage="+true
		})
	}
</script>

<style scoped lang="scss">
	.mine{
		padding-top:var(--status-bar-height);
		padding-left: 15rpx;
		padding-right: 15rpx;
		
		.login{
			width: 100%;
			height: 360rpx;
			border-radius: 10rpx 10rpx;
			z-index: 20;
			display: flex;
			margin:  15rpx 0rpx;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			box-shadow: #ccc 0rpx 0rpx 10rpx;
			position: relative;
			&-logo{
				width: 200rpx;
				height: 200rpx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.user-bg{
				position: absolute;
				width: 100%;
				height: 360rpx;
				top: 0%;
				left: 0%;
				>image{
					width: 100%;
					height: 100%;
					filter: blur(30rpx);
					transform: scale(1.5);
				}
			}
	}
</style>
