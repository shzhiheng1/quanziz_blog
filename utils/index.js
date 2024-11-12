// 富文本中获取纯文本
export const plainText=(richText)=>{
	// 去除 HTML 标签，<[^>]*>来匹配所有的 HTML 标签
	    const text = richText.replace(/<[^>]*>/g, '');
		// 去除空格
	    return text.trim();
}
// 富文本中获取图片地址
export function extractImages(htmlContent) {
  const imgRegex = /<img[^>]*src="?([^""]*)"?[^>]*>/g;
  const images = [];
  let match;
 
  while ((match = imgRegex.exec(htmlContent))) {
    images.push(match[1]);
  }
 
  return images;
}
// 返回首页
export const reLaunchHome=(url='/pages/index/index')=>{
	uni.showToast({
		title:'操作成功！',
		mask:true
	})
	setTimeout(()=>{
		uni.reLaunch({
			url
		})
	},1000)
}
// 操作失败
export const operationFail=()=>{
	uni.showToast({
		title:'操作失败！',
		icon:'error',
		mask:true
	})
}