'use strict';

const main = () => {
  const searchButton = document.querySelectorAll('.searchbox-button');
  const searchStage = document.querySelector('.search-stage');
  const suggestionStage = document.querySelector('.suggestions-stage');

  searchButton.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList[1] === 'stage') {
        searchStage.classList.remove('hidden');
        suggestionStage.classList.remove('hidden');
      } else {
        searchStage.classList.add('hidden');
        suggestionStage.classList.add('hidden');
      }
    });
  });
};

window.addEventListener('load', main);
