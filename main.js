//AGREGO CARRITO DE PRUEBA:
const DATOS=`[{"title":"El señor de los anillos","gender":"Fantasía,aventura","duration":"3:21 horas","year":2003,"fullprice":3000,"image":"./images/lordoftherings.jpg"},{"title":"El castillo en el cielo","gender":"Fantasía, aventura","duration":"2:04 horas","year":1989,"fullprice":2800,"image":"./images/castillo.jpg"},{"title":"Actividad Paranormal","gender":"terror","duration":"1:20 horas","year":2007,"fullprice":2500,"image":"./images/paranormal.jpg"},{"title":"Pulp Fiction","gender":"accion, comedia","duration":"2:58horas","year":1994,"fullprice":2500,"image":"./images/polp.jpg"},{"title":"La lista de Schindler","gender":"drama","duration":"3:17 horas","year":1993,"fullprice":3000,"image":"./images/schneider.jpg"},{"title":"El club de la pelea","gender":"drama, comedia","duration":"2:31 horas","year":1999,"fullprice":2500,"image":"./images/club.jpg"},{"title":"Forrest Gump","gender":"drama,romance","duration":"2:22 horas","year":1994,"fullprice":2300,"image":"./images/forest.jpg"},{"title":"Inglourious Basterds","gender":"bélico, accion","duration":"2:33 horas","year":2009,"fullprice":3000,"image":"./images/bastards.jpg"},{"title":"El padrino","gender":"crime,drama","duration":"2:58 horas","year":1972,"fullprice":3000,"image":"./images/images.jpg"},{"title":"Origen","gender":"ciencia ficcion,drama","duration":"2:42 horas","year":2010,"fullprice":2800,"image":"./images/origen.jpg"}]`
//CREO OJETOS NUEVOS PARA MOSTRAR

class Movie{
  constructor(title ,gender, duration, year, fullprice,image){
    this.title = title;
    this.gender= gender;
    this.duration= duration;
    this.year= year;
    this.fullprice= fullprice;
    this.image= image;
  }

}

//DEFINO PELICULAS DISPONIBLES:
const MovieOne = new Movie('El señor de los anillos', 'Fantasía,aventura', '3:21 horas', 2003, 3000, './images/lordoftherings.jpg' )
const MovieTwo = new Movie('El castillo en el cielo','Fantasía, aventura','2:04 horas', 1989, 2800, './images/castillo.jpg')
const MovieThree = new Movie('Actividad Paranormal', 'terror', '1:20 horas', 2007, 2500, "./images/paranormal.jpg")
const MovieFour = new Movie('Pulp Fiction', 'accion, comedia','2:58horas', 1994, 2500,"./images/polp.jpg")
const MovieFive = new Movie('La lista de Schindler','drama','3:17 horas', 1993, 3000,"./images/schneider.jpg")
const MovieSix = new Movie('El club de la pelea','drama, comedia', '2:31 horas', 1999, 2500,"./images/club.jpg" )
const MovieSeven = new Movie('Forrest Gump', 'drama,romance', '2:22 horas', 1994, 2300,"./images/forest.jpg")
const MovieEight = new Movie('Inglourious Basterds','bélico, accion', '2:33 horas', 2009, 3000,"./images/bastards.jpg")
const MovieNine = new Movie('El padrino','crime,drama', '2:58 horas', 1972, 3000,"./images/images.jpg")
const MovieTen = new Movie('Origen', 'ciencia ficcion,drama', '2:42 horas', 2010,2800,"./images/origen.jpg")
//defino arrays de pelis:
const Movies = [MovieOne, MovieTwo, MovieThree, MovieFour, MovieFive,MovieSix,MovieSeven, MovieEight,MovieNine, MovieTen]

//Creo un repositorio en el localstorage
function Guardo() {
  localStorage.setItem('movies',JSON.stringify(Movies))
}

//LLamo funcion de guardado
console.log(JSON.stringify(Movies))
Guardo()

//CONTINUO CON LA ENTREGA DE TAREA EVENTOS Y DOM!
function muestrame() {
    let ar =document.getElementById('productos')
    let pelis = JSON.parse(localStorage.getItem('movies'))
    pelis.forEach(e => {
      ar.innerHTML += 
                  `<div class="card mb-3 carta col">
                    <img src="${e.image}" class="card-img-top img-fluid" alt="${e.title}">
                    <div class="card-body">
                      <h5 class="card-title">${e.title}</h5>
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      <button class="btn btn-primary" type="" onclick="Adquirir()">Adquirir</button>
                    </div>
                  </div>`
    })
     
}

//Agrego funcion de desaparecer el boton:
function ocultar(){
  var elemento = document.getElementById("mostrar");
  elemento.style.display = "none";
}

let boton2 = document.getElementById("mostrar")
boton2.addEventListener("dblclick",muestrame)
boton2.addEventListener('dblclick',ocultar)
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
//DE BUSQUEDA, POR GENERO
function searchGender() {
  let preference = prompt('¿Qué genero buscas?')
  preference = preference.toLowerCase()
  let filter = Movies.filter(Movie => Movie.gender.includes(preference))
  for (const movie of filter) {
    let namesMov = movie.title;
    let product = document.createElement('li')
    product.innerHTML = `<li>${namesMov}</li>`
    document.body.appendChild(product)
  }
     
  let esp = document.createElement('br')
  esp.innerHTML = `<br></br>`
  document.body.appendChild(esp)
  return filter;
}
//BUSCA POR PRECIO DE COMPRA
function searchPrice() {
  let money = Number(prompt('¿Hasta cuanto quieres pagar por comprar una peli?'))
  let filter = Movies.filter(Movie => Movie.fullprice <= money)
  for (const movie of filter) {
    let namesMov = movie.title;
    let product = document.createElement('li')
    product.innerHTML = `<li>${namesMov}</li>`
    document.body.appendChild(product)
  }
  //agregue ese espacio para que no me molestara a la hora de ver los resultados
  let esp = document.createElement('br')
  esp.innerHTML = `<br></br>`
  document.body.appendChild(esp)
  return filter;
}


//FUNCION DE BUSQUEDA Y OFRECIMIENTO--
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


