// [AIV_SHORT]  Build version: 2.2.0 - Thursday, June 4th, 2020, 2:31:20 PM  
 webpackJsonp([16],{

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

/***/ 559:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_creation_vue__ = __webpack_require__(616);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_27c4af51_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_creation_vue__ = __webpack_require__(704);
function injectStyle (ssrContext) {
  __webpack_require__(702)
}
var normalizeComponent = __webpack_require__(266)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-27c4af51"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_creation_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_27c4af51_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_creation_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 579:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cn__ = __webpack_require__(581);


var sdkLang = {
    cn: __WEBPACK_IMPORTED_MODULE_0__cn__["a" /* default */]
};

function getLang(str, lang) {
    if (sdkLang[lang] && sdkLang[lang][str]) {
        return sdkLang[lang][str];
    }
    return str;
}

/* harmony default export */ __webpack_exports__["a"] = (getLang);

/***/ }),

/***/ 581:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var cn = {
    "key alias already exists": "秘钥别名已经存在",
    "db insert error": "数据库写入异常",
    "db get error": "数据库查询异常",
    "not found by XPub": "未找到私钥数据",
    "db update error": "数据库更新失败",
    "db update error: not found by rootXPub": "数据库更新失败：未找到相应的私钥数据",
    "duplicate account alias": "账户别名已存在",
    "The wallet already has account data. Can't restore.": "当前钱包存在数据，无法从备份覆盖恢复",
    "could not decrypt key with given passphrase": "无法解密私钥，请检查密码是否正确",
    "unknown address type": "未知的地址类型"
};

/* harmony default export */ __webpack_exports__["a"] = (cn);

/***/ }),

/***/ 616:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_account__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_language__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_language_sdk__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store_constants__ = __webpack_require__(269);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







var mainNet = null;
/* harmony default export */ __webpack_exports__["a"] = ({
    name: "",
    data: function data() {
        return {
            nets: [],
            selected: mainNet,
            formItem: {
                accAlias: "",
                // keyAlias: "",
                passwd1: "",
                passwd2: "",
                checked: false
            },
            restore: {
                fileTxt: "",
                checked: false
            },
            activeTab: 'register'
        };
    },

    computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
        formItemLabel: function formItemLabel() {
            if (this.i18n == "cn") {
                return "form-item-label form-item-label-cn";
            } else if (this.i18n == "en") {
                return "form-item-label";
            }
            return "form-item-label form-item-label-cn";
        },
        formItemContent: function formItemContent() {
            if (this.i18n == "cn") {
                return "form-item-content content-cn";
            } else if (this.i18n == "en") {
                return "form-item-content content";
            }
            return "form-item-label form-item-label-cn";
        }
    }, Object(__WEBPACK_IMPORTED_MODULE_4_vuex__["d" /* mapState */])(['bytom']), Object(__WEBPACK_IMPORTED_MODULE_4_vuex__["c" /* mapGetters */])(['net', 'language', 'netType'])),
    props: {
        i18n: {
            type: String,
            default: 'cn'
        }
    },
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
            if (!this.formItem.checked) {
                this.$dialog.show({
                    body: this.$t('createAccount.agreeService')
                });
                return;
            }
            var loader = this.$loading.show({
                container: null,
                canCancel: true,
                onCancel: this.onCancel
            });
            __WEBPACK_IMPORTED_MODULE_1__models_account__["a" /* default */].create(this.formItem.accAlias, null, this.formItem.passwd1).then(function (currentAccount) {
                _this[__WEBPACK_IMPORTED_MODULE_5__store_constants__["b" /* CREATE_NEW_BYTOM */]](_this.selected.value).then(function () {
                    loader.hide();
                    _this.formItem = {};
                    _this.$router.push('/');
                });
            }).catch(function (err) {
                loader.hide();
                _this.$dialog.show({
                    body: err.message
                });
            });
        },
        tirggerFile: function tirggerFile(event) {
            var _this2 = this;

            var reader = new FileReader();
            reader.onload = function (e) {
                _this2.restore.fileTxt = e.target.result;
            };

            var file = event.target.files[0];
            reader.readAsText(file);
        },
        recovery: function recovery() {
            var _this3 = this;

            if (!this.restore.checked) {
                this.$dialog.show({
                    body: this.$t('createAccount.agreeService')
                });
                return;
            }
            __WEBPACK_IMPORTED_MODULE_1__models_account__["a" /* default */].restore(this.restore.fileTxt).then(function (res) {
                _this3[__WEBPACK_IMPORTED_MODULE_5__store_constants__["d" /* IMPORT_BYTOM */]]().then(function () {
                    _this3.$router.push('/');
                });
            }).catch(function (error) {
                _this3.$dialog.show({
                    body: Object(__WEBPACK_IMPORTED_MODULE_3__assets_language_sdk__["a" /* default */])(error.message, _this3.language)
                });
            });
        }
    }, Object(__WEBPACK_IMPORTED_MODULE_4_vuex__["b" /* mapActions */])([__WEBPACK_IMPORTED_MODULE_5__store_constants__["b" /* CREATE_NEW_BYTOM */], __WEBPACK_IMPORTED_MODULE_5__store_constants__["d" /* IMPORT_BYTOM */]])),
    watch: {
        selected: function selected(value) {
            __WEBPACK_IMPORTED_MODULE_1__models_account__["a" /* default */].setupNet("" + value.value);
        }
    },
    mounted: function mounted() {
        mainNet = { label: this.$t('main.mainNet'), value: "mainnet" };
        this.nets = [mainNet];
        if (this.net != undefined) {
            if (this.net == "mainnet") {
                this.selected = mainNet;
            }
        } else {
            this.selected = mainNet;
        }
        __WEBPACK_IMPORTED_MODULE_1__models_account__["a" /* default */].setupNet("" + this.selected.value);
        this.i18n = Object(__WEBPACK_IMPORTED_MODULE_2__assets_language__["b" /* getLanguage */])(this.language);
    }
});

/***/ }),

/***/ 702:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(703);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(84)("77b1e0b4", content, true, {});

/***/ }),

/***/ 703:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(83)(false);
// imports


// module
exports.push([module.i, ".bg-image[data-v-27c4af51]{height:420px;width:360px;background-size:contain;-webkit-clip-path:polygon(0 0,100% 0,100% 75%,0 100%);clip-path:polygon(0 0,100% 0,100% 75%,0 100%);position:absolute}.header[data-v-27c4af51]{position:relative;text-align:center;margin:15px 20px 25px}.header p[data-v-27c4af51]{font-size:16px;color:hsla(0,0%,100%,.5);padding-top:5px}.panel[data-v-27c4af51]{position:relative;padding:10px;margin-bottom:15px}.container[data-v-27c4af51]{position:relative}.form-item[data-v-27c4af51]{margin:10px 0}.btn-group[data-v-27c4af51]{padding:0 20px}.topbar[data-v-27c4af51]{height:45px;padding-top:10px}.topbar .topbar-middle[data-v-27c4af51]{text-align:center}.v-select[data-v-27c4af51]{height:32px;width:100%;background:#f7f7f7;font-size:14px;margin:auto;border-bottom:1px solid #e0e0e0}.tabs[data-v-27c4af51]{color:hsla(0,0%,100%,.4);text-align:center}.tabs a[data-v-27c4af51]{margin:0 20px}.tabs .active[data-v-27c4af51]{color:#fff}.form-checkbox[data-v-27c4af51]{font-size:14px;padding:5px}.topbar a[data-v-27c4af51]{position:fixed;top:10px;right:20px}.topbar a i[data-v-27c4af51]{font-size:25px;color:#fff}.file-selection[data-v-27c4af51]{height:50px;vertical-align:middle;display:flex;align-items:center;border:1px dashed #e0e0e0;margin-top:10px;padding:20px;background:#f7f7f7}.recovery-btn[data-v-27c4af51]{position:fixed;bottom:20px;width:320px}", ""]);

// exports


/***/ }),

/***/ 704:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"warp bg-gray"},[_c('div',{staticClass:"bg-image"}),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('div',{staticClass:"header"},[_c('h1',[_vm._v("Byone")]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t('home.title')))])]),_vm._v(" "),_c('section',{staticClass:"container"},[_c('div',{staticClass:"tabs"},[_c('a',{class:[ _vm.activeTab === 'register' ? 'active' : '' ],on:{"click":function($event){_vm.activeTab='register'}}},[_vm._v(_vm._s(_vm.$t('welcome.register')))]),_vm._v(" "),_c('a',{class:[ _vm.activeTab === 'restore' ? 'active' : '' ],on:{"click":function($event){_vm.activeTab='restore'}}},[_vm._v(_vm._s(_vm.$t('welcome.restore')))])]),_vm._v(" "),(_vm.activeTab === 'register')?_c('div',[_c('div',{staticClass:"form panel"},[_c('div',{staticClass:"form-item"},[_c('label',{class:_vm.formItemLabel},[_vm._v(_vm._s(_vm.$t('main.network')))]),_vm._v(" "),_c('div',{class:_vm.formItemContent},[_c('v-select',{staticClass:"v-select",attrs:{"colorBlack":true,"clearable":false,"options":_vm.nets},model:{value:(_vm.selected),callback:function ($$v) {_vm.selected=$$v},expression:"selected"}})],1)]),_vm._v(" "),_c('div',{staticClass:"form-item"},[_c('label',{class:_vm.formItemLabel},[_vm._v(_vm._s(_vm.$t('createAccount.accountAlias')))]),_vm._v(" "),_c('div',{class:_vm.formItemContent},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.formItem.accAlias),expression:"formItem.accAlias"}],attrs:{"type":"text","autofocus":""},domProps:{"value":(_vm.formItem.accAlias)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.formItem, "accAlias", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"form-item"},[_c('label',{class:_vm.formItemLabel},[_vm._v(_vm._s(_vm.$t('createAccount.keyPassword')))]),_vm._v(" "),_c('div',{class:_vm.formItemContent},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.formItem.passwd1),expression:"formItem.passwd1"}],attrs:{"type":"password"},domProps:{"value":(_vm.formItem.passwd1)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.formItem, "passwd1", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"form-item"},[_c('label',{class:_vm.formItemLabel},[_vm._v(_vm._s(_vm.$t('createAccount.confirmPassword')))]),_vm._v(" "),_c('div',{class:_vm.formItemContent},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.formItem.passwd2),expression:"formItem.passwd2"}],attrs:{"type":"password"},domProps:{"value":(_vm.formItem.passwd2)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.formItem, "passwd2", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"form-checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.formItem.checked),expression:"formItem.checked"}],attrs:{"type":"checkbox","id":"checkbox1"},domProps:{"checked":Array.isArray(_vm.formItem.checked)?_vm._i(_vm.formItem.checked,null)>-1:(_vm.formItem.checked)},on:{"change":function($event){var $$a=_vm.formItem.checked,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.formItem, "checked", $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.formItem, "checked", $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.formItem, "checked", $$c)}}}}),_vm._v(" "),_c('label',{attrs:{"for":"checkbox1"}},[_vm._v("\n              "+_vm._s(_vm.$t('welcome.term1'))),_c('a',{staticClass:"color-green",on:{"click":function($event){_vm.$router.push({ name: 'welcome-protocol' })}}},[_vm._v(_vm._s(_vm.$t('welcome.term2')))])])])]),_vm._v(" "),_c('div',{staticClass:"btn-group"},[_c('div',{staticClass:"btn btn-primary",on:{"click":_vm.create}},[_vm._v(_vm._s(_vm.$t('createAccount.create')))])])]):_vm._e(),_vm._v(" "),(_vm.activeTab === 'restore')?_c('div',[_c('div',{staticClass:"form panel"},[_c('div',{staticClass:"form-item"},[_c('label',{staticClass:"form-item-label"},[_vm._v(_vm._s(_vm.$t('createAccount.file')))]),_vm._v(" "),_c('div',{staticClass:"file-selection"},[_c('input',{attrs:{"type":"file"},on:{"change":function($event){_vm.tirggerFile($event)}}})])]),_vm._v(" "),_c('div',{staticClass:"form-checkbox"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.restore.checked),expression:"restore.checked"}],attrs:{"type":"checkbox","id":"checkbox2"},domProps:{"checked":Array.isArray(_vm.restore.checked)?_vm._i(_vm.restore.checked,null)>-1:(_vm.restore.checked)},on:{"change":function($event){var $$a=_vm.restore.checked,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.restore, "checked", $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.restore, "checked", $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.restore, "checked", $$c)}}}}),_vm._v(" "),_c('label',{attrs:{"for":"checkbox2"}},[_vm._v("\n              "+_vm._s(_vm.$t('welcome.term1'))),_c('a',{staticClass:"color-green",on:{"click":function($event){_vm.$router.push({ name: 'welcome-protocol' })}}},[_vm._v(_vm._s(_vm.$t('welcome.term2')))])])])]),_vm._v(" "),_c('div',{staticClass:"btn-group"},[_c('div',{staticClass:"btn btn-primary recovery-btn",on:{"click":_vm.recovery}},[_vm._v(_vm._s(_vm.$t('createAccount.import')))])])]):_vm._e()])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"topbar"},[_c('a',{attrs:{"href":"http://github.com/bycoinio/Bystore","target":"_blank"}},[_c('i',{staticClass:"iconfont icon-github"})])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=16.js.map 