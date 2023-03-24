const searchParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});

export default function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?${searchParams}`
  ).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.status);
    }

    return responce.json();
  });
}
