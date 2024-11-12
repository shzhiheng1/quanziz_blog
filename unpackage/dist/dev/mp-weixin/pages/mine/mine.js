"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_user = require("../../utils/user.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  (_easycom_up_icon2 + _easycom_up_button2)();
}
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_button)();
}
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const isLogin = common_vendor.ref(false);
    const userInfo = common_vendor.ref({
      username: ""
    });
    common_vendor.onShow(() => {
      isLogin.value = utils_user.checkLogin();
      if (isLogin.value) {
        userInfo.value = common_vendor.index.getStorageSync("uni-id-pages-userInfo");
      }
    });
    const userAvatar = common_vendor.computed(() => {
      return userInfo.value.avatar_file ? userInfo.value.avatar_file.url : "/static/user_icon.png";
    });
    const handleLogin = () => {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
      });
    };
    const goUserInfo = () => {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo?showLoginManage=true"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !isLogin.value
      }, !isLogin.value ? {
        b: common_assets._imports_0,
        c: common_vendor.o(handleLogin)
      } : {
        d: userAvatar.value,
        e: common_vendor.o(goUserInfo)
      }, {
        f: isLogin.value
      }, isLogin.value ? {
        g: common_vendor.t(userInfo.value.nickname || userInfo.value.username)
      } : {
        h: common_vendor.p({
          name: "arrow-right-double",
          color: "#fff"
        }),
        i: common_vendor.o(handleLogin),
        j: common_vendor.p({
          type: "primary"
        })
      }, {
        k: isLogin.value
      }, isLogin.value ? {
        l: userAvatar.value
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"]]);
wx.createPage(MiniProgramPage);
