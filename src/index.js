import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Utilities from './utilities';
import Warnings from './warnings';
import Rules from './rules';
import './index.css';

export default class ValidForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {},
    };

    this.formRef = React.createRef();
    this.formElements = [];
    this.onReactSelectChange = this.onReactSelectChange.bind(this);
  }

  componentDidMount() {
    this.setDefaultValue();
  }

  componentDidUpdate(prevProps) {
    const { data: prevData } = prevProps;
    const { data } = this.props;

    if (JSON.stringify(prevData) !== JSON.stringify(data)) {
      this.setDefaultValue();
    }
  }

  onChange(e) {
    const element = e.target;

    const { onChange } = this.props;

    // is it form field?
    if (Utilities.formFields(element.tagName)) {
      // checkbox value
      const value = (element.type === 'checkbox' && !element.checked ? '' : element.value);

      // set form state
      this.setState(prevState => ({
        form: { ...prevState.form, [element.name]: value },
      }));
    }

    if (onChange) {
      onChange(e);
    }
  }

  onReactSelectChange(selected, element, onChange) {
    this.setState(prevState => ({
      form: { ...prevState.form, [element.name]: selected.value },
    }));
    // trigger real event
    if (onChange) onChange(selected, element);
  }

  onSubmit(e) {
    e.preventDefault();

    // get form fields from Ref
    this.formElements = Utilities.elements(this.formRef);

    let valid = true;

    const { form } = this.state;

    this.formElements.forEach(element => {
      // for react-select validation
      if (!element.name && element.id && !element.id.includes('no-validation')) {
        if (!Rules.required(form[element.id])) {
          Utilities.invalid(element, Warnings.required(), true);
          return;
        }
        Utilities.valid(element, true);
        return;
      }
      // get form field value
      const elementValue = form[element.name];

      // get form field validation rules
      const validationRules = Utilities.validation(element, Rules, Warnings);

      Object.keys(validationRules).forEach(key => {
        const rule = validationRules[key];
        // check rule
        if (!rule.valid(elementValue, rule.value)) {
          // set field invalid
          Utilities.invalid(element, rule.warning(rule.value));
          if (valid) element.focus();
          valid = false;
          return;
        }
        // set field valid
        Utilities.valid(element);
      });
    });

    const { onSubmit, novalid, nosubmit } = this.props;

    if (onSubmit && (novalid || (!novalid && valid))) {
      onSubmit(e.target, form, valid);
    }

    if (!nosubmit && valid) {
      e.target.submit();
    }

    return false;
  }

  setDefaultValue() {
    // get form fields from Ref
    this.formElements = Utilities.elements(this.formRef);

    const { data } = this.props;

    const form = {};
    // set default null
    this.formElements.forEach(element => {
      const elementName = element.name || element.id;
      if (!elementName.includes('no-validation')) {
        form[elementName] = data[elementName];

        const getElement = document.getElementById(`${element.id}`);

        if (getElement) {
          getElement.value = (data[elementName] || '');
        }
      }
    });

    this.setState({
      form,
    });
  }

  recursiveCloneChildren(children) {
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) return child;
      const childProps = {};
      if (child.props && child.props.className === 'react-select-valid') {
        if (child.props.inputId === 'no-validation') {
          childProps.inputId = `no-validation-${Math.random().toString(36).substring(7)}`;
        }
        childProps.onChange = (selected, element) => this.onReactSelectChange(selected, element, child.props.onChange);
      }
      childProps.children = this.recursiveCloneChildren(child.props.children);
      return React.cloneElement(child, childProps);
    });
  }

  render() {
    const { onSubmit, onChange, ref, children, novalid, nosubmit, ...props } = this.props;

    return (
      <form {...props} noValidate ref={this.formRef} onChange={e => this.onChange(e)} onSubmit={e => this.onSubmit(e)}>
        {this.recursiveCloneChildren(children)}
      </form>
    );
  }
}

ValidForm.propTypes = {
  novalid: PropTypes.bool,
  nosubmit: PropTypes.bool,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  ref: PropTypes.any,
  children: PropTypes.node,
  method: PropTypes.string,
  data: PropTypes.object,
};

ValidForm.defaultProps = {
  onSubmit: null,
  onChange: null,
  novalid: false,
  nosubmit: false,
  ref: null,
  children: null,
  method: '',
  data: {},
};
