// Intializing ISS Map and set zoom level to 1
const issMap = L.map('issMap').setView([51.0, -0.9], 1)


function tileLayer(){
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYW1yb21vb3JpZSIsImEiOiJja2pzZWcxMGgyaHIyMnNtandhc3E4Y3ZmIn0.upm75jgEtwKdBxlDQojhfw'
    }).addTo(issMap);
    
}


let firstTimeView = true // var for resoving resetting veiw issue

// fetching map data and adding a marker
async function getISS() {
    const url = 'https://api.wheretheiss.at/v1/satellites/25544'
    const response = await fetch(url)
    const data = await response.json()
    // console.log(data)
    const {latitude, longitude} = data;
    // console.log(longitude, latitude)
    addMarker(latitude, longitude)
   
    document.querySelector('#lat').innerText = latitude.toFixed(2)
    document.querySelector('#lon').innerText = longitude.toFixed(2)
}
function addMarker(setLatitude, setLongitude) {
    // add marker 
      let marker = L.marker([0, 0]).addTo(issMap);
      // console.log(marker)
      // update marker location
      marker.setLatLng([setLatitude, setLongitude])
      // setting the veiw 
      if (firstTimeView){ // preventing resetting the view & allow viewing the map normally 
          issMap.setView([setLatitude, setLongitude], 3)
          firstTimeView = false;
      }
      
  }
// automatically update the data every one second
setInterval(getISS, 1000)




// function calls
tileLayer()
getISS()