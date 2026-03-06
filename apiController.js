const apiKey = "SUFYUEQPQJNHHY4L9RM72N5V2";

async function performSearch() {

    const zipCode = document.getElementById("zipcode").value;
    const tempCheck = document.querySelector('input[name="tempType"]:checked');
    try {
        let searchURL = "";
        // Bad query handling
        if (!tempCheck) {
            throw new Error("Please Choose Fahrenheit or Celsius!");
        } else if (zipCode.length != 5) {
            throw new Error("Please enter a valid ZipCode!");
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
            document.getElementById("result").innerText = temperature + " °C";
        }
        else {
            document.getElementById("result").innerText = temperature + " °F";
        }



    } catch (error) {

        document.getElementById("result").innerText = error.message;

        console.error(error);
    }
}