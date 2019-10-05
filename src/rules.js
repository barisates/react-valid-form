/* Rules */
const Rules = {
  required: value => (value !== null && value !== undefined && value !== ''),
  number: value => (!Number.isNaN(parseFloat(value))),
  alphanumeric: value => {
    const regEx = /^[a-zşŞğĞüÜçÇöÖıİ0-9]+$/i;
    return regEx.test(String(value).toLowerCase());
  },
  letters: value => {
    const regEx = /^[a-zşŞğĞüÜçÇöÖıİ]+$/i;
    return regEx.test(String(value).toLowerCase());
  },
  min: (value, min) => (value != null && Number(value) >= min),
  max: (value, max) => (value != null && Number(value) <= max),
  minlength: (value, length) => (value != null && value.toString().length >= length),
  maxlength: (value, length) => (value != null && value.toString().length <= length),
  email: value => {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(String(value).toLowerCase());
  },
  url: value => {
    const regEx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
    return regEx.test(String(value).toLowerCase());
  },
  confirm: (value, repeatId) => {
    const element = document.getElementById(repeatId);

    if (element) {
      return (element.value === value);
    }

    return false;
  },
  regexp: (value, exp) => {
    const regEx = new RegExp(exp);
    return regEx.test(String(value).toLowerCase());
  },
  // OWN
  keys: () => (Object.keys(Rules).map(item => item.toLowerCase())),
};

export default Rules;
