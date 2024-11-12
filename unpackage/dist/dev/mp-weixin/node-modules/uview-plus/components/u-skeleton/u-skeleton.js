"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-skeleton",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$6],
  data() {
    return {
      width: 0
    };
  },
  watch: {
    loading() {
      this.getComponentWidth();
    }
  },
  computed: {
    rowsArray() {
      if (/%$/.test(this.rowsHeight)) {
        common_vendor.error("rowsHeight参数不支持百分比单位");
      }
      const rows = [];
      for (let i = 0; i < this.rows; i++) {
        let item = {}, rowWidth = common_vendor.test.array(this.rowsWidth) ? this.rowsWidth[i] || (i === this.rows - 1 ? "70%" : "100%") : i === this.rows - 1 ? "70%" : this.rowsWidth, rowHeight = common_vendor.test.array(this.rowsHeight) ? this.rowsHeight[i] || "18px" : this.rowsHeight;
        item.marginTop = !this.title && i === 0 ? 0 : this.title && i === 0 ? "20px" : "12px";
        if (/%$/.test(rowWidth)) {
          item.width = common_vendor.addUnit(this.width * parseInt(rowWidth) / 100);
        } else {
          item.width = common_vendor.addUnit(rowWidth);
        }
        item.height = common_vendor.addUnit(rowHeight);
        rows.push(item);
      }
      return rows;
    },
    uTitleWidth() {
      let tWidth = 0;
      if (/%$/.test(this.titleWidth)) {
        tWidth = common_vendor.addUnit(this.width * parseInt(this.titleWidth) / 100);
      } else {
        tWidth = common_vendor.addUnit(this.titleWidth);
      }
      return common_vendor.addUnit(tWidth);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    addUnit: common_vendor.addUnit,
    init() {
      this.getComponentWidth();
    },
    async setNvueAnimation() {
    },
    // 获取组件的宽度
    async getComponentWidth() {
      await common_vendor.sleep(20);
      this.$uGetRect(".u-skeleton__wrapper__content").then((size) => {
        this.width = size.width;
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.loading
  }, _ctx.loading ? common_vendor.e({
    b: _ctx.avatar
  }, _ctx.avatar ? {
    c: common_vendor.n(`u-skeleton__wrapper__avatar--${_ctx.avatarShape}`),
    d: common_vendor.n(_ctx.animate && "animate"),
    e: $options.addUnit(_ctx.avatarSize),
    f: $options.addUnit(_ctx.avatarSize)
  } : {}, {
    g: _ctx.title
  }, _ctx.title ? {
    h: $options.uTitleWidth,
    i: $options.addUnit(_ctx.titleHeight),
    j: common_vendor.n(_ctx.animate && "animate")
  } : {}, {
    k: common_vendor.f($options.rowsArray, (item, index, i0) => {
      return {
        a: index,
        b: item.width,
        c: item.height,
        d: item.marginTop
      };
    }),
    l: common_vendor.n(_ctx.animate && "animate")
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b05d3c87"]]);
wx.createComponent(Component);
