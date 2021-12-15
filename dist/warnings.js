"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* Warnings */
var Warnings = {
  required: function required() {
    return 'Bu alan zorunludur.';
  },
  number: function number() {
    return 'Bu alan numerik olmalıdır.';
  },
  alphanumeric: function alphanumeric() {
    return 'Bu alan alfanumerik olmalıdır.';
  },
  letters: function letters() {
    return 'Bu alan sadece harf olmalıdır.';
  },
  min: function min(_min) {
    return "Bu alan\u0131n min. de\u011Feri ".concat(_min, " olabilir.");
  },
  max: function max(_max) {
    return "Bu alan\u0131n min. de\u011Feri ".concat(_max, " olabilir.");
  },
  minlength: function minlength(length) {
    return "Bu alan en az ".concat(length, " karakter olmal\u0131d\u0131r.");
  },
  maxlength: function maxlength(length) {
    return "Bu alan\u0131n uzunlu\u011Fu ".concat(length, " karakteri a\u015Fmamal\u0131d\u0131r.");
  },
  email: function email() {
    return 'Geçerli bir email adresi giriniz.';
  },
  url: function url() {
    return 'Geçerli bir web adresi giriniz.';
  },
  confirm: function confirm() {
    return 'Bu alan onay alanıyla aynı değere sahip olmalıdır.';
  },
  regexp: function regexp() {
    return 'Bu alan koşula uymamaktadır.';
  }
};
var _default = Warnings;
exports["default"] = _default;