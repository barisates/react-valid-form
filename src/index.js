import React, { Component } from 'react';
import './index.css';

/* Utilities */
const config = {
  submitValid: true,
  warning: {
    invalid: "invalid-field",
    field: "invalid-field-warning"
  }
}

const utilities = {
  formFields: (tag) => {
    // form fields tag
    const tags = ["INPUT", "SELECT", "TEXTAREA"]

    return tags.includes(tag);
  },
  elements: (formRef) => {

    // get form fields from Ref
    return Array.from(formRef.current.elements).filter(
      filter => utilities.formFields(filter.tagName)
    );

  },
  validation: (element, rules, warnings) => {

    // add form field type to attributes.
    element.attributes.setNamedItem(document.createAttribute(element.type));

    // filter validation rules from form field attributes.
    return Object.values(element.attributes)
      .filter(
        filter => rules.keys().includes(filter.name.toLowerCase())
      )
      .map(
        map => ({
          name: map.name,
          value: map.value,
          valid: rules[map.name],
          warning: warnings[map.name]
        })
      );

  },
  invalid: (element, warning) => {

    // get warning field
    let span = document.getElementById(`${element.name}-invalid-field`);

    // create warning field if not exist
    if (!span) {
      span = document.createElement('span');
      span.id = `${element.name}-invalid-field`;
      span.className = config.warning.field;
    }

    span.innerHTML = warning;
    element.parentNode.appendChild(span);

    // add invalid class
    element.classList.add(config.warning.invalid);
  },
  valid: (element) => {

    // remove warning field if exist
    const span = document.getElementById(`${element.name}-invalid-field`);

    if (span)
      element.parentNode.removeChild(span);

    // remove invalid class
    element.classList.remove(config.warning.invalid);
  }
}

/* Warnings */
export const Warnings = {
  required: () => "This field is required.",
  number: () => "This field must be numeric.",
  alphanumeric: () => "This field must be alphanumeric.",
  letters: () => "This field must be only letters.",
  min: (min) => `The minimum value of this field can be ${min}.`,
  max: (max) => `The maximum value of this field can be ${max}.`,
  minlength: (length) => `This field must be at least ${length} characters.`,
  maxlength: (length) => `This field must not exceed ${length} characters.`,
  email: () => "Enter a valid email address.",
  url: () => "Enter a valid web address.",
  confirm: () => "This field has the same value as the confirm field.",
  regexp: () => "This field must match the pattern."
}

/* Rules */
export const Rules = {
  required: (value) => {
    return (value !== null && value !== undefined && value !== "")

  },
  number: (value) => {
    return (!isNaN(value))
  },
  alphanumeric: (value) => {
    const regEx = /^[a-zşŞğĞüÜçÇöÖıİ0-9]+$/i;
    return regEx.test(String(value).toLowerCase());
  },
  letters: (value) => {
    const regEx = /^[a-zşŞğĞüÜçÇöÖıİ]+$/i;
    return regEx.test(String(value).toLowerCase());
  },
  min: (value, min) => {
    return (value != null && Number(value) >= min)
  },
  max: (value, max) => {
    return (value != null && Number(value) <= max)
  },
  minlength: (value, length) => {
    return (value != null && value.toString().length >= length)

  },
  maxlength: (value, length) => {
    return (value != null && value.toString().length <= length)

  },
  email: (value) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(String(value).toLowerCase());
  },
  url: (value) => {
    const regEx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return regEx.test(String(value).toLowerCase());
  },
  confirm: (value, repeatId) => {
    let element = document.getElementById(repeatId);

    if (element)
      return (element.value === value)

    return false;
  },
  regexp: (value, exp) => {
    const regEx = new RegExp(exp)
    return regEx.test(String(value).toLowerCase());
  },
  // OWN
  keys: () => (Object.keys(Rules).map(item => item.toLowerCase()))
};



export default class ValidForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      form: {

      }
    };

    this.formRef = React.createRef();
    this.formElements = [];

  }
  componentDidMount() {
    // get form fields from Ref
    this.formElements = utilities.elements(this.formRef);

    let form = {};

    // set default null
    this.formElements.forEach(element => {
      form[element.name] = null;
    });

    this.setState({
      form: form
    });
  }

  onChange(e) {

    const element = e.target;

    // is it form field?
    if (utilities.formFields(element.tagName)) {

      // checkbox value
      let value = (element.type === "checkbox" && !element.checked ? "" : element.value);

      // set form state
      this.setState(prevState => ({
        form: { ...prevState.form, [element.name]: value }
      }));

    };

  }
  onSubmit(e) {
    e.preventDefault();

    // get form fields from Ref
    this.formElements = utilities.elements(this.formRef);

    let valid = true;

    this.formElements.forEach(element => {

      // get form field value
      let elementValue = this.state.form[element.name];

      // get form field validation rules
      let validationRules = utilities.validation(element, Rules, Warnings);

      for (let rule of validationRules) {

        // check rule
        if (!rule.valid(elementValue, rule.value)) {

          // set field invalid
          utilities.invalid(element, rule.warning(rule.value));

          if (valid) element.focus();

          valid = false;
          break;
        }

        // set field valid
        utilities.valid(element);
      }

    });

    if (this.props.onSubmit)
      this.props.onSubmit(e.target, this.state.form, valid);
    else if (config.submitValid && valid)
      e.target.submit();

    return false;
  }
  render() {
    const { onSubmit, onChange, ref, ...props } = this.props;

    return (
      <form {...props} noValidate ref={this.formRef} onChange={(e) => this.onChange(e)} onSubmit={(e) => this.onSubmit(e)}>
        {this.props.children}
      </form>
    )
  }
}