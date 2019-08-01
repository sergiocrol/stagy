'use strict';

const msg = () => {
  const envelopeButton = document.querySelectorAll('.envelope-button');
  envelopeButton.forEach(button => {
    button.addEventListener('click', () => {
      button.parentElement.parentElement.parentElement.nextElementSibling.classList.toggle('active');
    });
  });
};

window.addEventListener('load', msg);
