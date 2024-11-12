<template>
	<view class="home-tab">
		<view class="skeleton" v-show="loading">
			<up-skeleton
				    rows="4"
				    title
					loading
			></up-skeleton>
		</view>
		<view class="item" v-for="(item,index) in dataList" :key="item._id">
			<blog-item :item="item" @del-success="delSuccess"></blog-item>
			<up-gap height="2rpx" bgColor="#ddd" marginBottom="20rpx" v-if="dataList.length&&dataList.length-1 !== index"></up-gap>
		</view>
		<up-loadmore :status="loadStatus" v-if="!loading"></up-loadmore>
	</view>
</template>

<script setup>
	import {ref,onMounted} from 'vue'
	import {onReachBottom,onPullDownRefresh} from "@dcloudio/uni-app"
	const db=uniCloud.database();
    const dataList=ref([])
	const loading=ref(true)
	const pageNumber=ref(0)
	const pageSize=ref(10)
	const loadStatus=ref('loading')
	onMounted(()=>{
		handleData()
	})
	// 获取列表数据
	const handleData=()=>{
		const dbCmd = db.command;
		const blogTemp=db.collection('blogs').where({'article_status':dbCmd.neq(0),'user_id': db.getCloudEnv('$cloudEnv_uid')}).getTemp();
		const userTemp=db.collection('uni-id-users').field('_id, username, nickname, avatar_file').getTemp();
		const skipCount=pageNumber.value*pageSize.value
		db.collection(blogTemp,userTemp).orderBy('publish_date desc').skip(skipCount).limit(pageSize.value).get().then(res=>{
			dataList.value=[...dataList.value,...res.result.data]||[]
			if(res.result.data.length<10){
				loadStatus.value='nomore'
			}
		}).catch((err)=>{
			uni.showToast({
				title:'请求失败！',
				icon:'none'
			})
		}).finally(()=>{
			loading.value=false
			uni.stopPullDownRefresh()
		})
	}
	// 上拉加载
	onReachBottom(()=>{
		if(loadStatus.value==='nomore') return
		pageNumber.value++
		handleData()
	})
	// 下拉刷新
	onPullDownRefresh(()=>{
		pageNumber.value=0;
		dataList.value=[];
		loadStatus.value='loading';
		handleData()
	})
    const delSuccess=(e)=>{
    	dataList.value=dataList.value.filter(item=>item._id!==e)
    }
</script>

<style lang="scss" scoped>
.home-tab{
	
}
</style>