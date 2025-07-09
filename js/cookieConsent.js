// В файле сразу несколько вариантов, показаных в уроке! Не забудьте убрать ненужный.

window.addEventListener("DOMContentLoaded", () => {
  // Вариант работы с cookieStorage, для работы с LocalStorage
  // закомментируйте строки 11-24 и измените значение переменной storageType
  // Если вы скачали файл до начала практики - то это готовые итоги, то есть после всех трансформаций :)

  const cookieStorage = {
    getItem: (key) => {
      const cookies = document.cookie
        .split(";")
        .map((cookie) => cookie.split("="))
        .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});

      return cookies[key];
    },
    setItem: (key, value) => {
      document.cookie = `${key}=${value};expires=Sun, 16 Jul 3567 06:23:41 GMT`;
    },
  };

  const storageType = localStorage;
  const consentPropertyType = "site_consent";

  const hasConsented = () =>
    storageType.getItem(consentPropertyType) === "true" ? true : false;
  const toggleStorage = (prop) =>
    storageType.setItem(consentPropertyType, prop);

  const popup = document.querySelector(".popup"),
    btnConfirm = document.querySelector("[data-accepter]"),
    btnCancel = document.querySelector("[data-refuser]");

  if (hasConsented()) {
    console.log("Loading...");
  } else {
    popup.classList.add("popup_active");
  }

  btnConfirm.addEventListener("click", () => {
    toggleStorage(true);
    popup.classList.remove("popup_active");
    console.log("Loading...");
  });

  btnCancel.addEventListener("click", () => {
    toggleStorage(false);
    popup.classList.remove("popup_active");
  });

  // Вариант с использованием классов

  // class CookieConsent {
  //     constructor({popup, btnConfirm, btnCancel, activeClass = ''} = {}) {
  //         this.popup = document.querySelector(popup);
  //         this.btnConfirm = document.querySelector(btnConfirm);
  //         this.btnCancel = document.querySelector(btnCancel);
  //         this.activeClass = activeClass;
  //         this.consentPropertyType = 'site_consent';
  //     }

  //     getItem = (key) => {
  //         const cookies = document.cookie
  //                             .split(';')
  //                             .map(cookie => cookie.split('='))
  //                             .reduce((acc, [key, value]) => ({...acc,
  //                                                 [key.trim()] : value}), {});

  //         return cookies[key];
  //     }

  //     setItem = (key, value) => {
  //         document.cookie = `${key}=${value};expires=Sun, 16 Jul 3567 06:23:41 GMT`;
  //     }

  //     hasConsented = () => {
  //         if (this.getItem(this.consentPropertyType) === 'true') {
  //             return true;
  //         } else {
  //             return false;
  //         }
  //     }

  //     changeStatus = (prop) => {
  //         this.setItem(this.consentPropertyType, prop);
  //         if (this.hasConsented()) {
  //             // Подписка на сервисы
  //             myScripts();
  //         }
  //     }

  //     bindTriggers = () => {
  //         this.btnConfirm.addEventListener('click', () => {
  //             this.changeStatus(true);
  //             this.popup.classList.remove(this.activeClass);
  //         });

  //         this.btnCancel.addEventListener('click', () => {
  //             this.changeStatus(false);
  //             this.popup.classList.remove(this.activeClass);
  //         });
  //     }

  //     init = () => {
  //         try {
  //             if (this.hasConsented()) {
  //                 myScripts();
  //             } else {
  //                 this.popup.classList.add(this.activeClass);
  //             }

  //             this.bindTriggers();
  //         } catch(e) {
  //             console.error('Переданы не все данные');
  //         }
  //     }
  // }

  // // Внимательно с селекторами!

  // new CookieConsent({
  //     activeClass: 'popup_active',
  //     popup: '.popup',
  //     btnConfirm: '[data-confirm]',
  //     btnCancel: '[data-cancel]'
  // }).init();

  // function myScripts() {
  //     console.log('Loading...');
  // }
});
