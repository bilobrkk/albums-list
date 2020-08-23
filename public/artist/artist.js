const artistID = window.location.hash.substring(1);
const h1 = document.getElementById('header-title');

const albumsByArtistID = async (id) => {
     return await fetch(`http://localhost:3000/albums?artistId=${id}`)
          .then(response => response.json())
          .then(data => {
               return data;
          })
          .catch((error) => {
               console.error('Error:', error);
          });
}

artistsById(artistID).then(artist => {
     document.title = artist.title;
     h1.innerText = artist.title;
});

albumsByArtistID(artistID).then(albums => {
     createContent(albums, "albums");
});



