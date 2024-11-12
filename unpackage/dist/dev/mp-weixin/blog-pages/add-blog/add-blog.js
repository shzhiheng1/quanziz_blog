"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_up_col2 = common_vendor.resolveComponent("up-col");
  const _easycom_up_row2 = common_vendor.resolveComponent("up-row");
  (_easycom_up_button2 + _easycom_up_col2 + _easycom_up_row2)();
}
const _easycom_up_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_col = () => "../../node-modules/uview-plus/components/u-col/u-col.js";
const _easycom_up_row = () => "../../node-modules/uview-plus/components/u-row/u-row.js";
if (!Math) {
  (_easycom_up_button + _easycom_up_col + _easycom_up_row)();
}
const _sfc_main = {
  __name: "add-blog",
  setup(__props) {
    const db = common_vendor.Vs.database();
    const editorCtx = common_vendor.ref(null);
    const detail = common_vendor.ref({});
    const formData = common_vendor.reactive({
      title: "",
      content: ""
    });
    const instance = common_vendor.getCurrentInstance();
    const initReady = () => {
      common_vendor.index.createSelectorQuery().in(instance.proxy).select("#myeditor").fields({
        context: true,
        size: true,
        rect: true
      }, (res) => {
        console.log(res);
        editorCtx.value = res.context;
      }).exec();
    };
    const handleStatus = (e) => {
      detail.value = e.detail;
    };
    const handleInput = (e) => {
      var _a;
      formData.content = (_a = e.detail) == null ? void 0 : _a.html;
    };
    const handleIconfont = (prop, value = "") => {
      if (detail.value.hasOwnProperty(prop)) {
        editorCtx.value.format(prop, value || false);
      } else {
        editorCtx.value.format(prop, value || true);
      }
    };
    const iconActive = (prop, value) => {
      if (value) {
        return detail.value.hasOwnProperty(prop) && detail.value[prop] === value;
      } else {
        return !!detail.value.hasOwnProperty(prop);
      }
    };
    const handleDivider = () => {
      editorCtx.value.insertDivider();
    };
    const uploadPic = () => {
      common_vendor.index.chooseImage({
        success(res) {
          common_vendor.index.showLoading({
            title: "上传中...",
            mask: true
          });
          handleAllFiles(res.tempFiles).then((fileList) => {
            console.log("----fileList-----", fileList);
            common_vendor.index.showToast({
              title: "上传图片上传成功！",
              icon: "none"
            });
            fileList.forEach((item) => {
              editorCtx.value.insertImage({
                src: item.fileID,
                success: () => {
                  console.log("---成功插入到富文本中---");
                }
              });
            });
          }).catch((error) => {
            console.log("-------err---", error);
            common_vendor.index.showToast({
              title: "上传图片失败！",
              icon: "fail"
            });
          }).finally(() => {
            common_vendor.index.hideLoading();
          });
        }
      });
    };
    const onUploadFiles = async (file) => {
      return await common_vendor.Vs.uploadFile({
        filePath: file.path,
        cloudPath: (/* @__PURE__ */ new Date()).getTime() + "" + Math.floor(Math.random() * 1e3) + "." + file.path.split(".").pop()
      });
    };
    const handleAllFiles = (tempFiles) => {
      const allPromise = [];
      tempFiles.forEach((item) => {
        allPromise.push(onUploadFiles(item));
      });
      return Promise.all(allPromise);
    };
    const clear = () => {
      common_vendor.index.showModal({
        title: "清空编辑器",
        content: "确定清空编辑器全部内容？",
        success: (res) => {
          if (res.confirm) {
            editorCtx.value.clear({
              success: function(res2) {
                console.log("clear success");
              }
            });
          }
        }
      });
    };
    const handleSubmit = (type) => {
      if (!formData.title) {
        return common_vendor.index.showToast({
          title: "标题不能为空！",
          icon: "error"
        });
      }
      if (!formData.content) {
        return common_vendor.index.showToast({
          title: "内容不能为空！",
          icon: "error"
        });
      }
      const params = {
        ...formData,
        excerpt: utils_index.plainText(formData.content).substring(0, 200),
        images: utils_index.extractImages(formData.content).slice(0, 3) || []
      };
      if (type === "publish") {
        params["article_status"] = 2;
      }
      console.log(params);
      db.collection("blogs").add({
        ...params
      }).then((res) => {
        console.log("---res---", res);
        utils_index.reLaunchHome();
      }).catch((err) => {
        console.log(err);
        utils_index.operationFail();
      });
    };
    return (_ctx, _cache) => {
      return {
        a: formData.title,
        b: common_vendor.o(common_vendor.m(($event) => formData.title = $event.detail.value, {
          trim: true
        })),
        c: common_vendor.n(iconActive("bold") ? "icon-active" : ""),
        d: common_vendor.o(($event) => handleIconfont("bold")),
        e: common_vendor.n(iconActive("italic") ? "icon-active" : ""),
        f: common_vendor.o(($event) => handleIconfont("italic")),
        g: common_vendor.n(iconActive("underline") ? "icon-active" : ""),
        h: common_vendor.o(($event) => handleIconfont("underline")),
        i: common_vendor.n(iconActive("align", "left") ? "icon-active" : ""),
        j: common_vendor.o(($event) => handleIconfont("align", "left")),
        k: common_vendor.n(iconActive("align", "center") ? "icon-active" : ""),
        l: common_vendor.o(($event) => handleIconfont("align", "center")),
        m: common_vendor.n(iconActive("align", "right") ? "icon-active" : ""),
        n: common_vendor.o(($event) => handleIconfont("align", "right")),
        o: common_vendor.n(iconActive("strike") ? "icon-active" : ""),
        p: common_vendor.o(($event) => handleIconfont("strike")),
        q: common_vendor.n(iconActive("header") ? "icon-active" : ""),
        r: common_vendor.o(($event) => handleIconfont("header", "H2")),
        s: common_vendor.o(handleDivider),
        t: common_vendor.n(iconActive("indent", "+1") ? "icon-active" : ""),
        v: common_vendor.o(($event) => handleIconfont("indent", "+1")),
        w: common_vendor.o(uploadPic),
        x: common_vendor.o(clear),
        y: common_vendor.o(initReady),
        z: common_vendor.o(handleStatus),
        A: common_vendor.o(handleInput),
        B: common_vendor.o(($event) => handleSubmit("save")),
        C: common_vendor.p({
          type: "primary",
          text: "保存"
        }),
        D: common_vendor.p({
          span: 6
        }),
        E: common_vendor.o(($event) => handleSubmit("publish")),
        F: common_vendor.p({
          type: "success",
          text: "发布"
        }),
        G: common_vendor.p({
          span: 6
        }),
        H: common_vendor.p({
          gutter: "10"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2a48856f"]]);
wx.createPage(MiniProgramPage);
