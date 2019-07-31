'use strict';

const main = () => {
  const updateImage = () => {
    const inputFile = document.querySelector('.input-file');
    inputFile.addEventListener('change', readURL);

    function readURL () {
      if (inputFile.files && inputFile.files[0]) {
        const reader = new FileReader(); // eslint-disable-line

        reader.onload = function (e) {
          const img = document.querySelector('.image-wrapper img');
          img.src = e.target.result;
        };

        reader.readAsDataURL(inputFile.files[0]);
      }
    }
  };

  const selectGenres = () => {
    const addGenre = document.querySelector('.add-genre-button');
    const genreSelect = document.querySelector('select');
    const genreContainer = document.querySelector('.genre-container');
    const genreList = document.querySelector('.genre-list');
    addGenre.addEventListener('click', newGenre);

    function newGenre () {
      const genreElement = document.createElement('button');
      genreElement.type = 'button';
      genreElement.innerText = genreSelect.value;
      genreElement.addEventListener('click', deleteGenre);
      genreContainer.appendChild(genreElement);
      genreList.value = genreList.value + '-' + genreSelect.value;
    }

    function deleteGenre () {
      const list = genreList.value.split('-');
      list.splice(list.indexOf(this.innerText), 1);
      genreList.value = list.join('-');
      genreContainer.removeChild(this);
    }
  };

  const loadGenres = () => {
    const genreContainer = document.querySelector('.genre-container');
    const genreList = document.querySelector('.genre-list');
    const genreButtons = document.querySelectorAll('.genre-container button');
    genreButtons.forEach(button => {
      genreList.value = genreList.value + '-' + button.innerText;
    });

    genreButtons.forEach(button => {
      button.addEventListener('click', deleteGenre);
    });

    function deleteGenre () {
      const list = genreList.value.split('-');
      list.splice(list.indexOf(this.innerText), 1);
      genreList.value = list.join('-');
      genreContainer.removeChild(this);
    }
  };

  updateImage();
  selectGenres();
  loadGenres();
};

window.addEventListener('load', main);
