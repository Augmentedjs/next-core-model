(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash.clone"), require("lodash.defaults"), require("lodash.defer"), require("lodash.escape"), require("lodash.has"), require("lodash.isempty"), require("lodash.iteratee"), require("lodash.result"));
	else if(typeof define === 'function' && define.amd)
		define("core-next-model", ["lodash.clone", "lodash.defaults", "lodash.defer", "lodash.escape", "lodash.has", "lodash.isempty", "lodash.iteratee", "lodash.result"], factory);
	else if(typeof exports === 'object')
		exports["core-next-model"] = factory(require("lodash.clone"), require("lodash.defaults"), require("lodash.defer"), require("lodash.escape"), require("lodash.has"), require("lodash.isempty"), require("lodash.iteratee"), require("lodash.result"));
	else
		root["core-next-model"] = factory(root["lodash.clone"], root["lodash.defaults"], root["lodash.defer"], root["lodash.escape"], root["lodash.has"], root["lodash.isempty"], root["lodash.iteratee"], root["lodash.result"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_lodash_clone__, __WEBPACK_EXTERNAL_MODULE_lodash_defaults__, __WEBPACK_EXTERNAL_MODULE_lodash_defer__, __WEBPACK_EXTERNAL_MODULE_lodash_escape__, __WEBPACK_EXTERNAL_MODULE_lodash_has__, __WEBPACK_EXTERNAL_MODULE_lodash_isempty__, __WEBPACK_EXTERNAL_MODULE_lodash_iteratee__, __WEBPACK_EXTERNAL_MODULE_lodash_result__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/lodash.bind/index.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash.bind/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/** Used to compose bitmasks for function metadata. */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_BOUND_FLAG = 4,
    CURRY_FLAG = 8,
    CURRY_RIGHT_FLAG = 16,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64,
    ARY_FLAG = 128,
    REARG_FLAG = 256,
    FLIP_FLAG = 512;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** Used to associate wrap methods with their bit flags. */
var wrapFlags = [['ary', ARY_FLAG], ['bind', BIND_FLAG], ['bindKey', BIND_KEY_FLAG], ['curry', CURRY_FLAG], ['curryRight', CURRY_RIGHT_FLAG], ['flip', FLIP_FLAG], ['partial', PARTIAL_FLAG], ['partialRight', PARTIAL_RIGHT_FLAG], ['rearg', REARG_FLAG]];

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to match wrap detail comments. */
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
    reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
    reSplitDetails = /,? & /;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * Gets the number of `placeholder` occurrences in `array`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} placeholder The placeholder to search for.
 * @returns {number} Returns the placeholder count.
 */
function countHolders(array, placeholder) {
  var length = array.length,
      result = 0;

  while (length--) {
    if (array[length] === placeholder) {
      result++;
    }
  }
  return result;
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value === placeholder || value === PLACEHOLDER) {
      array[index] = PLACEHOLDER;
      result[resIndex++] = index;
    }
  }
  return result;
}

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/** Built-in value references. */
var objectCreate = Object.create;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/* Used to set `toString` methods. */
var defineProperty = function () {
  var func = getNative(Object, 'defineProperty'),
      name = getNative.name;

  return name && name.length > 2 ? func : undefined;
}();

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersLength = holders.length,
      leftIndex = -1,
      leftLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(leftLength + rangeLength),
      isUncurried = !isCurried;

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
  }
  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersIndex = -1,
      holdersLength = holders.length,
      rightIndex = -1,
      rightLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(rangeLength + rightLength),
      isUncurried = !isCurried;

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex];
  }
  var offset = argsIndex;
  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }
  return result;
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtor(Ctor) {
  return function () {
    // Use a `switch` statement to work with class constructors. See
    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    // for more details.
    var args = arguments;
    switch (args.length) {
      case 0:
        return new Ctor();
      case 1:
        return new Ctor(args[0]);
      case 2:
        return new Ctor(args[0], args[1]);
      case 3:
        return new Ctor(args[0], args[1], args[2]);
      case 4:
        return new Ctor(args[0], args[1], args[2], args[3]);
      case 5:
        return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createCurry(func, bitmask, arity) {
  var Ctor = createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length,
        placeholder = getHolder(wrapper);

    while (index--) {
      args[index] = arguments[index];
    }
    var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);

    length -= holders.length;
    if (length < arity) {
      return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length);
    }
    var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
    return apply(fn, this, args);
  }
  return wrapper;
}

/**
 * Creates a function that wraps `func` to invoke it with optional `this`
 * binding of `thisArg`, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided
 *  to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & ARY_FLAG,
      isBind = bitmask & BIND_FLAG,
      isBindKey = bitmask & BIND_KEY_FLAG,
      isCurried = bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG),
      isFlip = bitmask & FLIP_FLAG,
      Ctor = isBindKey ? undefined : createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length;

    while (index--) {
      args[index] = arguments[index];
    }
    if (isCurried) {
      var placeholder = getHolder(wrapper),
          holdersCount = countHolders(args, placeholder);
    }
    if (partials) {
      args = composeArgs(args, partials, holders, isCurried);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }
    length -= holdersCount;
    if (isCurried && length < arity) {
      var newHolders = replaceHolders(args, placeholder);
      return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length);
    }
    var thisBinding = isBind ? thisArg : this,
        fn = isBindKey ? thisBinding[func] : func;

    length = args.length;
    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }
    if (isAry && ary < length) {
      args.length = ary;
    }
    if (this && this !== root && this instanceof wrapper) {
      fn = Ctor || createCtor(fn);
    }
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}

/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */
function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = this && this !== root && this instanceof wrapper ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}

/**
 * Creates a function that wraps `func` to continue currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {Function} wrapFunc The function to create the `func` wrapper.
 * @param {*} placeholder The placeholder value.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
  var isCurry = bitmask & CURRY_FLAG,
      newHolders = isCurry ? holders : undefined,
      newHoldersRight = isCurry ? undefined : holders,
      newPartials = isCurry ? partials : undefined,
      newPartialsRight = isCurry ? undefined : partials;

  bitmask |= isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG;
  bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

  if (!(bitmask & CURRY_BOUND_FLAG)) {
    bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
  }

  var result = wrapFunc(func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity);
  result.placeholder = placeholder;
  return setWrapToString(result, func, bitmask);
}

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags.
 *  The bitmask may be composed of the following flags:
 *     1 - `_.bind`
 *     2 - `_.bindKey`
 *     4 - `_.curry` or `_.curryRight` of a bound function
 *     8 - `_.curry`
 *    16 - `_.curryRight`
 *    32 - `_.partial`
 *    64 - `_.partialRight`
 *   128 - `_.rearg`
 *   256 - `_.ary`
 *   512 - `_.flip`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
    partials = holders = undefined;
  }
  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
  arity = arity === undefined ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;

    partials = holders = undefined;
  }

  var newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] == null ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);

  if (!arity && bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG)) {
    bitmask &= ~(CURRY_FLAG | CURRY_RIGHT_FLAG);
  }
  if (!bitmask || bitmask == BIND_FLAG) {
    var result = createBind(func, bitmask, thisArg);
  } else if (bitmask == CURRY_FLAG || bitmask == CURRY_RIGHT_FLAG) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(undefined, newData);
  }
  return setWrapToString(result, func, bitmask);
}

/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */
function getHolder(func) {
  var object = func;
  return object.placeholder;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Extracts wrapper details from the `source` body comment.
 *
 * @private
 * @param {string} source The source to inspect.
 * @returns {Array} Returns the wrapper details.
 */
function getWrapDetails(source) {
  var match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}

/**
 * Inserts wrapper `details` in a comment at the top of the `source` body.
 *
 * @private
 * @param {string} source The source to modify.
 * @returns {Array} details The details to insert.
 * @returns {string} Returns the modified source.
 */
function insertWrapDetails(source, details) {
  var length = details.length,
      lastIndex = length - 1;

  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
  details = details.join(length > 2 ? ', ' : ' ');
  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = copyArray(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

/**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */
var setWrapToString = !defineProperty ? identity : function (wrapper, reference, bitmask) {
  var source = reference + '';
  return defineProperty(wrapper, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)))
  });
};

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}

/**
 * Updates wrapper `details` based on `bitmask` flags.
 *
 * @private
 * @returns {Array} details The details to modify.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Array} Returns `details`.
 */
function updateWrapDetails(details, bitmask) {
  arrayEach(wrapFlags, function (pair) {
    var value = '_.' + pair[0];
    if (bitmask & pair[1] && !arrayIncludes(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}

/**
 * Creates a function that invokes `func` with the `this` binding of `thisArg`
 * and `partials` prepended to the arguments it receives.
 *
 * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for partially applied arguments.
 *
 * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
 * property of bound functions.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {...*} [partials] The arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * function greet(greeting, punctuation) {
 *   return greeting + ' ' + this.user + punctuation;
 * }
 *
 * var object = { 'user': 'fred' };
 *
 * var bound = _.bind(greet, object, 'hi');
 * bound('!');
 * // => 'hi fred!'
 *
 * // Bound with placeholders.
 * var bound = _.bind(greet, object, _, '!');
 * bound('hi');
 * // => 'hi fred!'
 */
var bind = baseRest(function (func, thisArg, partials) {
  var bitmask = BIND_FLAG;
  if (partials.length) {
    var holders = replaceHolders(partials, getHolder(bind));
    bitmask |= PARTIAL_FLAG;
  }
  return createWrap(func, bitmask, thisArg, partials, holders);
});

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? remainder ? result - remainder : result : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function () {
    return value;
  };
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

// Assign default placeholders.
bind.placeholder = {};

module.exports = bind;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/next-core-object/dist/next-core-object.js":
/*!****************************************************************!*\
  !*** ./node_modules/next-core-object/dist/next-core-object.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


!function (e, t) {
   true ? module.exports = t(__webpack_require__(/*! lodash.bind */ "./node_modules/lodash.bind/index.js")) : undefined;
}(undefined, function (e) {
  return function (e) {
    var t = {};function r(n) {
      if (t[n]) return t[n].exports;var o = t[n] = { i: n, l: !1, exports: {} };return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
    }return r.m = e, r.c = t, r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }, r.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
    }, r.t = function (e, t) {
      if (1 & t && (e = r(e)), 8 & t) return e;if (4 & t && "object" == typeof e && e && e.__esModule) return e;var n = Object.create(null);if (r.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var o in e) r.d(n, o, function (t) {
        return e[t];
      }.bind(null, o));return n;
    }, r.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };return r.d(t, "a", t), t;
    }, r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, r.p = "/dist/", r(r.s = 1);
  }([function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });const n = t.EVENT_SPLITTER = /\s+/,
          o = t.eventsApi = (e, t, r, i, s) => {
      let l,
          u = 0;if (r && "object" == typeof r) {
        void 0 !== i && "context" in s && void 0 === s.context && (s.context = i);for (l = Object.keys(r); u < l.length; u++) t = o(e, t, l[u], r[l[u]], s);
      } else if (r && n.test(r)) for (l = r.split(n); u < l.length; u++) t = e(t, l[u], i, s);else t = e(t, r, i, s);return t;
    },
          i = (t.internalOn = (e, t, r, n, s) => {
      if (e._events = o(i, e._events || {}, t, r, { context: n, ctx: e, listening: s }), s) {
        (e._listeners || (e._listeners = {}))[s.id] = s;
      }return e;
    }, t.onApi = (e, t, r, n) => {
      if (r) {
        const o = e[t] || (e[t] = []),
              i = n.context,
              s = n.ctx,
              l = n.listening;l && l.count++, o.push({ callback: r, context: i, ctx: i || s, listening: l });
      }return e;
    }),
          s = (t.offApi = (e, t, r, n) => {
      if (!e) return;let o,
          i = 0;const s = n.context,
            l = n.listeners;if (!t && !r && !s) {
        const e = Object.keys(l);for (; i < e.length; i++) delete l[(o = l[e[i]]).id], delete o.listeningTo[o.objId];return;
      }let u = t ? [t] : Object.keys(e);for (; i < u.length; i++) {
        const n = e[t = u[i]];if (!n) break;const c = [];let f = 0;for (f = 0; f < n.length; f++) {
          const e = n[f];r && r !== e.callback && r !== e.callback._callback || s && s !== e.context ? c.push(e) : (o = e.listening) && 0 == --o.count && (delete l[o.id], delete o.listeningTo[o.objId]);
        }c.length ? e[t] = c : delete e[t];
      }return e;
    }, t.triggerApi = (e, t, r, n) => {
      if (e) {
        const r = e[t];let o = e.all;r && o && (o = o.slice()), r && s(r, n), o && s(o, [t].concat(n));
      }return e;
    }, t.triggerEvents = (e, t) => {
      let r,
          n = -1;const o = e.length,
            i = t[0],
            s = t[1],
            l = t[2];switch (t.length) {case 0:
          for (; ++n < o;) (r = e[n]).callback.call(r.ctx);return;case 1:
          for (; ++n < o;) (r = e[n]).callback.call(r.ctx, i);return;case 2:
          for (; ++n < o;) (r = e[n]).callback.call(r.ctx, i, s);return;case 3:
          for (; ++n < o;) (r = e[n]).callback.call(r.ctx, i, s, l);return;default:
          for (; ++n < o;) (r = e[n]).callback.apply(r.ctx, t);return;}
    });
  }, function (e, t, r) {
    "use strict";
    var n = s(r(2)),
        o = s(r(5)),
        i = r(0);function s(e) {
      return e && e.__esModule ? e : { default: e };
    }e.exports.AugmentedObject = n.default, e.exports.Configuration = o.default, e.exports.eventsApi = i.eventsApi, e.exports.eventsApi = i.internalOn, e.exports.eventsApi = i.offApi, e.exports.eventsApi = i.triggerApi;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = r(3),
        o = r(0);const i = r(4);t.default = class {
      constructor(e) {
        e || (e = {}), this._options || (this._options = {}), Object.assign(this._options, e), e && e.events ? this._events = e.events : this._events = {}, this._listeningTo = {}, this._listenId = {}, this._listeners = {};
      }initialize(...e) {
        return this;
      }get options() {
        return this._options;
      }set options(e) {
        this._options = e;
      }get events() {
        return this._events;
      }set events(e) {
        this._events = e;
      }trigger(e, ...t) {
        if (this._events) {
          const r = Array.isArray(t) ? t : Array.from(t);(0, o.eventsApi)(o.triggerApi, this._events, e, void 0, r);
        }return this;
      }once(e, t, r) {
        const n = (0, o.eventsApi)(this._onceMap, {}, e, t, i(this.off, this));return "string" == typeof e && null == r && (t = void 0), this.on(n, t, r);
      }off(e, t, r) {
        return this._events && (this._events = (0, o.eventsApi)(o.offApi, this._events, e, t, { context: r, listeners: this._listeners })), this;
      }stopListening(e, t, r) {
        const n = this._listeningTo;if (n) {
          const o = e ? [e._listenId] : Object.keys(n);let i = 0;for (i = 0; i < o.length; i++) {
            const e = n[o[i]];if (!e) break;e.obj.off(t, r, this);
          }
        }return this;
      }on(e, t, r) {
        return (0, o.internalOn)(this, e, t, r);
      }listenTo(e, t, r) {
        if (e) {
          const i = e._listenId || (e._listenId = (0, n.uniqueId)("l")),
                s = this._listeningTo || (this._listeningTo = {});let l = s[i];if (!l) {
            const t = this._listenId || (this._listenId = (0, n.uniqueId)("l"));l = s[i] = { obj: e, objId: i, id: t, listeningTo: s, count: 0 };
          }(0, o.internalOn)(e, t, r, this, l);
        }return this;
      }listenToOnce(e, t, r) {
        const n = (0, o.eventsApi)(this._onceMap, {}, t, r, i(this.stopListening, this, e));return this.listenTo(e, n);
      }_onceMap(e, t, r, o) {
        if (r) {
          const i = e[t] = (0, n.once)(() => {
            o(t, i), r.apply(this, arguments);
          });i._callback = r;
        }return e;
      }
    };
  }, function (e, t, r) {
    "use strict";
    e.exports = function (e) {
      var t = {};function r(n) {
        if (t[n]) return t[n].exports;var o = t[n] = { i: n, l: !1, exports: {} };return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
      }return r.m = e, r.c = t, r.d = function (e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
      }, r.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
      }, r.t = function (e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;if (4 & t && "object" == typeof e && e && e.__esModule) return e;var n = Object.create(null);if (r.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var o in e) r.d(n, o, function (t) {
          return e[t];
        }.bind(null, o));return n;
      }, r.n = function (e) {
        var t = e && e.__esModule ? function () {
          return e.default;
        } : function () {
          return e;
        };return r.d(t, "a", t), t;
      }, r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }, r.p = "/dist/", r(r.s = 3);
    }([function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.default = e => {
        const t = typeof e;return "function" === t || "object" === t && !!e;
      };
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.default = e => "[object Function]" == Object.prototype.toString.call(e);
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 });var n = arguments;t.default = (e, t) => {
        let r, o;if ("function" != typeof t) throw new TypeError(FUNC_ERROR_TEXT);return o = Number.parseInt(e), () => (--o > 0 && (r = t.apply(void 0, n)), o <= 1 && (t = void 0), r);
      };
    }, function (e, t, r) {
      var n = S(r(4)),
          o = S(r(1)),
          i = S(r(5)),
          s = S(r(6)),
          l = S(r(7)),
          u = S(r(8)),
          c = S(r(0)),
          f = S(r(9)),
          a = S(r(10)),
          p = S(r(11)),
          d = S(r(12)),
          b = S(r(13)),
          y = S(r(14)),
          _ = S(r(15)),
          h = S(r(16)),
          g = S(r(2)),
          v = S(r(17)),
          x = r(18),
          O = r(19),
          j = r(20),
          M = S(r(21)),
          m = S(r(22));function S(e) {
        return e && e.__esModule ? e : { default: e };
      }e.exports.shuffle = O.shuffle, e.exports.prettyPrint = O.prettyPrint, e.exports.binarySearch = O.binarySearch, e.exports.TransformerType = O.TransformerType, e.exports.Transformer = O.Transformer, e.exports.wrap = O.wrap, e.exports.filterObject = O.filterObject, e.exports.findByMatchingProperties = O.findByMatchingProperties, e.exports.sortObjects = j.sortObjects, e.exports.mergeSort = j.mergeSort, e.exports.quickSort = j.quickSort, e.exports.insertionSort = j.insertionSort, e.exports.bubbleSort = j.bubbleSort, e.exports.formatDate = M.default, e.exports.formatBinary = m.default, e.exports.isString = n.default, e.exports.isFunction = o.default, e.exports.extend = i.default, e.exports.pad = s.default, e.exports.uniqueId = l.default, e.exports.has = u.default, e.exports.isObject = c.default, e.exports.allKeys = f.default, e.exports.create = a.default, e.exports.result = p.default, e.exports.arrayHas = d.default, e.exports.exec = b.default, e.exports.isDefined = y.default, e.exports.some = _.default, e.exports.splice = h.default, e.exports.before = g.default, e.exports.once = v.default, e.exports.fibonacci = x.fibonacci, e.exports.fibonacciSequence = x.fibonacciSequence;
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.default = e => "string" == typeof e || !!e && "object" == typeof e && "[object String]" === Object.prototype.toString.call(e);
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.default = (...e) => {
        let t = 0;const r = e.length;for (t = 1; t < r; t++) {
          let r;for (r in e[t]) e[t].hasOwnProperty(r) && (e[0][r] = e[t][r]);
        }return e[0];
      };
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.default = (e, t, r) => void 0 === t ? e : r ? `${e}${t}` : `${t}${e}`;
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 });let n = 0;t.default = e => `${e}${++n}`;
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.default = (e, t) => null !== e && hasOwnProperty.call(e, t);
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 });var n = function (e) {
        return e && e.__esModule ? e : { default: e };
      }(r(0));t.default = e => (0, n.default)(e) ? Object.getOwnPropertyNames(e) : [];
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 });var n = function (e) {
        return e && e.__esModule ? e : { default: e };
      }(r(0));t.default = (e, t) => {
        const r = (e => (0, n.default)(e) ? Object.create(e) : {})(e);return t && Object.assign(r, t), r;
      };
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 });var n = function (e) {
        return e && e.__esModule ? e : { default: e };
      }(r(1));t.default = (e, t) => {
        if (null === e) return;const r = e[t];return (0, n.default)(r) ? r.call(e) : r;
      };
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.default = (e, t) => -1 !== e.indexOf(t);
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.default = (e, t, ...r) => {
        const n = e.split("."),
              o = n.pop(),
              i = n.length;let s = 0;for (s = 0; s < i; s++) t = t[n[s]];return t[o].apply(t, r);
      };
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.default = e => void 0 !== e;
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.default = (e, t) => !!Array.isArray(e) && e.some(t);
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.default = (e, t, r) => {
        r = Math.min(Math.max(r, 0), e.length);let n = Array(e.length - r);const o = t.length;let i;for (i = 0; i < n.length; i++) n[i] = e[i + r];for (i = 0; i < o; i++) e[i + r] = t[i];for (i = 0; i < n.length; i++) e[i + o + r] = n[i];
      };
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 });var n = function (e) {
        return e && e.__esModule ? e : { default: e };
      }(r(2));t.default = e => (0, n.default)(2, e);
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 });const n = t.fibonacci = e => {
        const t = (1 + Math.sqrt(5)) / 2,
              r = Math.pow(t, e) / Math.sqrt(5);return Math.round(r);
      };t.fibonacciSequence = e => {
        const t = [];let r = 0;for (r = 0; r < e; r++) t.push(n(r));return t;
      };
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 });var n = arguments;t.shuffle = e => {
        const t = e.slice(0);let r,
            n,
            o = 0;for (o = e.length - 1; o > 0; o--) n = Math.floor(Math.random() * (o + 1)), r = t[o], t[o] = t[n], t[n] = r;return t;
      }, t.prettyPrint = (e, t, r) => {
        let n = "\t";return t && (n = " ".repeat(r)), JSON.stringify(e, null, n);
      }, t.binarySearch = (e, t, r) => {
        let n,
            o,
            i = 0,
            s = e.length - 1;for (; i <= s;) if ((o = r(e[n = Math.floor((i + s) / 2)], t)) < 0) i = n + 1;else {
          if (!(o > 0)) return n;s = n - 1;
        }return null;
      };const o = t.TransformerType = {};o.STRING = Symbol("String"), o.INTEGER = Symbol("Integer"), o.NUMBER = Symbol("Number"), o.BOOLEAN = Symbol("Boolean"), o.ARRAY = Symbol("Array"), o.OBJECT = Symbol("Object"), o.NULL = Symbol("Null"), t.Transformer = class {
        constructor() {
          this.type = o;
        }static transform(e, t) {
          let r = null;switch (t) {case o.STRING:
              r = "object" == typeof e ? JSON.stringify(e) : String(e);break;case o.INTEGER:
              r = parseInt(e);break;case o.NUMBER:
              r = Number(e);break;case o.BOOLEAN:
              r = Boolean(e);break;case o.ARRAY:
              Array.isArray(e) ? r = e : (r = [])[0] = e;break;case o.OBJECT:
              "object" != typeof e ? (r = {})[e] = e : r = e;}return r;
        }static isType(e) {
          return null === e ? o.NULL : "string" == typeof e ? o.STRING : "number" == typeof e ? o.NUMBER : "boolean" == typeof e ? o.BOOLEAN : Array.isArray(e) ? o.ARRAY : "object" == typeof e ? o.OBJECT : void 0;
        }
      }, t.wrap = (e, t) => () => t.apply(void 0, [e].concat(Array.prototype.slice.call(n))), t.filterObject = (e, t) => {
        const r = {};if (e && t) {
          const n = t.length;let o = 0;for (o = 0; o < n; o++) r[t[o]] = e[t[o]];
        }return r;
      }, t.findByMatchingProperties = (e, t) => e.filter(e => Object.keys(t).every(r => e[r] === t[r]));
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.sortObjects = (e, t) => e.sort((e, r) => {
        const n = e[t],
              o = r[t];return n < o ? -1 : n > o ? 1 : 0;
      });const n = t.mergeSort = e => {
        if (1 === e.length) return e;const t = Math.floor(e.length / 2),
              r = e.slice(0, t),
              i = e.slice(t);return o(n(r), n(i));
      },
            o = (e, t) => {
        let r = [],
            n = 0,
            o = 0;for (; n < e.length && o < t.length;) e[n] < t[o] ? (r.push(e[n]), n++) : (r.push(t[o]), o++);return r.concat(e.slice(n)).concat(t.slice(o));
      },
            i = t.quickSort = e => {
        if (0 === e.length) return [];let t = 1;const r = e.length,
              n = [],
              o = [],
              s = e[0];for (t = 1; t < r; t++) e[t] < s ? n.push(e[t]) : o.push(e[t]);return i(n).concat(s, i(o));
      };t.insertionSort = e => {
        let t = [];if (e) {
          const r = (t = e.slice()).length;let n, o, i;for (n = 1; n < r; n++) {
            for (i = t[n], o = n - 1; o >= 0 && t[o] > i; o--) t[o + 1] = t[o];t[o + 1] = i;
          }
        }return t;
      }, t.bubbleSort = e => {
        let t = [];if (e) {
          let r, n, o;const i = (t = e.slice()).length - 1;do {
            for (r = !1, n = 0; n < i; n++) t[n] > t[n + 1] && (o = t[n], t[n] = t[n + 1], t[n + 1] = o, r = !0);
          } while (r);
        }return t;
      };
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.default = e => {
        const t = e.getFullYear(),
              r = e.getMonth() + 1,
              n = e.getDate(),
              o = e.getHours(),
              i = e.getMinutes();return e.getSeconds(), `${r}/${n}/${t} ${o % 12 || 12}:${i < 10 ? "0" + i : i}${o < 12 ? "am" : "pm"}`;
      };
    }, function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.default = (e, t) => (e => {
        let t = 0,
            r = e,
            n = "";for (t = 0; t < 32; t++, n += String(r >>> 31), r <<= 1);return n;
      })(e).split("").reverse().join("").substring(0, t);
    }]);
  }, function (t, r) {
    t.exports = e;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.default = { LoggerLevel: "error", MessageBundle: "Messages", AsynchronousQueueTimeout: 2e3, ApplicationInitProcessTimeout: 1e3 };
  }]);
});
//# sourceMappingURL=next-core-object.js.map

/***/ }),

/***/ "./node_modules/next-core-utilities/dist/next-core-utilities.js":
/*!**********************************************************************!*\
  !*** ./node_modules/next-core-utilities/dist/next-core-utilities.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


!function (e, t) {
   true ? module.exports = t() : undefined;
}(undefined, function () {
  return function (e) {
    var t = {};function r(o) {
      if (t[o]) return t[o].exports;var n = t[o] = { i: o, l: !1, exports: {} };return e[o].call(n.exports, n, n.exports, r), n.l = !0, n.exports;
    }return r.m = e, r.c = t, r.d = function (e, t, o) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
    }, r.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
    }, r.t = function (e, t) {
      if (1 & t && (e = r(e)), 8 & t) return e;if (4 & t && "object" == typeof e && e && e.__esModule) return e;var o = Object.create(null);if (r.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var n in e) r.d(o, n, function (t) {
        return e[t];
      }.bind(null, n));return o;
    }, r.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };return r.d(t, "a", t), t;
    }, r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, r.p = "/dist/", r(r.s = 3);
  }([function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.default = e => {
      const t = typeof e;return "function" === t || "object" === t && !!e;
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.default = e => "[object Function]" == Object.prototype.toString.call(e);
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var o = arguments;t.default = (e, t) => {
      let r, n;if ("function" != typeof t) throw new TypeError(FUNC_ERROR_TEXT);return n = Number.parseInt(e), () => (--n > 0 && (r = t.apply(void 0, o)), n <= 1 && (t = void 0), r);
    };
  }, function (e, t, r) {
    "use strict";
    var o = m(r(4)),
        n = m(r(1)),
        u = m(r(5)),
        s = m(r(6)),
        l = m(r(7)),
        i = m(r(8)),
        c = m(r(0)),
        f = m(r(9)),
        a = m(r(10)),
        d = m(r(11)),
        p = m(r(12)),
        b = m(r(13)),
        y = m(r(14)),
        _ = m(r(15)),
        O = m(r(16)),
        j = m(r(2)),
        h = m(r(17)),
        g = r(18),
        x = r(19),
        M = r(20),
        v = m(r(21)),
        S = m(r(22));function m(e) {
      return e && e.__esModule ? e : { default: e };
    }e.exports.shuffle = x.shuffle, e.exports.prettyPrint = x.prettyPrint, e.exports.binarySearch = x.binarySearch, e.exports.TransformerType = x.TransformerType, e.exports.Transformer = x.Transformer, e.exports.wrap = x.wrap, e.exports.filterObject = x.filterObject, e.exports.findByMatchingProperties = x.findByMatchingProperties, e.exports.sortObjects = M.sortObjects, e.exports.mergeSort = M.mergeSort, e.exports.quickSort = M.quickSort, e.exports.insertionSort = M.insertionSort, e.exports.bubbleSort = M.bubbleSort, e.exports.formatDate = v.default, e.exports.formatBinary = S.default, e.exports.isString = o.default, e.exports.isFunction = n.default, e.exports.extend = u.default, e.exports.pad = s.default, e.exports.uniqueId = l.default, e.exports.has = i.default, e.exports.isObject = c.default, e.exports.allKeys = f.default, e.exports.create = a.default, e.exports.result = d.default, e.exports.arrayHas = p.default, e.exports.exec = b.default, e.exports.isDefined = y.default, e.exports.some = _.default, e.exports.splice = O.default, e.exports.before = j.default, e.exports.once = h.default, e.exports.fibonacci = g.fibonacci, e.exports.fibonacciSequence = g.fibonacciSequence;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.default = e => "string" == typeof e || !!e && "object" == typeof e && "[object String]" === Object.prototype.toString.call(e);
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.default = (...e) => {
      let t = 0;const r = e.length;for (t = 1; t < r; t++) {
        let r;for (r in e[t]) e[t].hasOwnProperty(r) && (e[0][r] = e[t][r]);
      }return e[0];
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.default = (e, t, r) => void 0 === t ? e : r ? `${e}${t}` : `${t}${e}`;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });let o = 0;t.default = e => {
      return `${e}${++o}`;
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.default = (e, t) => null !== e && hasOwnProperty.call(e, t);
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var o = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(r(0));t.default = e => (0, o.default)(e) ? Object.getOwnPropertyNames(e) : [];
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var o = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(r(0));t.default = (e, t) => {
      const r = (e => (0, o.default)(e) ? Object.create(e) : {})(e);return t && Object.assign(r, t), r;
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var o = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(r(1));t.default = (e, t) => {
      if (null === e) return;const r = e[t];return (0, o.default)(r) ? r.call(e) : r;
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.default = (e, t) => -1 !== e.indexOf(t);
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.default = (e, t, ...r) => {
      const o = e.split("."),
            n = o.pop(),
            u = o.length;let s = 0;for (s = 0; s < u; s++) t = t[o[s]];return t[n].apply(t, r);
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.default = e => void 0 !== e;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.default = (e, t) => !!Array.isArray(e) && e.some(t);
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.default = (e, t, r) => {
      r = Math.min(Math.max(r, 0), e.length);let o = Array(e.length - r);const n = t.length;let u;for (u = 0; u < o.length; u++) o[u] = e[u + r];for (u = 0; u < n; u++) e[u + r] = t[u];for (u = 0; u < o.length; u++) e[u + n + r] = o[u];
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var o = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(r(2));t.default = e => (0, o.default)(2, e);
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });const o = t.fibonacci = e => {
      const t = (1 + Math.sqrt(5)) / 2,
            r = Math.pow(t, e) / Math.sqrt(5);return Math.round(r);
    };t.fibonacciSequence = e => {
      const t = [];let r = 0;for (r = 0; r < e; r++) t.push(o(r));return t;
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var o = arguments;t.shuffle = e => {
      const t = e.slice(0);let r,
          o,
          n = 0;for (n = e.length - 1; n > 0; n--) o = Math.floor(Math.random() * (n + 1)), r = t[n], t[n] = t[o], t[o] = r;return t;
    }, t.prettyPrint = (e, t, r) => {
      let o = "\t";return t && (o = " ".repeat(r)), JSON.stringify(e, null, o);
    }, t.binarySearch = (e, t, r) => {
      let o,
          n,
          u = 0,
          s = e.length - 1;for (; u <= s;) if ((n = r(e[o = Math.floor((u + s) / 2)], t)) < 0) u = o + 1;else {
        if (!(n > 0)) return o;s = o - 1;
      }return null;
    };const n = t.TransformerType = {};n.STRING = Symbol("String"), n.INTEGER = Symbol("Integer"), n.NUMBER = Symbol("Number"), n.BOOLEAN = Symbol("Boolean"), n.ARRAY = Symbol("Array"), n.OBJECT = Symbol("Object"), n.NULL = Symbol("Null");t.Transformer = class {
      constructor() {
        this.type = n;
      }static transform(e, t) {
        let r = null;switch (t) {case n.STRING:
            r = "object" == typeof e ? JSON.stringify(e) : String(e);break;case n.INTEGER:
            r = parseInt(e);break;case n.NUMBER:
            r = Number(e);break;case n.BOOLEAN:
            r = Boolean(e);break;case n.ARRAY:
            Array.isArray(e) ? r = e : (r = [])[0] = e;break;case n.OBJECT:
            "object" != typeof e ? (r = {})[e] = e : r = e;}return r;
      }static isType(e) {
        return null === e ? n.NULL : "string" == typeof e ? n.STRING : "number" == typeof e ? n.NUMBER : "boolean" == typeof e ? n.BOOLEAN : Array.isArray(e) ? n.ARRAY : "object" == typeof e ? n.OBJECT : void 0;
      }
    };t.wrap = (e, t) => () => t.apply(void 0, [e].concat(Array.prototype.slice.call(o))), t.filterObject = (e, t) => {
      const r = {};if (e && t) {
        const o = t.length;let n = 0;for (n = 0; n < o; n++) r[t[n]] = e[t[n]];
      }return r;
    }, t.findByMatchingProperties = (e, t) => e.filter(e => Object.keys(t).every(r => e[r] === t[r]));
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.sortObjects = (e, t) => e.sort((e, r) => {
      const o = e[t],
            n = r[t];return o < n ? -1 : o > n ? 1 : 0;
    });const o = t.mergeSort = e => {
      if (1 === e.length) return e;const t = Math.floor(e.length / 2),
            r = e.slice(0, t),
            u = e.slice(t);return n(o(r), o(u));
    },
          n = (e, t) => {
      let r = [],
          o = 0,
          n = 0;for (; o < e.length && n < t.length;) e[o] < t[n] ? (r.push(e[o]), o++) : (r.push(t[n]), n++);return r.concat(e.slice(o)).concat(t.slice(n));
    },
          u = t.quickSort = e => {
      if (0 === e.length) return [];let t = 1;const r = e.length,
            o = [],
            n = [],
            s = e[0];for (t = 1; t < r; t++) e[t] < s ? o.push(e[t]) : n.push(e[t]);return u(o).concat(s, u(n));
    };t.insertionSort = e => {
      let t = [];if (e) {
        const r = (t = e.slice()).length;let o, n, u;for (o = 1; o < r; o++) {
          for (u = t[o], n = o - 1; n >= 0 && t[n] > u; n--) t[n + 1] = t[n];t[n + 1] = u;
        }
      }return t;
    }, t.bubbleSort = e => {
      let t = [];if (e) {
        let r, o, n;const u = (t = e.slice()).length - 1;do {
          for (r = !1, o = 0; o < u; o++) t[o] > t[o + 1] && (n = t[o], t[o] = t[o + 1], t[o + 1] = n, r = !0);
        } while (r);
      }return t;
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.default = e => {
      const t = e.getFullYear(),
            r = e.getMonth() + 1,
            o = e.getDate(),
            n = e.getHours(),
            u = e.getMinutes();e.getSeconds();return `${r}/${o}/${t} ${n % 12 || 12}:${u < 10 ? "0" + u : u}${n < 12 ? "am" : "pm"}`;
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.default = (e, t) => (e => {
      let t = 0,
          r = e,
          o = "";for (t = 0; t < 32; t++, o += String(r >>> 31), r <<= 1);return o;
    })(e).split("").reverse().join("").substring(0, t);
  }]);
});
//# sourceMappingURL=next-core-utilities.js.map

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var g;

// This works in non-strict mode
g = function () {
	return this;
}();

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

/***/ }),

/***/ "./src/collection/collection.js":
/*!**************************************!*\
  !*** ./src/collection/collection.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nextCoreObject = __webpack_require__(/*! next-core-object */ "./node_modules/next-core-object/dist/next-core-object.js");

var _nextCoreObject2 = _interopRequireDefault(_nextCoreObject);

var _nextCoreUtilities = __webpack_require__(/*! next-core-utilities */ "./node_modules/next-core-utilities/dist/next-core-utilities.js");

var _abstractModel = __webpack_require__(/*! ../model/abstractModel.js */ "./src/model/abstractModel.js");

var _abstractModel2 = _interopRequireDefault(_abstractModel);

var _nextCoreValidation = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'next-core-validation'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _iterator = __webpack_require__(/*! ./iterator.js */ "./src/collection/iterator.js");

var _iterator2 = _interopRequireDefault(_iterator);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const findModelByMatchingProperties = (set, properties) => {
  return set.filter(entry => {
    return Object.keys(properties).every(key => {
      return entry._attributes[key] === properties[key];
    });
  });
};

const _clone = __webpack_require__(/*! lodash.clone */ "lodash.clone");

// Default options for `Collection#set`.
const setOptions = {
  add: true,
  remove: true,
  merge: true
};

const addOptions = {
  add: true,
  remove: false
};

/**
 * Abstract Augmented Collection <br/>
 * Supports: <ul>
 * <li>Validation and Schemas</li>
 * <li>Security</li>
 * </ul>
 * @extends Object
 */
class AbstractCollection extends _nextCoreObject2.default {
  constructor(models, options) {
    super(options);

    this.length = 0;
    this.models = [];
    this._byId = {};
    this.schema = null;
    this.validationMessages = {
      valid: true
    };

    if (!options) {
      options = {};
    }
    this.preinitialize(models, options);
    if (options.model) {
      this.model = options.model;
    }
    if (options.comparator !== void 0) {
      this.comparator = options.comparator;
    }
    this._reset();
    this.initialize(models, options);
    if (models) {
      this.reset(models, (0, _nextCoreUtilities.extend)({ silent: true }, options));
    }
    if (!this.model) {
      this.model = new _abstractModel2.default();
    }
  }

  /**
   * Schema property
   * @property {object} schema The JSON schema from this collection
   */

  /**
   * Validation Message property
   * @property {object} validationMessages The property holding validation message data
   */

  preinitialize(models, options) {}

  initialize(models, options) {}

  /** The JSON representation of a Collection is an array of the
   * models" attributes.
   */
  toJSON() {
    //return this.map( (model) => { return model.toJSON(options); });
    let i = 0;
    const out = [],
          l = this.models.length;
    for (i = 0; i < l; i++) {
      out[i] = this.models[i].toJSON();
    }
    return out;
  }

  /*map(collection, interatee) {
    return _map(collection, interatee);
  };*/

  /**
   * Add a model, or list of models to the set. `models` may be
   * Models or raw JavaScript objects to be converted to Models, or any
   * combination of the two.
   */
  add(models, options) {
    return this.set(models, (0, _nextCoreUtilities.extend)({ merge: false }, options, addOptions));
  }

  /** Remove a model, or a list of models from the set.
  */
  remove(models, options) {
    options = (0, _nextCoreUtilities.extend)({}, options);
    const singular = Array.isArray(models);
    models = singular ? [models] : models.slice();
    let removed = this._removeModels(models, options);
    if (!options.silent && removed.length) {
      options.changes = { added: [], merged: [], removed: removed };
      this.trigger("update", this, options);
    }
    return singular ? removed[0] : removed;
  }

  /** Update a collection by `set`-ing a new list of models, adding new ones,
   * removing models that are no longer present, and merging models that
   * already exist in the collection, as necessary. Similar to **Model#set**,
   * the core operation for updating the data contained by the collection.
   */
  set(models, options) {
    if (models === null) {
      return;
    }

    options = (0, _nextCoreUtilities.extend)({}, setOptions, options);
    if (options.parse && !this._isModel(models)) {
      models = this.parse(models, options) || [];
    }

    //console.log("models", models);

    let singular = !Array.isArray(models);
    models = singular ? [models] : models.slice();

    let at = options.at;
    if (at != null) at = +at;
    if (at > this.length) at = this.length;
    if (at < 0) at += this.length + 1;

    let set = [];
    let toAdd = [];
    let toMerge = [];
    let toRemove = [];
    let modelMap = {};

    let add = options.add;
    let merge = options.merge;
    let remove = options.remove;

    let sort = false;
    let sortable = this.comparator && at == null && options.sort !== false;
    let sortAttr = (0, _nextCoreUtilities.isString)(this.comparator) ? this.comparator : null;

    // Turn bare objects into model references, and prevent invalid models
    // from being added.
    let model, i;
    const l = models.length;

    for (i = 0; i < l; i++) {
      model = models[i];

      // If a duplicate is found, prevent it from being added and
      // optionally merge it into the existing model.
      let existing = this.get(model);
      if (existing) {
        if (merge && model !== existing) {
          let attrs = this._isModel(model) ? model.attributes : model;
          if (options.parse) attrs = existing.parse(attrs, options);
          existing.set(attrs, options);
          toMerge.push(existing);
          if (sortable && !sort) sort = existing.hasChanged(sortAttr);
        }
        if (!modelMap[existing.cid]) {
          modelMap[existing.cid] = true;
          set.push(existing);
        }
        models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
      } else if (add) {
        model = models[i] = this._prepareModel(model, options);
        if (model) {
          toAdd.push(model);
          this._addReference(model, options);
          modelMap[model.cid] = true;
          set.push(model);
        }
      }
    }

    // Remove stale models.
    if (remove) {
      for (i = 0; i < this.length; i++) {
        model = this.models[i];
        if (!modelMap[model.cid]) toRemove.push(model);
      }
      if (toRemove.length) this._removeModels(toRemove, options);
    }

    // See if sorting is needed, update `length` and splice in new models.
    let orderChanged = false;
    let replace = !sortable && add && remove;
    if (set.length && replace) {
      orderChanged = this.length !== set.length || (0, _nextCoreUtilities.some)(this.models, (m, index) => {
        return m !== set[index];
      });
      this.models.length = 0;
      (0, _nextCoreUtilities.splice)(this.models, set, 0);
      this.length = this.models.length;
    } else if (toAdd.length) {
      if (sortable) {
        sort = true;
      }
      (0, _nextCoreUtilities.splice)(this.models, toAdd, at == null ? this.length : at);
      this.length = this.models.length;
    }

    // Silently sort the collection if appropriate.
    if (sort) this.sort({ silent: true });

    // Unless silenced, it"s time to fire all appropriate add/sort/update events.
    if (!options.silent) {
      for (i = 0; i < toAdd.length; i++) {
        if (at != null) options.index = at + i;
        model = toAdd[i];
        model.trigger("add", model, this, options);
      }
      if (sort || orderChanged) this.trigger("sort", this, options);
      if (toAdd.length || toRemove.length || toMerge.length) {
        options.changes = {
          added: toAdd,
          removed: toRemove,
          merged: toMerge
        };
        this.trigger("update", this, options);
      }
    }

    // Return the added (or merged) model (or models).
    return singular ? models[0] : models;
  }

  /** When you have more items than you want to add or remove individually,
   * you can reset the entire set with a new list of models, without firing
   * any granular `add` or `remove` events. Fires `reset` when finished.
   * Useful for bulk operations and optimizations.
   */
  reset(models, options) {
    options = options ? _clone(options) : {};
    for (let i = 0; i < this.models.length; i++) {
      this._removeReference(this.models[i], options);
    }
    options.previousModels = this.models;
    this._reset();
    models = this.add(models, (0, _nextCoreUtilities.extend)({ silent: true }, options));
    if (!options.silent) this.trigger("reset", this, options);
    return models;
  }

  /** Add a model to the end of the collection.
  */
  push(model, options) {
    return this.add(model, (0, _nextCoreUtilities.extend)({ at: this.length }, options));
  }

  /** Remove a model from the end of the collection.
   */
  pop(options) {
    const model = this.at(this.length - 1);
    return this.remove(model, options);
  }

  /** Add a model to the beginning of the collection.
   */
  unshift(model, options) {
    return this.add(model, (0, _nextCoreUtilities.extend)({ at: 0 }, options));
  }

  /** Remove a model from the beginning of the collection.
   */
  shift(options) {
    const model = this.at(0);
    return this.remove(model, options);
  }

  /** Slice out a sub-array of models from the collection.
   */
  slice(...args) {
    return this.models.slice(args);
  }

  /** Get a model from the set by id, cid, model object with id or cid
   * properties, or an attributes object that is transformed through modelId.
   */
  get(obj) {
    if (obj == null) {
      return void 0;
    }
    return this._byId[obj] || this._byId[this.modelId(this._isModel(obj) ? obj.attributes : obj)] || obj.cid && this._byId[obj.cid];
  }

  /** Returns `true` if the model is in the collection.
   */
  has(obj) {
    return this.get(obj) !== null;
  }

  /** Get the model at the given index.
   */
  at(index) {
    if (index < 0) {
      index += this.length;
    }
    return this.models[index];
  }

  /** find the model that matches these properties
   * @param {object} attrs properties to match
   * @returns {Augmented.AbstractModel} model that matched
   */
  find(attrs) {
    const results = findModelByMatchingProperties(this.models, attrs);
    if (results && results.length > 0) {
      return results[0];
    }
    return null;
  }

  /** filter the models that match these properties
   * @param {object} attrs properties to match
   * @returns {array} models that matched
   */
  filter(attrs) {
    return findModelByMatchingProperties(this.models, attrs);
  }

  /** Return models with matching attributes. Useful for simple cases of `filter`.
    * @param {object} attrs properties to match
    * @returns {Augmented.AbstractModel|array} models that matched
   */
  where(attrs, first) {
    if (first) {
      return this.find(attrs);
    }
    return this.filter(attrs);
  }

  /** Return the first model with matching attributes. Useful for simple cases
   * of `find`.
   */
  findWhere(attrs) {
    return this.where(attrs, true);
  }

  /** Force the collection to re-sort itself. You don"t need to call this under
   * normal circumstances, as the set will maintain sort order as each item
   * is added.
   */
  sort(options) {
    let comparator = this.comparator;
    if (!comparator) throw new Error("Cannot sort a set without a comparator");
    options || (options = {});

    let length = comparator.length;
    if ((0, _nextCoreUtilities.isFunction)(comparator)) comparator = comparator.bind(this);

    // Run sort based on type of `comparator`.
    if (length === 1 || (0, _nextCoreUtilities.isString)(comparator)) {
      this.models = this.sortBy(comparator);
    } else {
      this.models.sort(comparator);
    }
    if (!options.silent) this.trigger("sort", this, options);
    return this;
  }

  /** Pluck an attribute from each model in the collection.
   */
  pluck(attr) {
    let i = 0;
    const out = [],
          l = this.models.length;
    for (i = 0; i < l; i++) {
      out[i] = this.models[i].toJSON()[attr];
    }
    return out;
    //return this.map(attr + "");
  }

  /**
   * Fetch the collection
   */
  fetch(options) {}

  /** Create a new instance of a model in this collection. Add the model to the
   * collection immediately, unless `wait: true` is passed, in which case we
   * wait for the server to agree.
   */
  create(model, options) {
    options = options ? _clone(options) : {};
    let wait = options.wait;
    model = this._prepareModel(model, options);
    if (!model) return false;
    if (!wait) this.add(model, options);
    let collection = this;
    let success = options.success;
    options.success = (m, resp, callbackOpts) => {
      if (wait) collection.add(m, callbackOpts);
      if (success) success.call(callbackOpts.context, m, resp, callbackOpts);
    };
    model.save(null, options);
    return model;
  }

  /** **parse** converts a response into a list of models to be added to the
   * collection. The default implementation is just to pass it through.
   */
  parse(resp, options) {
    return resp;
  }

  /** Create a new collection with an identical list of models as this one.
   */
  clone() {
    return new this.constructor(this.models, {
      model: this.model,
      comparator: this.comparator
    });
  }

  /** Define how to uniquely identify models in the collection.
   */
  modelId(attrs) {
    if (attrs && this.model && this.model.idAttribute) {
      return attrs[this.model.idAttribute || "id"];
    } else {
      return "id";
    }
  }

  /** Get an iterator of all models in this collection.
   */
  values() {
    return new _iterator2.default(this, ITERATOR_VALUES);
  }

  /** Get an iterator of all model IDs in this collection.
   */
  keys() {
    return new _iterator2.default(this, ITERATOR_KEYS);
  }

  /** Get an iterator of all [ID, model] tuples in this collection.
   */
  entries() {
    return new _iterator2.default(this, ITERATOR_KEYSVALUES);
  }

  /**
   * supportsValidation - Returns True if this collection supports validation
   * @returns {boolean} Returns True if this collection supports validation
   */
  supportsValidation() {
    const ret = this.schema && this.schema !== null && this.schema !== {};
    return ret ? true : false;
  }

  /**
   * isValid - Returns True if this collection is valid
   * @returns {boolean} Returns True if this collection is valid
   */
  isValid() {
    return this.validationMessages ? this.validationMessages.valid : true;
  }

  /**
   * getValidationMessages - Returns the validation messages
   * @returns {array} Returns the message is an array of objects.
   */
  getValidationMessages() {
    return this.validationMessages && this.validationMessages.messages ? this.validationMessages.messages : [];
  }

  /**
   * Validates the collection
   * @returns {array} Returns array of message from validation
   */
  validate() {
    if (this.supportsValidation()) {
      // validate from Validator
      let messages = [];
      this.validationMessages.messages = messages;
      this.validationMessages.valid = true;
      const a = this.toJSON(),
            l = a && Array.isArray(a) ? a.length : 0;
      let i = 0;
      if (!this._validationFramework) {
        this._validationFramework = new _nextCoreValidation.ValidationFramework();
      }
      const v = this._validationFramework;

      //console.debug("AUGMENTED: Collection Validate: Beginning with " + l + " models.");
      for (i = 0; i < l; i++) {
        messages[i] = v.validate(a[i], this.schema);
        if (!messages[i].valid) {
          this.validationMessages.valid = false;
        }
      }

      //logger.debug("AUGMENTED: Collection Validate: Completed isValid " + this.validationMessages.valid);
    } else {
      this.validationMessages.valid = true;
    }
    return this.validationMessages;
  }

  /**
   * Collecion.sync
   */
  sync(method, model, options) {}

  /**
   * Collection.save - Saves the collection as a "create"
   */
  save(options) {
    this.sync("create", this, options);
  }

  /**
   * Collection.update - Updates the collection as an "update"
   */
  update(options) {
    this.sync("update", this, options);
  }

  /**
   * Collection.remove - Remove from the collection as a "delete"
   */
  remove(options) {
    this.sync("delete", this, options);
  }

  /**
   * sortByKey - Sorts the collection by a property key
   * @param {object} key The key to sort by
   */
  sortByKey(key) {
    if (key) {
      const data = this.toJSON();
      if (data) {
        const sorted = (0, _nextCoreUtilities.sortObjects)(data, key);
        this.reset(sorted);
      }
    }
  }

  /**
   * isEmpty - returns true is the collection is empty
   * @returns {boolean} returns true is the collection is empty
   */
  isEmpty() {
    return this.length === 0;
  }
  /**
   * Collection.size - returns the size of the collection
   * @returns {number} returns the size of the collection
   */
  size() {
    return this.length;
  }

  /**
   * toString - returns the collection data as a string
   * @returns {string} returns the collection data as a string
   */
  toString() {
    let ret = {};
    try {
      ret = JSON.stringify(this.toJSON());
    } catch (e) {
      console.error(e);
    }
    return ret;
  }

  /** Private method to reset all internal state. Called when the collection
   * is first initialized or reset.
   * @private
   */
  _reset() {
    this.length = 0;
    this.models = [];
    this._byId = {};
  }

  // Prepare a hash of attributes (or other model) to be added to this
  // collection.
  _prepareModel(attrs, options) {
    if (this._isModel(attrs)) {
      if (!attrs.collection) attrs.collection = this;
      return attrs;
    }
    options = options ? _clone(options) : {};
    options.collection = this;
    const model = new _abstractModel2.default(attrs, options); // used to be this.model, may be a problem if a custom model is passed.
    if (!model.validationError) {
      return model;
    }
    this.trigger("invalid", this, model.validationError, options);
    return false;
  }

  // Internal method called by both remove and set.
  _removeModels(models, options) {
    let removed = [];
    for (let i = 0; i < models.length; i++) {
      let model = this.get(models[i]);
      if (!model) continue;

      let index = this.at(model);
      this.models.splice(index, 1);
      this.length--;

      // Remove references before triggering "remove" event to prevent an
      // infinite loop. #3693
      delete this._byId[model.cid];
      let id = this.modelId(model.attributes);
      if (id != null) delete this._byId[id];

      if (!options.silent) {
        options.index = index;
        model.trigger("remove", model, this, options);
      }

      removed.push(model);
      this._removeReference(model, options);
    }
    return removed;
  }

  // Method for checking whether an object should be considered a model for
  // the purposes of adding to the collection.
  _isModel(model) {
    return model instanceof _abstractModel2.default;
  }

  // Internal method to create a model's ties to a collection.
  _addReference(model, options) {
    this._byId[model.cid] = model;
    let id = this.modelId(model.attributes);
    if (id != null) this._byId[id] = model;
    model.on("all", this._onModelEvent, this);
  }

  // Internal method to sever a model's ties to a collection.
  _removeReference(model, options) {
    delete this._byId[model.cid];
    let id = this.modelId(model.attributes);
    if (id != null) delete this._byId[id];
    if (this === model.collection) delete model.collection;
    model.off("all", this._onModelEvent, this);
  }

  // Internal method called every time a model in the set fires an event.
  // Sets need to update their indexes when models change ids. All other
  // events simply proxy through. "add" and "remove" events that originate
  // in other collections are ignored.
  _onModelEvent(event, model, collection, options) {
    if (model) {
      if ((event === "add" || event === "remove") && collection !== this) return;
      if (event === "destroy") this.remove(model, options);
      if (event === "change") {
        let prevId = this.modelId(model.previousAttributes());
        let id = this.modelId(model.attributes);
        if (prevId !== id) {
          if (prevId != null) delete this._byId[prevId];
          if (id != null) this._byId[id] = model;
        }
      }
    }
    this.trigger.apply(this, arguments);
  }
};

exports.default = AbstractCollection;

/***/ }),

/***/ "./src/collection/iterator.js":
/*!************************************!*\
  !*** ./src/collection/iterator.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// CollectionIterator
// ------------------

// This "enum" defines the three possible kinds of values which can be emitted
// by a CollectionIterator that correspond to the values(), keys() and entries()
// methods on Collection, respectively.
const ITERATOR_VALUES = 1;
const ITERATOR_KEYS = 2;
const ITERATOR_KEYSVALUES = 3;

/** A CollectionIterator implements JavaScript's Iterator protocol, allowing the
 * use of `for of` loops in modern browsers and interoperation between
 * Collection and other JavaScript functions and third-party libraries
 * which can operate on Iterables.
 */
class CollectionIterator {
  constructor(collection, kind) {
    this._collection = collection;
    this._kind = kind;
    this._index = 0;
  }

  // All Iterators should themselves be Iterable.
  /* ???
  if ($$iterator) {
    CollectionIterator.prototype[$$iterator] = function() {
      return this;
    };
  }*/

  /**
   * Next model in collection<br/>
   * Once exhausted, remove the reference to the collection so future
   * calls to the next method always return done.
   */
  next() {
    if (this._collection) {
      // Only continue iterating if the iterated collection is long enough.
      if (this._index < this._collection.length) {
        const model = this._collection.at(this._index);
        this._index++;

        // Construct a value depending on what kind of values should be iterated.
        let value;
        if (this._kind === ITERATOR_VALUES) {
          value = model;
        } else {
          const id = this._collection.modelId(model.attributes);
          if (this._kind === ITERATOR_KEYS) {
            value = id;
          } else {
            // ITERATOR_KEYSVALUES
            value = [id, model];
          }
        }
        return { value: value, done: false };
      }

      // Once exhausted, remove the reference to the collection so future
      // calls to the next method always return done.
      this._collection = void 0;
    }
    return { value: void 0, done: true };
  }
};

exports.default = CollectionIterator;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _abstractModel = __webpack_require__(/*! ./model/abstractModel.js */ "./src/model/abstractModel.js");

var _abstractModel2 = _interopRequireDefault(_abstractModel);

var _collection = __webpack_require__(/*! ./collection/collection.js */ "./src/collection/collection.js");

var _collection2 = _interopRequireDefault(_collection);

var _iterator = __webpack_require__(/*! ./collection/iterator.js */ "./src/collection/iterator.js");

var _iterator2 = _interopRequireDefault(_iterator);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports.AbstractModel = _abstractModel2.default;
module.exports.AbstractCollection = _collection2.default;
module.exports.CollectionIterator = _iterator2.default;

/***/ }),

/***/ "./src/model/abstractModel.js":
/*!************************************!*\
  !*** ./src/model/abstractModel.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nextCoreObject = __webpack_require__(/*! next-core-object */ "./node_modules/next-core-object/dist/next-core-object.js");

var _nextCoreObject2 = _interopRequireDefault(_nextCoreObject);

var _nextCoreUtilities = __webpack_require__(/*! next-core-utilities */ "./node_modules/next-core-utilities/dist/next-core-utilities.js");

var _nextCoreValidation = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'next-core-validation'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// for now
const _clone = __webpack_require__(/*! lodash.clone */ "lodash.clone");
const _result = __webpack_require__(/*! lodash.result */ "lodash.result");
const _isEmpty = __webpack_require__(/*! lodash.isempty */ "lodash.isempty");
const _has = __webpack_require__(/*! lodash.has */ "lodash.has");
const _isEqual = __webpack_require__(/*! lodash.isequal */ "lodash.clone");
const _defaults = __webpack_require__(/*! lodash.defaults */ "lodash.defaults");
const _iteratee = __webpack_require__(/*! lodash.iteratee */ "lodash.iteratee");
const _defer = __webpack_require__(/*! lodash.defer */ "lodash.defer");
const _escape = __webpack_require__(/*! lodash.escape */ "lodash.escape");

const wrapError = (model, options) => {
  if (model) {
    const error = options.error;
    options.error = resp => {
      if (error) {
        error.call(options.context, model, resp, options);
      }
      model.trigger("error", model, resp, options);
    };
  }
};

/**
 * AbstractModel <br/>
 * Supports: <ul>
 * <li>Validation and Schemas</li>
 * <li>Security</li>
 * </ul>
 * @extends Object
 */
class AbstractModel extends _nextCoreObject2.default {
  constructor(attributes, options, ...args) {
    super(options);
    this.id = 0;
    this.idAttribute = "id"; // ????
    this.cidPrefix = "c";
    this.defaults = {};
    this.validationError = null;
    this.urlRoot = "";
    this._pending = false;
    this._changing = false;
    this._previousAttributes = null;
    this._attributes = attributes ? attributes : {};
    if (!options) {
      options = {};
    }

    this.schema = null;
    this.validationMessages = {
      valid: true
    };

    if (options && options.schema) {
      this.schema = options.schema;
    }

    this.preinitialize(args);
    this.cid = (0, _nextCoreUtilities.uniqueId)(this.cidPrefix);
    if (options && options.collection) {
      this.collection = options.collection;
    }
    let attrs;
    if (options && options.parse) {
      attrs = this.parse(attrs, options) || {};
    }

    this.defaults = _result(this, "defaults");
    attrs = _defaults((0, _nextCoreUtilities.extend)({}, this.defaults, attrs), this.defaults);
    this.set(attrs, options);
    this.changed = {};
    this.initialize(args);
  }

  /**
   * Schema property
   * @property {object} schema The JSON schema from this model
   */

  /**
   * Validation Message property
   * @property {object} validationMessages The property holding validation message data
   */

  preinitialize(...args) {}

  initialize(...args) {}

  /** Get the attribute form the Model
   * @returns {any} The model attribute
   */
  get(attribute) {
    return this._attributes[attribute];
  }

  /** Set a hash of model attributes on the object, firing `"change"`. This is
   * the core primitive operation of a model, updating the data and notifying
   * anyone who needs to know about the change in state.
   */
  set(key, val, options) {
    if (key === null) {
      return this;
    }
    // Handle both `"key", value` and `{key: value}` -style arguments.
    let attrs;
    if (typeof key === "object") {
      attrs = key;
      options = val;
    } else {
      (attrs = {})[key] = val;
    }

    if (!options) {
      options = {};
    }

    // Run validation.
    if (!this._validate(attrs, options)) {
      return false;
    }

    // Extract attributes and options.
    let unset = options.unset;
    let silent = options.silent;
    let changes = [];
    let changing = this._changing;
    this._changing = true;

    if (!changing) {
      this._previousAttributes = _clone(this._attributes);
      this.changed = {};
    }

    let current = this._attributes;
    let changed = this.changed;
    let prev = this._previousAttributes;

    let attr;
    // For each `set` attribute, update or delete the current value.
    for (attr in attrs) {
      val = attrs[attr];
      if (!_isEqual(current[attr], val)) {
        changes.push(attr);
      }
      if (!_isEqual(prev[attr], val)) {
        changed[attr] = val;
      } else {
        delete changed[attr];
      }
      unset ? delete current[attr] : current[attr] = val;
    }

    // Update the `id`.
    if (this.idAttribute in attrs) {
      this.id = this.get(this.idAttribute);
    }

    // Trigger all relevant attribute changes.
    if (!silent) {
      if (changes.length) {
        this._pending = options;
      }
      let i = 0;
      for (i = 0; i < changes.length; i++) {
        this.trigger("change:" + changes[i], this, current[changes[i]], options);
      }
    }

    // You might be wondering why there's a `while` loop here. Changes can
    // be recursively nested within `"change"` events.
    if (changing) {
      return this;
    }
    if (!silent) {
      while (this._pending) {
        options = this._pending;
        this._pending = false;
        this.trigger("change", this, options);
      }
    }
    this._pending = false;
    this._changing = false;
    return this;
  }

  /** Escape the attribute data
   */
  escape(attribute) {
    return _escape(this.get(attr));
  }

  /** Has an attribute in the Model
   * @returns {bolean} Returns true if exists
   */
  has(attribute) {
    return this.get(attr) !== null;
  }

  /** Special-cased proxy to underscore's `matches` method.
   */
  matches(attrs) {
    return !!_iteratee(attrs, this)(this._attributes);
  }

  /** Remove an attribute from the model, firing `"change"`. `unset` is a noop
   * if the attribute doesn't exist.
   */
  unset(attr, options) {
    return this.set(attr, void 0, (0, _nextCoreUtilities.extend)({}, options, { unset: true }));
  }

  /** Clear all attributes on the model, firing `"change"`.
   */
  clear(options) {
    let attrs = {};
    for (let key in this._attributes) attrs[key] = void 0;
    return this.set(attrs, (0, _nextCoreUtilities.extend)({}, options, { unset: true }));
  }

  /**
   * Transforms model to pure toJSON
   */
  toJSON() {
    return _clone(this._attributes);
  }

  //– sync x

  /** Fetch the model from the server, merging the response with the model's
   * local attributes. Any changed attributes will trigger a "change" event.
   */
  fetch(options) {
    options = (0, _nextCoreUtilities.extend)({ parse: true }, options);
    let model = this;
    let success = options.success;
    options.success = resp => {
      let serverAttrs = options.parse ? model.parse(resp, options) : resp;
      if (!model.set(serverAttrs, options)) {
        return false;
      }
      if (success) {
        success.call(options.context, model, resp, options);
      }
      model.trigger("sync", model, resp, options);
    };
    wrapError(this, options);
    return this.sync("read", this, options);
  }

  /** Set a hash of model attributes, and sync the model to the server.
   * If the server returns an attributes hash that differs, the model's
   * state will be `set` again.
   */
  save(key, val, options) {
    // Handle both `"key", value` and `{key: value}` -style arguments.
    let attrs;
    if (key == null || typeof key === "object") {
      attrs = key;
      options = val;
    } else {
      (attrs = {})[key] = val;
    }

    options = (0, _nextCoreUtilities.extend)({ validate: true, parse: true }, options);
    let wait = options.wait;

    // If we're not waiting and attributes exist, save acts as
    // `set(attr).save(null, opts)` with validation. Otherwise, check if
    // the model will be valid when the attributes, if any, are set.
    if (attrs && !wait) {
      if (!this.set(attrs, options)) {
        return false;
      }
    } else if (!this._validate(attrs, options)) {
      return false;
    }

    // After a successful server-side save, the client is (optionally)
    // updated with the server-side state.
    let model = this;
    let success = options.success;
    let attributes = this._attributes;
    options.success = resp => {
      // Ensure attributes are restored during synchronous saves.
      model.attributes = attributes;
      let serverAttrs = options.parse ? model.parse(resp, options) : resp;
      if (wait) {
        serverAttrs = (0, _nextCoreUtilities.extend)({}, attrs, serverAttrs);
      }
      if (serverAttrs && !model.set(serverAttrs, options)) {
        return false;
      }
      if (success) {
        success.call(options.context, model, resp, options);
      }
      model.trigger("sync", model, resp, options);
    };
    wrapError(this, options);

    // Set temporary attributes if `{wait: true}` to properly find new ids.
    if (attrs && wait) {
      this._attributes = (0, _nextCoreUtilities.extend)({}, attributes, attrs);
    }

    let method = this.isNew() ? "create" : options.patch ? "patch" : "update";
    if (method === "patch" && !options.attrs) {
      options.attrs = attrs;
    }
    let request = this.sync(method, this, options);

    // Restore attributes.
    this._attributes = attributes;

    return request;
  }

  /** Destroy this model on the server if it was already persisted.
   * Optimistically removes the model from its collection, if it has one.
   * If `wait: true` is passed, waits for the server to respond before removal.
   */
  destroy(options) {
    options = options ? _clone(options) : {};
    let model = this;
    let success = options.success;
    let wait = options.wait;

    let destroy = () => {
      model.stopListening();
      model.trigger("destroy", model, model.collection, options);
    };

    options.success = resp => {
      if (wait) {
        destroy();
      }
      if (success) {
        success.call(options.context, model, resp, options);
      }
      if (!model.isNew()) {
        model.trigger("sync", model, resp, options);
      }
    };

    let request = false;
    if (this.isNew()) {
      _defer(options.success);
    } else {
      wrapError(this, options);
      request = this.sync("delete", this, options);
    }
    if (!wait) destroy();
    return request;
  }

  /** Default URL for the model's representation on the server -- if you're
   * using restful methods, override this to change the endpoint
   * that will be called.
   */
  url() {
    let base = _result(this, "urlRoot") || _result(this.collection, "url") || urlError();
    if (this.isNew()) {
      return base;
    }
    let id = this.get(this.idAttribute);
    return base.replace(/[^\/]$/, "$&/") + encodeURIComponent(id);
  }

  keys() {
    return Object.keys(this._attributes);
  }

  values() {
    return Object.values(this._attributes);
  }

  /* if needed these can be used from lodash or underscore against the model's attributes
    pairs() { // ??
  
    };
  
    invert() { // ??
  
    };
  
    pick() { // ??
  
    };
  
    omit() { // ??
  
    };
  
    chain() { // ??
  
    };
  */

  /** **parse** converts a response into the hash of attributes to be `set` on
   * the model. The default implementation is just to pass the response along.
   */
  parse(resp, options) {
    return resp;
  }

  /** Create a new model with identical attributes to this one.
   */
  clone() {
    return new this.constructor(this._attributes);
  }

  /** A model is new if it has never been saved to the server, and lacks an id.
   */
  isNew() {
    return !this.has(this.idAttribute);
  }

  /** Determine if the model has changed since the last `"change"` event.
   * If you specify an attribute name, determine if that attribute has changed.
   */
  hasChanged(attr) {
    if (attr == null) {
      return !_isEmpty(this.changed);
    }
    return _has(this.changed, attr);
  }

  /** Return an object containing all the attributes that have changed, or
   * false if there are no changed attributes. Useful for determining what
   * parts of a view need to be updated and/or what attributes need to be
   * persisted to the server. Unset attributes will be set to undefined.
   * You can also pass an attributes object to diff against the model,
   * determining if there *would be* a change.
   */
  changedAttributes(diff) {
    if (!diff) {
      return this.hasChanged() ? _clone(this.changed) : false;
    }
    let old = this._changing ? this._previousAttributes : this._attributes;
    let changed = {};
    let hasChanged;
    for (let attr in diff) {
      let val = diff[attr];
      if (_isEqual(old[attr], val)) {
        continue;
      }
      changed[attr] = val;
      hasChanged = true;
    }
    return hasChanged ? changed : false;
  }

  /** Get the previous value of an attribute, recorded at the time the last
   * `"change"` event was fired.
   */
  previous(attr) {
    if (attr == null || !this._previousAttributes) {
      return null;
    }
    return this._previousAttributes[attr];
  }

  /** Get all of the attributes of the model at the time of the previous
   * `"change"` event.
   */
  previousAttributes() {
    return _clone(this._previousAttributes);
  }

  /**
   * supportsValidation - Returns True if this model supports validation
   * @returns {boolean} Returns True if this model supports validation
   */
  supportsValidation() {
    if (this.schema !== null) {
      return true;
    }
    return false;
  }

  /**
   * isValid - Returns True if this model is valid
   * Runs two level validation, attribute-level then JSON Schema
   * @returns {boolean} Returns True if this model is valid
   */
  isValid(options) {
    const valid = this._validate({}, (0, _nextCoreUtilities.extend)({}, options, { validate: true }));
    if (valid) {
      const messages = this.validate();
      return this.validationMessages.valid;
    }
    return valid;
  }
  /**
   * Validates the model
   * @returns {array} Returns array of messages from validation
   */
  validate() {
    if (!this._validationFramework) {
      this._validationFramework = new _nextCoreValidation.ValidationFramework();
    }
    const v = this._validationFramework;

    if (this.supportsValidation() && v.supportsValidation()) {
      // validate from Validator
      this.validationMessages = v.validate(this.toJSON(), this.schema);
    } else {
      this.validationMessages.valid = true;
    }
    return this.validationMessages;
  }
  /**
   * Gets the validation messages only in an array
   * @returns {array} Returns array of messages from validation
   */
  getValidationMessages() {
    const messages = [];
    if (this.validationMessages && this.validationMessages.errors) {
      const l = this.validationMessages.errors.length;
      var i = 0;
      for (i = 0; i < l; i++) {
        messages.push(this.validationMessages.errors[i].message + " from " + this.validationMessages.errors[i].dataPath);
      }
    }
    return messages;
  }
  /**
   * Sync model data to bound REST call
   */
  sync(method, model, options) {}
  /**
   * reset - clear and rewrite the model with passed data
   * @param {object} data The data to replace the model with (optional)
   */
  reset(data) {
    this.clear();
    if (data) {
      this.set(data);
    }
  }

  /**
   * isEmpty - returns true is the model is empty
   * @returns {boolean} returns true is the model is empty
   */
  isEmpty() {
    return this._attributes ? Object.keys(this._attributes).length === 0 : true;
  }

  /**
   * toString - returns the model data as a string
   * @returns {string} returns the model data as a string
   */
  toString() {
    return JSON.stringify(this.toJSON());
  }

  /**
   * fetch - Fetches the model as a 'get'
   */
  fetch(options) {
    this.sync("read", this, options);
  }
  /**
   * save - Saves the model as a 'create'
   */
  save(options) {
    this.sync("create", this, options);
  }
  /**
   * update - Updates the model as a 'update'
   */
  update(options) {
    this.sync("update", this, options);
  }
  /**
   * destroy - Deletes the model as a 'delete'
   */
  destroy(options) {
    this.sync("delete", this, options);
  }

  /** Run validation against the next complete set of model attributes,
   * returning `true` if all is well. Otherwise, fire an `"invalid"` event.
   * @private
   */
  _validate(attrs, options) {
    if (!options.validate || !this.validate) {
      return true;
    }
    const messages = this.validate();
    //attrs = extend({}, this._attributes, attrs);
    //const error = this.validationError = this.validate(attrs, options);
    //console.log(`Validate error ${JSON.stringify(error)}`);
    //if (!error.valid) {
    //  return true;
    //}
    if (messages.valid) {
      return true;
    }
    this.trigger("invalid", this, messages, (0, _nextCoreUtilities.extend)(options, { validationError: messages }));
    return false;
  }
};

exports.default = AbstractModel;

/***/ }),

/***/ "lodash.clone":
/*!******************************************************************************************************************!*\
  !*** external {"commonjs":"lodash.clone","commonjs2":"lodash.clone","amd":"lodash.clone","root":"lodash.clone"} ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_clone__;

/***/ }),

/***/ "lodash.defaults":
/*!******************************************************************************************************************************!*\
  !*** external {"commonjs":"lodash.defaults","commonjs2":"lodash.defaults","amd":"lodash.defaults","root":"lodash.defaults"} ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_defaults__;

/***/ }),

/***/ "lodash.defer":
/*!******************************************************************************************************************!*\
  !*** external {"commonjs":"lodash.defer","commonjs2":"lodash.defer","amd":"lodash.defer","root":"lodash.defer"} ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_defer__;

/***/ }),

/***/ "lodash.escape":
/*!**********************************************************************************************************************!*\
  !*** external {"commonjs":"lodash.escape","commonjs2":"lodash.escape","amd":"lodash.escape","root":"lodash.escape"} ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_escape__;

/***/ }),

/***/ "lodash.has":
/*!**********************************************************************************************************!*\
  !*** external {"commonjs":"lodash.has","commonjs2":"lodash.has","amd":"lodash.has","root":"lodash.has"} ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_has__;

/***/ }),

/***/ "lodash.isempty":
/*!**************************************************************************************************************************!*\
  !*** external {"commonjs":"lodash.isempty","commonjs2":"lodash.isempty","amd":"lodash.isempty","root":"lodash.isempty"} ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_isempty__;

/***/ }),

/***/ "lodash.iteratee":
/*!******************************************************************************************************************************!*\
  !*** external {"commonjs":"lodash.iteratee","commonjs2":"lodash.iteratee","amd":"lodash.iteratee","root":"lodash.iteratee"} ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_iteratee__;

/***/ }),

/***/ "lodash.result":
/*!**********************************************************************************************************************!*\
  !*** external {"commonjs":"lodash.result","commonjs2":"lodash.result","amd":"lodash.result","root":"lodash.result"} ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_result__;

/***/ })

/******/ });
});
//# sourceMappingURL=core-next-model.js.map