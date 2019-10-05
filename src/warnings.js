/* Warnings */
const Warnings = {
  required: () => 'This field is required.',
  number: () => 'This field must be numeric.',
  alphanumeric: () => 'This field must be alphanumeric.',
  letters: () => 'This field must be only letters.',
  min: min => `The minimum value of this field can be ${min}.`,
  max: max => `The maximum value of this field can be ${max}.`,
  minlength: length => `This field must be at least ${length} characters.`,
  maxlength: length => `This field must not exceed ${length} characters.`,
  email: () => 'Enter a valid email address.',
  url: () => 'Enter a valid web address.',
  confirm: () => 'This field has the same value as the confirm field.',
  regexp: () => 'This field must match the pattern.',
};

export default Warnings;
