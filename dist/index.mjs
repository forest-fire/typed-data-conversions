import { defineProperty, typeof as typeof$1 } from ' rollupPluginBabelHelpers.js';
import { get } from 'lodash-es';

function removeIdPropertyFromHash(hash) {
  var idProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "id";
  var output = {};
  Object.keys(hash).map(function (objId) {
    var input = hash[objId];
    output[objId] = {};
    Object.keys(input).map(function (prop) {
      if (prop !== idProp) {
        output[objId][prop] = input[prop];
      }
    });
  });
  return output;
}
function keyValueDictionaryToArray(dict) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var __key__ = options.key || "id";

  var __value__ = options.value || "value";

  return Object.keys(dict).reduce(function (result, key) {
    var _result$concat;

    return result.concat((_result$concat = {}, defineProperty(_result$concat, __key__, key), defineProperty(_result$concat, __value__, dict[key]), _result$concat));
  }, []);
}
function keyValueArrayToDictionary(input) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var __key__ = options.key || "key";

  var __value__ = options.value || "value";

  return input.reduce(function (output, curr) {
    var key = curr[__key__];
    var value = curr[__value__];
    output[key] = value;
    return output;
  }, {});
}
function hashToArray(hashObj) {
  var __key__ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "id";

  if (hashObj && typeof$1(hashObj) !== "object") {
    throw new Error("Cant convert hash-to-array because hash was not passed in: " + hashObj);
  }

  var hash = Object.assign({}, hashObj);
  var results = [];
  var isHashArray = Object.keys(hash).every(function (i) {
    return hash[i] === true;
  });
  var isHashValue = Object.keys(hash).every(function (i) {
    return typeof$1(hash[i]) !== "object";
  });
  Object.keys(hash).map(function (id) {
    var _ref;

    var obj = typeof$1(hash[id]) === "object" ? Object.assign({}, hash[id], defineProperty({}, __key__, id)) : isHashArray ? id : (_ref = {}, defineProperty(_ref, __key__, id), defineProperty(_ref, "value", hash[id]), _ref);
    results.push(obj);
  });
  return results;
}
function flatten(list) {
  return list.reduce(function (a, b) {
    return a.concat(Array.isArray(b) ? flatten(b) : b);
  }, []);
}
function arrayToHash(arr, keyProperty) {
  if (arr.length === 0) {
    return {};
  }

  var isScalar = typeof$1(arr[0]) === "object" ? false : true;

  if (isScalar && keyProperty) {
    var e = new Error("You can not have an array of primitive values AND set a keyProperty!");
    e.name = "NotAllowed";
    throw e;
  }

  if (!keyProperty && !isScalar) {
    if (arr[0].hasOwnProperty("id")) {
      keyProperty = "id";
    } else {
      var _e = new Error("Tried to default to a keyProperty of \"id\" but that property does not appear to be in the array passed in");

      _e.name = "NotAllowed";
      throw _e;
    }
  }

  if (!Array.isArray(arr)) {
    var _e2 = new Error("arrayToHash: input was not an array!");

    _e2.name = "NotAllowed";
    throw _e2;
  }

  var output = arr.reduce(function (prev, curr) {
    var key = isScalar ? curr : typeof keyProperty === "function" ? keyProperty(curr) : curr[keyProperty];
    return isScalar ? Object.assign({}, prev, defineProperty({}, key, true)) : Object.assign({}, prev, defineProperty({}, key, curr));
  }, {});
  return output;
}
function snapshotToArray(snap) {
  var idProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "id";
  var hash = snap.val() || {};
  return hashToArray(hash, idProp);
}
function snapshotToHash(snap) {
  var idProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "id";
  var hash = snap.val() || {};
  Object.keys(hash).forEach(function (key) {
    var _hash$key;

    return typeof$1(hash[key]) === "object" ? hash[key][idProp] = key : hash[key] = (_hash$key = {}, defineProperty(_hash$key, idProp, key), defineProperty(_hash$key, "value", hash[key]), _hash$key);
  });
  return hash;
}
function snapshotToOrderedArray(snap) {
  var idProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "id";
  var output = [];
  snap.forEach(function (child) {
    var obj = child.val();
    var key = child.key;

    if (typeof$1(obj) !== "object") {
      throw new Error("Can't create a list from scalar values: \"".concat(obj, "\" | \"").concat(key, "\""));
    }

    output.push(Object.assign(defineProperty({}, idProp, key), obj));
    return true;
  });
  return output;
}
function snapshotToOrderedHash(snap) {
  var idProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "id";
  var orderedArray = this.snapshotToOrderedArray(snap, idProp);
  return this.arrayToHash(orderedArray);
}
function getPropertyAcrossDictionaryItems(dictionary, property) {
  var output = [];
  Object.keys(dictionary).map(function (item) {
    var value = get(dictionary[item], property, undefined);

    if (value !== undefined) {
      output.push(value);
    }
  });
  return output;
}

export { removeIdPropertyFromHash, keyValueDictionaryToArray, keyValueArrayToDictionary, hashToArray, flatten, arrayToHash, snapshotToArray, snapshotToHash, snapshotToOrderedArray, snapshotToOrderedHash, getPropertyAcrossDictionaryItems };
