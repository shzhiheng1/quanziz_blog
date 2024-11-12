
// 判断是否登录
export const checkLogin=()=>{
	const token=uni.getStorageSync('uni_id_token');
	const tokenExpired=uni.getStorageSync('uni_id_token_expired')||0;
	const newDate=new Date().getTime();
	console.log(tokenExpired,newDate)
    if(token&&(tokenExpired>newDate)){
		return true
	}else{
		uni.removeStorageSync('uni_id_token')
		uni.removeStorageSync('uni_id_token_expired')
		uni.removeStorageSync('uni-id-pages-userInfo')
	    return false
	}
}