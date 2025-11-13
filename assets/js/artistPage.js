const endpoint = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const url = window.location.search;
const urlId = new URLSearchParams(url);
const artistId = urlId.get("id");
// funzione callback all interno della MAIN
const getTrackList = function (tracklist) {
  return fetch(tracklist)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel fetch tracklist" + res.status);
      }
    })
    .then((tracks) => {
      return tracks;
    });
};
// FUNZIONE PRINCIPALE
const getArtist = function () {
  fetch(endpoint + artistId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((artistDetails) => {
      const name = artistDetails.name;
      const id = artistDetails.id;
      const coverImgDesktop = artistDetails.picture_xl;
      const coverImgMobile = artistDetails.picture_big;
      const tracklist = artistDetails.tracklist;
      // tracklist è l'URL endpoint da fetchare per ottenere tutte le tracce
      const fan = artistDetails.nb_fan;
      // eseguo la funzione getTrackList con parametro tracklist ed esco da questo blocco then.
      // MANIPOLAZIONE e TRAVERSING DOM:
      const artistName = document.getElementById("nomeArtista");
      artistName.innerText = name;
      const numFan = document.getElementById("ascoltatoriMensili");
      numFan.innerHTML = fan + " ascoltatori mensili";
      const artistHeader = document.getElementById("artistHeader");
      artistHeader.style.backgroundImage = `url(${coverImgDesktop})`;
      artistHeader.style.backgroundPosition = "0% 25%";
      // FINE MANIPOLAZIONE DOM
      return getTrackList(tracklist);
    })
    .then((tracks) => {
      const tracksArray = tracks.data;
      console.log(tracksArray);
      const totalResults = tracks.total;
      tracksArray.forEach((track, index) => {
        if (index < 5) {
          const trackNumber = index + 1;
          const title = track.title;
          const duration = track.duration;
          const rank = track.rank;
          const trackId = track.id;
          const songPreview = track.preview;
          const trackThumbnail = track.album.cover_medium;
          const minutes = Math.floor(duration / 60);
          const seconds = String(duration % 60).padStart(2, "0");
          // MANIPOLAZIONE e TRAVERSING DOM:
          const brano = document.getElementById("brano");
          brano.innerHTML += `<div class="d-flex justify-content-start align-items-center my-2">
            <p class="px-1 pe-lg-3 trackNumber">${trackNumber}</p>
            <div class="immagineCanzone p-3 px-md-3">
              <img
                src="${trackThumbnail}"
                class="album-cover"
                alt="image-album-${title}"
              />
              </div>
                <p class="px-1 px-md-3 titoloCanzone flex-grow-1">${title}</p>
                <div class="d-flex">
                <p class="px-1 px-md-3 ascoltatoriTotali">${rank}</p>
                <p class="px-1 px-md-3 durataCanzone">${minutes}:${seconds}</p>
                <i class="fa-solid fa-heart favorite-icon ms-2"></i>
                </div>
                </div>
          `;
          const container = document.getElementById("containerTracks");
          container.appendChild(brano);

          // FINE MANIPOLAZIONE
        }
      });
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

getArtist();
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
