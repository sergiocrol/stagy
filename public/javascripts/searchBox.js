'use strict';

const main = () => {
  const bandButton = document.querySelector('.searchbox-button.band');
  const stageButton = document.querySelector('.searchbox-button.stage');
  const searchBand = document.querySelector('.search-band');
  const searchStage = document.querySelector('.search-stage');
  const suggestionBand = document.querySelector('.suggestions-band');
  const suggestionStage = document.querySelector('.suggestions-stage');

  bandButton.addEventListener('click', () => {
    searchBand.classList.remove('hidden');
    searchStage.classList.add('hidden');
    suggestionBand.classList.remove('hidden');
    suggestionStage.classList.add('hidden');
  });

  stageButton.addEventListener('click', () => {
    searchBand.classList.add('hidden');
    searchStage.classList.remove('hidden');
    suggestionBand.classList.add('hidden');
    suggestionStage.classList.remove('hidden');
  });
};

window.addEventListener('load', main);
