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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/node-libs-browser/node_modules/events/events.js":
/*!**********************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/events/events.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function (n) {
  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function (type) {
  var er, handler, len, args, i, listeners;

  if (!this._events) this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler)) return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++) {
      listeners[i].apply(this, args);
    }
  }

  return true;
};

EventEmitter.prototype.addListener = function (type, listener) {
  var m;

  if (!isFunction(listener)) throw TypeError('listener must be a function');

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function (type, listener) {
  if (!isFunction(listener)) throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function (type, listener) {
  var list, position, length, i;

  if (!isFunction(listener)) throw TypeError('listener must be a function');

  if (!this._events || !this._events[type]) return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener || isFunction(list.listener) && list.listener === listener) {
    delete this._events[type];
    if (this._events.removeListener) this.emit('removeListener', type, listener);
  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
        position = i;
        break;
      }
    }

    if (position < 0) return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener) this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function (type) {
  var key, listeners;

  if (!this._events) return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length) {
      this.removeListener(type, listeners[listeners.length - 1]);
    }
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function (type) {
  var ret;
  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function (type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function (emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

/***/ }),

/***/ "./src/LandMap.js":
/*!************************!*\
  !*** ./src/LandMap.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.REF_MAP = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(/*! events */ "./node_modules/node-libs-browser/node_modules/events/events.js");

var _events2 = _interopRequireDefault(_events);

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Componente LandMap encargado de mostrar las parcelas 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 y la navegación entre ellas
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Las parcelas se representan en un objeto así:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ABC
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 DEF
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 GHI
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Cuando hay movimientos se calcula lat,lon para cada
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 una de las posiciones del objeto.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var defaultOpts = {
	parcelLength: 200,
	offset: new _utils.Point(0, 0)

	//relations between parcels (useful to recalculate)
};var REF_MAP = {
	A: { lat: -1, lon: -1 },
	B: { lat: 0, lon: -1 },
	C: { lat: 1, lon: -1 },
	D: { lat: -1, lon: 0 },
	E: { lat: 0, lon: 0 },
	F: { lat: 1, lon: 0 },
	G: { lat: -1, lon: 1 },
	H: { lat: 0, lon: 1 },
	I: { lat: 1, lon: 1 }
};

var LandMap = function (_EventEmitter) {
	_inherits(LandMap, _EventEmitter);

	function LandMap() {
		var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOpts;

		_classCallCheck(this, LandMap);

		var _this = _possibleConstructorReturn(this, (LandMap.__proto__ || Object.getPrototypeOf(LandMap)).call(this));

		_this.parcelLength = opts.parcelLength;
		//Active parcels
		_this.parcelMap = {
			A: { lat: -1, lon: -1 },
			B: { lat: 0, lon: -1 },
			C: { lat: 1, lon: -1 },
			D: { lat: -1, lon: 0 },
			E: { lat: 0, lon: 0 },
			F: { lat: 1, lon: 0 },
			G: { lat: -1, lon: 1 },
			H: { lat: 0, lon: 1 },
			I: { lat: 1, lon: 1 }
		};
		_this.offset = opts.offset;
		return _this;
	}

	_createClass(LandMap, [{
		key: 'getActiveParcels',
		value: function getActiveParcels() {
			return this.parcelMap;
		}
	}, {
		key: 'move',
		value: function move(_ref) {
			var _ref$x = _ref.x,
			    x = _ref$x === undefined ? 0 : _ref$x,
			    _ref$y = _ref.y,
			    y = _ref$y === undefined ? 0 : _ref$y;

			this.offset = this.offset.add({ x: x, y: y });
			this.emit('offsetchanged', this.offset);
			this.recalculatePosition(this.offset);
		}

		//Returns 2 points (top,left) and (bottom,right)
		//encompassing the total area (the 9 parcels)

	}, {
		key: 'getArea',
		value: function getArea() {
			var from = {
				x: this.parcelMap['A'].lat,
				y: this.parcelMap['A'].lon
			};

			var to = {
				x: this.parcelMap['I'].lat + 1,
				y: this.parcelMap['I'].lon + 1
			};
			return [new _utils.Point(from.x, from.y), new _utils.Point(to.x, to.y)];
		}
	}, {
		key: 'recalculatePosition',
		value: function recalculatePosition(offset) {

			var nextLat = Math.floor(offset.x / (this.parcelLength - 1));
			var nextLon = Math.floor(offset.y / (this.parcelLength - 1));
			//calculate the new map
			var newParcelMap = {};
			//Use the reference map to calculate the lat, lon
			//based on the value of E (the center parcel)
			var centerParcel = {
				lat: nextLat,
				lon: nextLon

				//save the previous values of 'A' to detect if
				//the map changed
			};var prevStart = _extends({}, this.parcelMap['A']);

			Object.keys(this.parcelMap).forEach(function (id) {
				newParcelMap[id] = {
					lat: centerParcel.lat + REF_MAP[id].lat,
					lon: centerParcel.lon + REF_MAP[id].lon
				};
			});

			var newStart = _extends({}, newParcelMap['A']);
			if (prevStart.lat != newStart.lat || prevStart.lon != newStart.lon) {
				//the start parcel 'A' changed, so all the map changed
				this.parcelMap = newParcelMap;
				//the area to monitor changed
				var newArea = this.getArea();
				this.emit('areachanged', newArea[0], newArea[1]);
			}
		}
	}]);

	return LandMap;
}(_events2.default);

exports.REF_MAP = REF_MAP;
exports.default = LandMap;

/***/ }),

/***/ "./src/MapView.js":
/*!************************!*\
  !*** ./src/MapView.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LandMap = __webpack_require__(/*! ./LandMap */ "./src/LandMap.js");

var _LandMap2 = _interopRequireDefault(_LandMap);

var _domUtils = __webpack_require__(/*! ./domUtils */ "./src/domUtils.js");

var domUtils = _interopRequireWildcard(_domUtils);

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 La clase mapview se encarga de manipular el DOM para
 mostrar las parcelas
**/

//TODO: format, change tabs to spaces


//pixels moved when arrows are pressed
var KEYBOARD_STEP = 100;
var defaultOpts = {
	containerElement: 'body',
	itemRenderer: null,
	parcelLength: 200,
	dataProvider: null

	//TODO: add base css here

};var css = '\n\n\t.content-container {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\toverflow: hidden;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t}\n\n\t.item {\n\t    position: absolute;\n\t    top: 0;\n\t    left: 0;\n\t    transition: transform 1s;\n\t}\n';

domUtils.injectCSS(css);

var MapView = function () {
	function MapView(opts) {
		_classCallCheck(this, MapView);

		opts = Object.assign({}, defaultOpts, opts);
		this.opts = opts;
		this.offset = opts.offset || new _utils.Point(0, 0);
		this.dataProvider = opts.dataProvider;
		this.container = typeof opts.containerElement === 'string' ? document.querySelector(opts.containerElement) : opts.containerElement;

		this.map = new _LandMap2.default({
			parcelLength: opts.parcelLength,
			offset: this.offset
		});
		this.initDOM();
		this.attachEvents();
		//Start monitoring the initial map areachanged
		var initialArea = this.map.getArea();
		this.dataProvider.monitorArea(initialArea[0], initialArea[1]);
	}

	_createClass(MapView, [{
		key: 'initDOM',
		value: function initDOM() {
			//Create contentContainer
			this.contentContainer = this.createContentContainer();
		}
	}, {
		key: 'createContentContainer',
		value: function createContentContainer() {
			var contentContainer = document.createElement('div');
			contentContainer.classList.add('content-container');
			this.container.appendChild(contentContainer);
			return contentContainer;
		}
	}, {
		key: 'attachEvents',
		value: function attachEvents() {
			this.monitorMapOffset();
			this.connectToDataProvider();
			this.addKeyboardEvents();
			this.addMouseEvents();
		}
	}, {
		key: 'monitorMapOffset',
		value: function monitorMapOffset() {
			var _this = this;

			this.map.on('offsetchanged', function (offset) {
				console.log('offset changed', offset);
				//map was moved
				_this.offset = offset;
				//update transform attribute so they move
				_this.updateElementPositions(offset);
			});

			//when the area to monitor changes
			//receives the newArea [P1,P2] where
			//P1 is the top left point (lat,lon)
			//and P2 is the bottom right point
			this.map.on('areachanged', function (startPoint, endPoint) {
				//When current parcel changes (and their surroundings)
				//TODO: call monitorarea (dataprovider)
				console.log('parcel map changed');
				_this.dataProvider.monitorArea(startPoint, endPoint);
			});
		}
	}, {
		key: 'updateElementPositions',
		value: function updateElementPositions(offset) {
			var _this2 = this;

			//upate dom elements transform attribute
			var elems = Array.from(this.contentContainer.querySelectorAll('.item'));
			elems.forEach(function (elem) {
				var pos = _this2.getItemPosition(Number(elem.dataset.lat), Number(elem.dataset.lon), offset);
				elem.style.transform = 'translate(' + pos.x + 'px,' + pos.y + 'px)';
			});
		}
	}, {
		key: 'connectToDataProvider',
		value: function connectToDataProvider() {
			var _this3 = this;

			this.dataProvider.on('item', function (item) {
				console.log('item received,', item);
				var itemElem = _this3.createItemElement(item);
				itemElem.classList.add('item');
				itemElem.dataset.lat = item.lat;
				itemElem.dataset.lon = item.lon;

				//todo: add to a itemcontainr layer
				_this3.contentContainer.appendChild(itemElem);
				//set position
				var pos = _this3.getItemPosition(item.lat, item.lon, _this3.offset);
				console.log('item pos', pos);
				itemElem.style.transform = 'translate(' + pos.x + 'px,' + pos.y + 'px)';
			});
		}
	}, {
		key: 'getItemPosition',
		value: function getItemPosition(lat, lon, offset) {
			//calculate item the pixel position
			//TODO: don't access parcelMap directly

			return {
				x: lat * this.opts.parcelLength + offset.x,
				y: lon * this.opts.parcelLength + offset.y
			};
		}
	}, {
		key: 'createItemElement',
		value: function createItemElement(item) {
			//todo delegate this to item renderer
			var elem = document.createElement('div');
			elem.innerText = item.text;
			return elem;
		}
	}, {
		key: 'addKeyboardEvents',
		value: function addKeyboardEvents() {
			var _this4 = this;

			document.addEventListener('keyup', function (ev) {
				var allowed = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
				if (allowed.indexOf(ev.key) >= 0) {
					switch (ev.key) {
						case "ArrowDown":
							_this4.map.move({ y: KEYBOARD_STEP });
							break;
						case "ArrowLeft":
							_this4.map.move({ x: -KEYBOARD_STEP });

							break;
						case "ArrowRight":
							_this4.map.move({ x: KEYBOARD_STEP });
							break;
						case "ArrowUp":
							_this4.map.move({ y: -KEYBOARD_STEP });
							break;
						default:
							break;
					}
				}
			});
		}
	}, {
		key: 'addMouseEvents',
		value: function addMouseEvents() {}
	}]);

	return MapView;
}();

exports.default = MapView;

/***/ }),

/***/ "./src/TestRandomDataProvider2.js":
/*!****************************************!*\
  !*** ./src/TestRandomDataProvider2.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(/*! events */ "./node_modules/node-libs-browser/node_modules/events/events.js");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestDataProvider = function (_EventEmitter) {
	_inherits(TestDataProvider, _EventEmitter);

	function TestDataProvider() {
		_classCallCheck(this, TestDataProvider);

		return _possibleConstructorReturn(this, (TestDataProvider.__proto__ || Object.getPrototypeOf(TestDataProvider)).call(this));
	}

	_createClass(TestDataProvider, [{
		key: 'monitorArea',
		value: function monitorArea(from, to) {
			for (var i = 0; i < 10; i++) {
				var lat = Math.random() * to.x - from.x;
				var lon = Math.random() * to.y - from.y;
				this.emit('item', {
					id: Math.random() * 100,
					text: 'Some text' + Math.random() * 2000,
					lat: lat,
					lon: lon
				});
			}
		}
	}]);

	return TestDataProvider;
}(_events2.default);

exports.default = TestDataProvider;

/***/ }),

/***/ "./src/domUtils.js":
/*!*************************!*\
  !*** ./src/domUtils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.injectCSS = injectCSS;
function injectCSS(css) {
	var styleElem = document.createElement('style');
	styleElem.setAttribute('type', 'text/css');
	styleElem.textContent = css;
	document.querySelector('head').appendChild(styleElem);
}

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _MapView = __webpack_require__(/*! ./MapView */ "./src/MapView.js");

var _MapView2 = _interopRequireDefault(_MapView);

var _TestRandomDataProvider = __webpack_require__(/*! ./TestRandomDataProvider2 */ "./src/TestRandomDataProvider2.js");

var _TestRandomDataProvider2 = _interopRequireDefault(_TestRandomDataProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//this should render the parcels
new _MapView2.default({
	dataProvider: new _TestRandomDataProvider2.default(),
	parcelLength: 400
});

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//immutable point structure
var Point = exports.Point = function () {
	function Point() {
		var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		_classCallCheck(this, Point);

		this.x = x;
		this.y = y;
	}

	_createClass(Point, [{
		key: "add",
		value: function add(_ref) {
			var x = _ref.x,
			    y = _ref.y;

			return new Point(this.x + x, this.y + y);
		}
	}]);

	return Point;
}();

/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map