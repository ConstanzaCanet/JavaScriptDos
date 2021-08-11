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
//La Api  no manejaba precios, así que me invente los precios tomando el id de la película y dividiendola por 100
function verCarro() {
    let todo = JSON.parse(localStorage.getItem("productos"))
    document.getElementById('contenedor').innerHTML=''
    
    todo.forEach(element => {
        let carro = document.getElementById('impreComprados')
        carro.innerHTML += `
                    <tr>
                        <td class="p-0">
                        <div class="card" style="max-width: 500px;">
                        <div class="row g-0">
                          <div class="col-md-4">
                            <img src="${IMGBASE}${element.poster_path}" class="img-fluid rounded-start" alt="${element.title}" title="${element.title}">
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                              <h5 class="card-title">${element.title}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                        </td>
                        <td>$${(element.id / 1000).toFixed(2)}</td>
                    </tr>
                `
    });
}
