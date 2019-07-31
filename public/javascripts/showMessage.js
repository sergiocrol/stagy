'use strict';

const msg = () => {
  const envelopeButton = document.querySelectorAll('.envelope-button');
  const messageContainer = document.querySelectorAll('.message-container');
  console.log(messageContainer[0]);
  envelopeButton.forEach(button => {
    button.addEventListener('click', () => {
      button.parentElement.nextElementSibling.classList.toggle('active');
    });
  });
};

window.addEventListener('load', msg);
