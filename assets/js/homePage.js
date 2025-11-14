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
const searchSide = document.getElementsByClassName("toggleSearch");
const search = function () {
  for (let i = 0; i < searchSide.length; i++) {
    searchSide[i].addEventListener("click", function (e) {
      e.preventDefault();
      input.classList.toggle("d-none");
      if (!input.classList.contains("d-none")) {
        input.focus();
      }
    });
  }
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
        const songId = song.id;
        const artist = song.artist.name;
        const artistId = song.artist.id;
        const duration = song.duration;
        const albumId = song.album.id;
        const minutes = Math.floor(duration / 60);
        const seconds = String(duration % 60).padStart(2, "0");

        const songImg = song.album.cover_medium;
        const resultN = i + 1;
        cardContainer.innerHTML += `
        <div class="col">
                    <div class="card my-3 rounded-start text-bg-dark border-0 h-100">
                      <div class="row h-100">
                        <div class="col-5 p-0">
                            <img
                                src="${songImg}"
                                class="img-fluid object-fit-cover rounded-start h-100 w-100"
                                alt="image of ${titleShort}'s album"
                            />
                        </div>

                        <div class="col-7">
                          <div class="card-body d-flex flex-column justify-content-between h-100 w-100">
                          <div>
                            <a href="/spotify_albumPage.html?id=${albumId}" class="card-title text-decoration-none text-white">${titleShort}</h6>
                            <a href="./spotify_artistPage.html?id=${artistId}" class="text-decoration-none text-white" ><p>${artist}</p></a>
                            </div>
                          <p style="font-size:12px;">Durata: ${minutes}:${seconds}</p>
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
    finder(parameter);
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

const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const displayRandomArtists = () => {
  likedCont.innerHTML = "";

  const artistsToFetch = shuffleArray(artistList).slice(0, 4);

  artistsToFetch.forEach((artistName) => {
    fetch(endpoint + artistName)
      .then((response) => {
        if (response.ok) {
          console.log(`Server collegato per ${artistName}`);
          return response.json();
        } else {
          throw new Error(
            `Il server non risponde per ${artistName}: ${response.status}`
          );
        }
      })
      .then((data) => {
        if (data.data && data.data.length > 0) {
          const artistData = data.data[0].artist;

          const artistNameDisplay = artistData.name;
          const artistPicture = artistData.picture_medium;
          const artistId = artistData.id;

          likedCont.innerHTML += `
            <div class="col col-md-4 col-lg-3 pb-5">
              <div class="card bg-dark d-flex align-items-center">
                <img
                  src="${artistPicture}"
                  class="card-img-top h-75 w-75 mt-2"
                  alt="${artistNameDisplay} foto"
                />
                <div class="card-body">
                  <a href="./spotify_artistPage.html?id=${artistId}" class="text-decoration-none text-white">
                    <h5 class="card-title">${artistNameDisplay}</h5>
                  </a>
                </div>
              </div>
            </div>`;
        }
      })
      .catch((error) => {
        console.error(`Errore nel processare ${artistName}: ${error}`);
      });
  });
};

displayRandomArtists();

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("favorite-icon")) {
    if (event.target.classList.contains("active")) {
      event.target.classList.remove("active");
      event.target.style.color = "#b3b3b3";
    } else {
      event.target.classList.add("active");
      event.target.style.color = "#1db954";
    }
  }
});

// test shuffle
