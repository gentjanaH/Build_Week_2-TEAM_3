const endpoint = "https://striveschool-api.herokuapp.com/api/deezer/artist/412";
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
      // tracklist è l'URL endpoint da fetchare per ottenere tutte le tracce
      const fan = artistDetails.nb_fan;
      // eseguo la funzione getTrackList con parametro tracklist ed esco da questo blocco then.
      // MANIPOLAZIONE e TRAVERSING DOM:

      // FINE MANIPOLAZIONE DOM
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
        // MANIPOLAZIONE e TRAVERSING DOM:

        // FINE MANIPOLAZIONE
      });
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

getArtist();
