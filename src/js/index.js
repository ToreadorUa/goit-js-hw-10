// Пока идет запрос за списком пород, необходимо скрыть select.breed-select и показать p.loader.
// Пока идет запрос за инфорацией о коте, необходимо скрыть div.cat-info и показать p.loader.
// Когда любой запрос завершился, p.loader необходимо скрыть
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api'


// Notiflix.Report.failure('Title', 'Message', 'Button Text');
// new SlimSelect({
//     select: '#single',
//     settings: {
//         placeholderText: 'Select cat:',
//     }
// })
const inputEl = document.querySelector(".breed-select");
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
let selectId;

loaderEl.style.display = 'none'
inputEl.style.display='none'

fetchBreeds()
.then(data => { 
    
    inputEl.insertAdjacentHTML('afterbegin',createSelect(data))
        })
        .catch(err => {
            console.log(err);
        })

function createSelect(arr) {
    return arr.map(({reference_image_id, name}) =>
        `<option value="${name}" data-id="${reference_image_id}">${name}</option>`).join('')
} 

function createMarkup(arr) {
    let {url, breeds: [{name, temperament, origin, description }]} = arr;
    console.log(name);
    return (                     
           `<img src="${url}" alt="${name}" width = "400">
      <div class="descr">
        <h2>${name}</h2>
        <p>${description}</p>
        <p><span>Temperament:</span> ${temperament}</p>
        <p><span>Origin country:</span> ${origin}</p>
      </div>`)
}

inputEl.addEventListener('change', onChange)

function onChange() {
    selectId = (inputEl.options[inputEl.selectedIndex].dataset.id);
    fetchCatByBreed(selectId)
    .then( data=> {
        console.log(data);
        catInfoEl.innerHTML= createMarkup(data)
        })
        .catch(err => {
        console.log(err);
    })
}
console.dir(inputEl)

