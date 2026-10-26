
// ===== MAP SETUP =====
// Create the map inside <div id="map"> and start it on a placeholder location
const map = L.map('map', {zoomControl: false }); // Don't add  the defaut zoom button that are hidden under info container
L.control.zoom({ position: 'bottomright' }).addTo(map); // Move zoom buttons to make them visible
map.setView([40.65, -73.95], 13);

// Load the map pictures (tiles) from OpenStreetMap and credit them
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Custom black pin from the design
const locationIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [46, 56],
    iconAnchor: [23, 56]
});

// Make the pin once here; searches move it instead of making new ones
const marker = L.marker([40.65, -73.95], { icon: locationIcon }).addTo(map);

// ===== PAGE ELEMENTS =====
// Find the elements JavaScript needs to read from or update
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const ipText = document.getElementById('ip-address');
const locationText = document.getElementById('location');
const timezoneText = document.getElementById('timezone');
const ispText = document.getElementById('isp');
const errorText = document.getElementById('error-message');

// ===== LOOK UP AN IP OR DOMAIN =====
// Ask IPify for location info, then fill in the card and move the map
async function lookUpIp(ip) {
    // IPify needs domains labeled "domain" and IPs labeled "ipAddress".
    // Letters mean it's a domain, since IPs are only numbers and dots.
    let searchType = 'ipAddress';
    if (/[a-z]/i.test(ip)) {
        searchType = 'domain';
    }
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_UepZh7TYLH4vfu1YYy1zwqdBBuESc&${searchType}=${ip}`;

    try {
        const response = await fetch(url);
        // A bad IP or domain still gets an answer, just not an "ok" one
        if (!response.ok) {
            throw new Error('Not Found');
        }

        const data = await response.json();

        // Fill in the results card
        ipText.textContent = data.ip;
        locationText.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
        timezoneText.textContent = `UTC ${data.location.timezone}`;
        ispText.textContent = data.isp;

        // Move the map and pin to the new location
        const lat = data.location.lat;
        const lng = data.location.lng;

        map.setView([lat, lng], 13);
        marker.setLatLng([lat, lng]);

        // Clear any error left over from an earlier search
        errorText.textContent = '';
    } catch (error) {
        // Show a message if the lookup failed for any reason
        errorText.textContent = "Sorry, we couldn't find that IP address or domain. Please check it and try again.";
    }
}

// ===== SEARCH FORM =====
searchForm.addEventListener('submit', function (event) {
    // Stop the page from reloading when the form is submitted
    event.preventDefault();

    // Remove accidental spaces from the start and end
    const ip = searchInput.value.trim();

    // Don't send an empty search to IPify
    if (ip === '') {
        errorText.textContent = "Please enter an IP address or domain.";
        return;
    }

    lookUpIp(ip);  // FIX: use the trimmed version

});

// ===== ON PAGE LOAD =====
// A blank search makes IPify return the visitor's own IP and location
lookUpIp('');

