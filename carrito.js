//En este caso, el objeto ya venia armado en la Api, as{i que lo que hice fue un carrito donde enviar esos objetos cuando se elijan
//DEFINO MI ARRAY CARRITO
let compra = [];

//UTILIZO UNA FUNCION QUE ME PERMITA TRAER DE LA API UNA SOLA PELICULA, LA QUE YO ELIJA
//PARA ELLO UTILIZO LA FUNCION DE 'BUSCAR POR ID' QUE POSEE LA API, COLOCO LA ID EN LA CARD IMPRESA Y LA BUSCO 


function myFunction(p) {
    let dataCompra = `https://api.themoviedb.org/3/movie/${p}?api_key=${APIKEY}&language=en-US`
    $.get(dataCompra, function(data, status) {
        if (status ==='success') {
           localStorage.setItem('productos',JSON.stringify(compra))
           compra.push(data)
           console.log(compra)
        }
    })
};


//PARA VER EL CARRITO

function verCarro() {
    let todo = JSON.parse(localStorage.getItem("compra"))

    todo.forEach(element => {
        
    });
}