'use strict';

const main = () => {
  /*const stageButton = document.querySelector('.searchbox-button.stage');
  const bandButton = document.querySelector('.searchbox-button.band'); */
  const searchButton = document.querySelectorAll('.searchbox-button');

  searchButton.forEach((button) => {
    button.addEventListener('click', () => {
      console.log(button);
    });
  });
  /*stageButton.addEventListener('click', () => {
    console.log(stageButton);
  });

  bandButton.addEventListener('click', () => {
    console.log(bandButton);
  }); */
};

window.addEventListener('load', main);
