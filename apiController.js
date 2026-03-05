const apiKey = "SUFYUEQPQJNHHY4L9RM72N5V2";

async function performSearch() {

    const zipCode = document.getElementById("zipcode").value;
    const tempType = document.querySelector('input[name="tempType"]:checked').value;

    let searchURL = "";

    if (tempType === "celsius") {
        searchURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${zipCode}?unitGroup=metric&key=${apiKey}&contentType=json`;
    } else if (tempType === "fahrenheit") {
        searchURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${zipCode}?key=${apiKey}&contentType=json`;
    }
    else {
        document.getElementById("result").innerText =
            "Please Select Fahrenheit or Celsius"
    }

    try {

        const response = await fetch(searchURL);

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const jsonObject = await response.json();

        // Example temperature value
        const temperature = jsonObject.days[0].tempmax;

        document.getElementById("result").innerText = temperature;


    } catch (error) {

        document.getElementById("result").innerText =
            "Unable to obtain data from Visual Crossing Weather API";

        console.error(error);
    }
}