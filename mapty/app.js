'use strict';

// import { capitalize } from '../node_modules/lodash/capitalize';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
// const editIcon = document.querySelector('.edit--icon');
// const deleteIcon = document.querySelector('.delete--icon');

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Class definitions for workout and its subclasses
class Workout {
    date = new Date();
    workoutId = Number((Date.now() + '').slice(-10));
    constructor(distance, duration, coords) {
        this.distance = distance;
        this.duration = duration;
        this.coords = coords;
    }

    _createWorkoutDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }
}

class Cycling extends Workout {
    type = 'cycling';
    constructor(distance, duration, coords, elevationGain) {
        super(distance, duration, coords);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._createWorkoutDescription();
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
        this._createWorkoutDescription();
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
    #mapZoomLevel = 13;

    constructor() {
        // get initial position for map
        this._getPosition();

        // get data from local storage
        this._getLocalStorage();

        // event handlers
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
        containerWorkouts.addEventListener('click', this._moveToMarker.bind(this));
        // editIcon.addEventListener('click', this._editWorkout.bind(this));

    }

    _getPosition() {
        navigator.geolocation.getCurrentPosition(
            this._loadMap.bind(this),
            function () {
                alert('Could not fetch your location.!');
            }
        );
    }

    _loadMap(position) {
        const { latitude, longitude } = position.coords;
        this.#map = L.map('map').setView([latitude, longitude], this.#mapZoomLevel);

        L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        }).addTo(this.#map);

        // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(this.#map);

        this.#map.on('click', this._showForm.bind(this));

        this.#workouts && this.#workouts.forEach((work) => {
            this._renderWorkoutMarker(work);
        });
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _hideForm() {
        inputCadence.value =
            inputDistance.value =
            inputDuration.value =
            inputElevation.value =
            '';
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);
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
            if (
                !isPositiveInput(distance, duration, cadence) ||
                !isValidInput(distance, duration, cadence)
            ) {
                return alert('Not a valid input.!');
            }

            workout = new Running(distance, duration, [lat, lng], cadence);
        }

        // if workout is cycling
        if (type === 'cycling') {
            const elevation = +inputElevation.value;

            // checking if inputs are positive and valid
            if (
                !isPositiveInput(distance, duration, elevation) ||
                !isValidInput(distance, duration, elevation)
            ) {
                return alert('Not a valid input.!');
            }

            workout = new Cycling(distance, duration, [lat, lng], elevation);
        }
        workout && this.#workouts.push(workout);
        // console.log(workout);

        // rendering workout marker on map and list
        this._renderWorkoutMarker(workout);
        this._renderWorkoutOnList(workout);


        // clearing input fields and hiding form
        this._hideForm();

        // adding data to local storage
        this._setLocalStorage();

        // // adding edit and delete eventListeners
        // editIcon && editIcon.addEventListener('click', this._editWorkout.bind(this));
        // deleteIcon && deleteIcon.addEventListener('click', this._deleteWorkout.bind(this));
    }

    _editWorkout(e) {

    }

    _deleteWorkout(e) {
        const activity = e.target.closest('.workout');
        const delIndex = this.#workouts.findIndex((work, index) => work.workoutId === +activity.dataset['id']);

        // delete event
        this.#workouts.splice(delIndex, 1);
        console.log(this.#workouts);
        localStorage.removeItem('workouts');
        this._setLocalStorage();
        // this.#workouts.forEach(work => {
        //     this._renderWorkoutMarker(work);
        //     this._renderWorkoutOnList(work);
        // });
        location.reload();
    }

    _renderWorkoutMarker(workout) {
        const {
            coords: [lat, lng],
            type,
            description
        } = workout;
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
            .setPopupContent(description)
            .openPopup();
    }

    _renderWorkoutOnList(workout) {
        const { type, workoutId, date, distance, duration, description } = workout;
        const icon = type === 'cycling' ? '🚴‍♀️' : '🏃‍♂️';

        let html = `
            <li class="workout workout--${type}" data-id="${workoutId}">
                <h2 class="workout__title">${description}</h2>
                <div class="icons">
                <div class="icon edit--icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pen"
                    viewBox="0 0 16 16"
                >
                    <path
                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"
                    />
                </svg>
                </div>

                <div class="icon delete--icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                >
                    <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                    />
                    <path
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                    />
                </svg>
                </div>
                </div> 
                <div class="workout__details">
                    <span class="workout__icon">${icon}</span>
                    <span class="workout__value">${distance}</span>
                    <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <span class="workout__value">${duration}</span>
                    <span class="workout__unit">min</span>
                </div>
        `;

        if (type === 'running') {
            const { pace, cadence } = workout;
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${pace.toFixed(1)}</span>
                    <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${cadence}</span>
                    <span class="workout__unit">spm</span>
                </div>
                </li>
            `;
        }

        if (type === 'cycling') {
            const { speed, elevationGain } = workout;

            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${speed.toFixed(1)}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰</span>
                    <span class="workout__value">${elevationGain}</span>
                    <span class="workout__unit">m</span>
                </div>
                </li> 
            `;
        }

        form.insertAdjacentHTML('afterend', html);


        // adding edit and delete eventListeners
        const editIcon = document.querySelector('.edit--icon');
        const deleteIcon = document.querySelector('.delete--icon');
        editIcon && editIcon.addEventListener('click', this._editWorkout.bind(this));
        deleteIcon && deleteIcon.addEventListener('click', this._deleteWorkout.bind(this));
    }

    _moveToMarker(e) {
        // e.preventDefault();
        // ignoring clicks on edit and delete icons
        if ((e.target).parentElement.classList.contains('icon')) return;

        const targetElement = e.target.closest('.workout');
        if (!targetElement) return;

        const workout = this.#workouts.find(work => +targetElement.dataset['id'] === work.workoutId);

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1
            }
        });
    }

    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'));
        if (!data) return;

        this.#workouts = data;
        this.#workouts.forEach((work) => {
            this._renderWorkoutOnList(work);
        });
    }

    reset() {
        localStorage.removeItem('workouts');
        location.reload();
    }
}

const mapty = new App();