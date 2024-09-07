let map;
function createMap() {
  map = L.map("map").setView([54.4506593, 18.5607375125286], 7);

  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

function setPoint(point, uid) {
  const popupContent = document.createElement("div");
  popupContent.innerHTML = `      `;
  // Dodawanie własnego atrybutu
  popupContent.setAttribute("data-uid", uid);
  popupContent.setAttribute("style", "width: auto;");
  var marker = L.marker(point, {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
    alt: uid,
  });
  marker.addTo(map)
    .bindPopup(popupContent);
    
    marker.on('click', onMarkerClick);

}



function getPoints(e) {
  document
    .querySelectorAll(".leaflet-interactive")
    .forEach((el) => el.remove());
  document
    .querySelectorAll(".leaflet-shadow-pane")
    .forEach((el) => el.remove());
  var points = sendCheckedValues();

  points.then((data) => {
    dane = data;


    if (dane["content"].length > 1999) {
      var modal = new bootstrap.Modal(document.getElementById("alertModal"));
      modal.show();
    }

    for (let index = 0; index < dane["content"].length; index++) {
      point = dane["content"][index].spatialLocation.coordinates;
      uid = dane["content"][index].uid;
      setPoint(point, uid);
    }


  });
}

function showDetails(uid) {
  a = getJSON("https://api.turystyka.gov.pl/registers/open/cwoh/" + uid);
  return a;
}

// Funkcja do obsługi kliknięcia na marker
function onMarkerClick(e) {
  // Pobranie elementu, na który kliknięto
  const uid = e.target.options['alt']
    
      // Podmiana innerHTML na nową wartość
      getJSON("https://api.turystyka.gov.pl/registers/open/cwoh/" + uid)
    .then((data) => createDetails(data))
        
  
  }

