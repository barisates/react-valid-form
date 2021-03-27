/* RulesV2 */
const RulesV2 = {
  required: value => (value ? true : false),
  number: value => value ? (!Number.isNaN(parseFloat(value))) : true,
  alphanumeric: value => {
    const regEx = /^[a-zşŞğĞüÜçÇöÖıİ0-9]+$/i;
    return regEx.test(String(value).toLowerCase());
  },
  letters: value => {
    const regEx = /^[a-zşŞğĞüÜçÇöÖıİ]+$/i;
    return regEx.test(String(value).toLowerCase());
  },
  min: (value, min) => (value ? Number(value) >= min : true),
  max: (value, max) => (value ? Number(value) <= max : true),
  minlength: (value, length) => (value ? value.toString().length >= length : true),
  maxlength: (value, length) => (value ? value.toString().length <= length : true),
  email: value => {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return value ? regEx.test(String(value).toLowerCase()) : true ;
  },
  url: value => {
    const regEx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
    return value ? regEx.test(String(value).toLowerCase()) : true;
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
    return value ? regEx.test(String(value).toLowerCase()) : true;
  },
  // OWN
  keys: () => (Object.keys(RulesV2).map(item => item.toLowerCase())),
};

export default RulesV2;
