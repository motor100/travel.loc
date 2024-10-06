import IMask from 'imask';


// Общие переменные
const body = document.querySelector('body');


// Input number only
const inputNumber = document.querySelector('.js-input-number');

if (inputNumber) {
  inputNumber.oninput = function() {
    this.value = this.value.replace(/[^1-9\.]/g, '');
  }
}


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
const listParentClick = document.querySelectorAll('.mobile-menu .menu-item a');

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
const callbackBtn = document.querySelectorAll('.js-callback-btn');
const callbackModal = document.querySelector('#callback-modal');
const modalWindow = document.querySelectorAll('.modal-window');
const modalCloseBtn = document.querySelectorAll('.modal-window .modal-close');

// Открытие окна обратной связи
for (let i = 0; i < callbackBtn.length; i++) {
  callbackBtn[i].onclick = function() {
    modalOpen(callbackModal);
  }
}

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
const callbackModalForm = document.querySelector("#callback-modal-form");
const callbackModalFormBtn = document.querySelector('.js-callback-modal-btn');

function ajaxCallback(form) {

  let arr = [];

  const inputName = form.querySelector('.js-required-name');
  if (inputName.value.length < 3 || inputName.value.length > 20) {
    inputName.classList.add('required');
    arr.push(false);
  } else {
    inputName.classList.remove('required');
  }

  const inputPhone = form.querySelector('.js-required-phone');
  if (inputPhone.value.length != 18) {
    inputPhone.classList.add('required');
    arr.push(false);
  } else {
    inputPhone.classList.remove('required');
  }

  const inputCheckbox = form.querySelector('.js-required-checkbox');
  if (!inputCheckbox.checked) {
    arr.push(false);
  }

  if (arr.length == 0) {

    fetch('/phpmailer/mailer.php', {
      method: 'POST',
      cache: 'no-cache',
      body: new FormData(form)
    })
    .catch((error) => {
      console.log(error);
    })

    alert("Спасибо. Мы свяжемся с вами.");

    form.reset();

  }

  return false;
}

if (callbackModalFormBtn) {
  callbackModalFormBtn.onclick = function() {
    ajaxCallback(callbackModalForm);
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
  document.cookie = name + "=" + (value || "") + expires + "; path=/" + "; sameSite=Lax;";
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function checkCookies() {
  const cookieNote = document.querySelector('#cookie_note');
  const cookieBtnAccept = cookieNote.querySelector('#cookie_accept');

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