'use strict';

const renderCountryInfo = function (locationInfo) {
    const { countryName, city } = locationInfo;
    console.log(`You are in ${city}, ${countryName}.`);
    // getCountryInfo(countryName);
};

const whereAmI = function (lat, lng) {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Invalid Coordinates');
            }

            if (res.status === 403) {
                throw new Error('Too many requests.!');
            }

            return res.json();
        })
        .then(data => {
            if (!data.countryName && !data.city) {
                throw new Error(`No place information found at given coordinates.!`);
            } else {
                renderCountryInfo(data);
            }
        })
        .catch(err => console.log(`Something went wrong.! ${err.message}`));
};

whereAmI(12.9629, 77.5775);



