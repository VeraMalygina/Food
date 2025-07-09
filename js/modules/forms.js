import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
  // Forms
  const API = "https://json-server-backend-izkc.onrender.com/";

  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "img/form/spinner.svg",
    success: "Merci, nous vous contacterons bientot.",
    failure: "Quelque chose n'a pas marche...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                `;
      form.insertAdjacentElement("afterend", statusMessage);

      //maniere obsolete d'envoyer des donnees au serveur par XMLHttpRequest.

      // const request = new XMLHttpRequest();
      // request.open('POST', 'server.php');

      // request.setRequestHeader('Content-type', 'application/json');
      // const formData = new FormData(form);

      // const object = {};
      // formData.forEach(function(value, key) {
      //     object[key] = value;
      // });

      // const json = JSON.stringify(object);

      // request.send(json);

      const formData = new FormData(form);

      const object = {};


      formData.forEach(function (value, key) {
        object[key] = value;
      });

      postData(`${API}requests`, JSON.stringify(object))
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
          statusMessage.remove();
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal(".modal", modalTimerId);

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");

    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

    const modalElement = document.querySelector(".modal");
    modalElement.append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal(".modal");
    }, 4000);
  }

  fetch(`${API}menu`)
    .then((data) => data.json())
    .then((res) => console.log(res));
}

export default forms;
