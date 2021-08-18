//En este caso, el objeto ya venia armado en la Api, as{i que lo que hice fue un carrito donde enviar esos objetos cuando se elijan
//UTILIZO UNA FUNCION QUE ME PERMITA TRAER DE LA API UNA SOLA PELICULA, LA QUE YO ELIJA
//PARA ELLO UTILIZO LA FUNCION DE 'BUSCAR POR ID' QUE POSEE LA API, COLOCO LA ID EN LA CARD IMPRESA Y LA BUSCO 

function myFunction(p) {
    // Consulto el carrito
    var carritoList = JSON.parse(localStorage.getItem("compra"));
    // Si no fue creado, lo creo
    if (!carritoList) {
        carritoList = [];
        localStorage.setItem('compra', JSON.stringify(carritoList));
    }
    var peliculaIndex = carritoList.findIndex(x => x.id === p);
    //si existe
    if (peliculaIndex >= 0) {
        
    }else
    // Si no existe
    if (peliculaIndex === -1) {
        // Obtengo la película desde el backend
        let dataCompra = `https://api.themoviedb.org/3/movie/${p}?api_key=${APIKEY}&language=en-US`
        $.get(dataCompra, function(data, status) {
            if (status ==='success') {
                // La agrego
                carritoList.push(data);
                localStorage.setItem('compra', JSON.stringify(carritoList));
            }
        })
    }
};


//PARA VER EL CARRITO
//La Api  no manejaba precios, así que me invente los precios tomando el id de la película y dividiendola por 100
function verCarro() {
    let todo = JSON.parse(localStorage.getItem("compra"))
    if (todo != null && todo!=0) {

        document.getElementById('contenedor').innerHTML=''
        $('#tablita').show()

        todo.forEach(element => {
            let carro = document.getElementById('impreComprados')

            let tr=document.createElement('tr')
            tr.setAttribute('class','borde')
            tr.setAttribute('id',`${element.id}`)

            let td=document.createElement('td')
            td.setAttribute('class','p-0')
            tr.appendChild(td)

            let div1= document.createElement('div')
            div1.setAttribute('class','card')
            div1.setAttribute('style','max-width: 500px;')
            td.appendChild(div1)

            let div2= document.createElement('div')
            div2.setAttribute('class','row g-0')
            div1.appendChild(div2)

            let div3= document.createElement('div')
            div3.setAttribute('class','col-md-4')
            div2.appendChild(div3)

            let img=document.createElement('img')
            img.setAttribute('src',`${IMGBASE}${element.poster_path}`)
            img.setAttribute('class','img-fluid rounded-start')
            img.setAttribute('alt',`${element.title}`)
            img.setAttribute('title',`${element.title}`)
            div3.appendChild(img)

            let div4=document.createElement('div')
            div4.setAttribute('class','col-md-8')
            div2.appendChild(div4)

            let div5=document.createElement('div')
            div5.setAttribute('class','card-body')
            div4.appendChild(div5)

            let h5=document.createElement('h5')
            h5.setAttribute('class','card-title')
            h5.textContent=`${element.title}`
            div5.appendChild(h5)

            let td2=document.createElement('td')
            td2.textContent=`$${(element.id / 1000).toFixed(2)}`
            tr.appendChild(td2)

            let td3=document.createElement('td')
            tr.appendChild(td3)

            let button= document.createElement('button')
            button.setAttribute('class',"btn btn-danger")
            button.setAttribute('type','button')
            button.setAttribute('id',"eliminar")
            button.setAttribute('onclick',`eliminoPelicula(${element.id})`)
            button.textContent='Eliminar'
            td3.appendChild(button)

            carro.appendChild(tr)

                    $('#up').hide()
                    $('#verCarro').hide()
        });
    }else{
        alert(` Aun no has elegido nada. Tenemos muchas peliculas, encontraras la elegida sin duda!`)
    }
}

//SUMAR COLUMNA DE TABLA

function Total() {
    let todo = JSON.parse(localStorage.getItem("compra"))
    console.log(todo)
    let total = [];
    //Obtengo una lista de los precios de los productos a comprar
    todo.forEach(e=>{
        total.push(parseFloat(`${(e.id / 1000).toFixed(2)}`))
    })
    //Sumo esos precios---> trate de hacerlo en un solo forEach pero me daba error, solo me funciono así
        suma=0
        for (let i = 0; i < total.length; i++) {
            suma += total[i];
        }
        let totalImpreso= document.getElementById('total')
        let texTotal= document.createTextNode('$'+suma)
        totalImpreso.appendChild(texTotal)
        //Agrego boton que finalice compra
        let finalizar= document.getElementById('finalizar')

        let button= document.createElement('button')
        button.setAttribute('class',"btn btn-success")
        button.setAttribute('type','button')
        button.setAttribute('id',"comprar")
        button.textContent='Finalizar'
        
        finalizar.appendChild(button)


    }

Total()



//LLAMO FUNCION CARRITO
let mirar = document.getElementById('verCarro')
mirar.addEventListener('click', verCarro)


//CREO UNA FUNCION QUE ELIMINE ELEMENTOS DE MI CARRITO

function eliminoPelicula(id) {
    
    let borra=JSON.parse(localStorage.getItem("compra"));
    let prom = confirm('seguro que quieres eliminarla?')
    if (prom == true) {
        if (borra.length != 1 ) {
            let nuevaLista = borra.filter(e=>e.id != id)
            localStorage.setItem("compra",JSON.stringify(nuevaLista))
            $(`#${id}`).hide()
        }else if (borra.length = 1) {
            let nuevaLista = borra.filter(e=>e.id != id)
            localStorage.setItem("compra",JSON.stringify(nuevaLista))
            location.reload()
        }
    }
}



function desactivoBoton(id) {
    let inicio = JSON.parse(localStorage.getItem("compra"))
    const resultado = inicio.find( e => e.id === id );
    console.log(resultado)
    if (resultado != null) {
        $(`#${id}`).hide()
    }
}

 





