'use strict';

const main = () => {
  const actionButton = document.querySelectorAll('.searchbox-button');
  const rejectedStage = document.querySelector('.request-rejected');

  actionButton.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList[1] === 'stage') {
        rejectedStage.classList.add('visible');
      } else {
        rejectedStage.classList.remove('visible');
      }
    });
  });
};

window.addEventListener('load', main);
