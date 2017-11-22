const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = "pk.eyJ1IjoiamFzbWluYWJhc3VyaXRhIiwiYSI6ImNqYTl0aHV0aDBraWEyd282cTduajhqb2YifQ.GG_9PlLoG9PCL2bcOQbYWg";

const fullstackCoords = [-74.009, 40.705] // NY
// const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const map = new mapboxgl.Map({
  container: "map",
  center: fullstackCoords, // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/dark-v9" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", fullstackCoords);
marker.addTo(map);

const hotelChoices = document.getElementById('hotels-choices')
const activityChoices = document.getElementById('activities-choices')
const restaurantChoices = document.getElementById('restaurants-choices')

function createOption(itemObj) {
  const option = document.createElement('option')
  option.innerHTML = itemObj.name
  option.value = itemObj.id
  return option
}


function newSelectOptions(itemsArr, type) {
  if (type === 'hotel') {
    itemsArr.forEach(itemObj => {
      hotelChoices.appendChild(createOption(itemObj))
    })
  }
  if (type === 'activity') {
    itemsArr.forEach(itemObj => {
      activityChoices.appendChild(createOption(itemObj))
    })
  }
  if (type === 'restaurant') {
    itemsArr.forEach(itemObj => {
      restaurantChoices.appendChild(createOption(itemObj))
    })
  }
}


fetch('/api/attractions')
  .then(result => result.json())
  .then(data => {
    newSelectOptions(data.hotels, 'hotel')
    newSelectOptions(data.activities, 'activity')
    newSelectOptions(data.restaurants, 'restaurant')
  })
  .catch(console.error)

// document.getElementsByClassName('options-btn')

const hotelButton = doc

