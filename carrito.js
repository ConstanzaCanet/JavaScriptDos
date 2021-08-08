//CREO CARRITO
class Carrito{
    //agrega producto
    
}
//DEFINO MI ARRAY CARRITO
let compra = [];

//UTILIZO UNA FUNCION QUE ME PERMITA TRAER DE LA API UNA SOLA PELICULA, LA QUE YO ELIJA
//PARA ELLO UTILIZO LA FUNCION DE 'BUSCAR POR ID' QUE POSEE LA API, COLOCO LA ID EN LA CARD IMPRESA Y LA BUSCO 


function myFunction(p) {
    let dataCompra = `https://api.themoviedb.org/3/movie/${p}?api_key=${APIKEY}&language=en-US`
    $.get(dataCompra, function(data, status) {
        if (status ==='success') {
           localStorage.setItem('productos',JSON.stringify(data))
           console.log(data)
        }
    })
}