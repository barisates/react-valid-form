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

  onSubmit(e) {
    e.preventDefault();

    // get form fields from Ref
    this.formElements = Utilities.elements(this.formRef);

    let valid = true;

    const { form } = this.state;

    this.formElements.forEach(element => {
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

    const { onSubmit, novalid, nosubmit, fetch } = this.props;

    if (onSubmit && (novalid || (!novalid && valid))) {
      onSubmit(e.target, form, valid);
    }

    if (!nosubmit && valid) {
      if (fetch) {
        // TODO: FETCH

      } else {
        e.target.submit();
      }
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
      form[element.name] = data[element.name];
      document.getElementById(`${element.id}`).value = (data[element.name] || '');
    });

    this.setState({
      form,
    });
  }

  render() {
    const { onSubmit, onChange, ref, children, novalid, nosubmit, ...props } = this.props;

    return (
      <form {...props} noValidate ref={this.formRef} onChange={e => this.onChange(e)} onSubmit={e => this.onSubmit(e)}>
        {children}
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
  fetch: PropTypes.bool,
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
  fetch: false,
  data: {},
};
