'use strict';

const main = () => {
  const searchButton = document.querySelectorAll('.searchbox-button');
  const searchStage = document.querySelector('.search-stage');

  searchButton.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList[1] === 'stage') {
        searchStage.classList.add('toggle-searchbox');
      } else {
        searchStage.classList.remove('toggle-searchbox');
      }
    });
  });
};

window.addEventListener('load', main);
