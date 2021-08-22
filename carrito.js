//En este caso, el objeto ya venia armado en la Api, as{i que lo que hice fue un carrito donde enviar esos objetos cuando se elijan
//UTILIZO UNA FUNCION QUE ME PERMITA TRAER DE LA API UNA SOLA PELICULA, LA QUE YO ELIJA
//PARA ELLO UTILIZO LA FUNCION DE 'BUSCAR POR ID' QUE POSEE LA API, COLOCO LA ID EN LA CARD IMPRESA Y LA BUSCO 

function adquirir(p) {
    //Primero consulto si hay alguien logueado
    let usersList= JSON.parse(localStorage.getItem("usuarios"))
    //Consulto ultimo logueo
    let usuarioAhora= JSON.parse(localStorage.getItem("usuario1"))
    
    if (!usersList) {
        document.getElementById('modal').style.display='block';
        return console.log('no compras sin logueo')
      }else if(usuarioAhora == 0){
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
function cerrarIn() {
   document.getElementById('modal').style.display='none';
}

$('#cerrarModalIn').on('click',cerrarIn)


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
        button.setAttribute('id',"comprar")
        button.setAttribute('onclick','finalizaCompra()')
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

    //tomo array de total a pagar
    let totalMod= JSON.parse(localStorage.getItem("total"))
    let T= totalMod[0]

    //imprimo Modal pidiendo y mostrando datos
    let divCompra= document.getElementById('modalCompra')
    $('#modalCompra').empty()
    divCompra.style.display='block';

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
    


  
    let inputT= document.createElement('input')
    inputT.setAttribute('type','number')
    inputT.setAttribute('id','numTarjeta')
    inputT.setAttribute('class','form-control m-3')
    inputT.setAttribute('placeholder','xxxx-xxxx-xxxx-xx')
    inputT.setAttribute('id','tarjeta')
    div.appendChild(inputT)
  //-------------------
    let div2=document.createElement('div')
    div2.setAttribute('class','row m-3')
    div.appendChild(div2)

    let labelPass= document.createElement('label')
    labelPass.setAttribute('class','col-6')
    labelPass.textContent='Código Seg.'
    div2.appendChild(labelPass)
  
    let inputPass= document.createElement('input')
    inputPass.setAttribute('class','form-control col-6')
    inputPass.setAttribute('id','codTarjeta')
    inputPass.setAttribute('type','password')
    inputPass.setAttribute('placeholder','X-X-X')
    div2.appendChild(inputPass)

    let div3=document.createElement('div')
    div3.setAttribute('class','row m-3')
    div.appendChild(div3)

    let labelVenc= document.createElement('label')
    labelVenc.setAttribute('class','col-6')
    labelVenc.textContent='Vencimiento'
    div3.appendChild(labelVenc)
  
    let inputVenc= document.createElement('input')
    inputVenc.setAttribute('class','form-control col-6')
    inputVenc.setAttribute('id','vencTarjeta')
    inputVenc.setAttribute('type','number')
    inputVenc.setAttribute('placeholder','XX/XX')
    div3.appendChild(inputVenc)

    let div4= document.createElement('div')
    div4.setAttribute('class','row m-3')
    div.setAttribute('style','font-size: 20px; font-weight: bolder;')
    div4.textContent=`Total a pagar   $${T}`
    div.appendChild(div4)


  
    let botn =document.createElement('button')
    botn.setAttribute('type','button')
    botn.setAttribute('class','btn btn-warning m-3')
    botn.setAttribute('id','botFinalizarCompra')
    botn.setAttribute('onclick','pagar()')
    botn.textContent='PAGAR'
    div.appendChild(botn)

    form.appendChild(div)
    divCompra.appendChild(form)

}
//Funcion al finalizar compra----->básicamente resetea el carrito y cambia lo que se imprime en el modal.
//Se podrían haber colocado condicionales para aceptar el pago, pero preferí poner mas enfasis en otras cosas



function pagar() {

        //tomo array de total a pagar, lo dejo en cero
    let totalMod= JSON.parse(localStorage.getItem("total"))
    let T= totalMod[0]
    T=0;
    localStorage.setItem('total', JSON.stringify(totalMod))
    //tomo array de productos, envio a array de productos ya comprados y vacio array 'compra'
    let productosComprados=[];
    let todo = JSON.parse(localStorage.getItem("compra"))
    //Envio a nuevo array
    productosComprados.push[todo];
    localStorage.setItem('productosComprados', JSON.stringify(productosComprados))
    //vacio
    todo=null;
    localStorage.setItem('compra', JSON.stringify(todo))


    let divCompra= document.getElementById('modalCompra')
    $('#modalCompra').empty()
    divCompra.style.display='block';

    let div=document.createElement('div')
    div.textContent='Gracias por tu compra!'
    divCompra.appendChild(div)


}

//Creo una funcion que cierre modal emergente
function cerrar() {
    document.getElementById('modalCompra').style.display='none';
  }


function desactivoBoton(id) {
    let inicio = JSON.parse(localStorage.getItem("compra"))
    const resultado = inicio.find( e => e.id === id );
    console.log(resultado)
    if (resultado != null) {
        $(`#${id}`).hide()
    }
}




