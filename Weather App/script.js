const apikey = "639670803d32c672dbdb234768468914"

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city) =>
    `https:/api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), {
    origin: "cors" });
    const respData = await resp.json();

    console.log(respData, KtoC(respData.main.temp));
    
    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);

    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML =`
    <small>It is</small><h2>${temp}°C</h2><p>in ${search.value}</p>`;
    
    main.innerHTML = "";
    main.appendChild(weather);
}


function KtoC(K) {
    return (K - 273.15).toFixed(2);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
});