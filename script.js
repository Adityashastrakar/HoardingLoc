// 1.data in json format

const data = [
  {
    num: 0,
    id: "A1",
    longi: `78° 02' 48.0"E`,
    lati: `22° 07' 06.2"N`,
    markerType: "A",
  },
  {
    num: 1,
    id: "A2",
    longi: `78° 02' 47.12"E`,
    lati: `22° 07' 06.3"N`,
    markerType: "A",
  },
  {
    num: 2,
    id: "B1",
    longi: `78° 02' 48.23"E`,
    lati: `22° 07' 06.4"N`,
    markerType: "B",
  },
  {
    num: 3,
    id: "B2",
    longi: `78° 02' 47.34"E`,
    lati: `22° 07' 06.5"N`,
    markerType: "B",
  },
  {
    num: 4,
    id: "C1",
    longi: `78° 02' 46.45"E`,
    lati: `22° 07' 07.6"N`,
    markerType: "C",
  },
  {
    num: 5,
    id: "A3",
    longi: `78° 02' 46.56"E `,
    lati: `22° 07' 06.7"N`,
    markerType: "A",
  },
  {
    num: 6,
    id: "C2",
    longi: `78° 02' 46.67"E`,
    lati: `22° 07' 06.8"N`,
    markerType: "C",
  },
  {
    num: 7,
    id: "C3",
    longi: `78° 02' 43.78"E`,
    lati: `22° 07' 06.9"N`,
    markerType: "C",
  },
  {
    num: 8,
    id: "C4",
    longi: `78° 02' 43.89"E`,
    lati: `22° 07' 06.0"N`,
    markerType: "C",
  },
  {
    num: 9,
    id: "B3",
    longi: `78° 02' 43.60"E`,
    lati: `22° 07' 06.15"N`,
    markerType: "B",
  },
  {
    num: 10,
    id: "B4",
    longi: `78° 02' 50.828"E`,
    lati: `22° 07' 03.516"N`,
    markerType: "B",
  },
  {
    num: 11,
    id: "C5",
    longi: `78° 02' 50.724"E`,
    lati: `22° 07' 03.664"N`,
    markerType: "C",
  },
  {
    num: 12,
    id: "A4",
    longi: `78° 02' 50.36"E`,
    lati: `22° 07' 04.208"N`,
    markerType: "A",
  },
  {
    num: 13,
    id: "A5",
    longi: `78° 02' 50.86"E`,
    lati: `22° 07' 04.92"N`,
    markerType: "A",
  },
  {
    num: 14,
    id: "B5",
    longi: `78° 02' 50.927"E`,
    lati: `22° 07' 02.688"N`,
    markerType: "B",
  }
];

// converting dms into degrees

function ParseDMS(input) {
  var parts = input.split(/[^\d\w.]+/);
  var dege = ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
  return dege;
}
function ConvertDMSToDD(degrees, minutes, seconds, direction) {
  var deg = Number(degrees);
  var min = Number(minutes / 60);
  var sec = Number(seconds / 3600);

  var dd = deg + min + sec;

  if (direction === "S" || direction === "W") {
    dd = dd * -1;
  }
  return dd;
}

// 2.list of markers

var markers = [];
const distanceLoc = [];
var selectedMarkers = [];

// 3.colors for markers

var red = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
var green = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
var yellow = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
var redpin = "http://maps.google.com/mapfiles/ms/icons/red-pushpin.png";
var grnpin = "http://maps.google.com/mapfiles/ms/icons/grn-pushpin.png";
var ylwpin = "http://maps.google.com/mapfiles/ms/icons/ylw-pushpin.png";
var pin = "http://maps.google.com/mapfiles/kml/pal2/icon13.png";


// 4.Legends

let A = document.getElementById("show-marker-type-a");
A.addEventListener("change", removeMarkerofA);

let B = document.getElementById("show-marker-type-b");
B.addEventListener("change", removeMarkerofB);

let C = document.getElementById("show-marker-type-c");
C.addEventListener("change", removeMarkerofC);

function setMapOnA(map) {
  markers.forEach((element) => {
    if (element.label === "A") {
      element.setMap(map);
    }
  });
}
function setMapOnB(map) {
  markers.forEach((element) => {
    if (element.label === "B") {
      element.setMap(map);
    }
  });
}
function setMapOnC(map) {
  markers.forEach((element) => {
    if (element.label === "C") {
      element.setMap(map);
    }
  });
}
function removeMarkerofA() {
  if (A.checked) {
    setMapOnA(map);
  } else {
    setMapOnA(null);
  }
}
function removeMarkerofB() {
  if (B.checked) {
    setMapOnB(map);
  } else {
    setMapOnB(null);
  }
}
function removeMarkerofC() {
  if (C.checked) {
    setMapOnC(map);
  } else {
    setMapOnC(null);
  }
}

// map function
function initMap() {
// displaying map
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: { lng: 78.04666667, lat: 22.11838889 },
  });
  Object.values(data).map((loc) => {
    var longitude = ParseDMS(loc.longi);
    var latitude = ParseDMS(loc.lati);
    var MarkerType = loc.markerType;
    var id = loc.id;
// adding markers on the map
    addMarker(latitude, longitude, MarkerType, id);
  });

// add marker function

  function addMarker(latitude, longitude, MarkerType, id) {
    let marker = new google.maps.Marker({
      position: { lng: longitude, lat: latitude },
      label: MarkerType,
      id: id,
      Title: ("ID= "+id+" Zone1"),
      map: map,
      icon: {
        path: google.maps.SymbolPath.Marker,
        url: MarkerType == "A" ? red : MarkerType == "B" ? green : yellow,
        fillOpacity: 1,
        strokeColor: "white",
        strokeWeight: 10,
        scale: 30,
      },
    });
    markers.push(marker);
        // calculate distace between two markers
        // listning to the click event on the map
    google.maps.event.addListener(marker, "click", listenClick(marker),);
    
  }

  

  function emptyClicks(marker) {
    var length = selectedMarkers.length;
    for (let i = 0; i < length; i++) {
      selectedMarkers.pop();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    listenClick(marker);
  }

  function listenClick(marker) {
    return function (evt) {
      var loca = {
        lng: marker.getPosition().lng(),
        lat: marker.getPosition().lat(),
        label: marker.label,
        id: marker.id,
      };
      marker.setIcon(pin);
      selectedMarkers.push(loca);
      showpolyline();
    };
  }

// Calculating distance for two markers of same type
  function calculateDistanceOfTwo() {
    if (distanceLoc.length === 0) {
      distanceLoc.push(loca);
    } else if (distanceLoc[0] === loca) {
      distanceLoc.push(loca);
      distanceLoc.pop();
    } else if (distanceLoc.length === 1) {
      distanceLoc.push(loca);
      if (distanceLoc[0].label === distanceLoc[1].label) {
        calculateDistance(distanceLoc[0], distanceLoc[1]);
      } else {
        alert("Two Markers are not of same type");
      }
    } else if (distanceLoc.length > 0 && distanceLoc.length < 3) {
      distanceLoc.length = 0;
      distanceLoc.push(loca);
    } else {
      return;
    }
  }

//Take data like Name,date,Trip Sequence, from user
var addButton = document
  .getElementById("start")
  .addEventListener("click", emptyClicks);
  let stopButton = document
  .getElementById("stop")
  .addEventListener("click", showRoute);

  let entry = document.getElementById("add");
add.addEventListener("click", displaydetails);



var row = 1;
function displaydetails() {
  var date = document.getElementById("date").value;
  var name = document.getElementById("name").value;
  var marker_type = document.getElementById("marker_type").value;
  // if (marker_type ? 'A':removeMarkerofB() && removeMarkerofC()) ;
  if (!name || !date || !marker_type) {
    alert("Enter All Details.");
    return;
  }
  // emptyFeilds(cell1, cell2, cell3, cell4, cell5)
  var contents = document.getElementById("contents");
  var newRow = contents.insertRow(row);
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);

  cell1.innerHTML = date;
  cell2.innerHTML = name;
  cell3.innerHTML = showRoute();
  cell4.innerHTML = marker_type;
  cell5.innerHTML = 100 *1000 *calculateTotalDistance() + ' Mtrs'
  row++;
  emptyFeilds();
  }
  localStorage.setItem('mydata',JSON.stringify(tabledata));
  };
// Creating route for the pointers clicked
function showpolyline()
{
  var size=selectedMarkers.length;
  for(let i=0;i<size;i++)
  {
    var x1 = selectedMarkers[i].lng;
    var y1 = selectedMarkers[i].lat;
    var x2 = selectedMarkers[i+1].lng;
    var y2 = selectedMarkers[i+1].lat;


    var flightPath = new google.maps.Polyline({
      path: [{ lat: y1, lng: x1 },{ lat: y2, lng: x2 },],geodesic: true,strokeColor: "#FF0000",
     strokeOpacity: 1.0,strokeWeight: 2,});flightPath.setMap(map);
  }
}
function showRoute() {
  var length = selectedMarkers.length;
  var route = "";
  for (let i = 0; i < length; i++) {
    var route = route + selectedMarkers[i].id + "-";
  }
  return route;
}
 // calculating distance

 function calculateDistance(source, destination) {
  var x1 = source.lng;
  var y1 = source.lat;
  var x2 = destination.lng;
  var y2 = destination.lat;

  // displaying line between two markers
  // var flightPath = new google.maps.Polyline({
  //  path: [{ lat: y1, lng: x1 },{ lat: y2, lng: x2 },],geodesic: true,strokeColor: "#FF0000",
  // strokeOpacity: 1.0,strokeWeight: 2,});flightPath.setMap(map);

  var distance = Number(getDistance(x1, y1, x2, y2).toFixed(4));
  // alert("The Distance Between Two Markers is :" + distance + "Km");
  return distance
}

function getDistance(x1, y1, x2, y2) {
  var xDiff = x1 - x2;
  var yDiff = y1 - y2;

  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

function calculateTotalDistance() {
  var length = selectedMarkers.length;
  let total = Number(0);
  if (length > 2) {
    for (let i = 0; i < length - 1; i++) {
      total =
        total + calculateDistance(selectedMarkers[i], selectedMarkers[i + 1]);

    }
    return total
  }
  else if(length === 2){
    total += calculateDistance(selectedMarkers[0], selectedMarkers[1])
    return total
  }
  else{
    alert('Select more markers')
  }
}

// emptying feilds after clicking add button
// currently incorrect code

let tabledata= {
input:document.getElementById("date").value,
input:document.getElementById("name").value,
input:document.getElementById("marker_type").value,
input:document.getElementById(showRoute()).value,
input:document.getElementById(calculateTotalDistance()).value

}
let retrievedData=JSON.parse(localStorage.getItem('mydata'));

console.log(localStorage.getItem('mydata'));

// Empty The input fiels after taking the inputs.
function emptyFeilds(){
  const formData = document.getElementById('inputs');
  const defaultOpt = document.getElementById('default')
  formData.elements.name.value = '';
  const timestamp = Date.now()
  formData.elements.date.value = new Date(timestamp)
  formData.elements.marker_type.value = defaultOpt.innerHTML
  marker.setIcon()
}






