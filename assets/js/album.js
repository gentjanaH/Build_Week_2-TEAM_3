const apiUrl =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

//ELEMENTI DOM
const albumImage = document.getElementById("album-image");
const albumName = document.getElementById("album-name");
const albumData = document.getElementById("album-data");

class artistData {
  constructor(title, cover, name, release_date, nb_tracks, duration) {
    this.title = title;
    this.cover = cover;
    this.name = name;
    this.release_date = release_date;
    this.nb_tracks = nb_tracks;
    this.duration = duration;
  }
}
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
        data.duration
      );

      albumImage.src = albumObj.cover;
      albumName.innerText = albumObj.title;
      albumData.innerText = `${albumObj.name} • ${albumObj.release_date.slice(
        0,
        4
      )} • ${albumObj.nb_tracks} brani • ${Math.floor(
        albumObj.duration / 60
      )} min`;
      console.log(albumObj);
    })
    .catch((error) => {
      console.log(`Non riesco a collegarmi al server ${error}`);
    });
};

getData();
