
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
//CREO UNA FUNCION QUE IMPRIMA, PARA AHORRAR UN POCO DE CODIGO:
function Imprime(urlApi) {

  document.getElementById('contenedor').innerHTML=''
  
  $.get(urlApi, function(data, status) {
    console.log(data);
    console.log(status)
    if (status === 'success') {
      let peli = data.results
      
      console.log(peli) 
      peli.forEach(e=>{
        let peliculas = document.getElementById('contenedor')
        peliculas.innerHTML +=
 
        `<div class="col" id='cardd'>
          <div class="card h-100">
            <img src="${IMGBASE}${e.poster_path}" class="card-img-top" alt="${e.title}">
            <div class="card-body"  id='card'>
              <h5 class="card-title">${e.title}</h5>
              <p class="card-text">${e.overview}</p>
              <p class="card-text"><small class="text-muted">${e.release_date}</small></p>
              <button class="btn btn-outline-primary btn-sm" type="" onclick="Adquirir()">Adquirir</button>
            </div>
          </div>
        </div>`
        
      })
    }else if (data.results.length == 0) {
        $('.error').html('No data found, search again.');
    }
})

}

//CREO UNA PRIMERA PARTE QUE ME MUESTRE LAS PELIS MAS POPULARES
let APIKEY = 'a3a3e5287e6096a60f24ab99816b466c'

let SOLICITUD = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}`

let IMGBASE= 'https://image.tmdb.org/t/p/original'

Imprime(SOLICITUD)

//GENEROS:
//CREO UN SELECT QUE ME MUESTRE POR GENEROS

function cambioOpcionesSelcet(){
  let genreId = document.getElementById('opciones2').value
  let URLGENRE = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&page=1&primary_release_year=2019&with_genres=${genreId}`

  Imprime(URLGENRE);
}


//FUNCION DE BUSQUEDA Y OFRECIMIENTO--
//TRATANDO DE FUSIONAR ESTA FUNCION CON LA API, no logre entender como se aplicaba la funcion de busqueda por titulo, solo por Id
//PARA APLICAR LA API CORRECTAMENTE--EN ESTE CASO NO DEVOLVÍA TODAS LAS PELICULAS EN UNA SOLA LLAMADA,
//SE ME OCURRIERON DOS FORMAS DE HACERLO, ITERAR TODAS LAS PELICULAS EN UN ARRAY(LUEGO DE HACER VARIAS BUSQUEDAS) O TRATAR DE TRABAJAR CON LA CONSULTA INDIVIDUAL(COMO INTENTE AQUÍ)



function search() {
  let busca = document.getElementById('busca').value
  let titleMovie = busca.replace(/ /g, '+')
  
  let urlMovTit = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${titleMovie}`

  $.get(urlMovTit, function(data , status) {
    //VALIDO DATA DEVUELVA E IMPRIMO DATOS
    console.log(data)
    Imprime(urlMovTit)
  })
}


let tecla = document.getElementById("select")
tecla.addEventListener("click", search)
//Aplique funcion enter en boton de busqueda

function rapido(event) {
  if (event.keyCode == 13) {
    search()
  }
}
document.getElementById('busca').addEventListener('keydown', rapido)
