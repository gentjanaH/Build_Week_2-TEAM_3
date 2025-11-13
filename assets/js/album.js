//API URL
const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";

const url = window.location.search;
const urlId = new URLSearchParams(url);
const artistId = urlId.get("id");

//ELEMENTI DOM
const albumImage = document.getElementById("album-image");
const albumName = document.getElementById("album-name");
const albumData = document.getElementById("album-data");
const trackContainer = document.getElementById("track-list");

//CLASSE OGGETTI DA PRELEVARE IN API
class artistData {
  constructor(
    title,
    cover,
    name,
    release_date,
    nb_tracks,
    duration,
    tracks,
    artist
  ) {
    this.title = title;
    this.cover = cover;
    this.name = name;
    this.release_date = release_date;
    this.nb_tracks = nb_tracks;
    this.duration = duration;
    this.tracks = tracks;
    this.artist = artist;
  }
}
//FUNZIONE PER LA GENERAZIONE DEL HEADER DEL ALBUM
const headerAlbumData = (albumObj) => {
  albumImage.setAttribute("src", albumObj.cover);
  albumName.innerText = albumObj.title;
  albumData.innerText = `${albumObj.name} • ${albumObj.release_date.slice(
    0,
    4
  )} • ${albumObj.nb_tracks} brani • ${Math.floor(albumObj.duration / 60)} min`;
};

//FUNZIONE PER LA GENERAZIONE DELLE TRACKS DEL ALBUM
const albumTracks = (albumObj) => {
  trackContainer.innerHTML = "";

  albumObj.tracks.data.forEach((track, i) => {
    const minutes = Math.floor(track.duration / 60);
    const seconds = String(track.duration % 60).padStart(2, "0");

    trackContainer.innerHTML += `
             <div class="track-row">
              <span class="track-index">
                <span class="track-number">${i + 1}</span>
                <i class="fa-solid fa-play play-hover"></i>
              </span>

              <div class="track-title-block">
                <span class="track-title">${track.title}</span>
                <a href="/spotify_artistPage.html?id=${
                  track.artist.id
                }" class="track-artist">${track.artist.name}</a>
              </div>

              <span class="track-plays">${track.rank.toLocaleString()}</span>

              <span class="track-duration">${minutes}:${seconds}</span>
            </div>
                    `;
  });
};
//FETCH API
const getData = () => {
  fetch(apiUrl + artistId)
    .then((response) => {
      if (response.ok) {
        console.log(`Response ok ${response.status}`);
        console.log(response);
        return response.json();
      } else throw new Error(`Il server non risponde ${response.status}`);
    })
    .then((data) => {
      console.log(data);
      const albumObj = new artistData(
        data.title,
        data.cover_big,
        data.artist.name,
        data.release_date,
        data.nb_tracks,
        data.duration,
        data.tracks
      );

      headerAlbumData(albumObj);
      albumTracks(albumObj);
    })
    .catch((error) => {
      console.log(`Non riesco a collegarmi al server ${error}`);
    });
};

getData();
const heartBtn = document.getElementById("album-heart");
const heartIcon = heartBtn.querySelector("i");

heartBtn.addEventListener("click", () => {
  heartBtn.classList.toggle("active");

  if (heartBtn.classList.contains("active")) {
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid");
  } else {
    heartIcon.classList.remove("fa-solid");
    heartIcon.classList.add("fa-regular");
  }
});
// funzione per prendere il colore medio

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

function getAverageColor(image, sampleSize = 50) {
  const w = sampleSize;
  const h = sampleSize;
  canvas.width = w;
  canvas.height = h;
  ctx.drawImage(image, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;

  let r = 0,
    g = 0,
    b = 0,
    count = 0;
  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha < 125) continue;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }

  if (count === 0) return [60, 60, 60];
  return [Math.round(r / count), Math.round(g / count), Math.round(b / count)];
}

albumImage.addEventListener("load", function () {
  try {
    const [r, g, b] = getAverageColor(albumImage);
    const gradient = `linear-gradient(to bottom, rgb(${r},${g},${b}) 0%, rgb(${r},${g},${b}) 25%, #000 40%)`;

    document.body.style.background = gradient;
    console.log("Colore medio:", r, g, b);
  } catch (err) {
    console.warn("Impossibile leggere il colore medio:", err);
  }
});
