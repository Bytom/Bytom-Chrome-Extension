// [AIV_SHORT]  Build version: 2.2.0 - Thursday, June 4th, 2020, 2:31:20 PM  
 webpackJsonp([21],{

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

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menuCreation_vue__ = __webpack_require__(611);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5305a089_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_menuCreation_vue__ = __webpack_require__(687);
function injectStyle (ssrContext) {
  __webpack_require__(685)
}
var normalizeComponent = __webpack_require__(266)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5305a089"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menuCreation_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5305a089_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_menuCreation_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 611:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_account__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_constants__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(433);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: {},
  data: function data() {
    return {
      formItem: {
        accAlias: "",
        keyAlias: "",
        passwd1: "",
        passwd2: ""
      },
      tips: ""
    };
  },

  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["d" /* mapState */])(['bytom']), Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["c" /* mapGetters */])(['net', 'netType'])),
  methods: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
    create: function create() {
      var _this = this;

      if (this.formItem.accAlias == "") {
        this.$dialog.show({
          body: this.$t("createAccount.inputAlias")
        });
        return;
      }

      if (this.formItem.passwd1 == "") {
        this.$dialog.show({
          body: this.$t("createAccount.inputPass")
        });
        return;
      }
      if (this.formItem.passwd1 != this.formItem.passwd2) {
        this.$dialog.show({
          body: this.$t('createAccount.passwordAgain')
        });
        return;
      }

      var loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel
      });

      __WEBPACK_IMPORTED_MODULE_1__models_account__["a" /* default */].setupNet('' + this.net);
      if (this.netType === 'vapor') {
        __WEBPACK_IMPORTED_MODULE_1__models_account__["a" /* default */].create(this.formItem.accAlias, null, this.formItem.passwd1).then(function (resp) {
          __WEBPACK_IMPORTED_MODULE_1__models_account__["a" /* default */].setupNet(_this.net + 'vapor');
          return __WEBPACK_IMPORTED_MODULE_1__models_account__["a" /* default */].copy(resp.guid).then(function (currentRespAccount) {
            _this[__WEBPACK_IMPORTED_MODULE_2__store_constants__["c" /* CREATE_NEW_BYTOM_ACCOUNT */]](currentRespAccount).then(function () {
              loader.hide();
              _this.$router.push('/');
            });
          });
        }).catch(function (err) {
          console.log(err);
          loader.hide();
          _this.$dialog.show({
            body: err.message
          });
        });
      } else {
        __WEBPACK_IMPORTED_MODULE_1__models_account__["a" /* default */].create(this.formItem.accAlias, null, this.formItem.passwd1).then(function (account) {
          _this[__WEBPACK_IMPORTED_MODULE_2__store_constants__["c" /* CREATE_NEW_BYTOM_ACCOUNT */]](account).then(function () {
            loader.hide();
            _this.$router.push('/');
          });
        }).catch(function (err) {
          console.log(err);
          loader.hide();
          _this.$dialog.show({
            body: err.message
          });
        });
      }
    }
  }, Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["b" /* mapActions */])([__WEBPACK_IMPORTED_MODULE_2__store_constants__["c" /* CREATE_NEW_BYTOM_ACCOUNT */]])),
  mounted: function mounted() {}
});

/***/ }),

/***/ 685:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(686);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(84)("7e320ed0", content, true, {});

/***/ }),

/***/ 686:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(83)(false);
// imports


// module
exports.push([module.i, ".form-item[data-v-5305a089]{background:transparent;margin:0;padding:0}.form-item .form-item-label[data-v-5305a089]{float:none;width:200px;margin:0;padding:0}.submit[data-v-5305a089]{margin-top:15px;height:48px;padding:15px}.form[data-v-5305a089]{border-radius:4px;background:#fff;padding:20px 20px 28px}", ""]);

// exports


/***/ }),

/***/ 687:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('MenuPage',{attrs:{"title":_vm.$t('createAccount.title')}},[_c('div',{staticClass:"form"},[_c('div',{staticClass:"form-item"},[_c('label',{staticClass:"form-item-label"},[_vm._v(_vm._s(_vm.$t('createAccount.accountAlias')))]),_vm._v(" "),_c('div',{staticClass:"form-item-content"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.formItem.accAlias),expression:"formItem.accAlias"}],attrs:{"type":"text"},domProps:{"value":(_vm.formItem.accAlias)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.formItem, "accAlias", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"form-item"},[_c('label',{staticClass:"form-item-label"},[_vm._v(_vm._s(_vm.$t('createAccount.keyPassword')))]),_vm._v(" "),_c('div',{staticClass:"form-item-content"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.formItem.passwd1),expression:"formItem.passwd1"}],attrs:{"type":"password"},domProps:{"value":(_vm.formItem.passwd1)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.formItem, "passwd1", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"form-item"},[_c('label',{staticClass:"form-item-label"},[_vm._v(_vm._s(_vm.$t('createAccount.confirmPassword')))]),_vm._v(" "),_c('div',{staticClass:"form-item-content"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.formItem.passwd2),expression:"formItem.passwd2"}],attrs:{"type":"password"},domProps:{"value":(_vm.formItem.passwd2)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.formItem, "passwd2", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"tips"},[_vm._v(_vm._s(_vm.tips))])]),_vm._v(" "),_c('a',{staticClass:"btn btn-primary submit",on:{"click":_vm.create}},[_vm._v(_vm._s(_vm.$t('createAccount.create')))])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=21.js.map 