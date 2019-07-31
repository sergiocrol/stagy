'use strict';

const main = () => {
  const requestButton = document.querySelector('.request-button');
  const requestPopup = document.querySelector('.request-section');
  const closePopup = document.querySelector('.close-popup');

  requestButton.addEventListener('click', (event) => {
    if (requestButton.id === '') { window.location.replace('/auth/login/'); return; }
    event.preventDefault();
    requestPopup.classList.remove('popup-hidden');
  });

  closePopup.addEventListener('click', () => {
    requestPopup.classList.add('popup-hidden');
  });
};

window.addEventListener('load', main);
