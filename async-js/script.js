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
    countriesContainer.style.opacity = 1;

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

// btn.addEventListener('click', function () {
//     // getCountryInfo('Republic of India');
//     // getCountryInfo('Australia');
//     // getCountryInfo('adafeaef'); // throws the manually created error

// });

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
            renderCountryInfo(data);
            // }
            // console.log(data);
        })
        .catch(err => console.log(`Something went wrong.! ${err.message}`));
};

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
// whereAmI(-37.933, 21.474);

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Asynchronous resolving order

// console.log('Test data: start'); // executed 1st, as it is in global context
// setTimeout(() => console.log('0 second passed'), 0); //executed last, as the callback sits in the callback queue
// Promise.resolve('Released a promise.').then(res => console.log(res)); //executed 3rd as the callback from promises goes to micro tasks queue and it has priority over callback queues.

// Promise.resolve('Released promise 2').then(res => {
//     for (let i = 0; i < 10000000000; i++) {
//         continue;
//     }
//     console.log(res);
// }); //executed 4th and takes some time. Still the set timeout is only executed after completion of micro tasks execution
// console.log('Test data: stop'); // executed 2nd, as it is in global context


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Creating Promises

const lottery = new Promise(function (resolve, reject) {
    setTimeout(function () {
        if (Math.random() > 0.5) {
            resolve('You won');
        } else {
            // reject(new Error('You lost'));
        }
    }, 2000);

});

// lottery.then(res => console.log(res)).catch(err => console.error(err));

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Promisifying a setTimeout
const wait = function (seconds) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, seconds * 1000);
    });
};

wait(2)
    .then(() => {
        // console.log('I waited for 2 seconds.!');

        return wait(1);
    }).then(() => {
        // console.log('I waited for 1 seconds.!');
    });

// Promise.resolve('harsh').then(data => console.log(data));
// Promise.reject(new Error('Problem.!')).catch(err => console.error(err));


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Promisifying Callbacks

// navigator.geolocation.getCurrentPosition(
//     position => console.log(position),
//     err => console.log(err)
// );


const getGeoLocation = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

// getGeoLocation().then(res => console.log(res)).catch(err => console.error(err));
// console.log('Getting Position : ');

const whereAmI2 = function () {

    getGeoLocation().then(pos => {
        const { latitute: lat, longitude: lng } = pos.coords;

        return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);

    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Problem with geocoding.! ${res.status}`);
            }

            return res.json();
        })
        .then(data => {
            // if (!data.countryName && !data.city) {
            //     throw new Error(`No place information found at given coordinates.!`);
            // } else {
            renderCountryInfo(data);
            // }
            // console.log(data);
        })
        .catch(err => console.log(`Something went wrong.! ${err.message}`));
};


// btn.addEventListener('click', whereAmI2);
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// async/await

const whereAmI3 = async function () {
    try {
        const { coords: { latitude: lat, longitude: lng } } = await getGeoLocation();

        const countryInfo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
        if (!countryInfo.ok) {
            throw new Error('Country not found.!');
        }

        const { countryName: country, city } = await countryInfo.json();

        const res = await fetch(`https://countries-api.jonas.io/countries/name/${'republic of india'}`);
        if (!res.ok) {
            throw new Error(`Error fetching country ☠️`);
        }
        const data = await res.json();
        prepareCountryCard(data[0]);

        return `You live in ${city}, ${country}`;
    } catch (err) {
        console.error(`🫥 ${err.message}`);
        renderError(err.message);
        throw err;
    }
};


// whereAmI3()
//     .then(data => console.log(`2. ${data}`))
//     .catch(err => console.error(`2. ${err.message}`))
//     .finally(() => console.log(`3. Finished getting location.`));

// btn.addEventListener('click', whereAmI3);

// (async function () {
//     console.log(`1. Starting to get location. `);
//     try {
//         const res = await whereAmI3();
//         console.log(`2. ${res}`);
//     } catch (err) {
//         console.error(err.message);
//     }
//     console.log(`3. Finished getting location.`);
// })();


//////////////////////////////////////////////////////////////////////////////
// running Promises in parallel

// Promise.all()
const get3Countries = async function (c1, c2, c3) {
    try {
        // const [data1] = await getFetchedJSON(`https://countries-api.jonas.io/countries/name/${c1}`);
        // const [data2] = await getFetchedJSON(`https://countries-api.jonas.io/countries/name/${c2}`);
        // const [data3] = await getFetchedJSON(`https://countries-api.jonas.io/countries/name/${c3}`);

        const data = await Promise.all([
            getFetchedJSON(`https://countries-api.jonas.io/countries/name/${'Israel'}`),
            getFetchedJSON(`https://countries-api.jonas.io/countries/name/${'UAE'}`),
            getFetchedJSON(`https://countries-api.jonas.io/countries/name/${'Russia'}`)
        ]);

        // console.log(data1.capital, data2.capital, data3.capital);
        // console.log(data);
        console.log(data.map(data => data[0].capital));

    } catch (err) {
        console.error(err.message);
    }
};

get3Countries('UAE', 'Israel', 'Russia');

// Promise.race()
(async function () {
    const data = await Promise.race([
        getFetchedJSON(`https://countries-api.jonas.io/countries/name/${'Israel'}`),
        getFetchedJSON(`https://countries-api.jonas.io/countries/name/${'UAE'}`),
        getFetchedJSON(`https://countries-api.jonas.io/countries/name/${'Russia'}`)
    ]);

    console.log(data[0]);
})();

const timeout = function (sec) {
    return new Promise(function (_, reject) {
        setTimeout(() => {
            reject(new Error('Timed out.!'));
        }, sec * 1000);
    });
};

Promise.race([
    getFetchedJSON(`https://countries-api.jonas.io/countries/name/${'UAE'}`),
    getFetchedJSON(`https://countries-api.jonas.io/countries/name/${'Russia'}`),
    timeout(1)
]).then(data => console.log(data[0])).catch(err => console.error(err.message));


// Promise.allSettled
Promise.allSettled([
    Promise.resolve('Success'),
    Promise.resolve('another Success'),
    Promise.reject('Error')
]).then(data => console.log(data)).catch(err => console.error(err.message));


// Promise.any
Promise.any([
    Promise.resolve('Success'),
    Promise.resolve('another Success'),
    Promise.reject('Error')
]).then(data => console.log(data)).catch(err => console.error(err.message));