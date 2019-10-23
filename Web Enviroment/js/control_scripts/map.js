var map;
var markers = [undefined, undefined];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 4
  });
}

async function updateMapMarkers() {
  let sigfoxLastData = await getLastNodesLecture(await getSigfoxHistory());
  let length = sigfoxLastData.length
  for (var i = 0; i < length; i++) {
    const latlng = { lat: sigfoxLastData[i].latitude, lng: sigfoxLastData[i].longitude }
    console.log(JSON.stringify(sigfoxLastData[i]));
    const content= "<span>"+JSON.stringify(sigfoxLastData[i],null,3)+"</span>";
    console.log(sigfoxLastData[i].status);
    if (markers[i] === undefined) {
      markers[i] = (new google.maps.Marker({
        position: latlng,
        map: map,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/"+sigfoxLastData[i].status+"-dot.png"
        },
        title: sigfoxLastData[i].sigfoxId
      }));
    }
    else {
      markers[i].setPosition(latlng);
      markers[i].setIcon({
        url: "http://maps.google.com/mapfiles/ms/icons/"+sigfoxLastData[i].status+"-dot.png"
      });
      markers[i].setTitle(sigfoxLastData[i].sigfoxId);
    }
    addInfoWindow(markers[i],content);
  }
}

function addInfoWindow(marker, content) {
  var infoWindow = new google.maps.InfoWindow({
      content: content
  });

  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(map, marker);
  });
}

window.setInterval(function () {
  updateMapMarkers();
}, 60000);

$(document).ready(function () {
  initMap();
  updateMapMarkers();

});