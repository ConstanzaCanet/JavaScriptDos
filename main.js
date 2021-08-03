
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
    }
})

//GENEROS:
//CREO UN SELECT QUE ME MUESTRE POR GENEROS
function cambioOpcionesSelcet(){
  let genreId = document.getElementById('opciones2').value
  let URLGENRE = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&page=1&primary_release_year=2019&with_genres=${genreId}`
  
  //aqui vacio el div que contiene resultados para imprimir todo en la misma pagina sin que me lo sume

  document.getElementById('contenedor').innerHTML=''
  document.getElementById('productos').innerHTML=''

  //tomo la api y traigo datos, filtrando por generos con genreId

  $.get(URLGENRE,function(data,status) {
    console.log(data)
    if (status === 'success') {
      let peli = data.results
      peli.forEach(e=> {
          document.getElementById('contenedor').innerHTML +=
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
    }
  })
}


//FUNCION DE BUSQUEDA Y OFRECIMIENTO--
//ME ENCUENTRO TRATANDO DE FUSIONAR ESTA FUNCION CON LA API, AUN ME ENCUENTRO LEYENDO
//LA DOCUMENTACION DE LA API PARA APLICARLA CORRECTAMENTE


$(document).ready(function() {
  var url = 'http://api.themoviedb.org/3/',
  mode = 'search/movie',
  input,
  movieName,
  APIKEY;

  $('#select').click(function() {
      var input = $('#busca').val(),
          movieName = encodeURI(input);
      $.ajax({
          url: url + mode + APIKEY + '&query='+movieName ,
          dataType: 'jsonp',
          success: function(data) {
           console.log(data);
          },
          error: function (request, status, error) {
           alert(status + ", " + error);
          }
      });
  });
});