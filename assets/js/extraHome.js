const endpointArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const urlArtist = window.location.search;
const urlIdArtist = new URLSearchParams(url);
const artistId2 = urlId.get("id");

// FUNZIONE PRINCIPALE
const getFavoriteArtist = function () {
    fetch(endpointArtist + artistId2)
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

            const icone = document.querySelectorAll(".favorite-icon")
            icone.forEach((icon) => {
                icon.addEventListener("click", e => {
                    e.preventDefault()
                    class Song {
                        constructor(_title, _artist, _cover) {
                            this.title = _title
                            this.artist = _artist
                            this.cover = _cover
                        }

                    }
                    const newSong = new Song("titolo", name, coverImgMobile)
                    let favorites = JSON.parse(localStorage.getItem("favoriteSong")) || []


                    if (favorites.filter((s) => s.title === newSong.title && s.artist === newSong.artist).length === 0) {
                        favorites.push(newSong);
                        localStorage.setItem("favoriteSongs", JSON.stringify(favorites));
                    }
                })
            })




        })
        .catch((err) => {
            console.log("errore", err)
        })
}
getFavoriteArtist()





