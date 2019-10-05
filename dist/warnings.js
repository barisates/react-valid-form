"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* Warnings */
var Warnings = {
  required: function required() {
    return 'This field is required.';
  },
  number: function number() {
    return 'This field must be numeric.';
  },
  alphanumeric: function alphanumeric() {
    return 'This field must be alphanumeric.';
  },
  letters: function letters() {
    return 'This field must be only letters.';
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
    return 'Enter a valid email address.';
  },
  url: function url() {
    return 'Enter a valid web address.';
  },
  confirm: function confirm() {
    return 'This field has the same value as the confirm field.';
  },
  regexp: function regexp() {
    return 'This field must match the pattern.';
  }
};
var _default = Warnings;
exports["default"] = _default;