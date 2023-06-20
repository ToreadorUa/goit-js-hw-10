// делает HTTP-запрос и возвращает промис с массивом пород
export function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
  return fetch(BASE_URL).then(resp => {
    console.log(resp);
    if (!resp.ok) {
      throw new Error(resp.status);
      console.log(resp);
    }
    return resp.json();
  });
}
// ожидает идентификатор породы, делает HTTP-запрос и возвращает промис с данными о коте
export function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1/images/';
  return fetch(`${BASE_URL}${breedId}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
