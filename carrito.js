//En este caso, el objeto ya venia armado en la Api, as{i que lo que hice fue un carrito donde enviar esos objetos cuando se elijan
//DEFINO MI ARRAY CARRITO
let compra = [];

//UTILIZO UNA FUNCION QUE ME PERMITA TRAER DE LA API UNA SOLA PELICULA, LA QUE YO ELIJA
//PARA ELLO UTILIZO LA FUNCION DE 'BUSCAR POR ID' QUE POSEE LA API, COLOCO LA ID EN LA CARD IMPRESA Y LA BUSCO 


function myFunction(p) {
    let dataCompra = `https://api.themoviedb.org/3/movie/${p}?api_key=${APIKEY}&language=en-US`
    $.get(dataCompra, function(data, status) {
        if (status ==='success') {
           let inicio = JSON.parse(localStorage.getItem("compra"))
           console.log(inicio)
          // let resultado = inicio.find( e => e.p === p ); 
           if (localStorage.getItem("compra") != null) {
            
               inicio.push(data)
               localStorage.setItem('compra',JSON.stringify(inicio))
               console.log(inicio)
           }else {
               localStorage.clear()
               compra.push(data)
               localStorage.setItem('compra',JSON.stringify(compra))
               console.log(compra)
           }
        }
    })
};


//PARA VER EL CARRITO
//La Api  no manejaba precios, así que me invente los precios tomando el id de la película y dividiendola por 100
function verCarro() {
    let todo = JSON.parse(localStorage.getItem("compra"))
    if (todo != null) {

        document.getElementById('contenedor').innerHTML=''
        $('#tablita').show()

        todo.forEach(element => {
            let carro = document.getElementById('impreComprados')
            carro.innerHTML += `
                        <tr class="borde">
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
                            </td>
                            <td>$${(element.id / 1000).toFixed(2)}</td>
                            <td><button type="button" class="btn btn-danger" id="eliminar">Eliminar</button></td>
                        </tr>
                    `
                    $('#up').hide()
                    $('#verCarro').hide()
        });
    }else{
        alert(` Aun no has elegido nada. Tenemos muchas peliculas, encontraras la elegida sin duda!`)
    }
}
//LLAMO FUNCION CARRITO
let mirar = document.getElementById('verCarro')
mirar.addEventListener('click', verCarro)


//CREO UNA FUNCION QUE ELIMINE ELEMENTOS DE MI CARRITO

function eliminoPelicula(id) {
    
    let borra=JSON.parse(localStorage.getItem("compra"));
    let nuevaLista = borra.filter(e=>e.id != id)
    localStorage.setItem("compra",JSON.stringify(nuevaLista))
    location.reload()
}

//LLAMO FUNCION DE BORRADO EN BOTON DE ELIMINAR
let borrando = document.getElementById('eliminar')
borrando.addEventListener('click',eliminoPelicula)




/*function desactivoBoton(id) {
    let inicio = JSON.parse(localStorage.getItem("compra"))
    const resultado = inicio.find( e => e.id === id );
    console.log(resultado)
    if (resultado != null) {
        $(`#${id}`).hide()
    }
}


  /** sumamos las columnas **/
 /*
    // obtenemos el numero de columnas
    const columnas=document.querySelectorAll("#miTabla thead tr th");
 
    // obtenemos las fila de los totales
    const totalFila=document.querySelectorAll("#miTabla tfoot tr td");
 
    // bucle por cada una de las columnas excepto la primera
    for(let i=1; i<columnas.length; i++) {
        let total=0;
 
        // obtenemos el valor de cada una de las filas
        filas.forEach((fila) => {
            total+=parseFloat(fila.querySelectorAll("td")[i].innerHTML);
        });
 
        // mostramos el total en la ultima fila
        totalFila[i].innerHTML=total.toFixed(2);
    }
 
}*/


