<template>
	<view class="blog-item" @click="handleItem">
		<view class="header">
			<view class="header-left">
				<up-avatar :src="item.user_id[0]?.avatar_file?.url||'/static/user_icon.png'" shape="circle" size="18"></up-avatar>
				<view class="user-name">{{item.user_id[0].nickname||item.user_id[0].username||'匿名用户'}}</view>	
				<uni-dateformat :date="item.publish_date" format="yyyy年MM月dd日" :threshold="[60000,3600000*24*30]"></uni-dateformat>				
			</view>
			<view class="header-right">
				<text class="iconfont icon-gengduo" @click.stop="optionSheet(item.user_id[0])"></text>
			</view>
		</view>
		<view class="body">
			<view class="title up-line-1">{{item.title}}</view>
			<view class="content up-line-2">{{item.excerpt}}</view>
			<view class="img-list">
				<image :src="url" v-for="url in item.images" :key="url"></image>				
			</view>
		</view>
		<view class="footer">
			<view>
				<text class="iconfont icon-yanjing"></text>
				<text>{{item.view_count||0}}</text>
			</view>
			<view>
				<text class="iconfont icon-dianzan"></text>
				<text>{{item.like_count||0}}</text>
			</view>
			<view>
				<text class="iconfont icon-pinglun"></text>
				<text>{{item.comment_count||0}}</text>
			</view>
		</view>
	</view>
	<view>
		<up-action-sheet :actions="sheetList" :show="sheetShow" cancel-text="取消" :closeOnClickOverlay="false" @close="handleClose" @select="handleSelect"></up-action-sheet>
	</view>
</template>

<script setup>
	import {reactive,ref,onMounted} from "vue"
	const db=uniCloud.database()
	const props=defineProps({
		item:{
			type:Object,
			default:()=>{}
		}
	})
	const emits=defineEmits(['delSuccess'])
	const sheetList=reactive([
		{
			name: '发版', 
			value:'publish',
			fontSize: '40rpx',
			color: '#2979ff',
		},
		{
			name: '修改', 
			value:'edit',
			fontSize: '40rpx',
			color:'#f29100'		
		},
		{
			name: '删除',  
			value:'detele',
			color: '#fa3534', 
			fontSize: '40rpx',
			'font-weight': 600
		}
	])
	const sheetShow=ref(false)
	onMounted(()=>{
		if(props.item.article_status !==1){
			sheetList[0]['disabled']=true
		}
	}) 
	const optionSheet=(author)=>{
		const userInfo=uni.getStorageSync('uni-id-pages-userInfo')||{};
		if(userInfo._id==author._id){
			sheetShow.value=true
		}
	}
	const handleClose=()=>{
		sheetShow.value=false
	}
	const handleSelect=(e)=>{
		sheetShow.value=false
		console.log(e.value)
		if(e.value==='edit'){
			uni.navigateTo({
				url:'/blog-pages/edit-blog/edit-blog?_id='+props.item._id
			})
		}else if(e.value==='detele'){
			db.collection('blogs').where({
				'_id':props.item._id
			}).update({
				"article_status":0
			}).then(res=>{
				uni.showToast({
					title:'删除成功！'
				})
				emits('delSuccess',props.item._id)
			})
		}else{
			db.collection('blogs').where({
				'_id':props.item._id
			}).update({
				"article_status":2
			}).then(res=>{
				uni.showToast({
					title:'发布成功！'
				})
				// emits('publishSuccess',props.item._id)
			})
		}
	}
	// 调转到详情
	const handleItem=()=>{
		uni.navigateTo({
			url:'/blog-pages/detail-blog/detail-blog?_id='+props.item._id
		})
	}
	
</script>

<style scoped lang="scss">
.blog-item{
	padding: 0rpx 30rpx;
	.header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 70rpx;
		margin-bottom: 20rpx;
		&-left{
           display: flex;
		   align-items: center;
		   .user-name{
			   padding-left:15rpx;
			   padding-right: 20rpx;
		   }
		}
		&-right{
			.iconfont{
				font-size: 46rpx;
				padding: 10rpx;
			}
		}
	}
	.body{
		.title{
			font-size: 40rpx;
			font-weight: 700;
			color:$u-main-color;
		}
		.content{
			color: $u-content-color;
			margin: 20rpx 0px;
		}
		.img-list{
			display: flex;
			image{
				width: 223.33rpx;
				height: 223.33rpx;
				margin-right: 10rpx;
			}
			>image:last-child{
				margin-right: 0rpx;
				border-top-right-radius: 30rpx;
				border-bottom-right-radius: 30rpx;
			}
			>image:first-child{
				border-top-left-radius: 30rpx;
				border-bottom-left-radius: 30rpx;
			}
		}
	}
	.footer{
		display: flex;
		justify-content: space-around;
		margin: 20rpx 0px 30rpx;
		.iconfont{
			margin-right: 10rpx;
		}
		.active{
			color: $custom-dark-primary;
		}
	}
}
</style>