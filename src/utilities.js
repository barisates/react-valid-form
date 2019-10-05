/* Utilities */
const config = {
  warning: {
    invalid: 'invalid-field',
    field: 'invalid-field-warning',
  },
};

const Utilities = {
  formFields: tag => {
    // form fields tag
    const tags = ['INPUT', 'SELECT', 'TEXTAREA'];

    return tags.includes(tag);
  },
  // get form fields from Ref
  elements: formRef => (Array.from(formRef.current.elements).filter(
    filter => Utilities.formFields(filter.tagName),
  )),
  validation: (element, rules, warnings) => {
    // add form field type to attributes.
    element.attributes.setNamedItem(document.createAttribute(element.type));

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
    /*
    'element.parentNode' property needs a container <div>...</div> element, so it has been replaced with the insertAdjacentElement property.
    element.parentNode.appendChild(span);
    */
    element.insertAdjacentElement('afterend', span);

    // add invalid class
    element.classList.add(config.warning.invalid);
  },
  valid: element => {
    // remove warning field if exist
    const span = document.getElementById(`${element.name}-invalid-field`);

    if (span) {
      element.parentNode.removeChild(span);
    }

    // remove invalid class
    element.classList.remove(config.warning.invalid);
  },
};

export default Utilities;
