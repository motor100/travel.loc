// import Swiper, { Navigation } from 'swiper';
// import AirDatepicker from 'air-datepicker';
// import PhotoSwipeLightbox from 'photoswipe/lightbox';
import IMask from 'imask';


// Общие переменные
const body = document.querySelector('body');


// Guest input digits only
// let inputDigitsOnly = document.querySelector('#guest');
// if (inputDigitsOnly) {
//   inputDigitsOnly.oninput = function() {
//     this.value = this.value.replace(/[^1-9\.]/g, '');
//   }
// }


// Мобильное меню
const burgerMenuWrapper = document.querySelector('.burger-menu-wrapper');
const mobileMenu = document.querySelector('.mobile-menu');
const burgerMenu = document.querySelector('.burger-menu');

burgerMenuWrapper.onclick = function () {
  body.classList.toggle('overflow-hidden');
  burgerMenuWrapper.classList.toggle('active');
  mobileMenu.classList.toggle('mobile-menu-open');
  burgerMenu.classList.toggle('close');
}

// закрытие меню при клике на parent элемент
let listParentClick = document.querySelectorAll('.mobile-menu .menu-item a');
for (let i = 0; i < listParentClick.length; i++) {
  listParentClick[i].onclick = function (event) {
    event.preventDefault();
    closeMenu ();
    let hrefClick = this.href;
    setTimeout(function() {location.href = hrefClick}, 700);
  }
}

function closeMenu () {
  body.classList.remove('overflow-hidden');
  burgerMenuWrapper.classList.remove('active');
  mobileMenu.classList.remove('mobile-menu-open');
  burgerMenu.classList.remove('close');
}

// Окна
let callbackBtn = document.querySelectorAll('.js-callback-btn'),
    // mobileMenuCallbackBtn = document.querySelector('.mobile-menu-callback-btn'),
    callbackModal = document.querySelector('#callback-modal'),
    privacyPolicyBtn = document.querySelectorAll('.privacy-policy-btn'),
    privacyPolicyModal = document.querySelector('#privacy-policy-modal'),
    modalWindow = document.querySelectorAll('.modal-window'),
    modalCloseBtn = document.querySelectorAll('.modal-window .modal-close');

// Открытие окна обратной связи
for (let i = 0; i < callbackBtn.length; i++) {
  callbackBtn[i].onclick = function() {
    modalOpen(callbackModal);
  }
}

// Открытие окна политики
for (let i = 0; i < privacyPolicyBtn.length; i++) {
  privacyPolicyBtn[i].onclick = function() {
    modalOpen(privacyPolicyModal);
  }
}

// mobileMenuCallbackBtn.onclick = function() {
//   closeMenu();
//   modalOpen(callbackModal);
// }

function modalOpen(win) {
  body.classList.add('overflow-hidden');
  win.style.display = "block";
  win.childNodes[1].classList.add('active')
}

// Закрытие окон
for (let i = 0; i < modalCloseBtn.length; i++) {
  modalCloseBtn[i].onclick = function() {
    modalClose(modalWindow[i]);
  }
}

for (let i = 0; i < modalWindow.length; i++) {
  modalWindow[i].onclick = function(event) {
    let classList = event.target.classList;
    for (let j = 0; j < classList.length; j++) {
      if (classList[j] == "modal-window" || classList[j] == "modal-wrapper") {
        modalClose(modalWindow[i])
      }
    }
  }
}

function modalClose(win) {
  body.classList.remove('overflow-hidden');
  win.style.display = "";
  win.childNodes[1].classList.remove('active');
}


// Отправка формы ajax
let callbackModalForm = document.querySelector("#callback-modal-form"),
    callbackModalFormBtn = document.querySelector('.js-callback-modal-btn');

if (callbackModalFormBtn) {
  callbackModalFormBtn.onclick = function(event) {
    ajaxSend(callbackModalForm);
  }
}


function ajaxSend(form) {  
  event.preventDefault();

  // Проверка обязательных полей
  let input = form.querySelectorAll('.input-field');
  let arr = [];
  for (let i = 0; i < input.length; i++) {
    let attr = input[i].hasAttribute('required');
    if (attr && input[i].value == "" ) {
      input[i].classList.add('required');
      arr.push(false);
    }
  }

  if (arr.length == 0) {
    for (let i = 0; i < input.length; i++) {
      input[i].classList.remove('required');
    }

    // Создание объекта
    let formData = {
      name: form.querySelector('.name').value,
      phone: form.querySelector('.phone').value,
      startDate: form.querySelector('#modal-start-date').value,
      guest: form.querySelector('#modal-guest').value,
      checkbox: form.querySelector('.custom-checkbox').checked,
    };

    // Передача
    let request = new XMLHttpRequest();

    request.open('post', "phpmailer/mailer.php");
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send('name=' + encodeURIComponent(formData.name) + '&phone=' + encodeURIComponent(formData.phone) + '&start_date=' + encodeURIComponent(formData.startDate) + '&guest=' + encodeURIComponent(formData.guest) + '&checkbox=' + encodeURIComponent(formData.checkbox));

    // Сообщение
    alert("Спасибо. Мы свяжемся с вами.");

    // Очистка формы
    form.reset();
    form.querySelector('#modal-start-date').value = '';
    form.querySelector('#modal-guest').value = '';
  }

}


// Input mask
const elementPhone = document.querySelector('#callback-phone');

const maskOptionsPhone = {
  mask: '+{7} (000) 000 00 00'
};

const mask = IMask(elementPhone, maskOptionsPhone);


// Current year
const now = new Date();
const year = now.getFullYear();

const currentYear = document.getElementById('current-year');
currentYear.innerText = year;


// Set cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/" + "; sameSite=Lax;" + "; sameSite=Lax;";
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function checkCookies() {
  let cookieNote = document.querySelector('#cookie_note');
  let cookieBtnAccept = cookieNote.querySelector('#cookie_accept');

  // Если куки we-use-cookie нет или она просрочена, то показываем уведомление
  if (!getCookie('we-use-cookie')) {
    cookieNote.classList.add('show');
  }

  // При клике на кнопку устанавливаем куку we-use-cookie на один год
  cookieBtnAccept.addEventListener('click', function () {
    setCookie('we-use-cookie', 'true', 365);
    cookieNote.classList.remove('show');
  });
}

checkCookies();
