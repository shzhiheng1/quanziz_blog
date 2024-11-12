"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_skeleton2 = common_vendor.resolveComponent("up-skeleton");
  const _easycom_blog_item2 = common_vendor.resolveComponent("blog-item");
  const _easycom_up_gap2 = common_vendor.resolveComponent("up-gap");
  const _easycom_up_loadmore2 = common_vendor.resolveComponent("up-loadmore");
  (_easycom_up_skeleton2 + _easycom_blog_item2 + _easycom_up_gap2 + _easycom_up_loadmore2)();
}
const _easycom_up_skeleton = () => "../../node-modules/uview-plus/components/u-skeleton/u-skeleton.js";
const _easycom_blog_item = () => "../../components/blog-item/blog-item.js";
const _easycom_up_gap = () => "../../node-modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_up_loadmore = () => "../../node-modules/uview-plus/components/u-loadmore/u-loadmore.js";
if (!Math) {
  (_easycom_up_skeleton + _easycom_blog_item + _easycom_up_gap + _easycom_up_loadmore)();
}
const _sfc_main = {
  __name: "TabMine",
  setup(__props) {
    const db = common_vendor.Vs.database();
    const dataList = common_vendor.ref([]);
    const loading = common_vendor.ref(true);
    const pageNumber = common_vendor.ref(0);
    const pageSize = common_vendor.ref(10);
    const loadStatus = common_vendor.ref("loading");
    common_vendor.onMounted(() => {
      handleData();
    });
    const handleData = () => {
      const dbCmd = db.command;
      const blogTemp = db.collection("blogs").where({ "article_status": dbCmd.neq(0), "user_id": db.getCloudEnv("$cloudEnv_uid") }).getTemp();
      const userTemp = db.collection("uni-id-users").field("_id, username, nickname, avatar_file").getTemp();
      const skipCount = pageNumber.value * pageSize.value;
      db.collection(blogTemp, userTemp).orderBy("publish_date desc").skip(skipCount).limit(pageSize.value).get().then((res) => {
        dataList.value = [...dataList.value, ...res.result.data];
        if (res.result.data.length < 10) {
          loadStatus.value = "nomore";
        }
      }).catch((err) => {
        common_vendor.index.showToast({
          title: "请求失败！",
          icon: "none"
        });
      }).finally(() => {
        loading.value = false;
        common_vendor.index.stopPullDownRefresh();
      });
    };
    common_vendor.onReachBottom(() => {
      if (loadStatus.value === "nomore")
        return;
      pageNumber.value++;
      handleData();
    });
    common_vendor.onPullDownRefresh(() => {
      pageNumber.value = 0;
      dataList.value = [];
      loadStatus.value = "loading";
      handleData();
    });
    const delSuccess = (e) => {
      dataList.value = dataList.value.filter((item) => item._id !== e);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          rows: "4",
          title: true,
          loading: true
        }),
        b: loading.value,
        c: common_vendor.f(dataList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.o(delSuccess, item._id),
            b: "9d5331d5-1-" + i0,
            c: common_vendor.p({
              item
            }),
            d: dataList.value.length && dataList.value.length - 1 !== index
          }, dataList.value.length && dataList.value.length - 1 !== index ? {
            e: "9d5331d5-2-" + i0,
            f: common_vendor.p({
              height: "2rpx",
              bgColor: "#ddd",
              marginBottom: "20rpx"
            })
          } : {}, {
            g: item._id
          });
        }),
        d: !loading.value
      }, !loading.value ? {
        e: common_vendor.p({
          status: loadStatus.value
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9d5331d5"]]);
wx.createComponent(Component);
