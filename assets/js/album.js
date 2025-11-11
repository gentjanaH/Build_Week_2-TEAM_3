//API URL
const apiUrl =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

//ELEMENTI DOM
const albumImage = document.getElementById("album-image");
const albumName = document.getElementById("album-name");
const albumData = document.getElementById("album-data");
const trackContainer = document.getElementById("track-list");

//CLASSE OGGETTI DA PRELEVARE IN API
class artistData {
  constructor(title, cover, name, release_date, nb_tracks, duration, tracks) {
    this.title = title;
    this.cover = cover;
    this.name = name;
    this.release_date = release_date;
    this.nb_tracks = nb_tracks;
    this.duration = duration;
    this.tracks = tracks;
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
            <div class="track-row d-flex align-items-center py-2">
                <span class="col-1">${i + 1}</span>
                <div class="col-6 d-flex flex-column">
                    <span class="song-title">${track.title}</span>
                    <span class="song-artist text-secondary">${
                      track.artist.name
                    }</span> 
                </div>
                <span class="col-3 d-none d-md-block text-center text-secondary">
                ${track.rank.toLocaleString()}
                </span>
                <span class="col-2 text-end text-secondary">${minutes}:${seconds}</span>
            </div>
                    `;
  });
};
//FETCH API
const getData = () => {
  fetch(apiUrl)
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
