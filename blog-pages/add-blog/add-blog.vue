<template>
	<view class="add-blog">
		<view class="container">
			<view class="title">
				<input placeholder="请输入标题..." v-model.trim="formData.title"/>
			</view>
			<view class="content">
				<view class="toolbar">
						<view  class="iconfont icon-zitijiacu" :class="iconActive('bold')?'icon-active':''" @tap="handleIconfont('bold')"></view>
						<view  class="iconfont icon-zitixieti"  :class="iconActive('italic')?'icon-active':''" @tap="handleIconfont('italic')"></view>
						<view  class="iconfont icon-zitixiahuaxian" :class="iconActive('underline')?'icon-active':''" @tap="handleIconfont('underline')"></view>
						<view  class="iconfont icon-zitizuoduiqi" :class="iconActive('align','left')?'icon-active':''" @tap="handleIconfont('align','left')"></view>
						<view  class="iconfont icon-juzhongduiqi" :class="iconActive('align','center')?'icon-active':''" @tap="handleIconfont('align','center')"></view>
						<view  class="iconfont icon-zitiyouduiqi" :class="iconActive('align','right')?'icon-active':''" @tap="handleIconfont('align','right')"></view>
						<view  class="iconfont icon-zitishanchuxian" :class="iconActive('strike')?'icon-active':''" @tap="handleIconfont('strike')"></view>
						<view  class="iconfont icon-h" :class="iconActive('header')?'icon-active':''" @tap="handleIconfont('header','H2')"></view>
						<view  class="iconfont icon-fengexian" @tap="handleDivider"></view>
						<view  class="iconfont icon-yousuojin" :class="iconActive('indent','+1')?'icon-active':''" @tap="handleIconfont('indent','+1')"></view>
						<view  class="iconfont icon-tupian" @tap="uploadPic"></view>
						<view  class="iconfont icon-shanchu1" @tap="clear" ></view>
				</view>
				<view class="editor">
					<editor id="myeditor" placeholder="开始输入..." show-img-size show-img-toolbar show-img-resize 
					 @ready="initReady"
					 @statuschange="handleStatus"
					 @input="handleInput"
					 ></editor>
				</view>
				<up-row gutter="10">
					<up-col :span="6">
						<up-button type="primary" text="保存" @click="handleSubmit('save')"></up-button>
					</up-col>
					<up-col :span="6">
						<up-button type="success" text="发布" @click="handleSubmit('publish')"></up-button>
					</up-col>
				</up-row>	
			</view>
		</view>	
	</view>
</template>

<script setup>
	import {onReady} from "@dcloudio/uni-app";
	import {ref,getCurrentInstance, reactive} from "vue";
	import {plainText,reLaunchHome,operationFail,extractImages} from '@/utils/index.js'
	const db=uniCloud.database();
	// 富文本的上下文
	const editorCtx=ref(null);
	// 工具栏对象
	const detail=ref({});
	// 表单
	const formData=reactive({
		title:'',
		content:''
	})
	// 当前实例
	const instance=getCurrentInstance();
	// 富文本初始化
	const initReady=()=>{
		uni.createSelectorQuery().in(instance.proxy).select('#myeditor').fields({
			context:true,
			size:true,
			rect:true
		},res=>{
			console.log(res)
			editorCtx.value=res.context
		}).exec()
	}
	// 状态改变
    const handleStatus=(e)=>{
		// console.log('------status----',e)
		detail.value=e.detail
	}
	// 输入内容
	const handleInput=(e)=>{
		// console.log('----input-----',e)
		formData.content=e.detail?.html
	}
	// 切换
	const handleIconfont=(prop,value='')=>{
		if (detail.value.hasOwnProperty(prop)) {
			// 有参数值设置为值，没有设置为false
			editorCtx.value.format(prop,value||false)
		} else {
			// 有参数值设置为值，没有设置为true
			editorCtx.value.format(prop,value||true)
		}
	}
	// iconfont颜色
	const iconActive=(prop,value)=>{
		if(value){
			return detail.value.hasOwnProperty(prop)&&detail.value[prop]===value
		}else{
			return !!detail.value.hasOwnProperty(prop)
		}
		
	}
	// 分割线
	const handleDivider=()=>{
		editorCtx.value.insertDivider()
	}
    // 上传图片
	const uploadPic=()=>{
		uni.chooseImage({
			success(res) {
				uni.showLoading({
					title:'上传中...',
					mask:true
				})
				handleAllFiles(res.tempFiles).then(fileList=>{
					console.log('----fileList-----',fileList)
                    uni.showToast({
						title:'上传图片上传成功！',
						icon:'none'
					})
					fileList.forEach(item=>{
						editorCtx.value.insertImage({
							src:item.fileID,
							success:()=>{
								console.log('---成功插入到富文本中---')
							}
						})
					})
				}).catch(error=>{
					console.log('-------err---',error)
					uni.showToast({
						title:'上传图片失败！',
						icon:"fail"
					})
				}).finally(()=>{
					uni.hideLoading()
				})
			}
		})
	}
	// 上传图片方法
	const onUploadFiles=async (file)=>{
		// #ifdef H5
		   return await uniCloud.uploadFile({
					filePath:file.path,
					cloudPath:file.name
				})
		// #endif
		// #ifndef H5
		        return await uniCloud.uploadFile({
					filePath:file.path,
					cloudPath:new Date().getTime()+''+Math.floor(Math.random()*1000)+'.'+ file.path.split('.').pop()
				})
		// #endif
		
	}
	// Promise.all上传全部图片
	const handleAllFiles=(tempFiles)=>{
		const allPromise=[];
		tempFiles.forEach(item=>{
			allPromise.push(onUploadFiles(item))
		})
		return Promise.all(allPromise)
	}
	// 删除
	const clear=()=> {
		uni.showModal({
			title: '清空编辑器',
			content: '确定清空编辑器全部内容？',
			success: res => {
				if (res.confirm) {
					editorCtx.value.clear({
						success: function(res) {
							console.log("clear success")
						}
					})
				}
			}
		})
	}
	// 保存或发布
	const handleSubmit= (type)=>{
		if(!formData.title){
		   return uni.showToast({
		   	   title:'标题不能为空！',
			   icon:'error'
		   })
		}
		if(!formData.content){
		   return uni.showToast({
		   	   title:'内容不能为空！',
			   icon:'error'
		   })
		}
		const params={
			...formData,
			excerpt:plainText(formData.content).substring(0,200),
			images:extractImages(formData.content).slice(0,3)||[]
		}
		if(type==='publish'){
		   params['article_status']=2
		}
		console.log(params)
	    db.collection('blogs').add({
			...params
		}).then(res=>{
			console.log('---res---',res)
			reLaunchHome()
		}).catch((err)=>{
			console.log(err)
			operationFail()
		})
	}
</script>

<style scoped lang="scss">
	.add-blog{
		.container{
			padding: 30rpx;
			.title{
				input{
					border-bottom: 1rpx solid #ccc;
					padding: 12rpx 0rpx;
				}
			}
			.content{
				margin-top: 20rpx;
				
				.toolbar{
					height: 160rpx;
					overflow-y: auto;
					background-color: #f3f3f3;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					
					.iconfont{
						font-size: 50rpx;
						width: 110rpx;
						text-align: center;
					}
					.icon-active{
						// font-size: 60rpx;
						color: $custom-dark-primary;
						font-weight: 600;
					}
				}
				.editor{
				   margin: 30rpx 0rpx;
				   height: calc(100vh - 540rpx);
				   border-bottom: 1rpx solid #ccc;
				   #myeditor{
					   height: 100%;
				   }
				   
				}
			}
		}
	}
</style>
