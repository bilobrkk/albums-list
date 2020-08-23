//CREATING CONTENT
const createContent = async (albums, element) => {
     albums.forEach(async (album) => {
          const ul = document.getElementById(element);
          const li = document.createElement("li");

          //CREATING CHILD DIVS
          const imageDiv = document.createElement("div");
          const img = document.createElement("img");
          const titlesDiv = document.createElement("div");
          const albumTitleSpan = document.createElement("span");
          const artistTitleSpan = document.createElement("span");
          const infoDiv = document.createElement("div");
          const releasedDiv = document.createElement("div");
          const releasedSpan = document.createElement("span");
          const yearSpan = document.createElement("span");
          const priceDiv = document.createElement("div");
          const button = document.createElement("button");


          //SET UP DATA IN DIVS
          li.id = album.artistId;
          button.id = "button" + album.id;

          img.src = album.imageUrl;
          imageDiv.appendChild(img);

          let artist = await artistsById(album.artistId);
          albumTitleSpan.innerText = album.title.toLowerCase();
          artistTitleSpan.innerText = "\n" + artist.title.toUpperCase();
          titlesDiv.appendChild(albumTitleSpan);
          titlesDiv.appendChild(artistTitleSpan);

          const year = new Date(album.releaseDate);
          releasedSpan.innerText = "Released: ";
          yearSpan.innerText = year.getFullYear().toString();
          releasedDiv.appendChild(releasedSpan);
          releasedDiv.appendChild(yearSpan);
          priceDiv.innerText = album.price;
          if (album.favorite) {
               button.innerText = "Remove favorite";
               button.className = "button-favorite-remove button-font";
          } else if (!album.favorite) {
               button.innerText = "MARK AS FAVORITE";
               button.className = "button-favorite-add button-font";
          }
          button.onclick = function () {
               favoriteButtonClicked(album)
          };


          //SET UP CLASS-NAMES FOR DIVS
          albumTitleSpan.className = "song-title-font";
          artistTitleSpan.className = "artist-name-font";
          releasedSpan.className = "artist-name-font";
          yearSpan.className = "year-price-font";
          priceDiv.className = "year-price-font";
          imageDiv.className = 'image-div';
          titlesDiv.className = 'names-div';
          infoDiv.className = 'other-info-div';

          //APPENDING ALL TOGETHER
          infoDiv.appendChild(releasedDiv);
          infoDiv.appendChild(priceDiv);
          infoDiv.appendChild(button);
          li.appendChild(imageDiv);
          li.appendChild(titlesDiv);
          li.appendChild(infoDiv);
          ul.appendChild(li);

          li.addEventListener('click', (event) => {
               if (event.srcElement.localName === 'button') return;
               const url = new URL('../artist/', location);
               url.hash = album.artistId;
               window.location.href = url;
          });

     });
}

//GETTING ARTIST BY ID
const artistsById = (id) => {
     return new Promise((resolve, reject) => {
          fetch(`http://localhost:3000/artists?id_like=${id}`)
               .then(response => response.json())
               .then(data => {
                    resolve(data[0]);
               })
               .catch((error) => {
                    reject(error)
               });
     })
}

//BUTTON IS CLICKED
const favoriteButtonClicked = (album) => {
     album.favorite = !album.favorite;

     changeFavorite(album).then(success => {
          const button = document.getElementById("button" + album.id);
          if (success && album.favorite) {
               button.innerText = "Remove favorite";
               button.className = "button-favorite-remove button-font";
          } else {
               button.innerText = "MARK AS FAVORITE";
               button.className = "button-favorite-add button-font";
          }
     });
}


//CHANGE FAVORITE FOR ALBUM
async function changeFavorite(_album) {
     return await fetch(`http://localhost:3000/albums/${_album.id}`, {
          method: 'PUT',
          headers: {
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(_album),
     })
          .then(response => response.json())
          .then(() => {
               return true;
          })
          .catch(() => {
               return false;
          });
}
