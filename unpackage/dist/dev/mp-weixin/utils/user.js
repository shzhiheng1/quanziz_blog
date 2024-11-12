"use strict";
const common_vendor = require("../common/vendor.js");
const checkLogin = () => {
  const token = common_vendor.index.getStorageSync("uni_id_token");
  const tokenExpired = common_vendor.index.getStorageSync("uni_id_token_expired") || 0;
  const newDate = (/* @__PURE__ */ new Date()).getTime();
  console.log(tokenExpired, newDate);
  if (token && tokenExpired > newDate) {
    return true;
  } else {
    common_vendor.index.removeStorageSync("uni_id_token");
    common_vendor.index.removeStorageSync("uni_id_token_expired");
    common_vendor.index.removeStorageSync("uni-id-pages-userInfo");
    return false;
  }
};
exports.checkLogin = checkLogin;
