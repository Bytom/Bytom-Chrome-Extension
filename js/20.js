// [AIV_SHORT]  Build version: 2.2.0 - Thursday, June 4th, 2020, 2:31:20 PM  
 webpackJsonp([20],{

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

/***/ 557:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menuSettings_vue__ = __webpack_require__(614);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9507c57a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_menuSettings_vue__ = __webpack_require__(697);
function injectStyle (ssrContext) {
  __webpack_require__(695)
}
var normalizeComponent = __webpack_require__(266)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9507c57a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menuSettings_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9507c57a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_menuSettings_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 614:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_language__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_account__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_constants__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex__ = __webpack_require__(433);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      currentAccount: {},
      network: { label: this.$t('main.mainNet'), value: "mainnet" },
      unit: "BTM",
      i18nOptions: [{ label: "中文", value: "cn" }, { label: "English", value: "en" }],
      networks: [{ label: this.$t('main.mainNet'), value: "mainnet" }],
      selected: { label: "中文", value: "cn" },
      hashVersion: "",
      currentCurrency: { label: "CNY", value: "inCny" },
      currencyList: [{ label: "CNY", value: "inCny" }, { label: "USD", value: "inUsd" }, { label: "BTC", value: "inBtc" }]
    };
  },

  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_4_vuex__["d" /* mapState */])(['bytom']), Object(__WEBPACK_IMPORTED_MODULE_4_vuex__["c" /* mapGetters */])(['net', 'language', 'netType', 'currency'])),
  methods: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
    changeLanguage: function changeLanguage(lang) {
      var bytom = this.bytom.clone();

      if (bytom.settings.language != lang.value) {
        bytom.settings.language = lang.value;
        this.$i18n.locale = lang.value;
        this.selected = lang;
        this[__WEBPACK_IMPORTED_MODULE_3__store_constants__["n" /* UPDATE_STORED_BYTOM */]](bytom);
      }
    },

    networkToggle: function networkToggle(val) {
      var _this = this;

      var bytom = this.bytom.clone();

      if (bytom.settings.network != val.value) {
        bytom.settings.network = val.value;
        this.network = val;
        __WEBPACK_IMPORTED_MODULE_2__models_account__["a" /* default */].setupNet("" + val.value);

        bytom.currentAccount = {};
        __WEBPACK_IMPORTED_MODULE_2__models_account__["a" /* default */].list().then(function (accounts) {

          bytom.accountList = accounts;
          if (accounts.length > 0) {
            bytom.currentAccount = accounts[0];
          }

          __WEBPACK_IMPORTED_MODULE_2__models_account__["a" /* default */].setupNet("" + val.value + _this.netType);
          _this[__WEBPACK_IMPORTED_MODULE_3__store_constants__["n" /* UPDATE_STORED_BYTOM */]](bytom);
        }).catch(function (errors) {
          bytom.accountList = [];

          __WEBPACK_IMPORTED_MODULE_2__models_account__["a" /* default */].setupNet("" + val.value + _this.netType);
          _this[__WEBPACK_IMPORTED_MODULE_3__store_constants__["n" /* UPDATE_STORED_BYTOM */]](bytom);
        });
      }
    },
    currencyToggle: function currencyToggle(val) {
      var bytom = this.bytom.clone();

      if (bytom.settings.currency != val.value) {
        bytom.settings.currency = val.value;
        this.currentCurrency = val;
        this[__WEBPACK_IMPORTED_MODULE_3__store_constants__["n" /* UPDATE_STORED_BYTOM */]](bytom);
      }
    },
    refreshAccounts: function refreshAccounts() {
      var _this2 = this;

      __WEBPACK_IMPORTED_MODULE_2__models_account__["a" /* default */].list().then(function (accounts) {
        _this2.accounts = accounts;
        if (accounts.length == 0) {
          return;
        }

        _this2.currentAccount = accounts[0];
      });
    },
    setupNetwork: function setupNetwork(network) {
      this.network = network;
    }
  }, Object(__WEBPACK_IMPORTED_MODULE_4_vuex__["b" /* mapActions */])([__WEBPACK_IMPORTED_MODULE_3__store_constants__["n" /* UPDATE_STORED_BYTOM */]])),
  mounted: function mounted() {
    this.hashVersion = "a398121";
    if (Object(__WEBPACK_IMPORTED_MODULE_1__assets_language__["c" /* have */])(this.language)) {
      if (this.language == "cn") {
        this.selected = { label: "中文", value: "cn" };
      } else if (this.language == "en") {
        this.selected = { label: "English", value: "en" };
      }
    }
    if (this.net) {
      var network = void 0;
      switch (this.net) {
        case 'mainnet':
          network = this.networks[0];
          break;
      }
      this.setupNetwork(network);
    }

    if (this.currency) {
      switch (this.currency) {
        case 'inCny':
          this.currentCurrency = this.currencyList[0];
          break;
        case 'inUsd':
          this.currentCurrency = this.currencyList[1];
          break;
        case 'inBtc':
          this.currentCurrency = this.currencyList[2];
          break;
      }
    }
  }
});

/***/ }),

/***/ 695:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(696);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(84)("2364424c", content, true, {});

/***/ }),

/***/ 696:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(83)(false);
// imports


// module
exports.push([module.i, ".row[data-v-9507c57a]{margin:25px 0;display:flex;align-items:center}.row .label[data-v-9507c57a]{flex-grow:1}.value[data-v-9507c57a]{font-size:15px;line-height:30px}.setting[data-v-9507c57a]{margin:5px 0 0;width:110px;height:32px;position:relative}.form-item-content .select[data-v-9507c57a]{height:32px}", ""]);

// exports


/***/ }),

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('MenuPage',{attrs:{"title":_vm.$t('setting.title')}},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"label"},[_c('p',[_vm._v(_vm._s(_vm.$t("setting.lang")))])]),_vm._v(" "),_c('div',{staticClass:"form-item setting"},[_c('v-select',{staticClass:"select",staticStyle:{"height":"32px"},attrs:{"value":_vm.selected,"clearable":false,"onChange":_vm.changeLanguage,"options":_vm.i18nOptions}})],1)]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"label"},[_c('p',[_vm._v(_vm._s(_vm.$t("setting.unit")))])]),_vm._v(" "),_c('div',{staticClass:"form-item setting"},[_c('v-select',{staticClass:"select",staticStyle:{"height":"32px"},attrs:{"value":_vm.unit,"clearable":false,"options":['BTM']}})],1)]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"label"},[_c('p',[_vm._v(_vm._s(_vm.$t("main.network")))])]),_vm._v(" "),_c('div',{staticClass:"form-item setting"},[_c('v-select',{staticClass:"select",staticStyle:{"height":"32px"},attrs:{"value":_vm.network,"clearable":false,"options":_vm.networks,"onChange":_vm.networkToggle}})],1)]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"label"},[_c('p',[_vm._v(_vm._s(_vm.$t("setting.currency")))])]),_vm._v(" "),_c('div',{staticClass:"form-item setting"},[_c('v-select',{staticClass:"select",staticStyle:{"height":"32px"},attrs:{"value":_vm.currentCurrency,"clearable":false,"options":_vm.currencyList,"onChange":_vm.currencyToggle}})],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=20.js.map 