const dialog = document.getElementById('weeklySearch');
const openDialoge = document.getElementById('openDialoge');
const closeButton = document.getElementById('closeButton');
openDialoge.addEventListener('click', () => {
    dialog.showModal();
});
closeButton.addEventListener('click', () => {
    dialog.close();
});

const weeklySearchForm = document.getElementById('weeklySearchForm');
weeklySearchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // stop default form submit

    const zip = document.getElementById('zipcodeWeek').value.trim();
    const tempCheck = document.querySelector('input[name="tempTypeWeek"]:checked');

    if (zip.length !== 5) {
        document.getElementById('errMessage').innerText = "Please enter a valid zip code";
        return;
    }

    if (!tempCheck) {
        document.getElementById('errMessage').innerText = "Please select Fahrenheit or Celsius";
        return;
    }

    // Redirect with query parameters
    const tempType = tempCheck.value;
    window.location.href = `weeklyForecast.html?zip=${zip}&temp=${tempType}`;

});
