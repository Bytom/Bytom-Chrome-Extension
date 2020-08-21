// [AIV_SHORT]  Build version: 2.2.0 - Thursday, June 4th, 2020, 2:31:20 PM  
 webpackJsonp([15],{

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return apis; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);


var swallow = function swallow(fn) {
    try {
        fn();
    } catch (e) {}
};

var ApiGenerator = function ApiGenerator() {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ApiGenerator);

    ['app', 'storage', 'extension', 'runtime', 'windows'].map(function (api) {
        if (typeof chrome !== 'undefined') swallow(function () {
            if (chrome[api]) _this[api] = chrome[api];
        });
        if (typeof browser !== 'undefined') swallow(function () {
            if (browser[api]) _this[api] = browser[api];
        });
    });

    if (typeof browser !== 'undefined') swallow(function () {
        if (browser && browser.runtime) _this.runtime = browser.runtime;
    });
};

var apis = new ApiGenerator();

/***/ }),

/***/ 530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ErrorCodes */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ErrorTypes__ = __webpack_require__(535);




var ErrorCodes = {
  NO_SIGNATURE: 402,
  FORBIDDEN: 403,
  TIMED_OUT: 408,
  LOCKED: 423,
  TOO_MANY_REQUESTS: 429,
  TYPE_MISSED: 411,
  TYPE_DUPLICATE: 405
};

var Error = function () {
  function Error(_type, _message) {
    var _code = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ErrorCodes.LOCKED;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Error);

    this.type = _type;
    this.message = _message;
    this.code = _code;
    this.isError = true;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Error, null, [{
    key: "locked",
    value: function locked() {
      return new Error(__WEBPACK_IMPORTED_MODULE_2__ErrorTypes__["a" /* LOCKED */], "The user's Bytom is locked. They have been notified and should unlock before continuing.");
    }
  }, {
    key: "duplicate",
    value: function duplicate(_type) {
      return new Error(__WEBPACK_IMPORTED_MODULE_2__ErrorTypes__["d" /* TYPE_DUPLICATED */], "The current value has been set to '" + _type + "', please select another parameter.", ErrorCodes.TYPE_DUPLICATE);
    }
  }, {
    key: "promptClosedWithoutAction",
    value: function promptClosedWithoutAction() {
      return new Error(__WEBPACK_IMPORTED_MODULE_2__ErrorTypes__["c" /* PROMPT_CLOSED */], "The user closed the prompt without any action.", ErrorCodes.TIMED_OUT);
    }
  }, {
    key: "signatureError",
    value: function signatureError(_type, _message) {
      return new Error(_type, _message, ErrorCodes.NO_SIGNATURE);
    }
  }, {
    key: "typeMissed",
    value: function typeMissed(_type) {
      return new Error(__WEBPACK_IMPORTED_MODULE_2__ErrorTypes__["e" /* TYPE_MISSED */], "Parameter '" + _type + "' is missing, please add the Parameter '" + _type + "'.");
    }
  }, {
    key: "identityMissing",
    value: function identityMissing() {
      return this.signatureError("identity_missing", "Identity no longer exists on the user's keychain");
    }
  }, {
    key: "signatureAccountMissing",
    value: function signatureAccountMissing() {
      return this.signatureError("account_missing", "Missing required accounts, repull the identity");
    }
  }, {
    key: "malformedRequiredFields",
    value: function malformedRequiredFields() {
      return this.signatureError("malformed_requirements", "The requiredFields you passed in were malformed");
    }
  }, {
    key: "usedKeyProvider",
    value: function usedKeyProvider() {
      return new Error(__WEBPACK_IMPORTED_MODULE_2__ErrorTypes__["b" /* MALICIOUS */], "Do not use a `keyProvider` with a Bytom. Use a `signProvider` and return only signatures to this object. A malicious person could retrieve your keys otherwise.", ErrorCodes.NO_SIGNATURE);
    }
  }]);

  return Error;
}();

/* harmony default export */ __webpack_exports__["a"] = (Error);

/***/ }),

/***/ 534:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_errors_Error__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_BrowserApis__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__messages_internal__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__messages_types__ = __webpack_require__(129);










var openWindow = null;

var NotificationService = function () {
    function NotificationService() {
        __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, NotificationService);
    }

    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(NotificationService, null, [{
        key: 'open',


        /***
         * Opens a prompt window outside of the extension
         * @param notification
         */
        value: function () {
            var _ref = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2(notification) {
                var _this = this;

                var height, width, middleX, middleY, getPopup, popup;
                return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (openWindow) {
                                    // For now we're just going to close the window to get rid of the error
                                    // that is caused by already open windows swallowing all further requests
                                    openWindow.close();
                                    openWindow = null;

                                    // Alternatively we could focus the old window, but this would cause
                                    // urgent 1-time messages to be lost, such as after dying in a game and
                                    // uploading a high-score. That message will be lost.
                                    // openWindow.focus();
                                    // return false;

                                    // A third option would be to add a queue, but this could cause
                                    // virus-like behavior as apps overflow the queue causing the user
                                    // to have to quit the browser to regain control.
                                }

                                height = 623;
                                width = 360;
                                middleX = window.screen.availWidth / 2 - width / 2;
                                middleY = window.screen.availHeight / 2 - height / 2;

                                getPopup = function () {
                                    var _ref2 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {
                                        var url, win;
                                        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        _context.prev = 0;
                                                        url = __WEBPACK_IMPORTED_MODULE_6__utils_BrowserApis__["a" /* apis */].runtime.getURL('pages/prompt.html') + '#' + notification.routeName();

                                                        // Notifications get bound differently depending on browser
                                                        // as Firefox does not support opening windows from background.

                                                        if (!(typeof chrome !== 'undefined')) {
                                                            _context.next = 7;
                                                            break;
                                                        }

                                                        window.notification = notification;
                                                        __WEBPACK_IMPORTED_MODULE_6__utils_BrowserApis__["a" /* apis */].windows.create({
                                                            url: url,
                                                            height: height,
                                                            width: width,
                                                            type: 'popup'
                                                        }, function (_window) {
                                                            __WEBPACK_IMPORTED_MODULE_6__utils_BrowserApis__["a" /* apis */].windows.onRemoved.addListener(function (windowId) {
                                                                if (windowId === _window.id) {
                                                                    notification.responder(__WEBPACK_IMPORTED_MODULE_5__utils_errors_Error__["a" /* default */].promptClosedWithoutAction());
                                                                    return false;
                                                                }
                                                            });
                                                            return _window;
                                                        });
                                                        _context.next = 11;
                                                        break;

                                                    case 7:
                                                        win = window.open(url, 'BytomPrompt', 'width=' + width + ',height=' + height + ',resizable=0,top=' + middleY + ',left=' + middleX + ',titlebar=0');

                                                        win.data = notification;
                                                        openWindow = win;
                                                        return _context.abrupt('return', win);

                                                    case 11:
                                                        _context.next = 17;
                                                        break;

                                                    case 13:
                                                        _context.prev = 13;
                                                        _context.t0 = _context['catch'](0);

                                                        console.log('notification error', _context.t0);
                                                        return _context.abrupt('return', null);

                                                    case 17:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this, [[0, 13]]);
                                    }));

                                    return function getPopup() {
                                        return _ref2.apply(this, arguments);
                                    };
                                }();

                                _context2.next = 8;
                                return __WEBPACK_IMPORTED_MODULE_7__messages_internal__["a" /* default */].payload(__WEBPACK_IMPORTED_MODULE_8__messages_types__["l" /* SET_PROMPT */], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(notification)).send();

                            case 8:
                                _context2.next = 10;
                                return getPopup();

                            case 10:
                                popup = _context2.sent;


                                if (popup) {
                                    popup.onbeforeunload = function () {
                                        notification.responder(__WEBPACK_IMPORTED_MODULE_5__utils_errors_Error__["a" /* default */].promptClosedWithoutAction());

                                        // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
                                        // Must return undefined to bypass form protection
                                        openWindow = null;
                                        return undefined;
                                    };
                                }

                            case 12:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function open(_x) {
                return _ref.apply(this, arguments);
            }

            return open;
        }()

        /***
         * Always use this method for closing notification popups.
         * Otherwise you will double send responses and one will always be null.
         */

    }, {
        key: 'close',
        value: function () {
            var _ref3 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee3() {
                var _ref4, windowId;

                return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!(typeof browser !== 'undefined')) {
                                    _context3.next = 8;
                                    break;
                                }

                                _context3.next = 3;
                                return __WEBPACK_IMPORTED_MODULE_6__utils_BrowserApis__["a" /* apis */].windows.getCurrent();

                            case 3:
                                _ref4 = _context3.sent;
                                windowId = _ref4.id;

                                __WEBPACK_IMPORTED_MODULE_6__utils_BrowserApis__["a" /* apis */].windows.remove(windowId);
                                _context3.next = 10;
                                break;

                            case 8:
                                window.onbeforeunload = function () {};
                                window.close();

                            case 10:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function close() {
                return _ref3.apply(this, arguments);
            }

            return close;
        }()
    }]);

    return NotificationService;
}();

/* harmony default export */ __webpack_exports__["a"] = (NotificationService);

/***/ }),

/***/ 535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MALICIOUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LOCKED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PROMPT_CLOSED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return TYPE_MISSED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return TYPE_DUPLICATED; });
var MALICIOUS = 'malicious';
var LOCKED = 'locked';
var PROMPT_CLOSED = 'prompt_closed';
var TYPE_MISSED = 'type_missed';
var TYPE_DUPLICATED = 'type_duplicated';

/***/ }),

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_authentication_vue__ = __webpack_require__(608);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a2806a68_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_authentication_vue__ = __webpack_require__(675);
function injectStyle (ssrContext) {
  __webpack_require__(673)
}
var normalizeComponent = __webpack_require__(266)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-a2806a68"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_authentication_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a2806a68_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_authentication_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 608:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_constants__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_BrowserApis__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_NotificationService__ = __webpack_require__(534);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {
      prompt: ''
    };
  },

  computed: {},
  watch: {},
  methods: {
    accepted: function accepted() {
      this.prompt.responder(true);
      __WEBPACK_IMPORTED_MODULE_2__services_NotificationService__["a" /* default */].close();
    },
    denied: function denied() {
      this.prompt.responder(false);
      __WEBPACK_IMPORTED_MODULE_2__services_NotificationService__["a" /* default */].close();
    }
  }, mounted: function mounted() {
    this.prompt = window.data || __WEBPACK_IMPORTED_MODULE_1__utils_BrowserApis__["a" /* apis */].extension.getBackgroundPage().notification || null;
  }
});

/***/ }),

/***/ 673:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(674);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(84)("4a645650", content, true, {});

/***/ }),

/***/ 674:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(83)(false);
// imports


// module
exports.push([module.i, ".warp[data-v-a2806a68]{position:absolute;top:0;left:0;right:0;height:600px;z-index:2;overflow:scroll}.header[data-v-a2806a68]{display:flex}.header p[data-v-a2806a68]{text-align:center;width:280px;padding-top:17px}.content[data-v-a2806a68]{margin:20px;padding:20px;overflow:hidden;border-radius:4px;width:280px}.btn-inline .btn[data-v-a2806a68]{margin:10px 15px}.row[data-v-a2806a68]{word-break:break-all}.col[data-v-a2806a68]{font-size:14px;width:35%}.label[data-v-a2806a68]{color:#7b7b7b}.message[data-v-a2806a68]{font-size:14px;color:#7b7b7b}.value[data-v-a2806a68]{color:#282828;width:60%}table[data-v-a2806a68]{width:100%}.form-item[data-v-a2806a68]{padding:0;margin:0;margin-bottom:10px}.btn-container .btn[data-v-a2806a68]{margin-top:20px;height:48px;width:320px}", ""]);

// exports


/***/ }),

/***/ 675:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"warp bg-gray"},[_c('section',{staticClass:"header bg-header"},[_c('i',{staticClass:"iconfont icon-back",on:{"click":_vm.denied}}),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t('enable.title')))])]),_vm._v(" "),_c('section',{staticClass:"content bg-white"},[_c('table',[_c('tbody',[_c('tr',{staticClass:"row"},[_c('td',{staticClass:"col label"},[_vm._v(_vm._s(_vm.$t('enable.domain')))]),_vm._v(" "),_c('td',{staticClass:"col value"},[_vm._v(_vm._s(_vm.prompt.domain))])])])])]),_vm._v(" "),_c('section',{staticClass:"content bg-white"},[_c('div',{staticClass:"message"},[_vm._v(_vm._s(_vm.$t('enable.message')))])]),_vm._v(" "),_c('div',{staticClass:"row btn-container",staticStyle:{"bottom":"20px","left":"20px","position":"absolute"}},[_c('div',{staticClass:"btn",on:{"click":_vm.denied}},[_vm._v(_vm._s(_vm.$t('enable.cancel')))]),_vm._v(" "),_c('div',{staticClass:"btn bg-green",on:{"click":_vm.accepted}},[_vm._v(_vm._s(_vm.$t('enable.confirm')))])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=15.js.map 