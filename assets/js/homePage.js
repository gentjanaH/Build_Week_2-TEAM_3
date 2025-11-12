//funzione nascondi elementi
const hideSection = function (e) {
  console.log("sezione nascosta", e);

  const section = document.getElementById("carouselExampleAutoplaying");
  const button = e.target;

  if (section.classList.contains("d-none")) {
    section.classList.remove("d-none");
    button.innerText = "Nascondi annunci";
  } else {
    section.classList.add("d-none");
    button.innerText = "Mostra novità";
  }
};
const endpoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const input = document.getElementById("searchInput");
// const inputValue = input.value;
// console.log(inputValue);
const cardContainer = document.getElementById("cardContainer");
const allColCards = cardContainer.getElementsByClassName("col");
// funzione per mostrare il campo di ricerca
const searchSide = document.getElementById("toggleSearch");
const search = function () {
  searchSide.addEventListener("click", function (e) {
    e.preventDefault();
    input.classList.toggle("d-none");
    if (!input.classList.contains("d-none")) {
      input.focus();
    }
  });
};
search();
// function che fa partire il fetch con il DOM manipulation
const finder = function (parameter) {
  fetch(endpoint + parameter)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else throw new Error(res.status);
    })
    .then((results) => {
      cardContainer.innerHTML = ``;
      results.data.forEach((song, i) => {
        const titleShort = song.title_short;
        const artist = song.artist.name;
        const duration = song.duration;
        const resultN = i + 1;
        cardContainer.innerHTML += `
        <div class="col">
                    <div class="card my-3 rounded-start text-bg-dark border-0">
                      <div class="row">
                        <div class="col-5">
                          <div class="row h-100 px-0">
                            <div class="col col-6 p-0">
                              <img
                                src="./assets/main/image-1.jpg"
                                class="img-fluid w-100 h-100 object-fit-cover rounded-top-left"
                                alt="foto1"
                              />
                            </div>
                            <div class="col col-6 p-0">
                              <img
                                src="./assets/main/image-2.jpg"
                                class="img-fluid w-100 h-100 object-fit-cover"
                                alt="foto2"
                              />
                            </div>
                            <div class="col col-6 p-0">
                              <img
                                src="./assets/main/image-3.jpg"
                                class="img-fluid w-100 h-100 object-fit-cover rounded-bottom-left"
                                alt="foto3"
                              />
                            </div>
                            <div class="col col-6 p-0">
                              <img
                                src="./assets/main/image-4.jpg"
                                class="img-fluid w-100 h-100 object-fit-cover"
                                alt="foto4"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-7">
                          <div class="card-body">
                            <h5 class="card-title">${titleShort}</h5>
                            <p>${artist}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        `;
      });
    })
    .catch((err) => {
      console.log("Errore " + err);
    });
};

let parameter;
input.addEventListener("input", (event) => {
  console.log("Input event:", event.target.value);
  parameter = event.target.value;
  console.log(parameter);
  if (parameter.length >= 1) {
    for (let i = 0; i < allColCards.length; i++) {
      allColCards[i].classList.add("d-none");
    }
  } else {
    // cardContainer.innerHTML = ``;
    for (let i = 0; i < allColCards.length; i++) {
      allColCards[i].classList.remove("d-none");
    }
  }
  finder(parameter);
});
