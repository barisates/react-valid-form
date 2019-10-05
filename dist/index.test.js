"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

it('renders without crashing', function () {
  var div = document.createElement('div');

  _reactDom["default"].render(_react["default"].createElement(_index["default"], null), div);

  _reactDom["default"].unmountComponentAtNode(div);
});