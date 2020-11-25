"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utilities = _interopRequireDefault(require("./utilities"));

var _warnings = _interopRequireDefault(require("./warnings"));

var _rules = _interopRequireDefault(require("./rules"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ValidForm =
/*#__PURE__*/
function (_Component) {
  _inherits(ValidForm, _Component);

  function ValidForm(props) {
    var _this;

    _classCallCheck(this, ValidForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ValidForm).call(this, props));
    _this.state = {
      form: {}
    };
    _this.formRef = _react["default"].createRef();
    _this.formElements = [];
    _this.onReactSelectChange = _this.onReactSelectChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ValidForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setDefaultValue();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevData = prevProps.data;
      var data = this.props.data;

      if (JSON.stringify(prevData) !== JSON.stringify(data)) {
        this.setDefaultValue();
      }
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      var element = e.target;
      var onChange = this.props.onChange; // is it form field?

      if (_utilities["default"].formFields(element.tagName)) {
        // checkbox value
        var value = element.type === 'checkbox' && !element.checked ? '' : element.value; // set form state

        this.setState(function (prevState) {
          return {
            form: _objectSpread({}, prevState.form, _defineProperty({}, element.name, value))
          };
        });
      }

      if (onChange) {
        onChange(e);
      }
    }
  }, {
    key: "onReactSelectChange",
    value: function onReactSelectChange(selected, element, onChange) {
      this.setState(function (prevState) {
        return {
          form: _objectSpread({}, prevState.form, _defineProperty({}, element.name, selected.value))
        };
      }); // trigger real event

      if (onChange) onChange(selected, element);
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(e) {
      e.preventDefault(); // get form fields from Ref

      this.formElements = _utilities["default"].elements(this.formRef);
      var valid = true;
      var form = this.state.form;
      this.formElements.forEach(function (element) {
        // for react-select validation
        if (!element.name && element.id && !element.id.includes('no-validation')) {
          if (!_rules["default"].required(form[element.id])) {
            _utilities["default"].invalid(element, _warnings["default"].required(), true);

            valid = false;
            return;
          }

          _utilities["default"].valid(element, true);

          return;
        } // get form field value


        var elementValue = form[element.name]; // get form field validation rules

        var validationRules = _utilities["default"].validation(element, _rules["default"], _warnings["default"]);

        Object.keys(validationRules).forEach(function (key) {
          var rule = validationRules[key]; // check rule

          if (!rule.valid(elementValue, rule.value)) {
            // set field invalid
            _utilities["default"].invalid(element, rule.warning(rule.value));

            if (valid) element.focus();
            valid = false;
            return;
          } // set field valid


          _utilities["default"].valid(element);
        });
      });
      var _this$props = this.props,
          onSubmit = _this$props.onSubmit,
          novalid = _this$props.novalid,
          nosubmit = _this$props.nosubmit;

      if (onSubmit && (novalid || !novalid && valid)) {
        onSubmit(e.target, form, valid);
      }

      if (!nosubmit && valid) {
        e.target.submit();
      }

      return false;
    }
  }, {
    key: "setDefaultValue",
    value: function setDefaultValue() {
      // get form fields from Ref
      this.formElements = _utilities["default"].elements(this.formRef);
      var data = this.props.data;
      var form = {}; // set default null

      this.formElements.forEach(function (element) {
        var elementName = element.name || element.id;

        if (!elementName.includes('no-validation')) {
          form[elementName] = data[elementName];
          var getElement = document.getElementById("".concat(element.id));

          if (getElement) {
            getElement.value = data[elementName] || '';
          }
        }
      });
      this.setState({
        form: form
      });
    }
  }, {
    key: "recursiveCloneChildren",
    value: function recursiveCloneChildren(children) {
      var _this2 = this;

      return _react["default"].Children.map(children, function (child) {
        if (!_react["default"].isValidElement(child)) return child;
        var childProps = {};

        if (child.props && child.props.className === 'react-select-valid') {
          if (child.props.inputId === 'no-validation') {
            childProps.inputId = "no-validation-".concat(Math.random().toString(36).substring(7));
          }

          childProps.onChange = function (selected, element) {
            return _this2.onReactSelectChange(selected, element, child.props.onChange);
          };
        }

        childProps.children = _this2.recursiveCloneChildren(child.props.children);
        return _react["default"].cloneElement(child, childProps);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          onSubmit = _this$props2.onSubmit,
          onChange = _this$props2.onChange,
          ref = _this$props2.ref,
          children = _this$props2.children,
          novalid = _this$props2.novalid,
          nosubmit = _this$props2.nosubmit,
          props = _objectWithoutProperties(_this$props2, ["onSubmit", "onChange", "ref", "children", "novalid", "nosubmit"]);

      return _react["default"].createElement("form", _extends({}, props, {
        noValidate: true,
        ref: this.formRef,
        onChange: function onChange(e) {
          return _this3.onChange(e);
        },
        onSubmit: function onSubmit(e) {
          return _this3.onSubmit(e);
        }
      }), this.recursiveCloneChildren(children));
    }
  }]);

  return ValidForm;
}(_react.Component);

exports["default"] = ValidForm;
ValidForm.propTypes = {
  novalid: _propTypes["default"].bool,
  nosubmit: _propTypes["default"].bool,
  onSubmit: _propTypes["default"].func,
  onChange: _propTypes["default"].func,
  ref: _propTypes["default"].any,
  children: _propTypes["default"].node,
  method: _propTypes["default"].string,
  data: _propTypes["default"].object
};
ValidForm.defaultProps = {
  onSubmit: null,
  onChange: null,
  novalid: false,
  nosubmit: false,
  ref: null,
  children: null,
  method: '',
  data: {}
};