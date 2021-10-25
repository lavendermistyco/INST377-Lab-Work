async function windowActions() {
  const endpointt = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const request = await fetch(endpointt);

  const restaurantsList = await request.json();

  const accessToken = 'pk.eyJ1IjoibGF2ZW5kZXJtaXN0eWNvIiwiYSI6ImNrdjV6ZThhNjF0d2YycW1zMXVtazYxNWYifQ.0GJtLnBpkJH4NCc8E1UTqw';

  // initialize the map
  const mymap = L.map('mapid').setView([39.0458, -76.6413], 10);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibGF2ZW5kZXJtaXN0eWNvIiwiYSI6ImNrdjV6ZThhNjF0d2YycW1zMXVtazYxNWYifQ.0GJtLnBpkJH4NCc8E1UTqw'
  }).addTo(mymap);
  // marker general 
  const marker = L.layerGroup().addTo(mymap);

  // filter the data by restaurant name and zipcode
  // eslint-disable-next-line no-shadow
  function findMatches(wordToMatch, restaurantsList) {
    restaurants = restaurantsList.filter((place) => {
      // figure out if zip or name matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return (place.zip.match(regex) && place.category.match('Restaurant'));
    });
    return restaurants.filter((restaurant) => restaurant.geocoded_column_1 !== undefined);
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  function displayMatches(event) {
    // match the array to first five restaurants
    const matchArray = findMatches(event.target.value, restaurantsList).splice(0, 5);
    // removing the markers
    if ((matchArray.length === 0) || (!searchInput.value)) {
      marker.clearLayers();
      suggestions.innerHTML = '';
    } else {
    // clear markers before user adds new search fields
      marker.clearLayers();
      const html = matchArray.map((place) => {
        const regex = new RegExp(event.target.value, 'gi');
        // eslint-disable-next-line max-len
        // const restaurant = place.name.replace(regex, `<span class="h1">${(event.target.value).toUpperCase()}</span>`);
        const zipCode = place.zip.replace(regex, `<span class="h2">${(event.target.value)}</span>`);
        // map markers
        const geoCodes = place.geocoded_column_1;
        const coordPoints = geoCodes.coordinates;
        const focusMarker = coordPoints.slice().reverse();
        const currMarker = L.marker(focusMarker).addTo(marker);
        currMarker.bindPopup(place.name);

        return `
                    <li class="box resName"> 
                        <span>
                            ${place.name}<br>
                            ${place.address_line_1} <br>
                            ${place.city}, ${place.state} <br>
                            ${zipCode} <br>
                        </span>
                    </li>
                `;
      }).join('');
      // showing the first location with the respective markers
      const firstMapMarker = matchArray[0].geocoded_column_1.coordinates.slice().reverse();
      mymap.flyTo(firstMapMarker, 13);
      suggestions.innerHTML = html;
    }
  }

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('input', (evt) => { displayMatches(evt); });
}
window.onload = windowActions;
