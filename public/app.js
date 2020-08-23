const params = (new URL(document.location)).searchParams;
const limit = params.get('limit') ? params.get('limit') : 10;


const albums = async () => {
     return await fetch(`http://localhost:3000/albums?_limit=${limit}`)
          .then(response => response.json())
          .then(data => {
               return data;
          }).catch((error) => {
               console.error('Error:', error);
          });
}


const filtering = async () => {
     const input = document.getElementById("input");
     const div = document.getElementById("albums-list");
     div.innerHTML = "";
     await fetch(`http://localhost:3000/albums/?q=${input.value.toLowerCase()}`)
          .then(response => response.json())
          .then(albums => {
               createContent(albums, "albums-list")
          })
          .catch((error) => console.log(error))
}


albums().then(albums => {
     createContent(albums, "albums-list")
});
