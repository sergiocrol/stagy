'use strict';

const cardHelper = () => {
  const cards = document.querySelectorAll('.card-container');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      window.location.replace(card.id);
    });
  });
};

window.addEventListener('load', cardHelper);
