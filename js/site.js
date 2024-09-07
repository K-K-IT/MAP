function createCheckboxes(data) {
  // Znajdź element z id "form"
  const formContainer = document.getElementById("udogodnienia");

  // Utwórz nową tablicę z unikatowymi wartościami
  const uniqueContent = Array.from(
    new Map(data.content.map((item) => [item.key, item])).values()
  );

  // Utwórz kontener dla wszystkich checkboxów
  const checkboxesContainer = document.createElement("div");

  checkboxesContainer.class = "form-check-input"; // Poprawna właściwość do ustawienia klasy

  // Iteruj po tablicy z unikatowymi wartościami
  uniqueContent.forEach((item) => {
    // Utwórz checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = item.key;
    checkbox.id = item.key; // Ustaw id dla checkboxa

    // Utwórz label dla checkboxa
    const label = document.createElement("label");
    label.textContent = item.name;
    label.htmlFor = item.key; // Ustaw htmlFor dla labela, aby był powiązany z checkboxem

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
    popup.innerHTML = `<b>${dane['name']}</b><br>
    Rodzaj obiektu: ${kind[dane['kind']]}<br>
    Klasyfikacja obiektu: ${categories[dane['category']]} <br>
    Adres: ${dane['city']} ${dane['postalCode']} <br>
    ${dane['street']} ${dane['streetNumber']} <br>
    Telefon: ${dane['phone']}<br>
    WWW: <a href=${www} target="_blank">${www}</a><br>
    e-mail: ${dane['email']}<br>`


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



