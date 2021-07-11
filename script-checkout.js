'use strict'

let formSubmit = document.querySelector('.accordion-button');
formSubmit.addEventListener('click', function (event) {
    // event.preventDefault();
    let nameSubmit = document.getElementById('accordion-name');
    let nameValid = nameSubmit.value.match(/[a-z]|[а-яё]/g);
    if (nameSubmit.value.length !== nameValid.length) {
        nameSubmit.style.borderColor = 'red';
        alert('Имя должно содержать только латинские или русские буквы');
        event.preventDefault();
    } else {
        nameSubmit.style.borderColor = 'transparent';
    }

    let phoneSubmit = document.getElementById('accordion-phone');
    //хотела, чтобы номер автоматически приводился к стандарту, но у меня не получилось. Как это сделать?
    // phoneSubmit.addEventListener('input', function (change) {

    //     if (phoneSubmit.value.match(/\d{9,12}/)) {
    //         if (phoneSubmit.value[0] == '8') {
    //             phoneSubmit.value.replace('8', '+7');
    //         }
    //     }

    let phoneCheck = /\+7\(\d{3}\)\d{3}-\d{4}/;
    let phoneValid = phoneCheck.test(phoneSubmit.value);
    if (!(phoneValid && phoneSubmit.value.length == 15)) {
        phoneSubmit.style.borderColor = 'red';
        alert('Правильный способ записи номера телефона: +7(000)000-0000');
        event.preventDefault();
    } else {
        phoneSubmit.style.borderColor = 'transparent';
    }

    let emailSubmit = document.getElementById('accordion-email');
    let emailCheck = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/
    let emailValid = emailCheck.test(emailSubmit.value);
    if (!emailValid) {
        emailSubmit.style.borderColor = 'red';
        alert('Вы неправильно ввели email');
        event.preventDefault();
    } else {
        emailSubmit.style.borderColor = 'transparent';
    }
});