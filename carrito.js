//CREO CARRITO
class Carrito{
    //agrega producto
    ageregar(e){
        e.preventDefault();

    }

}

//UTILIZO UNA FUNCION QUE ME PERMITA TRAER DE LA API UNA SOLA PELICULA, LA QUE YO ELIJA
//PARA ELLO UTILIZO LA FUNCION DE 'BUSCAR POR ID' QUE POSEE LA API, COLOCO LA ID EN LA CARD IMPRESA Y LA BUSCO 
var btnAdquirir = document.getElementById('#adquirir');
$('#adquirir').on(click,adquirir)

function adquirir(e) {
    let movieId = e.target.classList[3]
    let dataCompra = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKEY}&language=en-US`

    $.get(dataCompra, function(data, status) {
        if (status ==='success') {
           localStorage.setItem('productos',JSON.stringify(data))
        }
    })
}



