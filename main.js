
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
        catalogo.setAttribute('data-bs-toggle','modal')
        catalogo.setAttribute('data-bs-target','#exampleModal')
        
        //'Nietos'
        let div1= document.createElement('div')
        div1.setAttribute('class','col')
        div1.setAttribute('id','card')
        div1.setAttribute('onclick',`modalMovie(${e.id})`)
        catalogo.appendChild(div1)

        let div2= document.createElement('div')
        div2.setAttribute('class','card h-100')
        div2.setAttribute('id','caja')
        div1.appendChild(div2)

        let img=document.createElement('img')
        img.setAttribute('src',`${IMGBASE}${e.poster_path}`)
        img.setAttribute('class','card-img-top')
        img.setAttribute('alt',`${e.title}`)
        div2.appendChild(img)

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

//Funcion modal para mostrar info de la peli------->Mejor presentacion para los productos

function modalMovie(p) {
  let dataCompra = `https://api.themoviedb.org/3/movie/${p}?api_key=${APIKEY}&language=en-US`
  let dataVideo =`https://api.themoviedb.org/3/movie/${p}/videos?api_key=${APIKEY}&language=en-US`
  
  $.get(dataCompra, function(data, status) { 
    if (status =='success') {
      console.log(data.genres)
    let genresArray= data.genres
    let uno=genresArray[0].name
    let dos=genresArray[1].name

        //imprimir objeto traido:
      let ModalMovie= document.getElementById('ModalMovie')
      ModalMovie.innerHTML=''
      
      let div1=document.createElement('div')
      div1.setAttribute('class','modal-header')
      ModalMovie.appendChild(div1)

      let buttonClose= document.createElement('button')
      buttonClose.setAttribute('type','button')
      buttonClose.setAttribute('class',"btn-close")
      buttonClose.setAttribute('data-bs-dismiss',"modal")
      buttonClose.setAttribute('aria-label',"Close")
      div1.appendChild(buttonClose) 

      let h5= document.createElement('h5')
      h5.setAttribute('class',"modal-title ml-5")
      h5.setAttribute('id',"exampleModalLabel")
      h5.setAttribute('style','font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif; font-size: 40px')
      h5.textContent=`${data.title}`
      ModalMovie.appendChild(h5)
      //Info movie
      let divBody= document.createElement('div')
      divBody.setAttribute('class','modal-body')
      ModalMovie.appendChild(divBody)

      let img=document.createElement('img')
      img.setAttribute('src',`${IMGBASE}${data.poster_path}`)
      img.setAttribute('class','card-img-top')
      img.setAttribute('alt',`${data.title}`)
      divBody.appendChild(img)

      let sinopsis= document.createElement('article')
      sinopsis.setAttribute('style','font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;')
      sinopsis.setAttribute('class','m-2')
      sinopsis.textContent=`${data.overview}`
      divBody.appendChild(sinopsis)

      //imprimo enlace para ver triller mediante otra funcion de busqueda que posee la Api
      $.get(dataVideo,function(d,s) {
        if (s== 'success') {
          let trillerArray= d.results
          let trillerKey0= trillerArray[0]
          let trillerKey1= trillerArray[1]
          
          let triller= document.createElement('a')
          triller.setAttribute('class','link mt-3')
          triller.setAttribute('target','_blank')
          triller.setAttribute('style','display:block')
          triller.setAttribute('href',`https://www.youtube.com/watch?v=${trillerKey0.key}`)
          triller.textContent='See more'
          divBody.appendChild(triller)

          let triller1= document.createElement('a')
          triller1.setAttribute('class','link')
          triller1.setAttribute('target','_blank')
          triller1.setAttribute('style','display:block')
          triller1.setAttribute('href',`https://www.youtube.com/watch?v=${trillerKey1.key}`)
          triller1.textContent='See more'
          divBody.appendChild(triller1)

        }
      })
      let generos=document.createElement('p')
      generos.setAttribute('class','ml-2 mt-3')
      generos.textContent=`Genders: ${uno}, ${dos}`
      divBody.appendChild(generos)

      let small=document.createElement('small')
      small.setAttribute('class','text-muted')
      small.textContent=`Release date: ${data.release_date}`
      divBody.appendChild(small)
      
      let divF=document.createElement('div')
      divF.setAttribute('class','modal-footer')
      ModalMovie.appendChild(divF)

      let input=document.createElement('input')
      input.setAttribute('type','button')
      input.setAttribute('value','Adquirir')
      input.setAttribute('class','btn btn-block btn-primary adquirir boton')
      input.setAttribute('onclick',`adquirir(${data.id});`)
      input.setAttribute('id',`${data.id}`)
      divF.appendChild(input)


    }
})
  
  
  
}