
//Creo funcionalidad para comentar y mantener el uso de enter

function accionEnter(event) {
 
  if (event.keyCode == 13) {
    let text= document.getElementById('opina').value;

    let coment = document.getElementById('Comenta');
    let Comentas = document.createElement('p')
    Comentas.textContent= `${text}`
    coment.appendChild(Comentas) 
  }

}

function click() {
  let text= document.getElementById('opina').value;
  let coment = document.getElementById('Comenta');
  let Comentas = document.createElement('p')
  Comentas.textContent= `${text}`
  coment.appendChild(Comentas) 
}

document.getElementById('opina').addEventListener('keydown', accionEnter)
document.getElementById('sub').addEventListener('click', click)



//AJAX
//CREO UNA PRIMERA PARTE QUE ME MUESTRE LAS PELIS MAS POPULARES
let APIKEY = 'a3a3e5287e6096a60f24ab99816b466c'

let SOLICITUD = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}`

let IMGBASE= 'https://image.tmdb.org/t/p/original'


  $.get(SOLICITUD, function(data, status) {
    console.log(data);
    console.log(status)
    if (status === 'success') {
      let peli = data.results
      
      console.log(peli) 
      peli.forEach(e=>{
        let peliculas = document.getElementById('productos')
        peliculas.innerHTML +=
        `<div class="card mb-3 carta col">
          <img src="${IMGBASE}${e.poster_path}" class="card-img-top img-fluid" alt="${e.title}">
          <div class="card-body">
            <h5 class="card-title">${e.title}</h5>
            <p class="card-text">${e.overview}</p>
            <p class="card-text"><small class="text-muted">${e.genre_ids}</small></p>
            <button class="btn btn-primary" type="" onclick="Adquirir()">Adquirir</button>
         </div>
        </div>`
      })
    }
})

//GENEROS:
//CREO UN SELECT QUE ME MUESTRE POR GENEROS
function cambioOpcionesSelcet(){
  let genreId = document.getElementById('opciones2').value
  let baseImagenCambiada = 'https://image.tmdb.org/t/p/w780'
  let URLGENRE = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&page=1&primary_release_year=2019&with_genres=${genreId}`


  $.get(URLGENRE,function(data,status) {
    console.log(data)
    if (status === 'success') {
      let peli = data.results
      peli.forEach(e=> {
          document.getElementById('contenedor').innerHTML +=
          `<div class="card mb-3 carta col">
          <img src="${baseImagenCambiada}${e.backdrop_path}" class="card-img-top img-fluid" alt="${e.title}">
          <div class="card-body">
          <h5 class="card-title">${e.title}</h5>
          <p class="card-text">${e.overview}</p>
          <p class="card-text"><small class="text-muted">${e.genre_ids}</small></p>
          <button class="btn btn-primary" type="" onclick="Adquirir()">Adquirir</button>
           </div>
          </div>`
      })
    }
  })
}


//FUNCION DE BUSQUEDA Y OFRECIMIENTO--
//ME ENCUENTRO TRATANDO DE FUSIONAR ESTA FUNCION CON LA API, AUN ME ENCUENTRO LEYENDO
//LA DOCUMENTACION DE LA API PARA APLICARLA CORRECTAMENTE
function searchName() {
  let what = document.getElementById("busca").value
  if (Movies.find(Movie => Movie.title == what)) {
    let thisMovie = (Movies.find(Movie => Movie.title == what))
    console.log(`Tenemos esa peli! ${thisMovie.title}`);
    let conte1 = document.getElementsByClassName('contenedor');
     
    let ress = document.createElement('article')
    ress.innerHTML = 
                `<div class="card m-5" style="width: 18rem;">
                   <img src="${thisMovie.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${thisMovie.title}</h5>
                     <p class="card-text"> ${thisMovie.gender} , posee una duracion de ${thisMovie.duration}, del año ${thisMovie.year}. Precio de compra ${thisMovie.fullprice}</p>
                    </div>
                </div>`
  conte1[0].appendChild(ress);
  } else if (what == 0) {
    console.log(('No has colocado datos'))
   
    let pero = document.createElement('article')
    pero.innerHTML = `No has colocado datos!`
    document.body.appendChild(pero)
    
    return searchName()

  }else{
    let ups = document.createElement('article')
    ups.innerHTML = `Lo sentimos no tenemos esa peli!`;
    document.body.appendChild(ups)

    return(`Lo sentimos no tenemos esa peli!`);
  }
      
  let esp = document.createElement('br')
  esp.innerHTML = `<br></br>`
  document.body.appendChild(esp)

}

let tecla = document.getElementById("select")
tecla.addEventListener("click", searchName)





let APINAMES = `http://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=king+lion`
$.get(APINAMES, function(data,status) {
  console.log(data)
  console.log(status)

})