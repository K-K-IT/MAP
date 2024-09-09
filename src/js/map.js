var savedMarkers = [];

let map;



function createMap() {
  map = L.map("map").setView([54.4506593, 18.5607375125286], 7);

  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  // Utwórz grupę warstw

  // Dodaj przycisk "Filtry" do mapy
  var filtersButton = L.control({ position: "topleft" });
  filtersButton.onAdd = function (map) {
    const div = L.DomUtil.create("div", "filters-button");
    div.innerHTML = `<button
        class="btn btn-secondary"
        data-bs-toggle="offcanvas"
        href="#offcanvasExample"
        role="button"
        aria-controls="offcanvasExample"
      >
        Filtry
      </button>`;

    return div;
  };
  filtersButton.addTo(map);

  // Dodaj przycisk "Filtry" do mapy
  var aboutButton = L.control({ position: "topright" });
  aboutButton.onAdd = function (map) {
    const div = L.DomUtil.create("div", "about-button");
    div.innerHTML = `<button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#aboutModal" onclick="showAboutModal()">


    O mapie
  </button>`;

    return div;
  };

  aboutButton.addTo(map);
}

function setPoint(point, uid) {
  const popupContent = document.createElement("div");
  popupContent.innerHTML = `
    <button class="save-button">Zapisz</button>
    <button class="unmark-button">Odznacz</button>
  `;
  popupContent.setAttribute("data-uid", uid);
  popupContent.setAttribute("style", "width: auto;");

  const saveButton = popupContent.querySelector(".save-button");
  saveButton.addEventListener("click", () => saveMarker(point, uid));

  const unmarkButton = popupContent.querySelector(".unmark-button");
  unmarkButton.addEventListener("click", () => unmarkMarker(uid));

  var marker = L.marker(point, {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
    alt: uid,
  });
  marker.addTo(map).bindPopup(popupContent);

  marker.on("click", onMarkerClick);

  // Sprawdzenie, czy marker jest zapisany w ciasteczkach
  if (isMarkerSaved(uid)) {
    marker.setStyle({ color: "green" }); // Zmiana koloru markera na zielony, jeśli jest zapisany
  }
}

function showAboutModal() {
  var modal = new bootstrap.Modal(document.getElementById("aboutModal"));
  modal.show();
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
  const uid = e.target.options["alt"];
  getJSON("https://api.turystyka.gov.pl/registers/open/cwoh/" + uid).then(
    (data) => createDetails(data)
  );
}

function saveMarker(uid) {
  const savedMarkers = JSON.parse(getCookie("savedMarkers")) || [];
  savedMarkers.push({ uid });
  setCookie("savedMarkers", JSON.stringify(savedMarkers), 365);
}

function unmarkMarker(uid) {
  const savedMarkers = JSON.parse(getCookie("savedMarkers")) || [];
  const updatedMarkers = savedMarkers.filter(marker => marker.uid !== uid);
  setCookie("savedMarkers", JSON.stringify(updatedMarkers), 365);
}

function isMarkerSaved(uid) {
  const savedMarkers = JSON.parse(getCookie("savedMarkers")) || [];
  return savedMarkers.some(marker => marker.uid === uid);
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Yes; Secure`;
}


function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}