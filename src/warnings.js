/* Warnings */
const Warnings = {
  required: () => 'Bu alan zorunludur.',
  number: () => 'Bu alan numerik olmalıdır.',
  alphanumeric: () => 'Bu alan alfanumerik olmalıdır.',
  letters: () => 'Bu alan sadece harf olmalıdır.',
  min: min => `Bu alanın min. değeri ${min} olabilir.`,
  max: max => `Bu alanın min. değeri ${max} olabilir.`,
  minlength: length => `Bu alan en az ${length} karakter olmalıdır.`,
  maxlength: length => `Bu alanın uzunluğu ${length} karakteri aşmamalıdır.`,
  email: () => 'Geçerli bir email adresi giriniz.',
  url: () => 'Geçerli bir web adresi giriniz.',
  confirm: () => 'Bu alan onay alanıyla aynı değere sahip olmalıdır.',
  regexp: () => 'Bu alan koşula uymamaktadır.',
};

export default Warnings;
