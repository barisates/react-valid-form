"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Rules = exports.Warnings = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

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

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* Utilities */
var config = {
  warning: {
    invalid: "invalid-field",
    field: "invalid-field-warning"
  }
};
var utilities = {
  formFields: function formFields(tag) {
    // form fields tag
    var tags = ["INPUT", "SELECT", "TEXTAREA"];
    return tags.includes(tag);
  },
  elements: function elements(formRef) {
    // get form fields from Ref
    return Array.from(formRef.current.elements).filter(function (filter) {
      return utilities.formFields(filter.tagName);
    });
  },
  validation: function validation(element, rules, warnings) {
    // add form field type to attributes.
    element.attributes.setNamedItem(document.createAttribute(element.type)); // filter validation rules from form field attributes.

    return Object.values(element.attributes).filter(function (filter) {
      return rules.keys().includes(filter.name.toLowerCase());
    }).map(function (map) {
      return {
        name: map.name,
        value: map.value,
        valid: rules[map.name],
        warning: warnings[map.name]
      };
    });
  },
  invalid: function invalid(element, warning) {
    // get warning field
    var span = element.parentNode.getElementsByClassName(config.warning.field)[0]; // create warning field if not exist

    if (!span) {
      span = document.createElement('span');
      span.className = config.warning.field;
    }

    span.innerHTML = warning;
    element.parentNode.appendChild(span); // add invalid class

    element.classList.add(config.warning.invalid);
  },
  valid: function valid(element) {
    // remove warning field if exist
    var span = element.parentNode.getElementsByClassName(config.warning.field)[0];
    if (span) element.parentNode.removeChild(span); // remove invalid class

    element.classList.remove(config.warning.invalid);
  }
};
/* Warnings */

var Warnings = {
  required: function required() {
    return "This field is required.";
  },
  number: function number() {
    return "This field must be numeric.";
  },
  alphanumeric: function alphanumeric() {
    return "This field must be alphanumeric.";
  },
  letters: function letters() {
    return "This field must be only letters.";
  },
  min: function min(_min) {
    return "The minimum value of this field can be ".concat(_min, ".");
  },
  max: function max(_max) {
    return "The maximum value of this field can be ".concat(_max, ".");
  },
  minlength: function minlength(length) {
    return "This field must be at least ".concat(length, " characters.");
  },
  maxlength: function maxlength(length) {
    return "This field must not exceed ".concat(length, " characters.");
  },
  email: function email() {
    return "Enter a valid email address.";
  },
  url: function url() {
    return "Enter a valid web address.";
  },
  confirm: function confirm() {
    return "This field has the same value as the confirm field.";
  },
  regexp: function regexp() {
    return "This field must match the pattern.";
  }
};
/* Rules */

exports.Warnings = Warnings;
var Rules = {
  required: function required(value) {
    return value !== null && value !== undefined && value !== "";
  },
  number: function number(value) {
    return !isNaN(value);
  },
  alphanumeric: function alphanumeric(value) {
    var regEx = /^[a-zşŞğĞüÜçÇöÖıİ0-9]+$/i;
    return regEx.test(String(value).toLowerCase());
  },
  letters: function letters(value) {
    var regEx = /^[a-zşŞğĞüÜçÇöÖıİ]+$/i;
    return regEx.test(String(value).toLowerCase());
  },
  min: function min(value, _min2) {
    return value != null && Number(value) >= _min2;
  },
  max: function max(value, _max2) {
    return value != null && Number(value) <= _max2;
  },
  minlength: function minlength(value, length) {
    return value != null && value.toString().length >= length;
  },
  maxlength: function maxlength(value, length) {
    return value != null && value.toString().length <= length;
  },
  email: function email(value) {
    var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(String(value).toLowerCase());
  },
  url: function url(value) {
    var regEx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return regEx.test(String(value).toLowerCase());
  },
  confirm: function confirm(value, repeatId) {
    var element = document.getElementById(repeatId);
    if (element) return element.value === value;
    return false;
  },
  regexp: function regexp(value, exp) {
    var regEx = new RegExp(exp);
    return regEx.test(String(value).toLowerCase());
  },
  // OWN
  keys: function keys() {
    return Object.keys(Rules).map(function (item) {
      return item.toLowerCase();
    });
  }
};
exports.Rules = Rules;

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
    return _this;
  }

  _createClass(ValidForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // get form fields from Ref
      this.formElements = utilities.elements(this.formRef);
      var form = {}; // set default null

      this.formElements.forEach(function (element) {
        form[element.name] = null;
      });
      this.setState({
        form: form
      });
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      var element = e.target; // is it form field?

      if (utilities.formFields(element.tagName)) {
        // checkbox value
        var value = element.type === "checkbox" && !element.checked ? "" : element.value; // set form state

        this.setState(function (prevState) {
          return {
            form: _objectSpread({}, prevState.form, _defineProperty({}, element.name, value))
          };
        });
      }

      ;
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(e) {
      var _this2 = this;

      e.preventDefault(); // get form fields from Ref

      this.formElements = utilities.elements(this.formRef);
      var valid = true;
      this.formElements.forEach(function (element) {
        // get form field value
        var elementValue = _this2.state.form[element.name]; // get form field validation rules

        var validationRules = utilities.validation(element, Rules, Warnings);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = validationRules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var rule = _step.value;

            // check rule
            if (!rule.valid(elementValue, rule.value)) {
              // set field invalid
              utilities.invalid(element, rule.warning(rule.value));
              if (valid) element.focus();
              valid = false;
              break;
            } // set field valid


            utilities.valid(element);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
      if (this.props.onSubmit) this.props.onSubmit(e.target, this.state.form, valid);
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          onSubmit = _this$props.onSubmit,
          onChange = _this$props.onChange,
          props = _objectWithoutProperties(_this$props, ["onSubmit", "onChange"]);

      return _react["default"].createElement("form", _extends({}, props, {
        noValidate: true,
        ref: this.formRef,
        onChange: function onChange(e) {
          return _this3.onChange(e);
        },
        onSubmit: function onSubmit(e) {
          return _this3.onSubmit(e);
        }
      }), this.props.children);
    }
  }]);

  return ValidForm;
}(_react.Component);

exports["default"] = ValidForm;
