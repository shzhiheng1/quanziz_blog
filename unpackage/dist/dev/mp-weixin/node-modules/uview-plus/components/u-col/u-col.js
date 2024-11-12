"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-col",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$4],
  data() {
    return {
      width: 0,
      parentData: {
        gutter: 0
      },
      gridNum: 12
    };
  },
  //  微信小程序中 options 选项
  options: {
    virtualHost: true
    // 将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等
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
    colStyle() {
      const style = {
        // 这里写成"padding: 0 10px"的形式是因为nvue的需要
        paddingLeft: common_vendor.addUnit(common_vendor.getPx(this.parentData.gutter) / 2),
        paddingRight: common_vendor.addUnit(common_vendor.getPx(this.parentData.gutter) / 2),
        alignItems: this.uAlignItem,
        justifyContent: this.uJustify,
        textAlign: this.textAlign,
        // 在非nvue上，使用百分比形式
        flex: `0 0 ${100 / this.gridNum * this.span}%`,
        marginLeft: 100 / 12 * this.offset + "%"
      };
      return common_vendor.deepMerge(style, common_vendor.addStyle(this.customStyle));
    }
  },
  mounted() {
    this.init();
  },
  emits: ["click"],
  methods: {
    async init() {
      this.updateParentData();
      this.width = await this.parent.getComponentWidth();
    },
    updateParentData() {
      this.getParentData("u-row");
    },
    clickHandler(e) {
      this.$emit("click");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n("u-col-" + _ctx.span),
    b: common_vendor.s($options.colStyle),
    c: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3677f292"]]);
wx.createComponent(Component);
