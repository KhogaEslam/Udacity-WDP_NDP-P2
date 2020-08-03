// Global Variables
let feelings;

/* Helper Functions */
const buildURLToOpenWeatherMap = (countryCode, zipCode) => {

    return `${baseURL}${zipCode},${countryCode}`;
}

// Adds <option> elements to an element from an array
const populateSelectElement = (element, values) => {
    let options = "";

    for (var i = 0; i < values.length; i++) {
        options += `<option value='${values[i].Code}'>${values[i].Name}</option>`;
    }

    element.innerHTML = element.innerHTML + options;
}

// Event listener to add function to existing HTML DOM element
document.addEventListener('DOMContentLoaded', () => {

    // Add the listener to 'Generate' button via click event listener
    document.querySelector('#generate')
        .addEventListener('click', generateWeatherData);

    const countryCodes = getCountriesList();
    const countrySelect = document.querySelector('#country');
    // Add country codes to the <select> elements
    populateSelectElement(countrySelect, countryCodes);

    // Get data and Update UI
    getAppData()
        .then((appData) => { updateUI(appData); });
});

/* Function called by event listener */
const generateWeatherData = () => {

    // Store user inputs
    const zipCode = document.querySelector('#zip').value;
    feelings = document.querySelector('#feelings').value;
    const country = document.querySelector('#country').value;

    // Validating ZIP Code [minimum ZIP code length is 5]
    if (!isNaN(zipCode) && zipCode.length == 5){

        // Simple form validation for feelings
        if (feelings.length > 0){

            // Get weather Data by ZIP,
            // save data to server,
            // return data from server
            // Update current UI entry
            // Or catch Errors.
            getWeatherDataByZIP(country, zipCode)
                .then((weatherData) => { return postAppData(weatherData); })
                .then(() => { return getAppData(); })
                .then((appData) => { updateUI(appData); })
                .catch((error) => { alert(error); });

        } else {

            alert("Please enter your feelings!");
            document.querySelector('#feelings').focus();
        }
    
    } else{

        alert("Please enter a valid 5 digits ZIP code.");
        document.querySelector('#zip').focus();
    }

}

/* Function to GET Web API Data*/
const getWeatherDataByZIP = async (country, zipCode) => {

    const countryCode = country != null && country.length > 0 ? country : 'US';

    const weatherURL = buildURLToOpenWeatherMap(countryCode, zipCode); // Build API URL
    const response = await fetch(weatherURL); // Get weather info from OpenWeatherMap

    try {
        const weatherData = await response.json(); // Convert response to JSON and store it
        weatherData.country = countryCode; // Store country code in returned data
        weatherData.zipCode = zipCode; // Store selected zip code in returned data
        
        // Break Promise chaine if OpenWeatherMap API response is not OK.
        if (weatherData.cod == 404){
            return Promise.reject(weatherData.message);
        }

        return weatherData;

    } catch(error) {
        alert(error);
    }

}

/* Function to POST data */
const postAppData = async (weatherData) => {

    // Create data for app entry
    const date = new Date();
    const entryID = date.getTime();
    const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    const appData = {
            'entryID': entryID,
            'date': dateFormatted,
            'country': weatherData.country,
            'zipCode': weatherData.zipCode,
            'name': weatherData.name,
            'temp': weatherData.main.temp,
            'feelings': feelings
        };

    const response = await fetch('/updateData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appData)
        });

    try {
        const returnData = await response.json();
        return returnData.entryID;

    } catch( error ) {
        alert(error);
    }

}

/* Function to GET Project Data */
const getAppData = async () => {

    const response = await fetch('/getAllData');

    try {
        const appData = await response.json(); // Convert response to JSON and store it

        return appData;

    } catch(error){
        alert(error);
    }

}

// Update current UI entry
const updateUI = async ( appData ) => {

    console.log(appData);
    let allEntries = "";

    for (const entry of appData.reverse()) {

        const journalEntry = `
            <div class="journalEntry">
                <div id="date">Date: ${entry.date}</div>
                <div id="country">Country: ${entry.country}</div>
                <div id="city">City: ${entry.name}</div>
                <div id="temp">Trmprature: ${entry.temp}°F</div>
                <div id="content">Feelings: ${entry.feelings}</div>
            </div>
            <hr>
        `;

        allEntries += journalEntry;
    }
    
    if (allEntries != "") {
        document.querySelector('#entryHolder').innerHTML = allEntries;
    } else {
        document.querySelector('#entryHolder').innerHTML = "No Entries Found.";
    }

}