// [AIV_SHORT]  Build version: 2.2.0 - Thursday, June 4th, 2020, 2:31:20 PM  
 webpackJsonp([8],{

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

/***/ 547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_signMessage_vue__ = __webpack_require__(604);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_61ebb274_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_signMessage_vue__ = __webpack_require__(661);
function injectStyle (ssrContext) {
  __webpack_require__(659)
}
var normalizeComponent = __webpack_require__(266)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-61ebb274"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_signMessage_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_61ebb274_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_signMessage_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 577:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bytom__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_utils__ = __webpack_require__(578);





var transaction = {};

transaction.list = function (guid, asset_id, start, limit, tx_types) {
  var filter = { asset_id: asset_id };
  if (tx_types) {
    filter.tx_types = tx_types;
  }
  return __WEBPACK_IMPORTED_MODULE_2__bytom__["a" /* default */].transaction.list(guid, filter, null, start, limit);
};

transaction.convertArgument = function (argArray) {
  var fn = function asyncConvert(object) {
    var type = object.type;
    var value = object.value;
    return __WEBPACK_IMPORTED_MODULE_2__bytom__["a" /* default */].transaction.convertArgument(type, value).then(function (resp) {
      return resp.value;
    });
  };

  var actionFunction = argArray.map(fn);
  return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.all(actionFunction);
};

transaction.chainStatus = function () {
  return __WEBPACK_IMPORTED_MODULE_2__bytom__["a" /* default */].query.getblockcount();
};

transaction.asset = function (asset_id) {
  return __WEBPACK_IMPORTED_MODULE_2__bytom__["a" /* default */].query.asset(asset_id);
};

transaction.build = function (address, to, asset, amount, fee, confirmations) {
  var retPromise = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    __WEBPACK_IMPORTED_MODULE_2__bytom__["a" /* default */].transaction.buildPayment(address, to, asset, amount.toString(), fee, confirmations).then(function (res) {
      resolve(res);
    }).catch(function (error) {
      reject(error);
    });
  });
  return retPromise;
};

transaction.buildCrossChain = function (address, to, asset, amount, confirmations) {
  var retPromise = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    __WEBPACK_IMPORTED_MODULE_2__bytom__["a" /* default */].transaction.buildCrossChain(address, to, asset, amount.toString(), confirmations).then(function (res) {
      resolve(res);
    }).catch(function (error) {
      reject(error);
    });
  });
  return retPromise;
};

transaction.buildVote = function (address, vote, amount, confirmations, memo) {
  var retPromise = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    __WEBPACK_IMPORTED_MODULE_2__bytom__["a" /* default */].transaction.buildVote(address, vote, amount.toString(), confirmations, memo).then(function (res) {
      resolve(res);
    }).catch(function (error) {
      reject(error);
    });
  });
  return retPromise;
};

transaction.buildVeto = function (address, vote, amount, confirmations, memo) {
  var retPromise = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    __WEBPACK_IMPORTED_MODULE_2__bytom__["a" /* default */].transaction.buildVeto(address, vote, amount.toString(), confirmations, memo).then(function (res) {
      resolve(res);
    }).catch(function (error) {
      reject(error);
    });
  });
  return retPromise;
};

transaction.buildTransaction = function (address, inputs, outputs, gas, confirmations) {
  var retPromise = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    __WEBPACK_IMPORTED_MODULE_2__bytom__["a" /* default */].transaction.buildTransaction(address, inputs, outputs, gas, confirmations).then(function (res) {
      resolve(res);
    }).catch(function (error) {
      reject(error);
    });
  });
  return retPromise;
};

transaction.signTransaction = function (guid, transaction, password) {
  var retPromise = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    __WEBPACK_IMPORTED_MODULE_2__bytom__["a" /* default */].transaction.signTransaction(guid, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(Object(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["b" /* snakeize */])(transaction)), password).then(function (res) {
      resolve(res);
    }).catch(function (error) {
      reject(error);
    });
  });
  return retPromise;
};

transaction.transfer = function (guid, transaction, password, address) {
  var retPromise = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    __WEBPACK_IMPORTED_MODULE_2__bytom__["a" /* default */].transaction.signTransaction(guid, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(Object(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["b" /* snakeize */])(transaction)), password).then(function (ret) {
      __WEBPACK_IMPORTED_MODULE_2__bytom__["a" /* default */].transaction.submitPayment(address, ret.raw_transaction, ret.signatures).then(function (res3) {
        var object = {
          transactionHash: res3.txHash
        };
        resolve(object);
      }).catch(function (error) {
        reject(error);
      });
    }).catch(function (error) {
      reject(error);
    });
  });

  return retPromise;
};

transaction.signMessage = function (message, password, address) {
  return __WEBPACK_IMPORTED_MODULE_2__bytom__["a" /* default */].keys.signMessage(message, password, address);
};

transaction.advancedTransfer = function (guid, transaction, password, arrayData, address) {
  var retPromise = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    __WEBPACK_IMPORTED_MODULE_2__bytom__["a" /* default */].transaction.signTransaction(guid, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(Object(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["b" /* snakeize */])(transaction)), password).then(function (ret) {
      var signatures = ret.signatures;
      if (arrayData) {
        signatures[0] = arrayData;
      }
      __WEBPACK_IMPORTED_MODULE_2__bytom__["a" /* default */].transaction.submitPayment(address, ret.raw_transaction, signatures).then(function (res3) {
        var object = {
          transactionHash: res3.txHash
        };
        resolve(object);
      }).catch(function (error) {
        reject(error);
      });
    }).catch(function (error) {
      reject(error);
    });
  });

  return retPromise;
};

/* harmony default export */ __webpack_exports__["a"] = (transaction);

/***/ }),

/***/ 578:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return camelize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return snakeize; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);

var camelize = function camelize(object) {
  if ((typeof object === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(object)) == 'object') {
    for (var key in object) {
      var value = object[key];
      var newKey = key;

      if (/_/.test(key)) {
        newKey = key.replace(/([_][a-z])/g, function (v) {
          return v[1].toUpperCase();
        });
        delete object[key];
      }

      if ((typeof value === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(value)) == 'object') {
        value = camelize(value);
      }

      object[newKey] = value;
    }

    return object;
  } else {
    return object.replace(/([_][a-z])/g, function (v) {
      return v[1].toUpperCase();
    });
  }
};

var snakeize = function snakeize(object) {
  for (var key in object) {
    var value = object[key];
    var newKey = key;

    // Skip all-caps keys
    if (/^[A-Z]+$/.test(key)) {
      continue;
    }

    if (/[A-Z]/.test(key)) {
      newKey = key.replace(/([A-Z])/g, function (v) {
        return '_' + v.toLowerCase();
      });
      delete object[key];
    }

    if ((typeof value === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(value)) == 'object') {
      value = snakeize(value);
    }

    object[newKey] = value;
  }

  return object;
};

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

/***/ 592:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMzIwIDgwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiB1cmwoI2xpbmVhci1ncmFkaWVudCk7CiAgICAgIH0KCiAgICAgIC5jbHMtMiB7CiAgICAgICAgZmlsbDogIzIwMjAyMDsKICAgICAgfQoKICAgICAgLmNscy0zIHsKICAgICAgICBvcGFjaXR5OiAwLjM3MjsKICAgICAgICBjbGlwLXBhdGg6IHVybCgjY2xpcC1wYXRoKTsKICAgICAgfQoKICAgICAgLmNscy00IHsKICAgICAgICBmaWxsOiAjM2MzYzNjOwogICAgICB9CiAgICA8L3N0eWxlPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQiIHkxPSIxIiB4Mj0iMSIgZ3JhZGllbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMzViZDQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjM2NmZmRhIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGNsaXBQYXRoIGlkPSJjbGlwLXBhdGgiPgogICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlXzUyMzUiIGRhdGEtbmFtZT0iUmVjdGFuZ2xlIDUyMzUiIGNsYXNzPSJjbHMtMSIgd2lkdGg9IjMyMCIgaGVpZ2h0PSI4MCIgcng9IjQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwIDIwKSIvPgogICAgPC9jbGlwUGF0aD4KICA8L2RlZnM+CiAgPGcgaWQ9ImJhY2tncm91bmQtd2FsbGV0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAgLTc5KSI+CiAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlXzUyMzQiIGRhdGEtbmFtZT0iUmVjdGFuZ2xlIDUyMzQiIGNsYXNzPSJjbHMtMiIgd2lkdGg9IjMyMCIgaGVpZ2h0PSI4MCIgcng9IjQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwIDc5KSIvPgogICAgPGcgaWQ9Ik1hc2tfR3JvdXBfNDQiIGRhdGEtbmFtZT0iTWFzayBHcm91cCA0NCIgY2xhc3M9ImNscy0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDU5KSI+CiAgICAgIDxlbGxpcHNlIGlkPSJFbGxpcHNlXzEyNyIgZGF0YS1uYW1lPSJFbGxpcHNlIDEyNyIgY2xhc3M9ImNscy00IiBjeD0iMjA0LjUiIGN5PSIxNTEuNDgxIiByeD0iMjA0LjUiIHJ5PSIxNTEuNDgxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODQgLTE2OC40NjYpIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"

/***/ }),

/***/ 604:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_transaction__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_account__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_language_sdk__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_constants__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_BrowserApis__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_NotificationService__ = __webpack_require__(534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vuex__ = __webpack_require__(433);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            full: false,
            accounts: {},
            account: {},
            accountBalance: 0.00,
            address: '',
            message: '',
            password: '',
            prompt: ''
        };
    },

    computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_7_vuex__["c" /* mapGetters */])(['net', 'netType', 'accountList'])),
    watch: {},
    methods: {
        close: function close() {
            __WEBPACK_IMPORTED_MODULE_6__services_NotificationService__["a" /* default */].close();
        },
        sign: function sign() {
            var _this = this;

            var loader = this.$loading.show({
                container: null,
                canCancel: true,
                onCancel: this.onCancel
            });

            __WEBPACK_IMPORTED_MODULE_1__models_transaction__["a" /* default */].signMessage(this.message, this.password, this.address).then(function (resp) {
                loader.hide();
                _this.prompt.responder(resp);
                _this.$dialog.show({
                    type: 'success',
                    body: _this.$t("transfer.success")
                });
                __WEBPACK_IMPORTED_MODULE_6__services_NotificationService__["a" /* default */].close();
            }).catch(function (error) {
                loader.hide();

                _this.$dialog.show({
                    body: Object(__WEBPACK_IMPORTED_MODULE_3__assets_language_sdk__["a" /* default */])(error.message)
                });
            });
        }
    }, mounted: function mounted() {
        var _this2 = this;

        this.prompt = window.data || __WEBPACK_IMPORTED_MODULE_5__utils_BrowserApis__["a" /* apis */].extension.getBackgroundPage().notification || null;
        var object = this.prompt.data;

        if (object.address !== undefined) {
            this.address = object.address;
        }
        if (object.message !== undefined) {
            this.message = object.message;
        }

        var account = this.accountList.filter(function (a) {
            return a.address === _this2.address || a.vpAddress === _this2.address;
        })[0];
        this.account = account;

        var balances = this.netType === 'vapor' ? account.vpBalances : account.balances;
        var balance = 0;
        if (balances.length > 0) {
            var balanceObject = balances.filter(function (b) {
                return b.asset.assetId === __WEBPACK_IMPORTED_MODULE_4__utils_constants__["a" /* BTM */];
            })[0];
            balance = balanceObject.availableBalance;
        }

        this.accountBalance = balance;
    }
});

/***/ }),

/***/ 659:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(660);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(84)("bee98954", content, true, {});

/***/ }),

/***/ 660:
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(283);
exports = module.exports = __webpack_require__(83)(false);
// imports


// module
exports.push([module.i, ".warp[data-v-61ebb274]{position:absolute;top:0;left:0;right:0;height:600px;z-index:2;overflow:scroll}.header[data-v-61ebb274]{display:flex}.header p[data-v-61ebb274]{text-align:center;width:280px;padding-top:17px}.balance[data-v-61ebb274]{width:280px;height:40px;margin:20px;padding:20px;display:flex}.balance .token-amount[data-v-61ebb274]{display:inline-block}.balance .token-amount .asset[data-v-61ebb274]{font-size:18px}.small[data-v-61ebb274]{font-size:12px}.transfer-header[data-v-61ebb274]{background-image:url(" + escape(__webpack_require__(592)) + ");background-size:320px 80px}.wallet[data-v-61ebb274]{width:40px;height:40px;background:hsla(0,0%,100%,.1);border-radius:50%;color:#fff;margin-right:20px;line-height:40px;text-align:center}.content[data-v-61ebb274]{margin:20px;padding:20px;overflow:hidden;border-radius:4px;width:280px}.divider[data-v-61ebb274]{margin:12px 0}.value .uint[data-v-61ebb274]{font-size:12px;margin-left:3px}.btn-inline .btn[data-v-61ebb274]{margin:10px 15px}.row[data-v-61ebb274]{word-break:break-all}.col[data-v-61ebb274]{font-size:14px;width:35%}.label[data-v-61ebb274]{color:#7b7b7b}.value[data-v-61ebb274]{color:#282828;width:60%}table[data-v-61ebb274]{width:100%}.form-item[data-v-61ebb274]{padding:0;margin:0;margin-bottom:10px}.btn-container .btn[data-v-61ebb274]{height:48px;bottom:20px;position:absolute;width:320px}", ""]);

// exports


/***/ }),

/***/ 661:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"warp bg-gray"},[_c('section',{staticClass:"header bg-header"},[_c('i',{staticClass:"iconfont icon-back",on:{"click":_vm.close}}),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t('signMessage.title')))])]),_vm._v(" "),_c('section',{staticClass:"balance transfer-header"},[_vm._m(0),_vm._v(" "),_c('div',[_c('div',{staticClass:"token-amount"},[_vm._v("\n        "+_vm._s(_vm.accountBalance)+"\n        "),_c('span',{staticClass:"asset"},[_vm._v("BTM")])]),_vm._v(" "),_c('div',{staticClass:"small color-grey"},[_vm._v("\n        "+_vm._s(_vm.account.alias)+"\n      ")])])]),_vm._v(" "),_c('section',{staticClass:"content bg-white"},[_c('table',[_c('tbody',[_c('tr',{staticClass:"row"},[_c('td',{staticClass:"col label"},[_vm._v(_vm._s(_vm.$t('signMessage.address')))]),_vm._v(" "),_c('td',{staticClass:"col value"},[_vm._v(_vm._s(_vm.address))])]),_vm._v(" "),_c('div',{staticClass:"divider"}),_vm._v(" "),_c('tr',{staticClass:"row"},[_c('td',{staticClass:"col label"},[_vm._v(_vm._s(_vm.$t('signMessage.message')))]),_vm._v(" "),_c('td',{staticClass:"col value"},[_vm._v(_vm._s(_vm.message))])])])])]),_vm._v(" "),_c('section',{staticClass:"content bg-white"},[_c('div',{staticClass:"form"},[_c('div',{staticClass:"form-item"},[_c('label',{staticClass:"form-item-label"},[_vm._v(_vm._s(_vm.$t('transfer.confirmPassword')))]),_vm._v(" "),_c('div',{staticClass:"form-item-content"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],attrs:{"type":"password","autofocus":""},domProps:{"value":(_vm.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password=$event.target.value}}})])])])]),_vm._v(" "),_c('div',{staticClass:"row btn-container",staticStyle:{"margin":"20px","position":"static"}},[_c('div',{staticClass:"btn bg-green",on:{"click":_vm.sign}},[_vm._v(_vm._s(_vm.$t('signMessage.confirmSignature')))])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wallet"},[_c('i',{staticClass:"iconfont icon-wallet"})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=8.js.map 