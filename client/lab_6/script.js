async function windowActions() {
  const endpointt = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const request = await fetch(endpointt);

  const restaurants = await request.json();
  // filter the data by restaurant name and zipcode
  // eslint-disable-next-line no-shadow
  function findMatches(wordToMatch, restaurants) {
    return restaurants.filter((place) => {
      // figure out if zip or name matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return (place.name.match(regex) && place.category.match('Restaurant'))
                || (place.zip.match(regex) && place.category.match('Restaurant'));
    });
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, restaurants);
    const html = matchArray.map((place) => {
      const regex = new RegExp(event.target.value, 'gi');
      const restaurant = place.name.replace(regex, `<span class="h1">${(event.target.value).toUpperCase()}</span>`);
      const zipCode = place.zip.replace(regex, `<span class="h2">${(event.target.value)}</span>`);
      return `
                <li> 
                    <span class="name">
                        ${restaurant}<br>
                        ${place.address_line_1} <br>
                        ${place.city}, ${place.state} <br>
                        ${zipCode} <br>
                    </span>
                </li>
            `;
    }).join('');
    suggestions.innerHTML = html;
  }

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => {
    if (searchInput.value === '') {
      suggestions.innerHTML = '';
    } else {
      displayMatches(evt);
    }
  });
}

window.onload = windowActions;