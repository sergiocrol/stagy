'use strict';

const main = () => {
  // const actionButton = document.querySelectorAll('.searchbox-button');
  const acceptButton = document.querySelector('.requests-button.band');
  const rejectButton = document.querySelector('.requests-button.stage');
  const requestAccepted = document.querySelector('.request-accepted');
  const requestRejected = document.querySelector('.request-rejected');

  acceptButton.addEventListener('click', () => {
    acceptButton.classList.add('selected');
    rejectButton.classList.remove('selected');
    requestAccepted.classList.remove('hidden');
    requestRejected.classList.add('hidden');
  });

  rejectButton.addEventListener('click', () => {
    acceptButton.classList.remove('selected');
    rejectButton.classList.add('selected');
    requestAccepted.classList.add('hidden');
    requestRejected.classList.remove('hidden');
  });
};

window.addEventListener('load', main);
