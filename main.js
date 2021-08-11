
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
 
    if (status === 'success' && data.total_results != 0) {
      let peli = data.results
      //aqui agregue un filtro en la funcion, me traía pelis sin imagen y medio vacías. Así que filtre solo las que al menos tenian imagenes
      let filtro = peli.filter(elemento => elemento.poster_path !== null)
      console.log(filtro)
      filtro.forEach(e=>{
        let peliculas = document.getElementById('contenedor')
        peliculas.innerHTML +=
 
        `<div class="col" id='card'>
          <div class="card h-100" id='caja'>
            <img src="${IMGBASE}${e.poster_path}" class="card-img-top" alt="${e.title}">
            <div class="card-body"  id='card'>
              <h5 class="card-title">${e.title}</h5>
              <p class="card-text">${e.overview}</p>
              <p class="card-text"><small class="text-muted">${e.release_date}</small></p>
              <input type="button" value="Adquirir" class="btn btn-block btn-primary adquirir" onclick="myFunction(${e.id})" id="${e.id}">
            </div>
          </div>
        </div>`
        
      })
    }else{
      $('#up').css("display", "none");
      let peliculas = document.getElementById('contenedor')
      peliculas.innerHTML=
       `<div class="container-fluid alert alert-danger text-center" id='caja'>
            <h4 class="alert-heading">Upss!</h4>
            <p>Content not found....!</p>
            <img src='./images/sorry-icon.png'>
        </div>`
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
//LA API TRAE UNA SELECCION DE GENEROS CADA UNO CON SU PROPIO ID CARACTERIATICO, SE PUEDEN VER EN GENRE.JSON POR SI SE QUIERE CAMBIAR EL BUSCADOR

function cambioOpcionesSelcet(){
  let genreId = document.getElementById('opciones2').value
  let URLGENRE = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&page=1&with_genres=${genreId}`

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
    if (status ==='success') {
      Imprime(urlMovTit)
    }
  })
}

//LLAMO FUNCION SEARCH
let tecla = document.getElementById("select")
tecla.addEventListener("click", search)
//Aplique funcion enter en boton de busqueda

function rapido(event) {
  if (event.keyCode == 13) {
    search()
  }
}
document.getElementById('busca').addEventListener('keydown', rapido)


//FUNCION QUE ME LLEVA HACIA ARRIBA
$(document).ready(function() {
  $('#up').click(function() {
    $('body,html').animate({
      scrollTop: '0px'
    },200)
  })
})