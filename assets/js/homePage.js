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
<<<<<<< Updated upstream
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
        const minutes = Math.floor(duration / 60);
        const seconds = String(duration % 60).padStart(2, "0");

        const songImg = song.album.cover_medium;
        const resultN = i + 1;
        cardContainer.innerHTML += `
=======
    fetch(endpoint + parameter)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else throw new Error(res.status);
        })
        .then((results) => {
            cardContainer.innerHTML = ""
            results.data.forEach((song, i) => {
                const titleShort = song.title_short;
                const artist = song.artist.name;
                const duration = song.duration;
                const resultN = i + 1;
                cardContainer.innerHTML += `
>>>>>>> Stashed changes
        <div class="col">
                    <div class="card my-3 rounded-start text-bg-dark border-0 h-100">
                      <div class="row h-100">
                        <div class="col-5 p-0">
                            <img
                                src="${songImg}"
                                class="img-fluid object-fit-cover rounded-start w-100 h-100"
                                alt="image of ${titleShort}'s album"
                            />
                        </div>

                        <div class="col-7">
                          <div class="card-body d-flex flex-column justify-content-between h-100 w-100">
                          <div>
                            <h5 class="card-title">${titleShort}</h5>
                            <p>${artist}</p>
                            </div>
                          <p>Durata: ${minutes}:${seconds}</p>
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

<<<<<<< Updated upstream
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
<<<<<<< HEAD
  finder(parameter);
=======


input.addEventListener("input", (event) => {
    console.log("Input event:", event.target.value);
    parameter = event.target.value;
    console.log(parameter);
    if (parameter.length >= 1) {
        finder(parameter);
    } else {
        cardContainer.innerHTML = ``;

    }

>>>>>>> Stashed changes
=======
  //   finder(parameter);
>>>>>>> main
});
