import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchCountriesEl = document.querySelector('#search-box');
const countriesListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

searchCountriesEl.addEventListener(
  'input',
  debounce(handleSearchCountriesElInput, DEBOUNCE_DELAY)
);

function handleSearchCountriesElInput(event) {
  const searchCountry = event.target.value.trim();

  clearMarkup();

  if (searchCountry !== '') {
    fetchCountries(searchCountry)
      .then(country => {
        renderCountryMarkup(country);
      })
      .catch(error =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  }
}

function clearMarkup() {
  countriesListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
}

function renderCountryMarkup(country) {
  if (country.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (country.length >= 2 && country.length <= 10) {
    renderCountryListQuery(country);
  } else {
    renderCountryInfoQuery(country);
  }
}

function renderCountryListQuery(country) {
  const markup = country
    .map(data => {
      return `<li class="country__item">
          <img class="country__flag" src="${data.flags.svg}" alt="Country flag" width="70px" />
          <p class="country__name">${data.name.official}</p>
      </li>`;
    })
    .join('');

  countriesListEl.innerHTML = markup;
}

function renderCountryInfoQuery(country) {
  const markup = country.map(data => {
    return `<div class="country-info__main">
        <img class="country__flag" src="${
          data.flags.svg
        }" alt="Country flag" width="100px" />
        <h2 class="country__name--main">${data.name.official}</h2>
      </div>
      <p class="country__spec"><b>Capital: </b>${data.capital}</p>
      <p class="country__spec"><b>Population: </b>${
        data.population
      } inhabitants</p>
      <p class="country__spec"><b>Languages: </b>${Object.values(
        data.languages
      ).join(', ')}</p>`;
  });

  countryInfoEl.innerHTML = markup;
}
