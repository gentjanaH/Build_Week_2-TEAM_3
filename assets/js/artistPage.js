const endpoint = "https://striveschool-api.herokuapp.com/api/deezer/artist/412";
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

const getArtist = function () {
  fetch(endpoint)
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
      const fan = artistDetails.nb_fan;
      return getTrackList(tracklist);
    })
    .then((tracks) => {
      const tracksArray = tracks.data;
      const totalResults = tracks.total;
      tracksArray.forEach((track) => {
        const title = track.title;
        const duration = track.duration;
        const trackId = track.id;
        const songPreview = track.preview;
        const trackThumbnail = track.album.cover_medium;
      });
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

getArtist();
