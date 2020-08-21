// [AIV_SHORT]  Build version: 2.2.0 - Thursday, June 4th, 2020, 2:31:20 PM  
 webpackJsonp([14],{

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

/***/ 552:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_transferDetail_vue__ = __webpack_require__(609);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f5db2e8_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_transferDetail_vue__ = __webpack_require__(681);
function injectStyle (ssrContext) {
  __webpack_require__(676)
}
var normalizeComponent = __webpack_require__(266)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7f5db2e8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_transferDetail_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f5db2e8_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_transferDetail_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(433);

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
    return {
      selfAddress: "",
      transaction: {
        guid: "",
        to: "",
        amount: 0,
        fee: ""
      }
    };
  },

  methods: {},
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
    classObject: function classObject() {
      return {
        'success-header': this.transaction.status && this.transaction.hasOwnProperty('blockTimestamp'),
        'pending-header': this.transaction.status && !this.transaction.hasOwnProperty('blockTimestamp'),
        'fail-header': !this.transaction.status
      };
    }
  }, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["d" /* mapState */])(['currentAsset', 'listVote']), Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["c" /* mapGetters */])(['currentAccount', 'netType'])),
  mounted: function mounted() {
    var params = this.$route.params;

    var transaction = params.transaction;
    if (this.netType === 'vapor') {
      this.selfAddress = this.currentAccount.vpAddress;
    } else {
      this.selfAddress = this.currentAccount.address;
    }
    console.log(params.transaction);
    if (transaction.type == 'vote' || transaction.type == 'veto') {
      var node = _.find(this.listVote, { pubKey: transaction.pubkey });
      transaction.vName = node.name;
    }
    this.transaction = transaction;
  }
});

/***/ }),

/***/ 676:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(677);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(84)("0ce39000", content, true, {});

/***/ }),

/***/ 677:
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(283);
exports = module.exports = __webpack_require__(83)(false);
// imports


// module
exports.push([module.i, ".header[data-v-7f5db2e8]{display:flex}.header p[data-v-7f5db2e8]{text-align:center;width:280px;padding-top:17px}.preview i[data-v-7f5db2e8]{width:100px;margin:0 auto;display:block;width:45px;font-size:45px;margin-bottom:25px}.preview .value[data-v-7f5db2e8]{font-size:30px;width:300px;margin:0 auto;text-align:center}.preview .value span[data-v-7f5db2e8]{font-size:18px}.title[data-v-7f5db2e8]{font-size:18px;font-weight:inherit;color:#cacaca;text-align:center;padding:5px 0}.transaction[data-v-7f5db2e8]{padding:0 20px;font-size:14px;word-break:break-all;height:380px;width:275px;margin-top:20px}.transaction .label[data-v-7f5db2e8]{width:35%;vertical-align:top;word-break:break-word}.transaction .value[data-v-7f5db2e8]{width:65%;color:#282828;font-weight:500;word-break:break-word}.panel[data-v-7f5db2e8]{padding:0}.tx-header[data-v-7f5db2e8]{height:40px;width:280px;text-align:center;padding:20px}.tx-header .value[data-v-7f5db2e8]{color:#fff;font-size:18px;font-weight:500}.success-header[data-v-7f5db2e8]{background-image:url(" + escape(__webpack_require__(678)) + ");background-size:320px 80px}.pending-header[data-v-7f5db2e8]{background-image:url(" + escape(__webpack_require__(679)) + ");background-size:320px 80px}.fail-header[data-v-7f5db2e8]{background-image:url(" + escape(__webpack_require__(680)) + ");background-size:320px 80px}.header-text[data-v-7f5db2e8]{color:hsla(0,0%,100%,.5)}.asset[data-v-7f5db2e8]{text-transform:uppercase}.divider[data-v-7f5db2e8]{margin:10px 0}.footer[data-v-7f5db2e8]{text-align:center;position:absolute;bottom:10px;width:100%;font-size:12px}", ""]);

// exports


/***/ }),

/***/ 678:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMzIwIDgwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiB1cmwoI2xpbmVhci1ncmFkaWVudCk7CiAgICAgIH0KCiAgICAgIC5jbHMtMiB7CiAgICAgICAgZmlsbDogIzAzNWJkNDsKICAgICAgfQoKICAgICAgLmNscy0zIHsKICAgICAgICBvcGFjaXR5OiAwLjM3MjsKICAgICAgICBjbGlwLXBhdGg6IHVybCgjY2xpcC1wYXRoKTsKICAgICAgfQoKICAgICAgLmNscy00IHsKICAgICAgICBmaWxsOiAjNDI3ZmQzOwogICAgICB9CiAgICA8L3N0eWxlPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQiIHkxPSIxIiB4Mj0iMSIgZ3JhZGllbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMzViZDQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjM2NmZmRhIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGNsaXBQYXRoIGlkPSJjbGlwLXBhdGgiPgogICAgICA8cGF0aCBpZD0iUmVjdGFuZ2xlXzUzMDciIGRhdGEtbmFtZT0iUmVjdGFuZ2xlIDUzMDciIGNsYXNzPSJjbHMtMSIgZD0iTTQsMEgzMTZhNCw0LDAsMCwxLDQsNFY4MGEwLDAsMCwwLDEsMCwwSDBhMCwwLDAsMCwxLDAsMFY0QTQsNCwwLDAsMSw0LDBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMCAyMCkiLz4KICAgIDwvY2xpcFBhdGg+CiAgPC9kZWZzPgogIDxnIGlkPSJiYWNrZ3JvdW5kLWhlYWQtc3VjY2VlZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwIC0yMCkiPgogICAgPHBhdGggaWQ9IlJlY3RhbmdsZV81MzA4IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSA1MzA4IiBjbGFzcz0iY2xzLTIiIGQ9Ik00LDBIMzE2YTQsNCwwLDAsMSw0LDRWODBhMCwwLDAsMCwxLDAsMEgwYTAsMCwwLDAsMSwwLDBWNEE0LDQsMCwwLDEsNCwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAgMjApIi8+CiAgICA8ZyBpZD0iTWFza19Hcm91cF8xMDciIGRhdGEtbmFtZT0iTWFzayBHcm91cCAxMDciIGNsYXNzPSJjbHMtMyI+CiAgICAgIDxlbGxpcHNlIGlkPSJFbGxpcHNlXzEzMCIgZGF0YS1uYW1lPSJFbGxpcHNlIDEzMCIgY2xhc3M9ImNscy00IiBjeD0iMjA0LjUiIGN5PSIxNTEuNDgxIiByeD0iMjA0LjUiIHJ5PSIxNTEuNDgxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODQgLTE2OC40NjYpIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"

/***/ }),

/***/ 679:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMzIwIDgwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiB1cmwoI2xpbmVhci1ncmFkaWVudCk7CiAgICAgIH0KCiAgICAgIC5jbHMtMiB7CiAgICAgICAgZmlsbDogI2Y0OGQwMDsKICAgICAgfQoKICAgICAgLmNscy0zIHsKICAgICAgICBvcGFjaXR5OiAwLjM3MjsKICAgICAgICBjbGlwLXBhdGg6IHVybCgjY2xpcC1wYXRoKTsKICAgICAgfQoKICAgICAgLmNscy00IHsKICAgICAgICBmaWxsOiAjZjVhYTQyOwogICAgICB9CiAgICA8L3N0eWxlPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQiIHkxPSIxIiB4Mj0iMSIgZ3JhZGllbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMzViZDQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjM2NmZmRhIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGNsaXBQYXRoIGlkPSJjbGlwLXBhdGgiPgogICAgICA8cGF0aCBpZD0iUmVjdGFuZ2xlXzUzMDciIGRhdGEtbmFtZT0iUmVjdGFuZ2xlIDUzMDciIGNsYXNzPSJjbHMtMSIgZD0iTTQsMEgzMTZhNCw0LDAsMCwxLDQsNFY4MGEwLDAsMCwwLDEsMCwwSDBhMCwwLDAsMCwxLDAsMFY0QTQsNCwwLDAsMSw0LDBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMCAyMCkiLz4KICAgIDwvY2xpcFBhdGg+CiAgPC9kZWZzPgogIDxnIGlkPSJiYWNrZ3JvdW5kLWhlYWQtcGVuZGluZyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwIC0yMCkiPgogICAgPHBhdGggaWQ9IlJlY3RhbmdsZV81MzA4IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSA1MzA4IiBjbGFzcz0iY2xzLTIiIGQ9Ik00LDBIMzE2YTQsNCwwLDAsMSw0LDRWODBhMCwwLDAsMCwxLDAsMEgwYTAsMCwwLDAsMSwwLDBWNEE0LDQsMCwwLDEsNCwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAgMjApIi8+CiAgICA8ZyBpZD0iTWFza19Hcm91cF8xMDciIGRhdGEtbmFtZT0iTWFzayBHcm91cCAxMDciIGNsYXNzPSJjbHMtMyI+CiAgICAgIDxlbGxpcHNlIGlkPSJFbGxpcHNlXzEzMCIgZGF0YS1uYW1lPSJFbGxpcHNlIDEzMCIgY2xhc3M9ImNscy00IiBjeD0iMjA0LjUiIGN5PSIxNTEuNDgxIiByeD0iMjA0LjUiIHJ5PSIxNTEuNDgxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODQgLTE2OC40NjYpIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"

/***/ }),

/***/ 680:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMzIwIDgwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiB1cmwoI2xpbmVhci1ncmFkaWVudCk7CiAgICAgIH0KCiAgICAgIC5jbHMtMiB7CiAgICAgICAgZmlsbDogI2U2MDAwMDsKICAgICAgfQoKICAgICAgLmNscy0zIHsKICAgICAgICBvcGFjaXR5OiAwLjM3MjsKICAgICAgICBjbGlwLXBhdGg6IHVybCgjY2xpcC1wYXRoKTsKICAgICAgfQoKICAgICAgLmNscy00IHsKICAgICAgICBmaWxsOiAjZmY0MDQwOwogICAgICB9CiAgICA8L3N0eWxlPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQiIHkxPSIxIiB4Mj0iMSIgZ3JhZGllbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMzViZDQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjM2NmZmRhIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGNsaXBQYXRoIGlkPSJjbGlwLXBhdGgiPgogICAgICA8cGF0aCBpZD0iUmVjdGFuZ2xlXzUzMDciIGRhdGEtbmFtZT0iUmVjdGFuZ2xlIDUzMDciIGNsYXNzPSJjbHMtMSIgZD0iTTQsMEgzMTZhNCw0LDAsMCwxLDQsNFY4MGEwLDAsMCwwLDEsMCwwSDBhMCwwLDAsMCwxLDAsMFY0QTQsNCwwLDAsMSw0LDBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMCAyMCkiLz4KICAgIDwvY2xpcFBhdGg+CiAgPC9kZWZzPgogIDxnIGlkPSJiYWNrZ3JvdW5kLWhlYWQtcGVuZGluZyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwIC0yMCkiPgogICAgPHBhdGggaWQ9IlJlY3RhbmdsZV81MzA4IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSA1MzA4IiBjbGFzcz0iY2xzLTIiIGQ9Ik00LDBIMzE2YTQsNCwwLDAsMSw0LDRWODBhMCwwLDAsMCwxLDAsMEgwYTAsMCwwLDAsMSwwLDBWNEE0LDQsMCwwLDEsNCwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAgMjApIi8+CiAgICA8ZyBpZD0iTWFza19Hcm91cF8xMDciIGRhdGEtbmFtZT0iTWFzayBHcm91cCAxMDciIGNsYXNzPSJjbHMtMyI+CiAgICAgIDxlbGxpcHNlIGlkPSJFbGxpcHNlXzEzMCIgZGF0YS1uYW1lPSJFbGxpcHNlIDEzMCIgY2xhc3M9ImNscy00IiBjeD0iMjA0LjUiIGN5PSIxNTEuNDgxIiByeD0iMjA0LjUiIHJ5PSIxNTEuNDgxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODQgLTE2OC40NjYpIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"

/***/ }),

/***/ 681:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"bg-gray warp-chlid"},[_c('section',{staticClass:"header bg-header"},[_c('i',{staticClass:"iconfont icon-back",on:{"click":function($event){_vm.$router.go(-1)}}}),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t('transactionDetail.title')))])]),_vm._v(" "),_c('section',{staticClass:"panel"},[_c('div',{staticClass:"tx-header",class:_vm.classObject},[_c('p',{staticClass:"value"},[_vm._v(_vm._s(_vm.transaction.direct)+_vm._s(_vm.transaction.val))]),_vm._v(" "),(!_vm.transaction.status)?_c('small',{staticClass:"header-text"},[_vm._v("\n            "+_vm._s(_vm.$t('transactionDetail.fail'))+"\n          ")]):(_vm.transaction.hasOwnProperty('blockTimestamp'))?_c('small',{staticClass:"header-text"},[_vm._v("\n            "+_vm._s(_vm.$t('transactionDetail.success'))+"\n          ")]):_c('small',{staticClass:"header-text"},[_vm._v("\n            "+_vm._s(_vm.$t('transactionDetail.pending'))+"\n          ")])]),_vm._v(" "),_c('vue-scroll',[_c('div',{staticClass:"transaction"},[_c('table',{staticStyle:{"margin-bottom":"20px"}},[_c('tbody',[_c('tr',[_c('td',{staticClass:"label"},[_vm._v("\n                      "+_vm._s(_vm.$t('transactionDetail.transactionID'))+"\n                    ")]),_vm._v(" "),_c('td',{staticClass:"value"},[_c('p',[_vm._v(_vm._s(_vm.transaction.hash))])])]),_vm._v(" "),_c('tr',[_c('td',{attrs:{"colspan":"2"}},[_c('div',{staticClass:"divider"})])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"label"},[_vm._v("\n                      "+_vm._s(_vm.$t('transactionDetail.assetId'))+"\n                    ")]),_vm._v(" "),_c('td',{staticClass:"asset value"},[_c('p',[_vm._v(_vm._s(_vm.currentAsset.asset.assetId))])])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"label"},[_vm._v("\n                      "+_vm._s(_vm.$t('transactionDetail.time'))+"\n                    ")]),_vm._v(" "),_c('td',{staticClass:"value"},[(_vm.transaction.hasOwnProperty('blockTimestamp'))?_c('div',[_vm._v("\n                          "+_vm._s(_vm._f("moment")(_vm.transaction.submissionTimestamp))+"\n                        ")]):_c('div',[_vm._v("\n                          -\n                        ")])])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"label"},[_vm._v("\n                        "+_vm._s(_vm.$t('transactionDetail.blockHeight'))+"\n                    ")]),_vm._v(" "),_c('td',{staticClass:"value"},[(_vm.transaction.blockHeight != undefined)?_c('p',[_vm._v(_vm._s(_vm.transaction.blockHeight))]):_c('p',[_vm._v("-")])])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"label"},[_vm._v("\n                      "+_vm._s(_vm.$t('transactionDetail.blockSize'))+"\n                    ")]),_vm._v(" "),_c('td',{staticClass:"value"},[_c('p',[_vm._v(_vm._s(_vm.transaction.size))])])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"label"},[_vm._v("\n                      "+_vm._s(_vm.$t('transactionDetail.fee'))+"(BTM)\n                    ")]),_vm._v(" "),_c('td',{staticClass:"value"},[_c('p',[_vm._v(_vm._s(_vm.transaction.fee))])])]),_vm._v(" "),(_vm.transaction.type =='vote' || _vm.transaction.type =='veto' )?_c('tr',[_c('td',{attrs:{"colspan":"2"}},[_c('div',{staticClass:"divider"})])]):_vm._e(),_vm._v(" "),(_vm.transaction.type =='vote' || _vm.transaction.type =='veto')?_c('tr',[_c('td',{staticClass:"label"},[_vm._v("\n                      "+_vm._s(_vm.$t('listVote.bpName'))+"\n                    ")]),_vm._v(" "),_c('td',{staticClass:"value"},[_c('p',[_vm._v(_vm._s(_vm.transaction.vName))])])]):_vm._e(),_vm._v(" "),(_vm.transaction.type =='vote')?_c('tr',[_c('td',{staticClass:"label"},[_vm._v("\n                      "+_vm._s(_vm.$t('listVote.voteVotes'))+"\n                    ")]),_vm._v(" "),_c('td',{staticClass:"value"},[_c('p',[_vm._v(_vm._s(_vm.transaction.vAmount))])])]):_vm._e(),_vm._v(" "),(_vm.transaction.type =='crossChain')?_c('tr',[_c('td',{attrs:{"colspan":"2"}},[_c('div',{staticClass:"divider"})])]):_vm._e(),_vm._v(" "),(_vm.transaction.type =='crossChain')?_c('tr',[_c('td',{staticClass:"label"},[_vm._v("\n                      "+_vm._s(_vm.$t('crossChain.direction'))+"\n                    ")]),_vm._v(" "),_c('td',{staticClass:"value"},[_c('p',[_vm._v(_vm._s(_vm.transaction.cDirection))])])]):_vm._e(),_vm._v(" "),_c('tr',[_c('td',{attrs:{"colspan":"2"}},[_c('div',{staticClass:"divider"})])]),_vm._v(" "),_vm._l((_vm.transaction.inputs),function(input,index){return _c('tr',{key:'input'+index},[_c('td',{staticClass:"label"},[_vm._v(_vm._s(_vm.$t('transactionDetail.sendAddress'))+_vm._s(_vm.transaction.inputs.length > 1 ? index+1 : ''))]),_vm._v(" "),_c('td',{staticClass:"value"},[_vm._v(_vm._s(input.address)),(input.address == _vm.selfAddress)?_c('span',[_vm._v(" "+_vm._s(_vm.$t('transactionDetail.myAddress')))]):_vm._e()])])}),_vm._v(" "),_vm._l((_vm.transaction.outputs),function(output,index){return _c('tr',{key:'output'+ index},[_c('td',{staticClass:"label"},[_vm._v(_vm._s(_vm.$t('transactionDetail.receiveAddress'))+_vm._s(_vm.transaction.outputs.length > 1 ? index+1 : ''))]),_vm._v(" "),_c('td',{staticClass:"value"},[_vm._v(_vm._s(output.address)),(output.address == _vm.selfAddress)?_c('span',[_vm._v(" "+_vm._s(_vm.$t('transactionDetail.myAddress')))]):_vm._e()])])})],2)])])])],1),_vm._v(" "),_c('small',{staticClass:"footer color-grey"},[_vm._v(_vm._s(_vm.$t('transactionDetail.tips')))])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=14.js.map 