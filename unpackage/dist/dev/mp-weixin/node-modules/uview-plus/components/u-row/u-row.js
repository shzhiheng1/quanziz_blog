"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-row",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$5],
  data() {
    return {};
  },
  computed: {
    uJustify() {
      if (this.justify == "end" || this.justify == "start")
        return "flex-" + this.justify;
      else if (this.justify == "around" || this.justify == "between")
        return "space-" + this.justify;
      else
        return this.justify;
    },
    uAlignItem() {
      if (this.align == "top")
        return "flex-start";
      if (this.align == "bottom")
        return "flex-end";
      else
        return this.align;
    },
    rowStyle() {
      const style = {
        alignItems: this.uAlignItem,
        justifyContent: this.uJustify
      };
      if (this.gutter) {
        style.marginLeft = common_vendor.addUnit(-Number(this.gutter) / 2);
        style.marginRight = common_vendor.addUnit(-Number(this.gutter) / 2);
      }
      return common_vendor.deepMerge(style, common_vendor.addStyle(this.customStyle));
    }
  },
  emits: ["click"],
  methods: {
    clickHandler(e) {
      this.$emit("click");
    },
    async getComponentWidth() {
      await common_vendor.sleep();
      return new Promise((resolve) => {
        this.$uGetRect(".u-row").then((res) => {
          resolve(res.width);
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($options.rowStyle),
    b: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f8e42af4"]]);
wx.createComponent(Component);
