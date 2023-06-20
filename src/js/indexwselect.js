import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const inputEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
let selectId;
selectDataArr = [];

new SlimSelect({
  select: '#single',
  data: selectDataArr,
});

// inputEl.style.display = 'none';

fetchBreeds()
  .then(data => {
    inputEl.insertAdjacentHTML('afterbegin', createSelect(data));
    document.body.classList.add('loaded');
    inputEl.style.display = '';
  })

  .catch(err => {
    Notiflix.Report.failure('Error', `${err}`, 'Try again', reload =>
      location.reload()
    );
  });

const input = new SlimSelect({
  // data: selectDataArr,
});
input.setData(selectDataArr);
function createSelect(arr) {
  arr.forEach(({ name }) => {
    selectDataArr.push({ text: name, value: name });
  });
  console.log(selectDataArr);
  return arr
    .map(
      ({ reference_image_id, name }) =>
        `<option value="${name}" data-id="${reference_image_id}">${name}</option>`
    )
    .join('');
}

function createMarkup(arr) {
  let {
    url,
    breeds: [{ name, temperament, origin, description }],
  } = arr;
  console.log(name);
  return `<img src="${url}" alt="${name}" width = "400">
      <div class="descr">
        <h2>${name}</h2>
        <p>${description}</p>
        <p><span>Temperament:</span> ${temperament}</p>
        <p><span>Origin country:</span> ${origin}</p>
      </div>`;
}

inputEl.addEventListener('change', onChange);

function onChange() {
  selectId = inputEl.options[inputEl.selectedIndex].dataset.id;
  document.body.classList.remove('loaded');
  catInfoEl.style.display = 'none';
  fetchCatByBreed(selectId)
    .then(data => {
      document.body.classList.add('loaded');
      catInfoEl.style.display = '';
      catInfoEl.innerHTML = createMarkup(data);
    })
    .catch(err => {
      Notiflix.Report.failure('Error', `${err}`, 'Try again', reload =>
        location.reload()
      );
    });
}
