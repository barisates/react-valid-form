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
  // get form fields from Ref
  elements: function elements(formRef) {
    return Array.from(formRef.current.elements).filter(function (filter) {
      return Utilities.formFields(filter.tagName);
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
    var span = document.getElementById("".concat(element.name, "-invalid-field")); // create warning field if not exist

    if (!span) {
      span = document.createElement('span');
      span.id = "".concat(element.name, "-invalid-field");
      span.className = config.warning.field;
    }

    span.innerHTML = warning;
    /*
    'element.parentNode' property needs a container <div>...</div> element, so it has been replaced with the insertAdjacentElement property.
    element.parentNode.appendChild(span);
    */

    element.insertAdjacentElement('afterend', span); // add invalid class

    element.classList.add(config.warning.invalid);
  },
  valid: function valid(element) {
    // remove warning field if exist
    var span = document.getElementById("".concat(element.name, "-invalid-field"));

    if (span) {
      element.parentNode.removeChild(span);
    } // remove invalid class


    element.classList.remove(config.warning.invalid);
  }
};
var _default = Utilities;
exports["default"] = _default;