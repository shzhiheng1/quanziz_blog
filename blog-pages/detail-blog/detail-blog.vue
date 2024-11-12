<template>
	<view class="detail">
		<up-skeleton
			    rows="5"
			    title
				:loading="loading"
			></up-skeleton>
		<view class="title">{{blogInfo.title}}</view>
		<template v-if="!loading">
			<view class="user" >
				<view class="user-avatar">
					<up-avatar :src="authorInfo?.avatar_file?.url||'../../static/user_icon.png'"></up-avatar>
				</view>
				<view class="user-info">
					<view class="user-info-name">{{authorInfo.nickname||authorInfo.username||'匿名用户'}}</view>
					<view class="user-info-date"><uni-dateformat :date="blogInfo.publish_date"></uni-dateformat></view>
				</view>
				
			</view>
			<view class="content">
				<up-parse :content="blogInfo.content"></up-parse>
			</view>
			<view class="like">
				<view class="like-dianzan active" @click="handleLike">
					<text class="iconfont icon-dianzan1"  v-if="isLike"></text>
					<text class="iconfont icon-dianzan" v-else></text>
				</view>
				<view class="like-count active">{{blogInfo.like_count}}</view>
			</view>
		</template>
	</view>
</template>

<script setup>
	import {ref} from "vue"
	import {onLoad} from "@dcloudio/uni-app"
	
	const db=uniCloud.database();
	const blog_id=ref('')
	const authorInfo=ref({})
	const blogInfo=ref({
		content:'',
		title:'',
		publish_date:'',
		publish_ip:''
	})
	const loading=ref(true)
	const isLike=ref(false)//点赞/取消
	onLoad((options)=>{
		blog_id.value=options._id
		getInfoData()
	})
	// 获取文章详情
	const getInfoData=()=>{
		const blogTemp=db.collection('blogs').getTemp();
		const userTemp=db.collection('uni-id-users').field('_id, username, nickname, avatar_file').getTemp();
		db.collection(blogTemp,userTemp).where({
			'_id':blog_id.value
		}).get({
			getOne:true
		}).then(res=>{
			const {errCode,errMsg,data}=res.result;
			if(errCode!==0) return uni.showToast({title:errMsg,icon:'none'})
			blogInfo.value=data
			authorInfo.value=data.user_id[0]
			uni.setNavigationBarTitle({
				title:data.title
			})
			updateBlog('view')
			handleIsLike()
		}).finally(()=>{
			loading.value=false
		}) 
	}
	// 查看是否已经点过赞
	const handleIsLike=()=>{
		db.collection('blog-like').where({
			user_id:db.getCloudEnv('$cloudEnv_uid'),
			blog_id:blog_id.value
		}).get().then((res)=>{
			const {data,errCode,errMsg}=res.result
			if(data.length>0){
				isLike.value=true
			}
		}).catch(err=>{
			console.log('--err--',err)
		})
	}
	// 点赞与取消点赞
	const handleLike=()=>{
		if(isLike.value){
			db.collection('blog-like').where({
				user_id:db.getCloudEnv('$cloudEnv_uid'),
				blog_id:blog_id.value
			}).remove().then(()=>{
				updateBlog('like','subtract')
				isLike.value=false
			})
			
		}else{
			db.collection('blog-like').add({
				user_id:db.getCloudEnv('$cloudEnv_uid'),
				blog_id:blog_id.value
			}).then(()=>{
				updateBlog('like','add')
				isLike.value=true
			})
		}
	}
	const updateBlog=(attr,type='')=>{
		if(attr==='like'){
			const likeCount=type==='add'?(blogInfo.value.like_count||0)+1:blogInfo.value.like_count-1;
			db.collection('blogs').where({
				_id:blog_id.value
			}).update({'like_count':likeCount}).then((res)=>{
				blogInfo.value.like_count=likeCount
			})
		}
		if(attr==='view'){
			const viewCount=blogInfo.value.view_count+1;
			db.collection('blogs').where({
				_id:blog_id.value
			}).update({'view_count':viewCount}).then(()=>{
				console.log('----访问量增加-----',viewCount)
			})
		}
	}
	
</script>

<style scoped lang="scss">
	.detail{
		padding: 30rpx;
		.title{
			font-size: 40rpx;
			font-weight: bold;
			text-align: center;
			margin-bottom: 30rpx;
		}
		.user{
			display: flex;
			margin-bottom: 30rpx;
			&-avatar{
				margin-right: 30rpx;
			}
			&-info{
				font-size: 30rpx;
				&-name{
					font-weight: bold;
				}
				&-date{
					color: #999;
					font-size: 28rpx;
				}
			}
		}
		.like{
			margin: 30rpx 0rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			&-dianzan{
				color: #999;
				>text{
					font-size: 80rpx;
				}
			}
			.active{
				color: $uni-color-primary;
			}
		}
	}
</style>
