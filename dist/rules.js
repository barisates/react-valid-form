"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* Rules */
var Rules = {
  required: function required(value) {
    return value !== null && value !== undefined && value !== '';
  },
  number: function number(value) {
    return !Number.isNaN(parseFloat(value));
  },
  alphanumeric: function alphanumeric(value) {
    var regEx = /^[a-zşŞğĞüÜçÇöÖıİ0-9]+$/i;
    return regEx.test(String(value).toLowerCase());
  },
  letters: function letters(value) {
    var regEx = /^[a-zşŞğĞüÜçÇöÖıİ]+$/i;
    return regEx.test(String(value).toLowerCase());
  },
  min: function min(value, _min) {
    return value != null && Number(value) >= _min;
  },
  max: function max(value, _max) {
    return value != null && Number(value) <= _max;
  },
  minlength: function minlength(value, length) {
    return value != null && value.toString().length >= length;
  },
  maxlength: function maxlength(value, length) {
    return value != null && value.toString().length <= length;
  },
  email: function email(value) {
    var regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(String(value).toLowerCase());
  },
  url: function url(value) {
    var regEx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
    return regEx.test(String(value).toLowerCase());
  },
  confirm: function confirm(value, repeatId) {
    var element = document.getElementById(repeatId);

    if (element) {
      return element.value === value;
    }

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
var _default = Rules;
exports["default"] = _default;