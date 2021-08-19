
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


//SPINNER
window.onload = function() {
  var cargando = document.getElementById('cargando');
  
  cargando.style.visibility='hidden';
  cargando.style.opacity='0'
}
//CREO UNA FUNCION QUE IMPRIMA, PARA AHORRAR UN POCO DE CODIGO:
function Imprime(urlApi) {

  document.getElementById('contenedor').textContent=''
  
  $.get(urlApi, function(data, status) {
 
    if (status === 'success' && data.total_results != 0) {
      let peli = data.results
      //aqui agregue un filtro en la funcion, me traía pelis sin imagen y medio vacías. Así que filtre solo las que al menos tenian imagenes
      let filtro = peli.filter(elemento => elemento.poster_path !== null)
      console.log(filtro)
      filtro.forEach(e=>{
        //Padre
        let contenedor = document.getElementById('contenedor')
        //Hijo
        let catalogo = document.createElement('div')
        
        //'Nietos'
        let div1= document.createElement('div')
        div1.setAttribute('class','col')
        div1.setAttribute('id','card')
        catalogo.appendChild(div1)

        let div2= document.createElement('div')
        div2.setAttribute('class','card h-100')
        div2.setAttribute('id','caja')
        div1.appendChild(div2)

        let img=document.createElement('img')
        img.setAttribute('src',`${IMGBASE}${e.poster_path}`)
        img.setAttribute('class','card-img-top')
        img.setAttribute('alt',`${e.title}`)
        img.setAttribute('onclick',`modalMovie(${e.id});`)
        div2.appendChild(img)

        let div3= document.createElement('div')
        div3.setAttribute('class','card-body') 
        div3.setAttribute('id','card')
        div2.appendChild(div3)

        let h5=document.createElement('h5')
        h5.setAttribute('class','card-title')
        h5.textContent=`${e.title}`
        div3.appendChild(h5)
/*
        let p1= document.createElement('p')
        p1.setAttribute('class','card-text')
        p1.textContent=`${e.overview}`
        div3.appendChild(p1)
*/
        let p2= document.createElement('p')
        p2.setAttribute('class','card-text')
        div3.appendChild(p2)

        let small=document.createElement('small')
        small.setAttribute('class','text-muted')
        small.textContent=`${e.release_date}`
        p2.appendChild(small)

        let input=document.createElement('input')
        input.setAttribute('type','button')
        input.setAttribute('value','Adquirir')
        input.setAttribute('class','btn btn-block btn-primary adquirir boton')
        input.setAttribute('onclick',`adquirir(${e.id});`)
        input.setAttribute('id',`${e.id}`)
        div3.appendChild(input)
        //Cierro asociacion de nodo Hijo
        contenedor.appendChild(catalogo)
      })
    }else{
      $('#up').css("display", "none");
        //Nodo Padre
        let contenedor = document.getElementById('contenedor')
        contenedor.setAttribute('class', 'container-fluid')
        //Hijo
        let div1=document.createElement('div')
        div1.setAttribute('class','container-fluid alert alert-danger text-center')
        div1.setAttribute('id','caja')
        contenedor.appendChild(div1)
        //'Nietos'
        let h4=document.createElement('h4')
        h4.setAttribute('class','alert-heading')
        h4.textContent='Upss!'
        div1.appendChild(h4)

        let p=document.createElement('p')
        p.textContent = 'Content not found....!'
        div1.appendChild(p)

        let img = document.createElement('img')
        img.setAttribute('src','./images/sorry-icon.png')
        div1.appendChild(img)
        //Cierro asociacion de nodo Hijo
        contenedor.appendChild(div1)
    }
})

}


//CREO UNA PRIMERA PARTE QUE ME MUESTRE LAS PELIS MAS POPULARES
let APIKEY = 'a3a3e5287e6096a60f24ab99816b466c'

let SOLICITUD = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}`

let IMGBASE= 'https://image.tmdb.org/t/p/original'

Imprime(SOLICITUD)
//FUNCIONES DE BUSQUEDA

//GENEROS:
//CREO UN SELECT QUE ME MUESTRE POR GENEROS
//LA API TRAE UNA SELECCION DE GENEROS CADA UNO CON SU PROPIO ID CARACTERIATICO, SE PUEDEN VER EN GENRE.JSON POR SI SE QUIERE CAMBIAR EL BUSCADOR

function cambioOpcionesSelcet(){
  let genreId = document.getElementById('opciones2').value
  let URLGENRE = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&page=1&with_genres=${genreId}`

  Imprime(URLGENRE);
}



//TRATANDO DE FUSIONAR ESTA FUNCION CON LA API, no logre entender como se aplicaba la funcion de busqueda por titulo, solo por Id
//PARA APLICAR LA API CORRECTAMENTE--EN ESTE CASO NO DEVOLVÍA TODAS LAS PELICULAS EN UNA SOLA LLAMADA,
//SE ME OCURRIERON DOS FORMAS DE HACERLO, ITERAR TODAS LAS PELICULAS EN UN ARRAY(LUEGO DE HACER VARIAS BUSQUEDAS) O TRATAR DE TRABAJAR CON LA CONSULTA INDIVIDUAL(COMO INTENTE AQUÍ)

function search() {
  let busca = document.getElementById('busca').value
  if (busca != 0) {
    let titleMovie = busca.replace(/ /g, '+')
  
  let urlMovTit = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${titleMovie}`

  $.get(urlMovTit, function(data , status) {
    if (status ==='success') {
      Imprime(urlMovTit)
    }
  })
  }
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

//Funcion modal para mostrar info de la peli

function modalMovie(id) {
  let dataCompra = `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`
  //imprimir objeto traido:
  
}