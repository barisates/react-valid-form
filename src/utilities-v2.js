/* UtilitiesV2 */
const config = {
  warning: {
    invalid: 'invalid-field',
    field: 'invalid-field-warning',
  },
};

const UtilitiesV2 = {
  formFields: tag => {
    // form fields tag
    const tags = ['INPUT', 'SELECT', 'TEXTAREA'];

    return tags.includes(tag);
  },
  formType: type => {
    // hidden field exclude
    const types = [];

    return !types.includes(type);
  },
  // get form fields from Ref
  elements: formRef => (Array.from(formRef.current.elements).filter(
    filter => UtilitiesV2.formFields(filter.tagName) && UtilitiesV2.formType(filter.type),
  )),
  validation: (element, rules, warnings) => {
    // add form field type to attributes.
    element.attributes.setNamedItem(document.createAttribute(element.type));
    // console.log(element.attributes, element.id);
    // filter validation rules from form field attributes.
    return Object.values(element.attributes)
      .filter(
        filter => rules.keys().includes(filter.name.toLowerCase()),
      )
      .map(
        map => ({
          name: map.name,
          value: map.value,
          valid: rules[map.name],
          warning: warnings[map.name],
        }),
      );
  },
  invalid: (element, warning, reactSelect = false) => {
    // get warning field
    let span = document.getElementById(`${element.name || element.id}-invalid-field`);

    // create warning field if not exist
    if (!span) {
      span = document.createElement('span');
      span.id = `${element.name || element.id}-invalid-field`;
      span.className = config.warning.field;
    }

    span.innerHTML = warning;

    /*
    'element.parentNode' property needs a container <div>...</div> element, so it has been replaced with the insertAdjacentElement property.
    element.parentNode.appendChild(span);
    */
    UtilitiesV2.parentElement(element, reactSelect).insertAdjacentElement('afterend', span);

    // add invalid class
    UtilitiesV2.parentElement(element, reactSelect, true).classList.add(config.warning.invalid);
  },
  valid: (element, reactSelect = false) => {
    // remove warning field if exist
    const span = document.getElementById(`${element.name || element.id}-invalid-field`);

    if (span) {
      UtilitiesV2.parentElement(element, reactSelect).parentNode.removeChild(span);
    }

    // remove invalid class
    element.classList.remove(config.warning.invalid);
  },
  parentElement: (element, reactSelect = false, parentClass = false) => {
    if (reactSelect && parentClass) {
      return element.parentNode.parentNode.parentNode.parentNode;
    }
    if (reactSelect && !parentClass) {
      return element.parentNode.parentNode.parentNode.parentNode.parentNode;
    }
    return element;
  },
};

export default UtilitiesV2;
