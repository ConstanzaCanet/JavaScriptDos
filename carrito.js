//En este caso, el objeto ya venia armado en la Api, as{i que lo que hice fue un carrito donde enviar esos objetos cuando se elijan
//UTILIZO UNA FUNCION QUE ME PERMITA TRAER DE LA API UNA SOLA PELICULA, LA QUE YO ELIJA
//PARA ELLO UTILIZO LA FUNCION DE 'BUSCAR POR ID' QUE POSEE LA API, COLOCO LA ID EN LA CARD IMPRESA Y LA BUSCO 

function adquirir(p) {
    //Primero consulto si hay alguien logueado
    let usersList= JSON.parse(localStorage.getItem("usuarios"))
    if (!usersList) {
        document.getElementById('modal').style.display='block';
        return console.log('no compras sin logueo')
      }

    // Luego consulto el carrito
    let carritoList = JSON.parse(localStorage.getItem("compra"));
    // Si no fue creado, lo creo
    if (!carritoList) {
        carritoList = [];
        localStorage.setItem('compra', JSON.stringify(carritoList));
    }
    //Me aseguro de que si hay peliculas, no este la que voy a agregar
    let peliculaIndex = carritoList.findIndex(x => x.id === p);
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
//Creo una funcion que cierre modal emergente
function cerrar() {
   document.getElementById('modal').style.display='none';
}
$('#cerrarModal').on('click',cerrar)


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

//SUMAR COLUMNA DE TABLA-------------------------------------------------------------------------------------

//Creo funcion que suma e impime ultima fila de la tabla (total)´

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

        //Envio total al local
        let totalCarr= [];
        totalCarr.push(suma)
        localStorage.setItem('total', JSON.stringify(totalCarr))

        //Imprimo total
        let totalImpreso= document.getElementById('total')

        let texTotal= document.createTextNode('$'+suma.toFixed(2))
        totalImpreso.appendChild(texTotal)
        //Agrego boton que finalice compra
        let finalizar= document.getElementById('finalizar')

        let button= document.createElement('button')
        button.setAttribute('class',"btn btn-success")
        button.setAttribute('type','button')
        button.setAttribute('onclick','finalizar')
        button.setAttribute('id',"comprar")
        button.textContent='Finalizar'
        
        finalizar.appendChild(button)


    }

//LLAMO FUNCION CARRITO
let mirar = document.getElementById('verCarro')
mirar.addEventListener('click', verCarro)

Total()




//CREO UNA FUNCION QUE ELIMINE ELEMENTOS DE MI CARRITO

function eliminoPelicula(id) {
    
    let borra=JSON.parse(localStorage.getItem("compra"));
    let prom = confirm('seguro que quieres eliminarla?')
    if (prom == true) {
        if (borra.length != 1 ) {
            let nuevaLista = borra.filter(e=>e.id != id)
            localStorage.setItem("compra",JSON.stringify(nuevaLista))
            //Creo una recarga de elementos del total, para que se actualice con la pagina
            let totalImpreso= document.getElementById('total')
            totalImpreso.textContent='';
            $('#finalizar').empty()
            
            Total()
            $(`#${id}`).hide()
        }else if (borra.length = 1) {
            let nuevaLista = borra.filter(e=>e.id != id)
            localStorage.setItem("compra",JSON.stringify(nuevaLista))
            location.reload()
        }
    }
}
//Creo una funcion que finalice la compra---->Basica tomo datos del ultimo usuario loguado, muestro ventana, pido datos, reseteo carrito
function finalizaCompra() {
    //tomo array de usuario actual
    let usuarioMod= JSON.parse(localStorage.getItem("usuario1"))
    let nombre= usuarioMod[0].username

    //tomo array de total a pagar
    let totalMod= JSON.parse(localStorage.getItem("total"))
    let T= totalMod[0]

    //imprimo Modal pidiendo y mostrando datos
    let divCompra= document.getElementById('modalCompra')

    //boton
    let buttClose=document.createElement('button')
    buttClose.textContent='X'
    buttClose.setAttribute('id',"cerrarModal")
    buttClose.setAttribute('onclick',"cerrar()")
    buttClose.setAttribute('class',"btn btn-danger")
    buttClose.setAttribute('style',"border-radius: 10%;")
    divCompra.appendChild(buttClose)
    //h1
    let h1=document.createElement('h1')
    h1.textContent='Finaliza tu compra'
    divCompra.appendChild(h1)
    //form
    let form=document.createElement('form')
    form.setAttribute('action','')
    form.setAttribute('class','container')
  
    let div= document.createElement('div')
    div.setAttribute('class','mb-3 row')
    form.appendChild(div)
  
    let labelUser= document.createElement('label')
    labelUser.textContent=`${nombre}`
    div.appendChild(labelUser)

    let labelUser2= document.createElement('label')
    labelUser.textContent=`${T}`
    div.appendChild(labelUser2)
  
    let labelT= document.createElement('label')
    labelT.textContent='Tarjeta'
    div.appendChild( labelT)
  
    let inputT= document.createElement('input')
    inputT.setAttribute('type','text')
    inputT.setAttribute('placeholder','xxxx-xxxx-xxxx-xx')
    inputT.setAttribute('id','tarjeta')
    div.appendChild(inputT)
  
    let labelPass= document.createElement('label')
    labelPass.textContent='Código Seg.'
    div.appendChild(labelPass)
  
    let inputPass= document.createElement('input')
    inputPass.setAttribute('type','password')
    inputPass.setAttribute('placeholder','X-X-X')
    div.appendChild(inputPass)
  
    let eye= document.createElement('i')
    eye.setAttribute('class','far fa-eye')
    eye.setAttribute('id','togglePassword')
    div.appendChild(eye)
  
    let botn =document.createElement('button')
    botn.setAttribute('type','button')
    botn.setAttribute('id','botFinalizarCompra')
    botn.textContent='FINALIZAR'
    div.appendChild(botn)


    divCompra.appendChild(form)


}

//Creo una funcion que cierre modal emergente
function cerrar() {
    document.getElementById('modal').style.display='none';
    //evito que se reimprima muchas veces el modal
    location.reload()
  }

  let botFinalizarCompra=document.getElementById('botFinalizarCompra')
  botFinalizarCompra.on('click',cerrar)

function desactivoBoton(id) {
    let inicio = JSON.parse(localStorage.getItem("compra"))
    const resultado = inicio.find( e => e.id === id );
    console.log(resultado)
    if (resultado != null) {
        $(`#${id}`).hide()
    }
}





