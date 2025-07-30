(() => {
    const hourLabel = document.querySelector('.hour');
    const minuteLabel = document.querySelector('.minute');
    const secondLabel = document.querySelector('.second');

    setInterval(() => {
        const now = new Date();

        let hr = `${now.getHours()}`.padStart(2, 0);
        let min = `${now.getMinutes()}`.padStart(2, 0);
        let sec = `${now.getSeconds()}`.padStart(2, 0);
        hourLabel.textContent = hr;
        minuteLabel.textContent = min;
        secondLabel.textContent = sec;
    }, 1000);
})();