const map = L.map('map');
map.setView([40.65, -73.95], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const locationIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [46, 56],
    iconAnchor: [23, 56]
});

const marker = L.marker([40.65, -73.95], { icon: locationIcon }).addTo(map);

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const ipText = document.getElementById('ip-address');
const locationText = document.getElementById('location');
const timezoneText = document.getElementById('timezone');
const ispText = document.getElementById('isp');

searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const ip = searchInput.value;
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_UepZh7TYLH4vfu1YYy1zwqdBBuESc&ipAddress=${ip}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    ipText.textContent = data.ip;
    locationText.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
    timezoneText.textContent = `UTC ${data.location.timezone}`;
    ispText.textContent = data.isp;

    const lat = data.location.lat;
    const lng = data.location.lng;

    map.setView([lat, lng], 13);
    marker.setLatLng([lat, lng]);

});

