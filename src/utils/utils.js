export function formatPhoneNUmber(value) {
  const digits = value.replace(/[^0-9]/g, '');
  const match = digits.match(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/);
  if (!match) {
    return value;
  }
  return match[1] + ' (' + match[2] + ') ' + match[3] + '-' + match[4];
}

export function identifyType(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[a-zA-Z ]+$/;
  const phoneRegex = /^[0-9()-]+$/;

  if (emailRegex.test(value)) {
    return 'email';
  } else if (nameRegex.test(value)) {
    return 'name';
  } else if (phoneRegex.test(value)) {
    return 'phone';
  } else {
    return 'valor invalido';
  }
}
