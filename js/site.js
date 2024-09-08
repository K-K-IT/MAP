function createCheckboxes(data) {
  // Znajdź element z id "form"
  const formContainer = document.getElementById("udogodnienia");

  // Utwórz nową tablicę z unikatowymi wartościami
  const uniqueContent = Array.from(
    new Map(data.content.map((item) => [item.key, item])).values()
  );

  // Utwórz kontener dla wszystkich checkboxów
  const checkboxesContainer = document.createElement("div");

  b = document.getElementById("udogodnienia-button")
  b.textContent = `Udogodnienia (${uniqueContent.length})`

  // Iteruj po tablicy z unikatowymi wartościami
  uniqueContent.forEach((item) => {
    // Utwórz checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = item.key;
    checkbox.id = item.key;
    checkbox.className = "form-check-input"

    // Utwórz label dla checkboxa
    const label = document.createElement("label");
    label.textContent = item.name;
    label.htmlFor = item.key;
    label.className = "form-check-label"

    // Utwórz kontener dla checkbox i label
    const checkboxContainer = document.createElement("div");
    checkboxContainer.style.marginRight = "10px"; // Dodaj margines między checkboxami
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);

    // Dodaj kontener do kontenera dla wszystkich checkboxów
    checkboxesContainer.appendChild(checkboxContainer);
  });

  // Dodaj kontener z checkboxami do elementu z id "form"
  formContainer.appendChild(checkboxesContainer);
}

function createQ() {
  const url =
    "https://api.turystyka.gov.pl/registers/open/cwoh/filters/questionnaires";
  getJSON(url)
    .then((data) => createCheckboxes(data))
    .catch((error) =>
      console.error("Błąd podczas przetwarzania danych:", error)
    );
}

function createDetails(data) {
    var dane = data['content']
  var popup = document.querySelector(`div[data-uid="${dane['uid']}"]`);
  // Sprawdzenie, czy element ma atrybut 'alt'
  // Sprawdzenie, czy znaleziono element
  if (popup) {
    var www = dane['www']
    try{
    if (!(www.includes("www.")) & www.length > 0 ){
      www = "https://www." + www
    }
  }
  catch{

  }

    detailsPanel = document.getElementById("offcanvasRight")

    

    popup.innerHTML = `<b>${dane['name']}</b><br>
    Rodzaj obiektu: ${kind[dane['kind']]}<br>
    Klasyfikacja obiektu: ${categories[dane['category']]} <br>
    Adres: ${dane['city']} ${dane['postalCode']} <br>
    ${dane['street']} ${dane['streetNumber']} <br>
    Telefon: ${dane['phone']}<br>
    WWW: <a href=${www} target="_blank">${www}</a><br>
    e-mail: ${dane['email']}<br>
    <button
      class="badge text-bg-light"
      data-bs-toggle="offcanvas"
      href="#offcanvasRight"
      role="button"
      aria-controls="offcanvasRight"
    >
      Szczegóły
    </button>
    `
    detailsPanel.innerHTML = `<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <title>Tabela z JSON</title>
  </head>
  <body>
    <div class="container mt-5">
      <h2>Informacje o obiekcie</h2>
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th>Klucz</th>
            <th>Wartość</th>
          </tr>
          <tr>
            <td>RID</td>
            <td>CWOH/0810075/2021/05/734</td>
          </tr>
          <tr>
            <td>UID</td>
            <td>df483994-d1d7-4485-9b7f-e489201558ac</td>
          </tr>
          <tr>
            <td>Nazwa</td>
            <td>PAŁAC WIECHLICE</td>
          </tr>
          <tr>
            <td>Opis</td>
            <td>
              kompleks przebudowanych budynków i klasycystyczny dwór z 1795
              roku...
            </td>
          </tr>
          <tr>
            <td>Właściciel</td>
            <td>Pałac Wiechlice Sp. z o. o.</td>
          </tr>
          <tr>
            <td>Adres</td>
            <td>Wiechlice, 45B, 67-300 Szprotawa, Lubuskie</td>
          </tr>
          <tr>
            <td>Telefon</td>
            <td>683768610</td>
          </tr>
          <tr>
            <td>Strona WWW</td>
            <td>
              <a href="http://www.palacwiechlice.pl" target="_blank"
                >www.palacwiechlice.pl</a
              >
            </td>
          </tr>
          <tr>
            <td>Spacial Location</td>
            <td>
              <a
                href="https://www.google.com/maps?q=51.5678064,15.5917375"
                target="_blank"
                class="btn btn-primary btn-sm"
                >Google Maps</a
              >
              <a
                href="https://pl.mapy.cz/turisticka?source=coor&id=15.591750000000001%2C51.56780555555556&ds=1&x=15.5917500&y=51.5678056&z=17"
                target="_blank"
                class="btn btn-secondary btn-sm"
                >Mapa.cz</a
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Pokaż <span class="badge badge-info">70</span>
            </button>


          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th>Udogodnienie</th>
                    <th>Wartość</th>
                  </tr>
                  <tr>
                    <td>Liczba wszystkich pokoi</td>
                    <td>40</td>
                  </tr>
                  <tr>
                    <td>Sale wielofunkcyjne</td>
                    <td>NIE</td>
                  </tr>
                  <tr>
                    <td>Inne</td>
                    <td>
                      kabina floatingowa, gabinety kosmetyczne i masażu, relax
                      room, winnica
                    </td>
                  </tr>
                  <tr>
                    <td>Liczba sal klubowych</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>Liczba pokoi dwuosobowych</td>
                    <td>35</td>
                  </tr>
                  <tr>
                    <td>Parking</td>
                    <td>TAK</td>
                  </tr>
                  <tr>
                    <td>Boisko do siatkówki lub koszykówki</td>
                    <td>TAK</td>
                  </tr>
                  <tr>
                    <td>Pokój zabaw dla dzieci</td>
                    <td>TAK</td>
                  </tr>
                  <tr>
                    <td>Sale klubowe</td>
                    <td>TAK</td>
                  </tr>
                  <tr>
                    <td>Liczba wszystkich miejsc noclegowych całorocznych</td>
                    <td>75</td>
                  </tr>
                  <tr>
                    <td>Solarium</td>
                    <td>TAK</td>
                  </tr>
                  <tr>
                    <td>Liczba miejsc w obiektach podawania śniadań</td>
                    <td>322</td>
                  </tr>
                  <tr>
                    <td>
                      Liczba miejsc noclegowych jednoosobowych całorocznych
                    </td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>Liczba restauracji</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>Liczba pokoi dwuosobowych z własną łazienką i WC</td>
                    <td>35</td>
                  </tr>
                  <tr>
                    <td>Liczba sal konferencyjnych</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Liczba parkingów strzeżonych</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>Liczba miejsc noclegowych dwuosobowych całorocznych</td>
                    <td>70</td>
                  </tr>
                  <tr>
                    <td>Liczba parkingów</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>Liczba pokoi jednoosobowych</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>Sauna</td>
                    <td>TAK</td>
                  </tr>
                  <tr>
                    <td>Siłownia</td>
                    <td>TAK</td>
                  </tr>
                  <tr>
                    <td>Wypożyczalnia rowerów</td>
                    <td>TAK</td>
                  </tr>
                  <tr>
                    <td>Liczba miejsc podawania śniadań</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>Liczba miejsc w restauracjach</td>
                    <td>325</td>
                  </tr>
                  <tr>
                    <td>Grota solna</td>
                    <td>TAK</td>
                  </tr>
                  <tr>
                    <td>Kręgielnia</td>
                    <td>TAK</td>
                  </tr>
                  <tr>
                    <td>Sale konferencyjne</td>
                    <td>TAK</td>
                  </tr>
                  <tr>
                    <td>Liczba miejsc noclegowych jednoosobowych</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>Tenis stołowy</td>
                    <td>TAK</td>
                  </tr>
                  <tr>
                    <td>Basen kryty</td>
                    <td>TAK</td>
                  </tr>
                  <tr>
                    <td>Parking strzeżony</td>
                    <td>TAK</td>
                  </tr>
                  <tr>
                    <td>Liczba wszystkich miejsc noclegowych</td>
                    <td>75</td>
                  </tr>
                  <tr>
                    <td>Liczba pokoi jednoosobowych z własną łazienką i WC</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>Liczba miejsc noclegowych dwuosobowych</td>
                    <td>70</td>
                  </tr>
                  <tr>
                    <td>Mini golf</td>
                    <td>TAK</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
   
      
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
`

  } else {
    console.log("Nie znaleziono elementu div z data-uid:", uid);
  }
}



// function createFilterKind() {
//   console.log(kind)
//   const el = document.getElementById("kind-filter");
//   // Wyczyść istniejące opcje
//   for (const key in kind) {
//     if (kind.hasOwnProperty(key)) {
//       const option = document.createElement("option");
//       option.value = key;
//       option.textContent = kind[key];
//       el.appendChild(option);
//     }
//   }
// }


function createFilterKind(kind) {
  console.log(kind);
  const el = document.getElementById("kind-filter");

  for (const key in kind) {
    if (kind.hasOwnProperty(key)) {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = kind[key];
      el.appendChild(option);
    }
  }
}




function createFilterCategory(categories) {

  const kind_tmp = document.getElementById("kind-filter").value.slice(-3)

  const el = document.getElementById("category-filter");
  el.innerHTML = "<option selected>-</option>"
  
  for (const key in categories) {
    if (categories.hasOwnProperty(key) & key.slice(-3) == kind_tmp) {

      const option = document.createElement("option");
      option.value = key;
      option.textContent = categories[key];
      el.appendChild(option);
    }
  }
}


createFilterCategory(categories);
function createFilters(kind) {
  createQ();
  createFilterKind(kind);
  
}



