'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.resolveUrl = resolveUrl;
exports.detectUrl = detectUrl;
exports.getUrls = getUrls;
exports.getBuffer = getBuffer;
exports.getID = getID;
exports.getGroup = getGroup;
exports.getSprite = getSprite;
exports.getContent = getContent;
exports.getSpriteResult = getSpriteResult;
exports.wrap = wrap;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveUrl(url) {
  return url;
}

function detectUrl(raw) {
  var seperator = '?__';

  var _raw$split = raw.split(seperator);

  var _raw$split2 = (0, _slicedToArray3.default)(_raw$split, 2);

  var url = _raw$split2[0];
  var tag = _raw$split2[1];

  return tag ? { url: url, tag: tag, seperator: seperator, raw: raw } : null;
}

function getUrls(content) {
  var root = _postcss2.default.parse(content);
  var urls = [];

  root.walkDecls(/background(-image)?$/, function (decl) {
    var value = decl.value;

    var start = value.indexOf('url(');
    var end = value.indexOf(')');
    var url = value.substring(start + 4, end).replace(/^[\s"']|[\s"']$/g, '');
    urls.push({ url: url, decl: decl });
  });

  return { root: root, urls: urls };
}

function getBuffer(url) {
  return _fs2.default.readFileSync(url);
}

function getID(all, item) {
  return all.indexOf(item);
}

function getGroup(all, tag) {
  return all.map(function (item, index) {
    return item.tag === tag ? index : -1;
  }).filter(function (item) {
    return item > -1;
  });
}

function getSprite(processor, all, group) {
  return processor(group.map(function (index) {
    return all[index].buffer;
  }));
}

function getContent(_ref, root, result) {
  var publicPath = _ref.publicPath;

  var extname = '.png';
  result.forEach(function (item) {
    var decl = item.decl;
    var tag = item.tag;
    var sprite = item.sprite;
    var id = item.id;

    var url = publicPath + tag + extname;
    var coor = sprite.coordinates[id];
    var size = sprite.width + 'px ' + sprite.height + 'px';
    var position = 0 - coor.x + 'px ' + (0 - coor.y) + 'px';

    var parent = decl.parent;
    decl.value = decl.value.replace(/url\(.*?\)/, 'url(\'' + url + '\')');

    parent.walkDecls(/background-(size|position)/, function (d) {
      return d.remove();
    });
    parent.insertAfter(decl, {
      prop: 'background-position',
      value: position
    });
    parent.insertAfter(decl, {
      prop: 'background-size',
      value: size
    });
  });

  return root.toString();
}

function getSpriteResult(all) {
  var valid = all.map(function (item) {
    var id = item.id;
    var group = item.group;
    var sprite = item.sprite;
    var tag = item.tag;

    return group.indexOf(id) === 0 ? (0, _defineProperty3.default)({}, tag, sprite.buffer) : {};
  });
  return valid.reduce(function (ret, item) {
    return (0, _assign2.default)({}, ret, item);
  });
}

function wrap(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args[0] == null) {
      return null;
    }
    return fn.call.apply(fn, [null].concat(args));
  };
}