"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* Utilities */
var config = {
  warning: {
    invalid: 'invalid-field',
    field: 'invalid-field-warning'
  }
};
var Utilities = {
  formFields: function formFields(tag) {
    // form fields tag
    var tags = ['INPUT', 'SELECT', 'TEXTAREA'];
    return tags.includes(tag);
  },
  formType: function formType(type) {
    // hidden field exclude
    var types = ['hidden'];
    return !types.includes(type);
  },
  // get form fields from Ref
  elements: function elements(formRef) {
    return Array.from(formRef.current.elements).filter(function (filter) {
      return Utilities.formFields(filter.tagName) && Utilities.formType(filter.type);
    });
  },
  validation: function validation(element, rules, warnings) {
    // add form field type to attributes.
    element.attributes.setNamedItem(document.createAttribute(element.type)); // console.log(element.attributes, element.id);
    // filter validation rules from form field attributes.

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
    var reactSelect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    // get warning field
    var span = document.getElementById("".concat(element.name || element.id, "-invalid-field")); // create warning field if not exist

    if (!span) {
      span = document.createElement('span');
      span.id = "".concat(element.name || element.id, "-invalid-field");
      span.className = config.warning.field;
    }

    span.innerHTML = warning;
    /*
    'element.parentNode' property needs a container <div>...</div> element, so it has been replaced with the insertAdjacentElement property.
    element.parentNode.appendChild(span);
    */

    Utilities.parentElement(element, reactSelect).insertAdjacentElement('afterend', span); // add invalid class

    Utilities.parentElement(element, reactSelect, true).classList.add(config.warning.invalid);
  },
  valid: function valid(element) {
    var reactSelect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    // remove warning field if exist
    var span = document.getElementById("".concat(element.name || element.id, "-invalid-field"));

    if (span) {
      Utilities.parentElement(element, reactSelect).parentNode.removeChild(span);
    } // remove invalid class


    element.classList.remove(config.warning.invalid);
  },
  parentElement: function parentElement(element) {
    var reactSelect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var parentClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (reactSelect && parentClass) {
      return element.parentNode.parentNode.parentNode.parentNode;
    }

    if (reactSelect && !parentClass) {
      return element.parentNode.parentNode.parentNode.parentNode.parentNode;
    }

    return element;
  }
};
var _default = Utilities;
exports["default"] = _default;