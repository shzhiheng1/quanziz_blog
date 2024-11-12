"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_user = require("../../utils/user.js");
if (!Array) {
  const _easycom_up_tabs2 = common_vendor.resolveComponent("up-tabs");
  const _easycom_up_sticky2 = common_vendor.resolveComponent("up-sticky");
  (_easycom_up_tabs2 + _easycom_up_sticky2)();
}
const _easycom_up_tabs = () => "../../node-modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_up_sticky = () => "../../node-modules/uview-plus/components/u-sticky/u-sticky.js";
if (!Math) {
  (_easycom_up_tabs + _easycom_up_sticky + TabNews + TabMine)();
}
const TabNews = () => "./TabNews.js";
const TabMine = () => "./TabMine.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const tabsList = common_vendor.reactive([
      { name: "最新", value: "new" },
      { name: "我的", value: "mine" }
    ]);
    const current = common_vendor.ref(0);
    common_vendor.ref([]);
    common_vendor.onShow(() => {
      if (current.value === 1) {
        toLogin();
      }
    });
    const tabsChange = (e) => {
      if (current.value === 1) {
        toLogin();
      }
    };
    const toLogin = () => {
      const isLogin = utils_user.checkLogin();
      if (!isLogin) {
        common_vendor.index.redirectTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
        });
      }
    };
    const handleAdd = () => {
      common_vendor.index.navigateTo({
        url: "/blog-pages/add-blog/add-blog"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(tabsChange),
        b: common_vendor.o(($event) => current.value = $event),
        c: common_vendor.p({
          list: tabsList,
          lineWidth: "30",
          activeStyle: {
            color: "#303133",
            fontWeight: "bold",
            transform: "scale(1.1)"
          },
          inactiveStyle: {
            color: "#606266",
            transform: "scale(1)"
          },
          current: current.value
        }),
        d: current.value === 0,
        e: current.value === 1
      }, current.value === 1 ? {} : {}, {
        f: common_vendor.o(handleAdd)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
