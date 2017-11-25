const mapboxgl = require('mapbox-gl');
const buildMarker = require('./marker.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiamFzbWluYWJhc3VyaXRhIiwiYSI6ImNqYTl0aHV0aDBraWEyd282cTduajhqb2YifQ.GG_9PlLoG9PCL2bcOQbYWg';

const fullstackCoords = [-74.009, 40.705] // NY
// const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const map = new mapboxgl.Map({
  container: 'map',
  center: fullstackCoords, // FullStack coordinates
  zoom: 12, // starting zoom
  style: 'mapbox://styles/mapbox/dark-v9' // mapbox has lots of different map styles available.
});

const marker = buildMarker('activities', fullstackCoords);
marker.addTo(map);

const hotelChoices = document.getElementById('hotels-choices')
const activityChoices = document.getElementById('activities-choices')
const restaurantChoices = document.getElementById('restaurants-choices')
const [hotelList, restaurantList, activityList] = document.getElementsByClassName('list-group')

// function createOption(itemObj) {
//   const option = document.createElement('option')
//   option.innerHTML = itemObj.name
//   option.value = itemObj.id
//   return option
// }


function newSelectOptions(itemsArr, choices) {
  itemsArr.forEach(itemObj => {
    const child = new Option(itemObj.name, itemObj.id)
    choices.appendChild(child)
  })
}

var state
fetch('/api/attractions')
  .then(result => result.json())
  .then(data => {
    newSelectOptions(data.hotels, hotelChoices)
    newSelectOptions(data.activities, activityChoices)
    newSelectOptions(data.restaurants, restaurantChoices)
    state = data
  })
  .catch(console.error)


var optionsButtons = document.getElementsByClassName('options-btn')
optionsButtons = [... optionsButtons]


function findSelected(event) {
  const optId = event.currentTarget.parentNode.children[1].value
  const category = event.currentTarget.id.split('-')[0]
  const selected = state[category].filter(opt => opt.id === +optId)[0]
  return {category, selected}
}
function newLi (str, value, mark){
  let li = document.createElement('li')
  li.value = value
  let h3 = document.createElement('h3')
  h3.innerHTML = str
  let rm = document.createElement('button')
  rm.className = 'remove-btn'
  rm.innerHTML = 'x'
  rm.addEventListener('click', event => {
    mark.remove()
    event.currentTarget.parentNode.remove()
  })
  li.appendChild(h3)
  li.appendChild(rm)
  return li
}

optionsButtons.forEach(option => {
  option.addEventListener('click', (event) => {
    const {category, selected} = findSelected(event)
    const mark = buildMarker(category, selected.place.location).addTo(map)
    map.flyTo({center: selected.place.location, zoom: 15, curve: 2})
    if (category === 'hotels') hotelList.append(newLi(selected.name, selected.id, mark))
    if (category === 'restaurants') restaurantList.append(newLi(selected.name, selected.id, mark))
    if (category === 'activities') activityList.append(newLi(selected.name, selected.id, mark))
  })
})

