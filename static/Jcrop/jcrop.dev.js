var Jcrop =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./build/js/jcrop.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/js/animate.js":
/*!*****************************!*\
  !*** ./build/js/animate.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _easing = __webpack_require__(/*! ./easing */ "./build/js/easing.js");

var _easing2 = _interopRequireDefault(_easing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Animate function uses requestAnimationFrame to sequence events
// Easing functions adapted from jQuery-ui and Robert Penner's equations
// el - element to animate
// from and to - "rect" objects representing initial and target coordinates
// cb - callback receives a "rect" object for each update/frame
// frames - number of frames to animate
// efunc - name of easing function to use
// returns a Promise that resolves when the animation is complete

function Animate(el, from, to, cb) {
  var frames = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 30;
  var efunc = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'swing';

  // Set the keys to update, in this case it is our Rect's properties
  // Normalize the initial state as a Rect named "cur"
  var p = ['x', 'y', 'w', 'h'];
  var cur = from.normalize();

  // Lookup the easing function if it is a string
  efunc = typeof efunc === 'string' ? _easing2.default[efunc] : efunc;

  var curFrame = 0;

  // Return a promise that will resolve when the animation is complete
  return new Promise(function (resolve, reject) {
    function step() {
      if (curFrame < frames) {
        // Update each key for this frame
        p.forEach(function (key) {
          cur[key] = Math.round(efunc(curFrame, from[key], to[key] - from[key], frames));
        });

        // Send it to the callback function
        // update the current frame counter
        // and request the next animation frame
        cb(cur);
        curFrame++;
        requestAnimationFrame(step);
      } else {
        // We've reached the end of the animation frames
        cb(to);
        resolve();
      }
    }

    requestAnimationFrame(step);
  });
}

exports.default = Animate;

/***/ }),

/***/ "./build/js/confobj.js":
/*!*****************************!*\
  !*** ./build/js/confobj.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extend = __webpack_require__(/*! ./util/extend */ "./build/js/util/extend.js");

var _extend2 = _interopRequireDefault(_extend);

var _domobj = __webpack_require__(/*! ./domobj */ "./build/js/domobj.js");

var _domobj2 = _interopRequireDefault(_domobj);

var _defaults = __webpack_require__(/*! ./defaults */ "./build/js/defaults.js");

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfObj = function (_DomObj) {
  _inherits(ConfObj, _DomObj);

  function ConfObj(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ConfObj);

    var _this = _possibleConstructorReturn(this, (ConfObj.__proto__ || Object.getPrototypeOf(ConfObj)).call(this, el));

    _this.options = {};
    Object.defineProperty(_this, '_optconf', {
      configurable: false,
      enumerable: false,
      value: {},
      writable: true
    });
    _this.initOptions();
    _this.setOptions((0, _extend2.default)({}, _defaults2.default, options));
    return _this;
  }

  _createClass(ConfObj, [{
    key: 'setOptions',
    value: function setOptions(options) {
      var _this2 = this;

      this.options = (0, _extend2.default)({}, this.options, options);

      Object.keys(options).forEach(function (key) {
        if (_this2._optconf[key]) _this2._optconf[key](options[key]);
      });

      return this;
    }
  }, {
    key: 'initOptions',
    value: function initOptions() {}
  }]);

  return ConfObj;
}(_domobj2.default);

exports.default = ConfObj;

/***/ }),

/***/ "./build/js/defaults.js":
/*!******************************!*\
  !*** ./build/js/defaults.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  animateEasingFunction: 'swing',
  animateFrames: 30,
  multi: false,
  multiMax: null,
  multiMin: 1,
  cropperClass: 'jcrop-widget',
  disabledClass: 'jcrop-disable',
  canDrag: true,
  canResize: true,
  canSelect: true,
  canRemove: true,
  multiple: false,
  autoFront: true,
  active: true,
  handles: ['n', 's', 'e', 'w', 'sw', 'nw', 'ne', 'se'],
  shade: true,
  shadeClass: 'jcrop-shade',
  shadeColor: 'black',
  shadeOpacity: 0.5,
  widgetConstructor: null,
  x: 0,
  y: 0,
  w: 100,
  h: 100
};

/***/ }),

/***/ "./build/js/domobj.js":
/*!****************************!*\
  !*** ./build/js/domobj.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomObj = function () {
  function DomObj(el) {
    _classCallCheck(this, DomObj);

    if (typeof el === 'string') el = document.getElementById(el);
    this.el = el;
  }

  _createClass(DomObj, [{
    key: 'appendTo',
    value: function appendTo(el) {
      if (typeof el === 'string') el = document.getElementById(el);
      el.appendChild(this.el);
      return this;
    }
  }, {
    key: 'emit',
    value: function emit(evname) {
      var ev = document.createEvent('Event');
      ev.initEvent(evname, true, true);
      ev.cropTarget = this;
      this.el.dispatchEvent(ev);
    }
  }, {
    key: 'removeClass',
    value: function removeClass(cl) {
      this.el.className = this.el.className.split(' ').filter(function (i) {
        return cl !== i;
      }).join(' ');
      return this;
    }
  }, {
    key: 'hasClass',
    value: function hasClass(cl) {
      return this.el.className.split(' ').filter(function (i) {
        return cl === i;
      }).length;
    }
  }, {
    key: 'addClass',
    value: function addClass(cl) {
      if (!this.hasClass(cl)) this.el.className += ' ' + cl;
      return this;
    }
  }, {
    key: 'listen',
    value: function listen(evname, handler) {
      this.el.addEventListener(evname, function (e) {
        return handler(e.cropTarget, e);
      });
      return this;
    }
  }]);

  return DomObj;
}();

exports.default = DomObj;

/***/ }),

/***/ "./build/js/dragger.js":
/*!*****************************!*\
  !*** ./build/js/dragger.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
  Dragger function - sets up dragging callbacks on an element
*/

var Dragger = function Dragger(el, startcb, movecb, donecb) {
  var ox, oy;
  if (typeof el === 'string') el = document.getElementById(el);

  el.addEventListener('mousedown', start);
  el.addEventListener('touchstart', start);

  function start(e) {
    var obj = e.type === 'touchstart' ? e.touches[0] : e;

    ox = obj.pageX;
    oy = obj.pageY;

    e.preventDefault();
    e.stopPropagation();

    if (!startcb(ox, oy, obj)) return;

    if (e.type === 'mousedown') {
      window.addEventListener('mousemove', move);
      document.addEventListener('mouseup', done);
    } else if (e.type === 'touchstart') {
      document.addEventListener('touchmove', move);
      document.addEventListener('touchend', done);
    }
  }

  function move(e) {
    var obj = e.type === 'touchmove' ? e.changedTouches[0] : e;
    e.stopPropagation();
    movecb(obj.pageX - ox, obj.pageY - oy);
  }

  function done(e) {
    var obj = e.type === 'touchend' ? e.changedTouches[0] : e;

    if (obj.pageX && obj.pageY) movecb(obj.pageX - ox, obj.pageY - oy);

    document.removeEventListener('mouseup', done);
    window.removeEventListener('mousemove', move);
    document.removeEventListener('touchmove', move);
    document.removeEventListener('touchend', done);

    donecb();
  }

  function remove() {
    el.removeEventListener('mousedown', start);
    el.removeEventListener('touchstart', start);
  }

  return { remove: remove };
};

exports.default = Dragger;

/***/ }),

/***/ "./build/js/easing.js":
/*!****************************!*\
  !*** ./build/js/easing.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* ============================================================
 * Easing functions adapted from jQuery easing library
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * ======================================================== */
/* eslint-disable */

var m = module.exports = {
  // t: current time, b: begInnIng value, c: change In value, d: duration
  def: 'outQuad',
  swing: function swing(t, b, c, d) {
    return m[m.def](t, b, c, d);
  },
  inQuad: function inQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  outQuad: function outQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },
  inOutQuad: function inOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * (--t * (t - 2) - 1) + b;
  },
  inCubic: function inCubic(t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  outCubic: function outCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  inOutCubic: function inOutCubic(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  },
  inQuart: function inQuart(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  },
  outQuart: function outQuart(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  inOutQuart: function inOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  },
  inQuint: function inQuint(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  outQuint: function outQuint(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  inOutQuint: function inOutQuint(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  },
  inSine: function inSine(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  },
  outSine: function outSine(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },
  inOutSine: function inOutSine(t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },
  inExpo: function inExpo(t, b, c, d) {
    return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  },
  outExpo: function outExpo(t, b, c, d) {
    return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  },
  inOutExpo: function inOutExpo(t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  inCirc: function inCirc(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  outCirc: function outCirc(t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  inOutCirc: function inOutCirc(t, b, c, d) {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  },
  inElastic: function inElastic(t, b, c, d) {
    var s = 1.70158;var p = 0;var a = c;
    if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
    if (a < Math.abs(c)) {
      a = c;var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  },
  outElastic: function outElastic(t, b, c, d) {
    var s = 1.70158;var p = 0;var a = c;
    if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
    if (a < Math.abs(c)) {
      a = c;var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  },
  inOutElastic: function inOutElastic(t, b, c, d) {
    var s = 1.70158;var p = 0;var a = c;
    if (t == 0) return b;if ((t /= d / 2) == 2) return b + c;if (!p) p = d * (.3 * 1.5);
    if (a < Math.abs(c)) {
      a = c;var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
  },
  inBack: function inBack(t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  outBack: function outBack(t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  inOutBack: function inOutBack(t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
  },
  inBounce: function inBounce(t, b, c, d) {
    return c - m.outBounce(d - t, 0, c, d) + b;
  },
  outBounce: function outBounce(t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
    }
  },
  inOutBounce: function inOutBounce(t, b, c, d) {
    if (t < d / 2) return m.inBounce(t * 2, 0, c, d) * .5 + b;
    return m.outBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
  }
};

/*
 * TERMS OF USE - EASING EQUATIONS
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be
 * used to endorse or promote products derived from this software
 * without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
 * THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

/***/ }),

/***/ "./build/js/handle.js":
/*!****************************!*\
  !*** ./build/js/handle.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domobj = __webpack_require__(/*! ./domobj */ "./build/js/domobj.js");

var _domobj2 = _interopRequireDefault(_domobj);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Handle = function (_DomObj) {
  _inherits(Handle, _DomObj);

  function Handle() {
    _classCallCheck(this, Handle);

    return _possibleConstructorReturn(this, (Handle.__proto__ || Object.getPrototypeOf(Handle)).apply(this, arguments));
  }

  return Handle;
}(_domobj2.default);

Handle.create = function (clname) {
  var el = document.createElement('div');
  el.className = clname;
  return new Handle(el);
};

exports.default = Handle;

/***/ }),

/***/ "./build/js/jcrop.js":
/*!***************************!*\
  !*** ./build/js/jcrop.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DomObj = exports.Shade = exports.load = exports.easing = exports.Sticker = exports.Handle = exports.Rect = exports.Widget = exports.Dragger = exports.defaults = exports.Stage = undefined;
exports.attach = attach;

var _extend = __webpack_require__(/*! ./util/extend */ "./build/js/util/extend.js");

var _extend2 = _interopRequireDefault(_extend);

var _defaults = __webpack_require__(/*! ./defaults */ "./build/js/defaults.js");

var _defaults2 = _interopRequireDefault(_defaults);

var _dom = __webpack_require__(/*! ./stage/dom */ "./build/js/stage/dom.js");

var _dom2 = _interopRequireDefault(_dom);

var _image = __webpack_require__(/*! ./stage/image */ "./build/js/stage/image.js");

var _image2 = _interopRequireDefault(_image);

var _widget = __webpack_require__(/*! ./widget */ "./build/js/widget.js");

var _widget2 = _interopRequireDefault(_widget);

var _shade = __webpack_require__(/*! ./shade */ "./build/js/shade.js");

var _shade2 = _interopRequireDefault(_shade);

var _handle = __webpack_require__(/*! ./handle */ "./build/js/handle.js");

var _handle2 = _interopRequireDefault(_handle);

var _dragger = __webpack_require__(/*! ./dragger */ "./build/js/dragger.js");

var _dragger2 = _interopRequireDefault(_dragger);

var _rect = __webpack_require__(/*! ./rect */ "./build/js/rect.js");

var _rect2 = _interopRequireDefault(_rect);

var _sticker = __webpack_require__(/*! ./sticker */ "./build/js/sticker.js");

var _sticker2 = _interopRequireDefault(_sticker);

var _domobj = __webpack_require__(/*! ./domobj */ "./build/js/domobj.js");

var _domobj2 = _interopRequireDefault(_domobj);

var _easing = __webpack_require__(/*! ./easing */ "./build/js/easing.js");

var _easing2 = _interopRequireDefault(_easing);

var _loader = __webpack_require__(/*! ./loader */ "./build/js/loader.js");

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function attach(el) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  options = (0, _extend2.default)({}, _defaults2.default, options);

  if (typeof el === 'string') el = document.getElementById(el);
  if (el.tagName === 'IMG') return new _image2.default(el, options);

  return new _dom2.default(el, options);
}

exports.Stage = _dom2.default;
exports.defaults = _defaults2.default;
exports.Dragger = _dragger2.default;
exports.Widget = _widget2.default;
exports.Rect = _rect2.default;
exports.Handle = _handle2.default;
exports.Sticker = _sticker2.default;
exports.easing = _easing2.default;
exports.load = _loader2.default;
exports.Shade = _shade2.default;
exports.DomObj = _domobj2.default;
exports.default = { Stage: _dom2.default, defaults: _defaults2.default, Dragger: _dragger2.default, Widget: _widget2.default, Rect: _rect2.default, Handle: _handle2.default, Sticker: _sticker2.default, easing: _easing2.default, load: _loader2.default, attach: attach, Shade: _shade2.default, DomObj: _domobj2.default };

/***/ }),

/***/ "./build/js/keyboard.js":
/*!******************************!*\
  !*** ./build/js/keyboard.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboard = function () {
  function Keyboard(widget) {
    _classCallCheck(this, Keyboard);

    this.widget = widget;
    this.attach();
  }

  _createClass(Keyboard, [{
    key: 'attach',
    value: function attach() {
      var c = this.widget;
      c.el.addEventListener('keydown', function (e) {
        var d = e.shiftKey ? 10 : 1;
        switch (e.key) {
          case 'ArrowRight':
            c.nudge(d);break;
          case 'ArrowLeft':
            c.nudge(-d);break;
          case 'ArrowUp':
            c.nudge(0, -d);break;
          case 'ArrowDown':
            c.nudge(0, d);break;

          case 'Delete':
          case 'Backspace':
            c.stage.removeWidget(c);
            break;

          default:
            return;
        }
        e.preventDefault();
      });
    }
  }]);

  return Keyboard;
}();

Keyboard.attach = function (widget) {
  return new Keyboard(widget);
};

exports.default = Keyboard;

/***/ }),

/***/ "./build/js/loader.js":
/*!****************************!*\
  !*** ./build/js/loader.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// IMAGE LOADING/LOADED FUNCTIONS
// returns a promise that resolves when image is loaded
// if it's already loaded, the promise will resolve immediately
function Loader(img) {
  if (typeof img === 'string') img = document.getElementById(img);

  return new Promise(function (resolve, reject) {
    if (Loader.check(img)) return resolve(img);

    function handler(e) {
      img.removeEventListener('load', handler);
      img.removeEventListener('error', handler);
      e.type === 'load' ? resolve(img) : reject(img);
    }

    img.addEventListener('load', handler);
    img.addEventListener('error', handler);
  });
}

// static method to check if image is completely loaded
Loader.check = function (img) {
  if (!img.complete) return false;
  if (img.naturalWidth === 0) return false;
  return true;
};

exports.default = Loader;

/***/ }),

/***/ "./build/js/rect.js":
/*!**************************!*\
  !*** ./build/js/rect.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Rect class -- describes a rectangle with two points, usually
   top left and bottom right. It allows the second set of coordinates
   to be described as either w/h or x2/y2 and allows getting and
   setting of those values such that the object values will always be
   consistent with the latest input. It should be noted that it does not
   attempt to keep these points normalized. That is, you should expect
   to see the actual w/h properties to sometimes be negative values.
   To normalize the values, use the normalize method, which will return
   a new Rect object with normalized values.
*/
var Rect = function () {
  function Rect() {
    _classCallCheck(this, Rect);

    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
  }

  _createClass(Rect, [{
    key: 'round',
    value: function round() {
      return Rect.create(Math.round(this.x), Math.round(this.y), Math.round(this.w), Math.round(this.h));
    }
  }, {
    key: 'normalize',
    value: function normalize() {
      var _ref = [Math.min(this.x, this.x2), Math.min(this.y, this.y2), Math.max(this.x, this.x2), Math.max(this.y, this.y2)],
          x1 = _ref[0],
          y1 = _ref[1],
          x2 = _ref[2],
          y2 = _ref[3];

      return Rect.create(x1, y1, x2 - x1, y2 - y1);
    }
  }, {
    key: 'rebound',
    value: function rebound(w, h) {
      var rect = this.normalize();
      if (rect.x < 0) rect.x = 0;
      if (rect.y < 0) rect.y = 0;
      if (rect.x2 > w) rect.x = w - rect.w;
      if (rect.y2 > h) rect.y = h - rect.h;
      return rect;
    }
  }, {
    key: 'scale',
    value: function scale(x, y) {
      y = y || x;
      return Rect.create(this.x * x, this.y * y, this.w * x, this.h * y);
    }
  }, {
    key: 'unscale',
    value: function unscale(x, y) {
      y = y || x;
      return Rect.create(this.x / x, this.y / y, this.w / x, this.h / y);
    }
  }, {
    key: 'center',
    value: function center(w, h) {
      return Rect.create((w - this.w) / 2, (h - this.h) / 2, this.w, this.h);
    }
  }, {
    key: 'toArray',
    value: function toArray() {
      return [this.x, this.y, this.w, this.h];
    }
  }, {
    key: 'x1',
    set: function set(v) {
      this.w = this.x2 - v;
      this.x = v;
    }
  }, {
    key: 'y1',
    set: function set(v) {
      this.h = this.y2 - v;
      this.y = v;
    }
  }, {
    key: 'x2',
    get: function get() {
      return this.x + this.w;
    },
    set: function set(x) {
      this.w = x - this.x;
    }
  }, {
    key: 'y2',
    get: function get() {
      return this.y + this.h;
    },
    set: function set(y) {
      this.h = y - this.y;
    }
  }, {
    key: 'aspect',
    get: function get() {
      return this.w / this.h;
    }
  }]);

  return Rect;
}();

Rect.fromPoints = function (p1, p2) {
  var _ref2 = [Math.min(p1[0], p2[0]), Math.min(p1[1], p2[1]), Math.max(p1[0], p2[0]), Math.max(p1[1], p2[1])],
      x1 = _ref2[0],
      y1 = _ref2[1],
      x2 = _ref2[2],
      y2 = _ref2[3];

  return Rect.create(x1, y1, x2 - x1, y2 - y1);
};

Rect.create = function () {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var c = new Rect();
  c.x = x;
  c.y = y;
  c.w = w;
  c.h = h;
  return c;
};

Rect.from = function (el) {
  if (Array.isArray(el)) return Rect.fromArray(el);
  var c = new Rect();
  c.x = el.offsetLeft;
  c.y = el.offsetTop;
  c.w = el.offsetWidth;
  c.h = el.offsetHeight;
  return c;
};

Rect.fromArray = function (args) {
  if (args.length === 4) return Rect.create.apply(this, args);else if (args.length === 2) return Rect.fromPoints(args[0], args[1]);else throw new Error('fromArray method problem');
};

Rect.sizeOf = function (el, y) {
  if (y) return Rect.create(0, 0, el, y);
  var c = new Rect();
  c.w = el.offsetWidth;
  c.h = el.offsetHeight;
  return c;
};

Rect.getMax = function (w, h, aspect) {
  if (w / h > aspect) return [h * aspect, h];else return [w, w / aspect];
};

Rect.fromPoint = function (point, w, h) {
  var quad = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'br';

  var c = new Rect();
  c.x = point[0];
  c.y = point[1];
  switch (quad) {
    case 'br':
      c.x2 = c.x + w;
      c.y2 = c.y + h;
      break;
    case 'bl':
      c.x2 = c.x - w;
      c.y2 = c.y + h;
      break;
    case 'tl':
      c.x2 = c.x - w;
      c.y2 = c.y - h;
      break;
    case 'tr':
      c.x2 = c.x + w;
      c.y2 = c.y - h;
      break;
  }
  return c;
};

exports.default = Rect;

/***/ }),

/***/ "./build/js/shade.js":
/*!***************************!*\
  !*** ./build/js/shade.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rect = __webpack_require__(/*! ./rect */ "./build/js/rect.js");

var _rect2 = _interopRequireDefault(_rect);

var _domobj = __webpack_require__(/*! ./domobj */ "./build/js/domobj.js");

var _domobj2 = _interopRequireDefault(_domobj);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Manager = function () {
  function Manager(el) {
    _classCallCheck(this, Manager);

    if (typeof el === 'string') el = document.getElementById(el);
    this.el = el;
    this.shades = {};
  }

  _createClass(Manager, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.active = options.shade !== undefined ? options.shade : true;

      this.keys().forEach(function (key) {
        _this.shades[key] = Shade.create(options, key);
      });

      this.el.addEventListener('crop.update', function (e) {
        if (e.cropTarget.isActive() && e.cropTarget.options.shade) {
          _this.adjust(e.cropTarget.pos);
        }
      }, false);

      this.enable();
    }
  }, {
    key: 'adjust',
    value: function adjust(rect) {
      var f = _rect2.default.from(this.el);
      var s = this.shades;
      s.t.h = rect.y;
      s.b.h = f.h - rect.y2;
      s.t.w = s.b.w = Math.floor(rect.w);
      s.l.w = s.t.x = s.b.x = Math.ceil(rect.x);
      s.r.w = f.w - (Math.ceil(rect.x) + Math.floor(rect.w));
    }
  }, {
    key: 'keys',
    value: function keys() {
      return ['t', 'l', 'r', 'b'];
    }
  }, {
    key: 'enable',
    value: function enable() {
      var _this2 = this;

      var s = this.shades;
      this.keys().forEach(function (key) {
        return s[key].insert(_this2.el);
      });
    }
  }, {
    key: 'disable',
    value: function disable() {
      var s = this.shades;
      this.keys().forEach(function (key) {
        return s[key].remove();
      });
    }
  }, {
    key: 'setStyle',
    value: function setStyle(color, opacity) {
      var s = this.shades;
      this.keys().forEach(function (key) {
        return s[key].color(color).opacity(opacity);
      });
    }
  }]);

  return Manager;
}();

Manager.attach = function (i) {
  var el = i.el;
  var m = new Manager(el);
  m.init(i.options);
  i.shades = m;
  i._optconf['shade'] = function (v) {
    return i.updateShades();
  };
  i._optconf['shadeColor'] = function (v) {
    return m.setStyle(v);
  };
  i._optconf['shadeOpacity'] = function (v) {
    return m.setStyle(null, v);
  };
  return m;
};

var Shade = function (_DomObj) {
  _inherits(Shade, _DomObj);

  function Shade() {
    _classCallCheck(this, Shade);

    return _possibleConstructorReturn(this, (Shade.__proto__ || Object.getPrototypeOf(Shade)).apply(this, arguments));
  }

  _createClass(Shade, [{
    key: 'insert',
    value: function insert(el) {
      el.appendChild(this.el);
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.el.remove();
    }
  }, {
    key: 'color',
    value: function color(c) {
      if (c) this.el.style.backgroundColor = c;
      return this;
    }
  }, {
    key: 'opacity',
    value: function opacity(o) {
      if (o) this.el.style.opacity = o;
      return this;
    }
  }, {
    key: 'w',
    set: function set(w) {
      this.el.style.width = w + 'px';
    }
  }, {
    key: 'h',
    set: function set(h) {
      this.el.style.height = h + 'px';
    }
  }, {
    key: 'x',
    set: function set(l) {
      this.el.style.left = l + 'px';
    }
  }]);

  return Shade;
}(_domobj2.default);

Shade.create = function (o, key) {
  var el = document.createElement('div');
  var clname = o.shadeClass || 'jcrop-shade';
  el.className = clname + ' ' + key;
  var obj = new Shade(el);
  return obj.color(o.shadeColor).opacity(o.shadeOpacity);
};

Shade.Manager = Manager;

exports.default = Shade;

/***/ }),

/***/ "./build/js/stage/dom.js":
/*!*******************************!*\
  !*** ./build/js/stage/dom.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _extend = __webpack_require__(/*! ../util/extend */ "./build/js/util/extend.js");

var _extend2 = _interopRequireDefault(_extend);

var _widget = __webpack_require__(/*! ../widget */ "./build/js/widget.js");

var _widget2 = _interopRequireDefault(_widget);

var _shade = __webpack_require__(/*! ../shade */ "./build/js/shade.js");

var _shade2 = _interopRequireDefault(_shade);

var _dragger = __webpack_require__(/*! ../dragger */ "./build/js/dragger.js");

var _dragger2 = _interopRequireDefault(_dragger);

var _confobj = __webpack_require__(/*! ../confobj */ "./build/js/confobj.js");

var _confobj2 = _interopRequireDefault(_confobj);

var _sticker = __webpack_require__(/*! ../sticker */ "./build/js/sticker.js");

var _sticker2 = _interopRequireDefault(_sticker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stage = function (_ConfObj) {
  _inherits(Stage, _ConfObj);

  function Stage(el, options) {
    _classCallCheck(this, Stage);

    var _this = _possibleConstructorReturn(this, (Stage.__proto__ || Object.getPrototypeOf(Stage)).call(this, el, options));

    _this.scalex = 1;
    _this.scaley = 1;
    _this.crops = new Set();
    _this.active = null;
    _this.enabled = true;
    _this.init();
    return _this;
  }

  _createClass(Stage, [{
    key: 'init',
    value: function init() {
      this.initStageDrag();
      _shade2.default.Manager.attach(this);
    }
  }, {
    key: 'initOptions',
    value: function initOptions() {
      var _this2 = this;

      this._optconf['multi'] = function (v) {
        if (!v) _this2.limitWidgets();
      };
    }
  }, {
    key: 'setEnabled',
    value: function setEnabled() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var clname = this.options.disabledClass || 'jcrop-disable';
      this[v ? 'removeClass' : 'addClass'](clname);
      this.enabled = !!v;
      return this;
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (!this.enabled) return false;
      if (this.active) this.active.el.focus();else this.el.focus();
      return this;
    }
  }, {
    key: 'limitWidgets',
    value: function limitWidgets() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      if (!this.crops || n < 1) return false;
      var crops = Array.from(this.crops);
      while (crops.length > n) {
        this.removeWidget(crops.shift());
      }return this;
    }
  }, {
    key: 'canCreate',
    value: function canCreate() {
      var n = this.crops.size;
      var o = this.options;
      if (!this.enabled) return false;
      if (o.multiMax !== null && n >= o.multiMax) return false;
      if (!o.multi && n >= o.multiMin) return false;
      return true;
    }
  }, {
    key: 'canRemove',
    value: function canRemove() {
      var n = this.crops.size;
      var o = this.options;
      if (!this.enabled) return false;
      if (this.active && !this.active.options.canRemove) return false;
      if (!o.canRemove || n <= o.multiMin) return false;
      return true;
    }
  }, {
    key: 'initStageDrag',
    value: function initStageDrag() {
      var _this3 = this;

      var crop, pos, w, h, stick;
      (0, _dragger2.default)(this.el, function (x, y, e) {
        if (!_this3.canCreate()) return false;
        crop = (_this3.options.widgetConstructor || _widget2.default).create(_this3.options);
        pos = crop.pos;
        pos.x = e.pageX - _this3.el.offsetParent.offsetLeft - _this3.el.offsetLeft;
        pos.y = e.pageY - _this3.el.offsetParent.offsetTop - _this3.el.offsetTop;
        w = _this3.el.offsetWidth;
        h = _this3.el.offsetHeight;
        _this3.addWidget(crop);
        stick = _sticker2.default.create(pos, w, h, 'se');
        if (_this3.options.aspectRatio) stick.aspect = _this3.options.aspectRatio;
        crop.render(pos);
        _this3.focus();
        return true;
      }, function (x, y) {
        crop.render(stick.move(x, y));
      }, function () {
        crop.emit('crop.change');
      });
    }
  }, {
    key: 'reorderWidgets',
    value: function reorderWidgets() {
      var _this4 = this;

      var z = 10;
      this.crops.forEach(function (crop) {
        crop.el.style.zIndex = z++;
        if (_this4.active === crop) crop.addClass('active');else crop.removeClass('active');
      });
      this.refresh();
    }
  }, {
    key: 'activate',
    value: function activate(widget) {
      if (!this.enabled) return this;
      widget = widget || Array.from(this.crops).pop();
      if (widget) {
        if (this.active === widget) return;
        this.active = widget;
        this.crops.delete(widget);
        this.crops.add(widget);
        this.reorderWidgets();
        this.active.el.focus();
        this.options.shade && this.shades.enable();
        widget.emit('crop.activate');
      } else {
        this.shades.disable();
      }
      return this;
    }
  }, {
    key: 'addWidget',
    value: function addWidget(widget) {
      widget.attachToStage(this);
      widget.appendTo(this.el);
      this.activate(widget);
      return this;
    }
  }, {
    key: 'newWidget',
    value: function newWidget(rect) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      options = (0, _extend2.default)({}, this.options, options);
      var crop = (this.options.widgetConstructor || _widget2.default).create(options);
      crop.render(rect.unscale(this.scalex, this.scaley));
      this.addWidget(crop);
      crop.el.focus();
      return crop;
    }
  }, {
    key: 'removeWidget',
    value: function removeWidget(widget) {
      if (!this.canRemove()) return false;
      widget.emit('crop.remove');
      widget.el.remove();
      this.crops.delete(widget);
      this.activate();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.crops.forEach(function (crop) {
        crop.render();
      });
      this.options.shade && this.active && this.shades.adjust(this.active.pos);
    }
  }, {
    key: 'updateShades',
    value: function updateShades() {
      if (!this.shades) return;

      if (this.options.shade) this.shades.enable();else this.shades.disable();

      this.options.shade && this.active && this.shades.adjust(this.active.pos);

      return this;
    }
  }, {
    key: 'setOptions',
    value: function setOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _get(Stage.prototype.__proto__ || Object.getPrototypeOf(Stage.prototype), 'setOptions', this).call(this, options);
      if (this.crops) Array.from(this.crops).forEach(function (i) {
        return i.setOptions(options);
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {}
  }]);

  return Stage;
}(_confobj2.default);

exports.default = Stage;

/***/ }),

/***/ "./build/js/stage/image.js":
/*!*********************************!*\
  !*** ./build/js/stage/image.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(/*! ./dom */ "./build/js/stage/dom.js");

var _dom2 = _interopRequireDefault(_dom);

var _resizeObserverPolyfill = __webpack_require__(/*! resize-observer-polyfill */ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js");

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function div(clname) {
  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.createElement('div');

  el.className = clname;
  return el;
}

var ImageStage = function (_Stage) {
  _inherits(ImageStage, _Stage);

  function ImageStage(el, options) {
    _classCallCheck(this, ImageStage);

    var wrapper = div('jcrop-stage jcrop-image-stage');
    el.parentNode.insertBefore(wrapper, el);
    // CSS positioning changed
    // wrapper.appendChild(el);

    var _this = _possibleConstructorReturn(this, (ImageStage.__proto__ || Object.getPrototypeOf(ImageStage)).call(this, wrapper, options));

    _this.srcEl = el;
    el.onload = _this.resizeToImage.bind(_this);
    _this.resizeToImage();
    _this.initResizeObserver();
    return _this;
  }

  _createClass(ImageStage, [{
    key: 'initResizeObserver',
    value: function initResizeObserver() {
      var _this2 = this;

      var ro = new _resizeObserverPolyfill2.default(function (entries, observer) {
        _this2.resizeToImage();
      });
      ro.observe(this.srcEl);
    }
  }, {
    key: 'resizeToImage',
    value: function resizeToImage() {
      var _getImageDimensions = this.getImageDimensions(),
          _getImageDimensions2 = _slicedToArray(_getImageDimensions, 2),
          w = _getImageDimensions2[0],
          h = _getImageDimensions2[1];

      var _getNaturalDimensions = this.getNaturalDimensions(),
          _getNaturalDimensions2 = _slicedToArray(_getNaturalDimensions, 2),
          nw = _getNaturalDimensions2[0],
          nh = _getNaturalDimensions2[1];

      this.el.style.width = w + 'px';
      this.el.style.height = h + 'px';
      this.rescaleWidgets(w / nw, h / nh);
      this.scalex = nw / w;
      this.scaley = nh / h;
      this.refresh();
    }
  }, {
    key: 'rescaleWidgets',
    value: function rescaleWidgets(x, y) {
      this.crops.forEach(function (crop) {
        crop.pos = crop.sel.scale(x, y);
      });
    }
  }, {
    key: 'getImageDimensions',
    value: function getImageDimensions() {
      return [this.srcEl.width, this.srcEl.height];
    }
  }, {
    key: 'getNaturalDimensions',
    value: function getNaturalDimensions() {
      return [this.srcEl.naturalWidth || this.srcEl.width, this.srcEl.naturalHeight || this.srcEl.height];
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.el.remove();
    }
  }]);

  return ImageStage;
}(_dom2.default);

exports.default = ImageStage;

/***/ }),

/***/ "./build/js/sticker.js":
/*!*****************************!*\
  !*** ./build/js/sticker.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* This class creates a draggable frame by locking the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        corner opposite to the one being dragged */

var _rect = __webpack_require__(/*! ./rect */ "./build/js/rect.js");

var _rect2 = _interopRequireDefault(_rect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sticker = function () {
  function Sticker(rect, w, h, ord) {
    _classCallCheck(this, Sticker);

    this.sw = w;
    this.sh = h;
    this.rect = rect;
    this.locked = this.getCornerPoint(this.getOppositeCorner(ord));
    this.stuck = this.getCornerPoint(ord);
  }

  _createClass(Sticker, [{
    key: 'move',
    value: function move(x, y) {
      return _rect2.default.fromPoints(this.locked, this.translateStuckPoint(x, y));
    }

    // Determine "quadrant" of handle drag relative to locked point
    // returns string tl = top left, br = bottom right, etc

  }, {
    key: 'getDragQuadrant',
    value: function getDragQuadrant(x, y) {
      var relx = this.locked[0] - x;
      var rely = this.locked[1] - y;
      if (relx < 0 && rely < 0) return 'br';else if (relx >= 0 && rely >= 0) return 'tl';else if (relx < 0 && rely >= 0) return 'tr';else return 'bl';
    }

    // get the maximum aspect ratio rectangle for the current drag

  }, {
    key: 'getMaxRect',
    value: function getMaxRect(x, y, aspect) {
      return _rect2.default.getMax(Math.abs(this.locked[0] - x), Math.abs(this.locked[1] - y), aspect);
    }

    // given the offset of the drag versus the stuck point,
    // determine the real dragging coordinates

  }, {
    key: 'translateStuckPoint',
    value: function translateStuckPoint(ox, oy) {
      var _stuck = _slicedToArray(this.stuck, 3),
          xx = _stuck[0],
          yy = _stuck[1],
          sp = _stuck[2];

      var x = xx === null ? sp : xx + ox;
      var y = yy === null ? sp : yy + oy;

      if (x > this.sw) x = this.sw;
      if (y > this.sh) y = this.sh;
      if (x < 0) x = 0;
      if (y < 0) y = 0;

      if (this.aspect) {
        var _getMaxRect = this.getMaxRect(x, y, this.aspect),
            _getMaxRect2 = _slicedToArray(_getMaxRect, 2),
            w = _getMaxRect2[0],
            h = _getMaxRect2[1];

        var quad = this.getDragQuadrant(x, y);
        var res = _rect2.default.fromPoint(this.locked, w, h, quad);
        return [res.x2, res.y2];
      }

      return [x, y];
    }
  }, {
    key: 'getCornerPoint',
    value: function getCornerPoint(h) {
      var p = this.rect;
      switch (h) {
        case 'n':
          return [null, p.y, p.x];
        case 's':
          return [null, p.y2, p.x2];
        case 'e':
          return [p.x2, null, p.y2];
        case 'w':
          return [p.x, null, p.y];
        case 'se':
          return [p.x2, p.y2];
        case 'sw':
          return [p.x, p.y2];
        case 'ne':
          return [p.x2, p.y];
        case 'nw':
          return [p.x, p.y];
      }
    }
  }, {
    key: 'getOppositeCorner',
    value: function getOppositeCorner(h) {
      switch (h) {
        case 'n':
          return 'se';
        case 's':
          return 'nw';
        case 'e':
          return 'nw';
        case 'w':
          return 'se';
        case 'se':
          return 'nw';
        case 'sw':
          return 'ne';
        case 'ne':
          return 'sw';
        case 'nw':
          return 'se';
      }
    }
  }]);

  return Sticker;
}();

Sticker.create = function (rect, w, h, ord) {
  return new Sticker(rect, w, h, ord);
};

exports.default = Sticker;

/***/ }),

/***/ "./build/js/util/extend.js":
/*!*********************************!*\
  !*** ./build/js/util/extend.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extend;
function extend() {
  var extended = {};

  for (var key in arguments) {
    var argument = arguments[key];
    for (var prop in argument) {
      if (Object.prototype.hasOwnProperty.call(argument, prop)) {
        extended[prop] = argument[prop];
      }
    }
  }

  return extended;
};

/***/ }),

/***/ "./build/js/widget.js":
/*!****************************!*\
  !*** ./build/js/widget.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extend = __webpack_require__(/*! ./util/extend */ "./build/js/util/extend.js");

var _extend2 = _interopRequireDefault(_extend);

var _handle = __webpack_require__(/*! ./handle */ "./build/js/handle.js");

var _handle2 = _interopRequireDefault(_handle);

var _defaults = __webpack_require__(/*! ./defaults */ "./build/js/defaults.js");

var _defaults2 = _interopRequireDefault(_defaults);

var _dragger = __webpack_require__(/*! ./dragger */ "./build/js/dragger.js");

var _dragger2 = _interopRequireDefault(_dragger);

var _rect = __webpack_require__(/*! ./rect */ "./build/js/rect.js");

var _rect2 = _interopRequireDefault(_rect);

var _sticker = __webpack_require__(/*! ./sticker */ "./build/js/sticker.js");

var _sticker2 = _interopRequireDefault(_sticker);

var _confobj = __webpack_require__(/*! ./confobj */ "./build/js/confobj.js");

var _confobj2 = _interopRequireDefault(_confobj);

var _keyboard = __webpack_require__(/*! ./keyboard */ "./build/js/keyboard.js");

var _keyboard2 = _interopRequireDefault(_keyboard);

var _animate = __webpack_require__(/*! ./animate */ "./build/js/animate.js");

var _animate2 = _interopRequireDefault(_animate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Widget = function (_ConfObj) {
  _inherits(Widget, _ConfObj);

  function Widget(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Widget);

    var _this = _possibleConstructorReturn(this, (Widget.__proto__ || Object.getPrototypeOf(Widget)).call(this, el, options));

    _this.pos = _rect2.default.from(_this.el);
    _this.init();
    return _this;
  }

  _createClass(Widget, [{
    key: 'init',
    value: function init() {
      this.createHandles();
      this.createMover();
      this.attachFocus();
      _keyboard2.default.attach(this);
      return this;
    }
  }, {
    key: 'initOptions',
    value: function initOptions() {
      var _this2 = this;

      this._optconf['aspectRatio'] = function (ar) {
        var p = _this2.pos;
        _this2.aspect = ar || null;
        if (_this2.aspect && p) {
          var _Rect$getMax = _rect2.default.getMax(p.w, p.h, ar),
              _Rect$getMax2 = _slicedToArray(_Rect$getMax, 2),
              w = _Rect$getMax2[0],
              h = _Rect$getMax2[1];

          _this2.render(_rect2.default.fromPoint([p.x, p.y], w, h));
        }
      };
    }
  }, {
    key: 'attachToStage',
    value: function attachToStage(stage) {
      this.stage = stage;
      this.emit('crop.attach');
    }
  }, {
    key: 'attachFocus',
    value: function attachFocus() {
      var _this3 = this;

      this.el.addEventListener('focus', function (e) {
        _this3.stage.activate(_this3);
        _this3.emit('crop.update');
      }, false);
    }
  }, {
    key: 'animate',
    value: function animate(rect, frames, efunc) {
      var _this4 = this;

      var t = this;
      efunc = efunc || t.options.animateEasingFunction || 'swing';
      frames = frames || t.options.animateFrames || 30;
      return (0, _animate2.default)(t.el, t.pos, rect, function (r) {
        return t.render(r.normalize());
      }, frames, efunc).then(function () {
        return _this4.emit('crop.change');
      });
    }
  }, {
    key: 'createMover',
    value: function createMover() {
      var _this5 = this;

      var w, h;
      this.pos = _rect2.default.from(this.el);
      var stick;
      (0, _dragger2.default)(this.el, function () {
        var pe = _this5.el.parentElement;
        if (!_this5.stage.enabled) return false;
        var _ref = [pe.offsetWidth, pe.offsetHeight];
        w = _ref[0];
        h = _ref[1];

        stick = _rect2.default.from(_this5.el);
        _this5.el.focus();
        _this5.stage.activate(_this5);
        return true;
      }, function (x, y) {
        _this5.pos.x = stick.x + x;
        _this5.pos.y = stick.y + y;
        _this5.render(_this5.pos.rebound(w, h));
      }, function () {
        _this5.emit('crop.change');
      });
    }
  }, {
    key: 'nudge',
    value: function nudge() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var pe = this.el.parentElement;
      var _ref2 = [pe.offsetWidth, pe.offsetHeight],
          w = _ref2[0],
          h = _ref2[1];

      if (x) this.pos.x += x;
      if (y) this.pos.y += y;
      this.render(this.pos.rebound(w, h));
      this.emit('crop.change');
    }
  }, {
    key: 'createHandles',
    value: function createHandles() {
      var _this6 = this;

      this.options.handles.forEach(function (c) {
        var handle = _handle2.default.create('jcrop-handle ' + c);
        handle.appendTo(_this6.el);

        var stick;
        (0, _dragger2.default)(handle.el, function () {
          if (!_this6.stage.enabled) return false;
          var pe = _this6.el.parentElement;
          var w = pe.offsetWidth;
          var h = pe.offsetHeight;
          stick = _sticker2.default.create(_rect2.default.from(_this6.el), w, h, c);
          if (_this6.aspect) stick.aspect = _this6.aspect;
          _this6.el.focus();
          _this6.emit('crop.active');
          return true;
        }, function (x, y) {
          return _this6.render(stick.move(x, y));
        }, function () {
          _this6.emit('crop.change');
        });
      });
      return this;
    }
  }, {
    key: 'isActive',
    value: function isActive() {
      return this.stage && this.stage.active === this;
    }
  }, {
    key: 'render',
    value: function render(r) {
      r = r || this.pos;
      this.el.style.top = Math.round(r.y) + 'px';
      this.el.style.left = Math.round(r.x) + 'px';
      this.el.style.width = Math.round(r.w) + 'px';
      this.el.style.height = Math.round(r.h) + 'px';
      this.pos = r;
      this.emit('crop.update');
      return this;
    }
  }, {
    key: 'doneDragging',
    value: function doneDragging() {
      this.pos = _rect2.default.from(this.el);
    }
  }, {
    key: 'sel',
    get: function get() {
      var s = this.stage;
      return this.pos.scale(s.scalex, s.scaley);
    }
  }]);

  return Widget;
}(_confobj2.default);

Widget.create = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var el = document.createElement('div');
  var opts = (0, _extend2.default)({}, _defaults2.default, options);
  el.setAttribute('tabindex', '0');
  el.className = opts.cropperClass || 'jcrop-widget';
  return new (options.widgetConstructor || Widget)(el, opts);
};

exports.default = Widget;

/***/ }),

/***/ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js":
/*!*************************************************************************!*\
  !*** ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }

    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;

        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;

                return true;
            }

            return false;
        });

        return result;
    }

    return (function () {
        function anonymous() {
            this.__entries__ = [];
        }

        var prototypeAccessors = { size: { configurable: true } };

        /**
         * @returns {boolean}
         */
        prototypeAccessors.size.get = function () {
            return this.__entries__.length;
        };

        /**
         * @param {*} key
         * @returns {*}
         */
        anonymous.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];

            return entry && entry[1];
        };

        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        anonymous.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);

            if (~index) {
                this.__entries__[index][1] = value;
            } else {
                this.__entries__.push([key, value]);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);

            if (~index) {
                entries.splice(index, 1);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };

        /**
         * @returns {void}
         */
        anonymous.prototype.clear = function () {
            this.__entries__.splice(0);
        };

        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        anonymous.prototype.forEach = function (callback, ctx) {
            var this$1 = this;
            if ( ctx === void 0 ) ctx = null;

            for (var i = 0, list = this$1.__entries__; i < list.length; i += 1) {
                var entry = list[i];

                callback.call(ctx, entry[1], entry[0]);
            }
        };

        Object.defineProperties( anonymous.prototype, prototypeAccessors );

        return anonymous;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }

    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }

    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }

    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }

    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;

/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
var throttle = function (callback, delay) {
    var leadingCall = false,
        trailingCall = false,
        lastCallTime = 0;

    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;

            callback();
        }

        if (trailingCall) {
            proxy();
        }
    }

    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }

    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();

        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }

            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        } else {
            leadingCall = true;
            trailingCall = false;

            setTimeout(timeoutCallback, delay);
        }

        lastCallTime = timeStamp;
    }

    return proxy;
};

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;

// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];

// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';

/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = function() {
    this.connected_ = false;
    this.mutationEventsAdded_ = false;
    this.mutationsObserver_ = null;
    this.observers_ = [];

    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
};

/**
 * Adds observer to observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be added.
 * @returns {void}
 */


/**
 * Holds reference to the controller's instance.
 *
 * @private {ResizeObserverController}
 */


/**
 * Keeps reference to the instance of MutationObserver.
 *
 * @private {MutationObserver}
 */

/**
 * Indicates whether DOM listeners have been added.
 *
 * @private {boolean}
 */
ResizeObserverController.prototype.addObserver = function (observer) {
    if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
    }

    // Add listeners if they haven't been added yet.
    if (!this.connected_) {
        this.connect_();
    }
};

/**
 * Removes observer from observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be removed.
 * @returns {void}
 */
ResizeObserverController.prototype.removeObserver = function (observer) {
    var observers = this.observers_;
    var index = observers.indexOf(observer);

    // Remove observer if it's present in registry.
    if (~index) {
        observers.splice(index, 1);
    }

    // Remove listeners if controller has no connected observers.
    if (!observers.length && this.connected_) {
        this.disconnect_();
    }
};

/**
 * Invokes the update of observers. It will continue running updates insofar
 * it detects changes.
 *
 * @returns {void}
 */
ResizeObserverController.prototype.refresh = function () {
    var changesDetected = this.updateObservers_();

    // Continue running updates if changes have been detected as there might
    // be future ones caused by CSS transitions.
    if (changesDetected) {
        this.refresh();
    }
};

/**
 * Updates every observer from observers list and notifies them of queued
 * entries.
 *
 * @private
 * @returns {boolean} Returns "true" if any observer has detected changes in
 *  dimensions of it's elements.
 */
ResizeObserverController.prototype.updateObservers_ = function () {
    // Collect observers that have active observations.
    var activeObservers = this.observers_.filter(function (observer) {
        return observer.gatherActive(), observer.hasActive();
    });

    // Deliver notifications in a separate cycle in order to avoid any
    // collisions between observers, e.g. when multiple instances of
    // ResizeObserver are tracking the same element and the callback of one
    // of them changes content dimensions of the observed target. Sometimes
    // this may result in notifications being blocked for the rest of observers.
    activeObservers.forEach(function (observer) { return observer.broadcastActive(); });

    return activeObservers.length > 0;
};

/**
 * Initializes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.connect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already added.
    if (!isBrowser || this.connected_) {
        return;
    }

    // Subscription to the "Transitionend" event is used as a workaround for
    // delayed transitions. This way it's possible to capture at least the
    // final state of an element.
    document.addEventListener('transitionend', this.onTransitionEnd_);

    window.addEventListener('resize', this.refresh);

    if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);

        this.mutationsObserver_.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });
    } else {
        document.addEventListener('DOMSubtreeModified', this.refresh);

        this.mutationEventsAdded_ = true;
    }

    this.connected_ = true;
};

/**
 * Removes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.disconnect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already removed.
    if (!isBrowser || !this.connected_) {
        return;
    }

    document.removeEventListener('transitionend', this.onTransitionEnd_);
    window.removeEventListener('resize', this.refresh);

    if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
    }

    if (this.mutationEventsAdded_) {
        document.removeEventListener('DOMSubtreeModified', this.refresh);
    }

    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
};

/**
 * "Transitionend" event handler.
 *
 * @private
 * @param {TransitionEvent} event
 * @returns {void}
 */
ResizeObserverController.prototype.onTransitionEnd_ = function (ref) {
        var propertyName = ref.propertyName; if ( propertyName === void 0 ) propertyName = '';

    // Detect whether transition may affect dimensions of an element.
    var isReflowProperty = transitionKeys.some(function (key) {
        return !!~propertyName.indexOf(key);
    });

    if (isReflowProperty) {
        this.refresh();
    }
};

/**
 * Returns instance of the ResizeObserverController.
 *
 * @returns {ResizeObserverController}
 */
ResizeObserverController.getInstance = function () {
    if (!this.instance_) {
        this.instance_ = new ResizeObserverController();
    }

    return this.instance_;
};

ResizeObserverController.instance_ = null;

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var i = 0, list = Object.keys(props); i < list.length; i += 1) {
        var key = list[i];

        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }

    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;

    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);

/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}

/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [], len = arguments.length - 1;
    while ( len-- > 0 ) positions[ len ] = arguments[ len + 1 ];

    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];

        return size + toFloat(value);
    }, 0);
}

/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};

    for (var i = 0, list = positions; i < list.length; i += 1) {
        var position = list[i];

        var value = styles['padding-' + position];

        paddings[position] = toFloat(value);
    }

    return paddings;
}

/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();

    return createRectInit(0, 0, bbox.width, bbox.height);
}

/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth;
    var clientHeight = target.clientHeight;

    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }

    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;

    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width),
        height = toFloat(styles.height);

    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }

        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }

    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;

        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }

        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }

    return createRectInit(paddings.left, paddings.top, width, height);
}

/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }

    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function'; };
})();

/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}

/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }

    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }

    return getHTMLElementContentRect(target);
}

/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(ref) {
    var x = ref.x;
    var y = ref.y;
    var width = ref.width;
    var height = ref.height;

    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);

    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });

    return rect;
}

/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = function(target) {
    this.broadcastWidth = 0;
    this.broadcastHeight = 0;
    this.contentRect_ = createRectInit(0, 0, 0, 0);

    this.target = target;
};

/**
 * Updates content rectangle and tells whether it's width or height properties
 * have changed since the last broadcast.
 *
 * @returns {boolean}
 */


/**
 * Reference to the last observed content rectangle.
 *
 * @private {DOMRectInit}
 */


/**
 * Broadcasted width of content rectangle.
 *
 * @type {number}
 */
ResizeObservation.prototype.isActive = function () {
    var rect = getContentRect(this.target);

    this.contentRect_ = rect;

    return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
};

/**
 * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
 * from the corresponding properties of the last observed content rectangle.
 *
 * @returns {DOMRectInit} Last observed content rectangle.
 */
ResizeObservation.prototype.broadcastRect = function () {
    var rect = this.contentRect_;

    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;

    return rect;
};

var ResizeObserverEntry = function(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit);

    // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.
    defineConfigurable(this, { target: target, contentRect: contentRect });
};

var ResizeObserverSPI = function(callback, controller, callbackCtx) {
    this.activeObservations_ = [];
    this.observations_ = new MapShim();

    if (typeof callback !== 'function') {
        throw new TypeError('The callback provided as parameter 1 is not a function.');
    }

    this.callback_ = callback;
    this.controller_ = controller;
    this.callbackCtx_ = callbackCtx;
};

/**
 * Starts observing provided element.
 *
 * @param {Element} target - Element to be observed.
 * @returns {void}
 */


/**
 * Registry of the ResizeObservation instances.
 *
 * @private {Map<Element, ResizeObservation>}
 */


/**
 * Public ResizeObserver instance which will be passed to the callback
 * function and used as a value of it's "this" binding.
 *
 * @private {ResizeObserver}
 */

/**
 * Collection of resize observations that have detected changes in dimensions
 * of elements.
 *
 * @private {Array<ResizeObservation>}
 */
ResizeObserverSPI.prototype.observe = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is already being observed.
    if (observations.has(target)) {
        return;
    }

    observations.set(target, new ResizeObservation(target));

    this.controller_.addObserver(this);

    // Force the update of observations.
    this.controller_.refresh();
};

/**
 * Stops observing provided element.
 *
 * @param {Element} target - Element to stop observing.
 * @returns {void}
 */
ResizeObserverSPI.prototype.unobserve = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is not being observed.
    if (!observations.has(target)) {
        return;
    }

    observations.delete(target);

    if (!observations.size) {
        this.controller_.removeObserver(this);
    }
};

/**
 * Stops observing all elements.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.disconnect = function () {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
};

/**
 * Collects observation instances the associated element of which has changed
 * it's content rectangle.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.gatherActive = function () {
        var this$1 = this;

    this.clearActive();

    this.observations_.forEach(function (observation) {
        if (observation.isActive()) {
            this$1.activeObservations_.push(observation);
        }
    });
};

/**
 * Invokes initial callback function with a list of ResizeObserverEntry
 * instances collected from active resize observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.broadcastActive = function () {
    // Do nothing if observer doesn't have active observations.
    if (!this.hasActive()) {
        return;
    }

    var ctx = this.callbackCtx_;

    // Create ResizeObserverEntry instance for every active observation.
    var entries = this.activeObservations_.map(function (observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
    });

    this.callback_.call(ctx, entries, ctx);
    this.clearActive();
};

/**
 * Clears the collection of active observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.clearActive = function () {
    this.activeObservations_.splice(0);
};

/**
 * Tells whether observer has active observations.
 *
 * @returns {boolean}
 */
ResizeObserverSPI.prototype.hasActive = function () {
    return this.activeObservations_.length > 0;
};

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();

/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = function(callback) {
    if (!(this instanceof ResizeObserver)) {
        throw new TypeError('Cannot call a class as a function.');
    }
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    var controller = ResizeObserverController.getInstance();
    var observer = new ResizeObserverSPI(callback, controller, this);

    observers.set(this, observer);
};

// Expose public methods of ResizeObserver.
['observe', 'unobserve', 'disconnect'].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        return (ref = observers.get(this))[method].apply(ref, arguments);
        var ref;
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }

    return ResizeObserver;
})();

/* harmony default export */ __webpack_exports__["default"] = (index);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });
//# sourceMappingURL=jcrop.dev.js.map