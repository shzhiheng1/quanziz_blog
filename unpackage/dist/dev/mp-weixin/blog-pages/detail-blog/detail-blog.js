"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_skeleton2 = common_vendor.resolveComponent("up-skeleton");
  const _easycom_up_avatar2 = common_vendor.resolveComponent("up-avatar");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_up_parse2 = common_vendor.resolveComponent("up-parse");
  (_easycom_up_skeleton2 + _easycom_up_avatar2 + _easycom_uni_dateformat2 + _easycom_up_parse2)();
}
const _easycom_up_skeleton = () => "../../node-modules/uview-plus/components/u-skeleton/u-skeleton.js";
const _easycom_up_avatar = () => "../../node-modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_up_parse = () => "../../node-modules/uview-plus/components/u-parse/u-parse.js";
if (!Math) {
  (_easycom_up_skeleton + _easycom_up_avatar + _easycom_uni_dateformat + _easycom_up_parse)();
}
const _sfc_main = {
  __name: "detail-blog",
  setup(__props) {
    const db = common_vendor.Vs.database();
    const blog_id = common_vendor.ref("");
    const authorInfo = common_vendor.ref({});
    const blogInfo = common_vendor.ref({
      content: "",
      title: "",
      publish_date: "",
      publish_ip: ""
    });
    const loading = common_vendor.ref(true);
    const isLike = common_vendor.ref(false);
    common_vendor.onLoad((options) => {
      blog_id.value = options._id;
      getInfoData();
    });
    const getInfoData = () => {
      const blogTemp = db.collection("blogs").getTemp();
      const userTemp = db.collection("uni-id-users").field("_id, username, nickname, avatar_file").getTemp();
      db.collection(blogTemp, userTemp).where({
        "_id": blog_id.value
      }).get({
        getOne: true
      }).then((res) => {
        const { errCode, errMsg, data } = res.result;
        if (errCode !== 0)
          return common_vendor.index.showToast({ title: errMsg, icon: "none" });
        blogInfo.value = data;
        authorInfo.value = data.user_id[0];
        common_vendor.index.setNavigationBarTitle({
          title: data.title
        });
        updateBlog("view");
        handleIsLike();
      }).finally(() => {
        loading.value = false;
      });
    };
    const handleIsLike = () => {
      db.collection("blog-like").where({
        user_id: db.getCloudEnv("$cloudEnv_uid"),
        blog_id: blog_id.value
      }).get().then((res) => {
        const { data, errCode, errMsg } = res.result;
        if (data.length > 0) {
          isLike.value = true;
        }
      }).catch((err) => {
        console.log("--err--", err);
      });
    };
    const handleLike = () => {
      if (isLike.value) {
        db.collection("blog-like").where({
          user_id: db.getCloudEnv("$cloudEnv_uid"),
          blog_id: blog_id.value
        }).remove().then(() => {
          updateBlog("like", "subtract");
          isLike.value = false;
        });
      } else {
        db.collection("blog-like").add({
          user_id: db.getCloudEnv("$cloudEnv_uid"),
          blog_id: blog_id.value
        }).then(() => {
          updateBlog("like", "add");
          isLike.value = true;
        });
      }
    };
    const updateBlog = (attr, type = "") => {
      if (attr === "like") {
        const likeCount = type === "add" ? (blogInfo.value.like_count || 0) + 1 : blogInfo.value.like_count - 1;
        db.collection("blogs").where({
          _id: blog_id.value
        }).update({ "like_count": likeCount }).then((res) => {
          blogInfo.value.like_count = likeCount;
        });
      }
      if (attr === "view") {
        const viewCount = blogInfo.value.view_count + 1;
        db.collection("blogs").where({
          _id: blog_id.value
        }).update({ "view_count": viewCount }).then(() => {
          console.log("----访问量增加-----", viewCount);
        });
      }
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: common_vendor.p({
          rows: "5",
          title: true,
          loading: loading.value
        }),
        b: common_vendor.t(blogInfo.value.title),
        c: !loading.value
      }, !loading.value ? common_vendor.e({
        d: common_vendor.p({
          src: ((_b = (_a = authorInfo.value) == null ? void 0 : _a.avatar_file) == null ? void 0 : _b.url) || "../../static/user_icon.png"
        }),
        e: common_vendor.t(authorInfo.value.nickname || authorInfo.value.username || "匿名用户"),
        f: common_vendor.p({
          date: blogInfo.value.publish_date
        }),
        g: common_vendor.p({
          content: blogInfo.value.content
        }),
        h: isLike.value
      }, isLike.value ? {} : {}, {
        i: common_vendor.o(handleLike),
        j: common_vendor.t(blogInfo.value.like_count)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c572eca4"]]);
wx.createPage(MiniProgramPage);
