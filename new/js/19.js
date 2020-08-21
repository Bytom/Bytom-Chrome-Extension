// [AIV_SHORT]  Build version: 2.2.0 - Thursday, June 4th, 2020, 2:31:20 PM  
 webpackJsonp([19],{

/***/ 532:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(69);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),

/***/ 542:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_voteRegulation_vue__ = __webpack_require__(599);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5de440db_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_voteRegulation_vue__ = __webpack_require__(643);
function injectStyle (ssrContext) {
  __webpack_require__(641)
}
var normalizeComponent = __webpack_require__(266)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5de440db"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_voteRegulation_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5de440db_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_voteRegulation_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_constants__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(433);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  name: "",
  data: function data() {
    return {};
  },

  watch: {},
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
    src: function src() {
      if (this.language == "cn") {
        return "https://h5.bycoin.im:8080/zh/m/rules";
      } else if (this.language == "en") {
        return "https://h5.bycoin.im:8080/en/m/rules";
      }
      return "https://h5.bycoin.im:8080/en/m/rules";
    }
  }, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])(['language'])),
  methods: {
    close: function close() {
      this.$router.go(-1);
    }
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ 641:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(642);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(84)("1e5647e3", content, true, {});

/***/ }),

/***/ 642:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(83)(false);
// imports


// module
exports.push([module.i, ".header[data-v-5de440db]{display:flex}.header p[data-v-5de440db]{text-align:center;width:280px;padding-top:17px}.topbar-left .btn-menu i[data-v-5de440db]{font-size:100%}.transaction-title h3[data-v-5de440db]{font-size:16px;font-weight:inherit;padding:10px 0 10px 20px}#rules[data-v-5de440db]{height:500px;width:317px;padding:20px}.list-item-non[data-v-5de440db]{padding:10px 20px;display:flex;justify-content:space-between;position:relative;cursor:auto}.list-item-non[data-v-5de440db]:after{content:\"\";background:#e0e0e0;position:absolute;bottom:0;left:20px;height:1px;width:90%}.addr[data-v-5de440db]{font-size:12px}.no-record[data-v-5de440db]{display:block}", ""]);

// exports


/***/ }),

/***/ 643:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"warp-chlid bg-white"},[_c('section',{staticClass:"header bg-header"},[_c('i',{staticClass:"iconfont icon-back",on:{"click":_vm.close}}),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t('listVote.voteRules')))])]),_vm._v(" "),_c('section',[_c('iframe',{attrs:{"id":"rules","src":_vm.src}})])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=19.js.map 