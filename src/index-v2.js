import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import UtilitiesV2 from './utilities-v2';
import Warnings from './warnings';
import RulesV2 from './rules-v2';
import './index.css';

export default function ValidFormV2(props) {
  const { onSubmit, onChange, ref, children, novalid, nosubmit, data } = props;
  const formRef = React.createRef();
  let formElements = [];

  useEffect(() => {
    setDefaultValue();
  }, []);

  const setDefaultValue = () => {
    formElements = UtilitiesV2.elements(formRef);

    const { data } = props;
    formElements.forEach(element => {

      if (data) {
        element.value = data[element.name] || '';
      }
    });
  };

  const submit = (e) => {
    e.preventDefault();

    // get form fields from Ref
    formElements = UtilitiesV2.elements(formRef);

    let valid = true;
    let form = {};

    formElements.forEach(element => {
      
      // get form field value
      const elementValue = element.value;
      form[element.name] = element.value;
      // get form field validation RulesV2
      const validationRules = UtilitiesV2.validation(element, RulesV2, Warnings);

      for (let key = 0; key < validationRules.length; key++) {
        const rule = validationRules[key];
        // check rule
        if (!rule.valid(elementValue, rule.value)) {
          // set field invalid
          UtilitiesV2.invalid(element, rule.warning(rule.value));
          
          if (valid) element.focus();
          valid = false;
          break;
        }
        // set field valid
        UtilitiesV2.valid(element);
      }
    });

    const { onSubmit, novalid, nosubmit } = props;

    if (onSubmit && (novalid || (!novalid && valid))) {
      onSubmit(e.target, form, valid);
    }

    if (!nosubmit && valid) {
      e.target.submit();
    }

    return false;
  };


  return (
    
    <form {...props} noValidate ref={formRef} onSubmit={e => submit(e)}>
      {props.children}
    </form>
  )
}
