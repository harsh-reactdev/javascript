'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Class definitions for workout and its subclasses 
class Workout {
    date = new Date().toDateString();
    workoutId = Number((Date.now() + '').slice(-10))
        ;
    constructor(distance, duration, coords) {
        this.distance = distance;
        this.duration = duration;
        this.coords = coords;

    }
}


class Cycling extends Workout {
    type = 'cycling';
    constructor(distance, duration, coords, elevationGain) {
        super(distance, duration, coords);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

class Running extends Workout {
    type = 'running';
    constructor(distance, duration, coords, cadence) {
        super(distance, duration, coords);
        this.cadence = cadence;
        this.calcPace();
    }

    calcPace() {
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// APP Architecture
class App {
    #workouts = [];
    #map;
    #mapEvent;

    constructor() {
        this._getPosition();

        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
    }

    _getPosition() {
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
            alert('Could not fetch your location.!');
        });
    }

    _loadMap(position) {
        const { latitude, longitude } = position.coords;
        this.#map = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }).addTo(this.#map);

        // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(this.#map);

        this.#map.on('click', this._showForm.bind(this));
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        e.preventDefault();

        const { lat, lng } = this.#mapEvent.latlng;

        const isValidInput = (...input) => input.every(inp => Number.isFinite(inp));
        const isPositiveInput = (...input) => input.every(inp => inp > 0);

        // Get from data
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;

        let workout;

        // if workout is running
        if (type === 'running') {
            const cadence = +inputCadence.value;

            // checking if inputs are positive and valid
            if (!isPositiveInput(distance, duration, cadence) || !isValidInput(distance, duration, cadence)) {
                return alert('Not a valid input.!');
            }

            workout = new Running(distance, duration, [lat, lng], cadence);
        }

        // if workout is cycling
        if (type === 'cycling') {
            const elevation = +inputElevation.value;

            // checking if inputs are positive and valid
            if (!isPositiveInput(distance, duration, elevation) || !isValidInput(distance, duration, elevation)) {
                return alert('Not a valid input.!');
            }

            workout = new Cycling(distance, duration, [lat, lng], elevation);
        }
        workout && this.#workouts.push(workout);
        // console.log(workout);

        this.renderWorkout(workout);



        // clearing input fields
        inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';
        form.classList.add('hidden');

    }

    renderWorkout(workout) {
        const { coords: [lat, lng], type } = workout;
        L.marker([lat, lng])
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: `${type}-popup`,
                })
            )
            .setPopupContent(type)
            .openPopup();
    }
}

const mapty = new App();