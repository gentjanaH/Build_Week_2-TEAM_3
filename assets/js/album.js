const apiUrl =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

const getData = () => {
  fetch(apiUrl)
    .then((response) => {
      if (response.ok) {
        console.log(`Response ok ${response.status}`);
        return response.json();
      } else throw new Error(`Il server non risponde ${response.status}`);
    })
    .catch((error) => {
      console.log(`Non riesco a collegarmi al server ${error}`);
    });
};

getData();
