"use strict";
const common_vendor = require("../common/vendor.js");
const plainText = (richText) => {
  const text = richText.replace(/<[^>]*>/g, "");
  return text.trim();
};
function extractImages(htmlContent) {
  const imgRegex = /<img[^>]*src="?([^""]*)"?[^>]*>/g;
  const images = [];
  let match;
  while (match = imgRegex.exec(htmlContent)) {
    images.push(match[1]);
  }
  return images;
}
const reLaunchHome = (url = "/pages/index/index") => {
  common_vendor.index.showToast({
    title: "操作成功！",
    mask: true
  });
  setTimeout(() => {
    common_vendor.index.reLaunch({
      url
    });
  }, 1e3);
};
const operationFail = () => {
  common_vendor.index.showToast({
    title: "操作失败！",
    icon: "error",
    mask: true
  });
};
exports.extractImages = extractImages;
exports.operationFail = operationFail;
exports.plainText = plainText;
exports.reLaunchHome = reLaunchHome;
