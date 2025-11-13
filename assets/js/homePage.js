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

//Generazione random di artisti in home
const artistList = [
  "Eminem",
  "Geolier",
  "Fantasm",
  "Adele",
  "Coldplay",
  "Rihanna",
  "Pupo",
  "Shiva",
  "Ultimo",
  "OneRepublic",
];

const likedCont = document.getElementById("test");

const likedArtist = () => {
  const randomArtist =
    artistList[Math.floor(Math.random() * artistList.length)];
  fetch(endpoint + randomArtist)
    .then((response) => {
      if (response.ok) {
        console.log(`Il server è collegato correttamente ${response}`);
        return response.json();
      } else {
        throw new Error(`Il server non risponde ${response.status}`);
      }
    })
    .then((data) => {
      console.log(data);
      likedCont.innerHTML = ``;
      data.data.forEach((artist, i) => {
        const artistName = artist.artist.name;
        const artistPicture = artist.artist.picture_medium;

        if (i < 4) {
          likedCont.innerHTML += `
                          <div class="col col-md-4 col-lg-3">
                    <!-- card da aggiungere -->
                    <div class="card text-bg-dark">
                      <img
                        src="${artistPicture}"
                        class="card-img-top img-thumbnail"
                        alt="img-07"
                        alt="${artistName} foto"
                      />
                      <div class="card-body">
                        <h5 class="card-title">${artistName}</h5>
                        <p class="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card’s content.
                        </p>
                      </div>
                    </div>
                  </div>`;
          i++;
        }
      });
    })
    .catch((error) => {
      console.log(`Errore del server ${error}`);
    });
};
likedArtist();
