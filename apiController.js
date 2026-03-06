const apiKey = "SUFYUEQPQJNHHY4L9RM72N5V2";


async function performSearch() {

    const zipCode = document.getElementById("zipcode").value;
    const tempCheck = document.querySelector('input[name="tempType"]:checked');
    try {
        let searchURL = "";

        // Bad query handling
        if (zipCode.length != 5) {
            throw new Error("Please enter a valid ZipCode!");
        }
        else if (!tempCheck) {
            throw new Error("Please Choose Fahrenheit or Celsius!");
        }

        const tempType = tempCheck.value;
        if (tempType === "celsius") {
            searchURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${zipCode}?unitGroup=metric&key=${apiKey}&contentType=json&include=current`;
        } else {
            searchURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${zipCode}?key=${apiKey}&contentType=json&include=current`;
        }



        const response = await fetch(searchURL);

        if (!response.ok) {
            throw new Error("Unable to obtain data from Visual Crossing Weather API. If entered zipcode is valid, the API is down.");
        }

        const jsonObject = await response.json();

        // Example temperature value
        const temperature = jsonObject.days[0].temp;
        if (tempType === "celsisus") {
            document.getElementById("result").innerText = "Current Temperature at " + zipCode + ": " + temperature + " °C";
        }
        else {
            document.getElementById("result").innerText = "Current Temperature at " + zipCode + ": " + temperature + " °F";
        }



    } catch (error) {

        document.getElementById("result").innerText = error.message;

        console.error(error);
    }
}

async function performWeeklySearch() {
    const params = new URLSearchParams(window.location.search);
    const zipCode = params.get('zip');
    const tempType = params.get('temp');

    console.log(zipCode, tempType);
    try {
        let searchURL = "";


        if (tempType === "celsius") {
            searchURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${zipCode}?unitGroup=metric&key=${apiKey}&contentType=json&include=current`;
        } else {
            searchURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${zipCode}?key=${apiKey}&contentType=json&include=current`;
        }



        const response = await fetch(searchURL);

        if (!response.ok) {
            throw new Error("Unable to obtain data from Visual Crossing Weather API. If entered zipcode is valid, the API is down.");
        }

        const jsonObject = await response.json();

        for (let i = 0; i < Math.min(jsonObject.days.length, 7); i++) {

            const temperature = jsonObject.days[i].temp;
            const tempHigh = jsonObject.days[i].tempmax;
            const tempLow = jsonObject.days[i].tempmin;
            const date = jsonObject.days[i].datetime;
            console.log("Temp1 = " + temperature);
            if (tempType === "celsius") {
                document.getElementById("curr" + (i)).innerText = temperature + " °C";
                document.getElementById("high" + (i)).innerText = tempHigh + " °C";
                document.getElementById("low" + (i)).innerText = tempLow + " °C";
            }
            else {
                document.getElementById("curr" + (i)).innerText = temperature + " °F";
                document.getElementById("high" + (i)).innerText = tempHigh + " °F";
                document.getElementById("low" + (i)).innerText = tempLow + " °F";
            }
            if (i > 0) {
                document.getElementById("day" + (i + 1)).innerText = date;
            }

        }


    } catch (error) {

        document.getElementById("error").innerText = error.message;

        console.error(error);
    }

}