<script>
	import {checkLogin} from '@/utils/user.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			const isLogin=checkLogin();
			console.log('----是否登录----',isLogin)
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*引入uview-plus样式*/
	 @import "uview-plus/index.scss";
	 /*引入iconfont字体图标*/
	  @import "@/static/iconfont/iconfont.css";
	/*每个页面公共css */
	@import url("@/static/common/css/index.css");
	
	
</style>
