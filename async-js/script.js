'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Using XHR for AJAX calls

const prepareCountryCard = function (data, classname = '') {
    const html = `
        <article class="country ${classname}">
          <img
            class="country__img"
            src="${data.flag}"
          />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    // countriesContainer.style.opacity = 1;

};

const getCountryData = function (countryName) {
    let data;
    const request = new XMLHttpRequest();
    request.open('GET', `https://countries-api.jonas.io/countries/name/${countryName}`);
    request.send();

    request.addEventListener('load', function () {
        [data] = JSON.parse(this.responseText);
        // console.log(JSON.parse(this.responseText));
        prepareCountryCard(data);

        // getting neighbour
        const neighbour = data.borders?.[0];
        let data2;
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://countries-api.jonas.io/countries/alpha/${neighbour}`);
        request2.send();

        request2.addEventListener('load', function () {
            data2 = JSON.parse(this.responseText);
            // console.log(JSON.parse(this.responseText));
            prepareCountryCard(data2, 'neighbour');
        });
    });
};

// getCountryData('portugal');
// getCountryData('republic of india');

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Using Promises and the fetch API

// rendering error
const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
};

const getFetchedJSON = function (url, errMsg) {
    return fetch(url).then(response => {
        // rejecting errors manually
        if (!response.ok) {
            throw new Error(`${response.status} ${errMsg}`);
        }
        // handling result otherwise
        return response.json();
    });
};

const getCountryInfo = function (country) {
    // fetch(`https://countries-api.jonas.io/countries/name/${country}`)
    //     .then(result => {
    //         // rejecting errors manually
    //         if (!result.ok) {
    //             throw new Error(`${result.status} Country not found.!`);
    //         }

    //         // handling result otherwise
    //         return result.json();
    //     })
    getFetchedJSON(`https://countries-api.jonas.io/countries/name/${country}`, 'Country not found.!')
        .then(data => {
            prepareCountryCard(data[0]);

            const neighbour = data[0].borders?.[0];
            if (!neighbour) throw new Error('No neighbour found.!');

            return getFetchedJSON(`https://countries-api.jonas.io/countries/alpha/${neighbour}`, 'Country not found.!');
        })
        // .then(result => result.json())
        .then(data => prepareCountryCard(data, 'neighbour'))
        .catch(err => {
            renderError(`Something went wrong.! ${err.message}`);
        })
        .finally(() => countriesContainer.style.opacity = 1);
};

btn.addEventListener('click', function () {
    getCountryInfo('Republic of India');
    // getCountryInfo('Australia');
    // getCountryInfo('adafeaef'); // throws the manually created error
});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const renderCountryInfo = function (locationInfo) {
    const { countryName, city } = locationInfo;
    getCountryInfo(countryName);
};

const whereAmI = function (lat, lng) {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Problem with geocoding.! ${res.status}`);
            }

            // if (res.status === 403) {
            //     throw new Error('Too many requests.!');
            // }

            return res.json();
        })
        .then(data => {
            // if (!data.countryName && !data.city) {
            //     throw new Error(`No place information found at given coordinates.!`);
            // } else {
            // renderCountryInfo(data);
            // }
            console.log(data);
        })
        .catch(err => console.log(`Something went wrong.! ${err.message}`));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
whereAmI(-37.933, 21.474);



