"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_avatar2 = common_vendor.resolveComponent("up-avatar");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_up_action_sheet2 = common_vendor.resolveComponent("up-action-sheet");
  (_easycom_up_avatar2 + _easycom_uni_dateformat2 + _easycom_up_action_sheet2)();
}
const _easycom_up_avatar = () => "../../node-modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_up_action_sheet = () => "../../node-modules/uview-plus/components/u-action-sheet/u-action-sheet.js";
if (!Math) {
  (_easycom_up_avatar + _easycom_uni_dateformat + _easycom_up_action_sheet)();
}
const _sfc_main = {
  __name: "blog-item",
  props: {
    item: {
      type: Object,
      default: () => {
      }
    }
  },
  emits: ["delSuccess"],
  setup(__props, { emit: __emit }) {
    const db = common_vendor.Vs.database();
    const props = __props;
    const emits = __emit;
    const sheetList = common_vendor.reactive([
      {
        name: "发版",
        value: "publish",
        fontSize: "40rpx",
        color: "#2979ff"
      },
      {
        name: "修改",
        value: "edit",
        fontSize: "40rpx",
        color: "#f29100"
      },
      {
        name: "删除",
        value: "detele",
        color: "#fa3534",
        fontSize: "40rpx",
        "font-weight": 600
      }
    ]);
    const sheetShow = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      if (props.item.article_status !== 1) {
        sheetList[0]["disabled"] = true;
      }
    });
    const optionSheet = (author) => {
      const userInfo = common_vendor.index.getStorageSync("uni-id-pages-userInfo") || {};
      if (userInfo._id == author._id) {
        sheetShow.value = true;
      }
    };
    const handleClose = () => {
      sheetShow.value = false;
    };
    const handleSelect = (e) => {
      sheetShow.value = false;
      console.log(e.value);
      if (e.value === "edit") {
        common_vendor.index.navigateTo({
          url: "/blog-pages/edit-blog/edit-blog?_id=" + props.item._id
        });
      } else if (e.value === "detele") {
        db.collection("blogs").where({
          "_id": props.item._id
        }).update({
          "article_status": 0
        }).then((res) => {
          common_vendor.index.showToast({
            title: "删除成功！"
          });
          emits("delSuccess", props.item._id);
        });
      } else {
        db.collection("blogs").where({
          "_id": props.item._id
        }).update({
          "article_status": 2
        }).then((res) => {
          common_vendor.index.showToast({
            title: "发布成功！"
          });
        });
      }
    };
    const handleItem = () => {
      common_vendor.index.navigateTo({
        url: "/blog-pages/detail-blog/detail-blog?_id=" + props.item._id
      });
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return {
        a: common_vendor.p({
          src: ((_b = (_a = __props.item.user_id[0]) == null ? void 0 : _a.avatar_file) == null ? void 0 : _b.url) || "/static/user_icon.png",
          shape: "circle",
          size: "18"
        }),
        b: common_vendor.t(__props.item.user_id[0].nickname || __props.item.user_id[0].username || "匿名用户"),
        c: common_vendor.p({
          date: __props.item.publish_date,
          format: "yyyy年MM月dd日",
          threshold: [6e4, 36e5 * 24 * 30]
        }),
        d: common_vendor.o(($event) => optionSheet(__props.item.user_id[0])),
        e: common_vendor.t(__props.item.title),
        f: common_vendor.t(__props.item.excerpt),
        g: common_vendor.f(__props.item.images, (url, k0, i0) => {
          return {
            a: url,
            b: url
          };
        }),
        h: common_vendor.t(__props.item.view_count || 0),
        i: common_vendor.t(__props.item.like_count || 0),
        j: common_vendor.t(__props.item.comment_count || 0),
        k: common_vendor.o(handleItem),
        l: common_vendor.o(handleClose),
        m: common_vendor.o(handleSelect),
        n: common_vendor.p({
          actions: sheetList,
          show: sheetShow.value,
          ["cancel-text"]: "取消",
          closeOnClickOverlay: false
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ed6c1afa"]]);
wx.createComponent(Component);
