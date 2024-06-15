const submitBtn = document.querySelector('button[type="submit"]');
const state = {
  isValid:{
    'first-name': false,
    'last-name': false,
    'email': false,
    'password': false,
    'password-confirm': false,
    'birth-day': false
  },
  errors: {
    'first-name': 'Имя должно быть не пустым и состоять только из букв.',
    'last-name': 'Фамилия должна быть не пустой и состоять только из букв.',
    'email': 'Некорректный имейл.',
    'password': 'Пароль должен содержать заглавную букву, хотя бы одну цифру и специальный символ.',
    'password-confirm': 'Пароли должны совпадать.',
    'birth-day': 'Вам должно быть как минимум 18 лет.'
  }
}

function isAdult(birthdate) {
  const today = new Date();
  const birthdateObj = new Date(birthdate);
  const ageInMilliseconds = today - birthdateObj;
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
  return ageInYears >= 18;
}
function isValidPassword(password) {
  const hasUppercase = /[A-ZА-Я]/.test(password);
  const hasLowercase = /[a-zа-я]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*()]/.test(password);

  return (
    hasUppercase &&
    hasLowercase &&
    hasDigit &&
    hasSymbol &&
    password.length >= 8
  );
}
const validationRules = {
  'first-name': (inputEl) => {
    return (/^[а-яА-Яa-zA-Z]+$/.test(inputEl.value) && inputEl.value.length < 20);
  },
  'last-name': (inputEl) => {
    return (/^[а-яА-Яa-zA-Z]+$/.test(inputEl.value) && inputEl.value.length < 52);
  },
  'email': (inputEl) => {
    return (/^\S+@\S+\.\S+$/.test(inputEl.value));
  },
  'password': (inputEl) => {
    return isValidPassword(inputEl.value)
  },
  'password-confirm': (inputEl) => {
    const passwordValue = document.getElementById('password').value;
    return inputEl.value == passwordValue;
  },
  'birth-day': (inputEl) => {
    return isAdult(inputEl.value);
  },
}
const renderValidation = (inputEl, isValid) => {
  if (isValid) {
    inputEl.classList.add('valid')
    inputEl.classList.remove('invalid')
    document.getElementById(`${inputEl.id}-message`).innerHTML = ''
  } else {
    inputEl.classList.remove('valid')
    inputEl.classList.add('invalid')
    document.getElementById(`${inputEl.id}-message`).innerHTML = state.errors[inputEl.id]

  }
}
const validateForm = (inputEl) => {
  const isFieldValid = validationRules[inputEl.id](inputEl)
  state.isValid[inputEl.id] = isFieldValid
  submitBtn.disabled = !Object.values(state.isValid).every(Boolean);
  renderValidation(inputEl, isFieldValid)
}
document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('input', (e) => {
    validateForm(input);
  })
  input.addEventListener('blur', (e)=>{
    validateForm(input);
  })
})
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  e.currentTarget.innerHTML = 'Вы успешно заполнили форму!'
})