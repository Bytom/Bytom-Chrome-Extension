// [AIV_SHORT]  Build version: 2.2.0 - Thursday, June 4th, 2020, 2:31:20 PM  
 webpackJsonp([23],{

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

/***/ 553:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_homeMenu_vue__ = __webpack_require__(610);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_53770914_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_homeMenu_vue__ = __webpack_require__(684);
function injectStyle (ssrContext) {
  __webpack_require__(682)
}
var normalizeComponent = __webpack_require__(266)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-53770914"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_homeMenu_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_53770914_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_homeMenu_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 610:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_constants__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_constants__ = __webpack_require__(269);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["d" /* mapState */])(['bytom']), Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])(['currentAccount', 'accountList'])),
  watch: {},
  methods: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
    accountSelected: function accountSelected(accountInfo) {
      var _this = this;

      var bytom = this.bytom.clone();

      if (bytom.currentAccount != accountInfo) {
        bytom.currentAccount = accountInfo;
        this[__WEBPACK_IMPORTED_MODULE_3__store_constants__["n" /* UPDATE_STORED_BYTOM */]](bytom).then(function () {
          _this.$router.push('/');
        });
      }
    },
    calculateBalance: function calculateBalance(balances) {
      if (balances && balances.length > 0) {
        var balanceObject = balances.filter(function (b) {
          return b.asset === __WEBPACK_IMPORTED_MODULE_1__utils_constants__["a" /* BTM */];
        })[0];
        var balance = balanceObject.balance / Math.pow(10, balanceObject.decimals);
        return balance;
      }
      return 0.00;
    }
  }, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapActions */])([__WEBPACK_IMPORTED_MODULE_3__store_constants__["n" /* UPDATE_STORED_BYTOM */]])),
  mounted: function mounted() {}
});

/***/ }),

/***/ 682:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(683);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(84)("a9d9cd4e", content, true, {});

/***/ }),

/***/ 683:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(83)(false);
// imports


// module
exports.push([module.i, ".accounts[data-v-53770914]{width:100%;height:250px;overflow-x:hidden;overflow-y:scroll;margin-bottom:25px}.accounts .list-item[data-v-53770914]{background:#3c3c3c;padding:10px;border-radius:4px;margin-bottom:16px}.accounts .list-item[data-v-53770914]:active,.accounts .list-item[data-v-53770914]:focus,.accounts .list-item[data-v-53770914]:hover{background:#035bd4}.accounts[data-v-53770914]::-webkit-scrollbar{display:none}.accounts i[data-v-53770914]{margin-left:2px}.menu-panel[data-v-53770914]{height:560px;width:260px;padding:20px}.menu-list[data-v-53770914]{margin:0 -20px}.menu-list .list-item[data-v-53770914]{color:#fff;padding:10px 20px}.menu-list .list-item[data-v-53770914]:active,.menu-list .list-item[data-v-53770914]:focus,.menu-list .list-item[data-v-53770914]:hover{background:#3c3c3c}.account[data-v-53770914]{width:200px;display:flex;justify-content:center;align-items:center}.account-alias[data-v-53770914]{width:200px;font-size:18px;color:#fff;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.account-asset[data-v-53770914]{font-size:12px;color:#9e9e9e}.wallet[data-v-53770914]{width:25px;height:25px;background:hsla(0,0%,100%,.1);border-radius:50%;color:#fff;padding:8px;margin-right:15px}.list-item[data-v-53770914]{display:flex}", ""]);

// exports


/***/ }),

/***/ 684:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"bg-sideBar menu-panel warp-chlid"},[_c('div',[_c('i',{staticClass:"iconfont btn-close",on:{"click":function($event){_vm.$router.go(-1)}}},[_vm._v("")]),_vm._v(" "),_c('div',{staticClass:"menu-title"},[_vm._v(_vm._s(_vm.$t('menu.title')))])]),_vm._v(" "),_c('div',{staticClass:"menu-content"},[_c('div',{staticClass:"list accounts"},_vm._l((_vm.accountList),function(account,index){return _c('div',{key:index,on:{"click":function($event){_vm.accountSelected(account)}}},[_c('div',{class:(_vm.currentAccount != undefined && account.address == _vm.currentAccount.address) ? 'list-item active': 'list-item'},[_vm._m(0,true),_vm._v(" "),_c('div',{staticClass:"account"},[_c('div',{staticClass:"account-alias"},[_vm._v(_vm._s(account.alias))])])])])})),_vm._v(" "),_c('div',[_c('div',{staticClass:"menu-title"},[_vm._v(_vm._s(_vm.$t('menu.setting')))])]),_vm._v(" "),_c('div',{staticClass:"list menu-list"},[_c('router-link',{attrs:{"to":{name: 'menu-account-creation'}}},[_c('div',{staticClass:"list-item"},[_c('i',{staticClass:"iconfont icon-create"}),_vm._v(_vm._s(_vm.$t('menu.createAccount'))+"\n                ")])]),_vm._v(" "),_c('router-link',{attrs:{"to":{name: 'menu-backup'}}},[_c('div',{staticClass:"list-item"},[_c('i',{staticClass:"iconfont icon-backup"}),_vm._v(_vm._s(_vm.$t('menu.backup'))+"\n                ")])]),_vm._v(" "),_c('router-link',{attrs:{"to":{name: 'menu-help'}}},[_c('div',{staticClass:"list-item"},[_c('i',{staticClass:"iconfont icon-support"}),_vm._v(_vm._s(_vm.$t('menu.help'))+"\n                ")])]),_vm._v(" "),_c('router-link',{attrs:{"to":{name: 'menu-settings'}}},[_c('div',{staticClass:"list-item"},[_c('i',{staticClass:"iconfont icon-setting"}),_vm._v(_vm._s(_vm.$t('menu.setting'))+"\n                ")])])],1)]),_vm._v(" "),_c('router-view')],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wallet"},[_c('i',{staticClass:"iconfont icon-wallet"})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=23.js.map 