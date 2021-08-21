//Creo objeto de usuario/Cliente
class Person{
    constructor(username,email,password){
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
//Aqui creare un array que ira cambiando conforme se ingrese a la "plataforma",deseo que solo tenga el usuario loguado(1 objeto)
let usuarioActual=[];
localStorage.setItem('usuario1',JSON.stringify(usuarioActual))



function logueo() {
  let username1 =document.getElementById('username').value
  let email1= document.getElementById('email').value
  let password1= document.getElementById('password').value
  
  //tomo array de usuario actual
  let usuarioActual= JSON.parse(localStorage.getItem("usuario1"))



  //Me adelanto con validacion de email
  var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  var validEmail= expReg.test(email1) 
 

  //veo si hay registro de log in
  let usersList= JSON.parse(localStorage.getItem("usuarios"))
  //Si no hay registros---> creo array de registro
  if (!usersList) {
    usersList=[];
    localStorage.setItem('usuarios',JSON.stringify(usersList))
  }
  //Quiero saber si ya existe el usuario, en caso de que el array no sea nulo(Condicionales)
      if(username1== 0 && email1 == 0){
        return console.log('no hay data suficiente')
      }
      else if (localStorage.getItem('usuarios') != null) {
      let usersListfilter= JSON.parse(localStorage.getItem("usuarios"))
      if (usersListfilter.find(u=> u.username== username1)) {
        return errorModal('No es posible loguear, ya existe este usuario')

      }else if(usersListfilter.find(u=> u.email== email1)){
        return errorModal('No es posible, este email está registrado')

      }else if (validEmail != true) {
        return errorModal('No es posible, email erroneo')

      }else if (password1== 0) {
        return errorModal('No es posible, contraseña no valida')

      }else if (password1.length <= 6) {
        return errorModal('No es posible, contraseña no valida')
      }
      
       //Si esta vacio inicializo el array--> Primer  push
      else if (localStorage.getItem('usuarios') == null) {
        localStorage.clear()
        let usuario = new Person (username1,email1,password1);
        //pusheo como unico usuario presente
        usuarioActual.push(usuario)
        localStorage.setItem('usuarios1', JSON.stringify(usuarioActual))
        //registro de usuarioss
        usersList.push(usuario)
        localStorage.setItem('usuarios', JSON.stringify(usersList))
        respModal('Registro exitoso, bienvenido!')
      }else{
        //Si cumple las condiciones, se pushea el nuevo usuario al array
        let usuario = new Person (username1,email1,password1);

        //pusheo como unico usuario presente
        usuarioActual.push(usuario)
        localStorage.setItem('usuarios1', JSON.stringify(usuarioActual))

        //registro de usuarioss
        usersList.push(usuario)
        localStorage.setItem('usuarios', JSON.stringify(usersList))
        respModal('Registro exitoso, bienvenido!')
      }
  }}




//DEFINIMOS  UNA FUNCION MODAL ERROR
function errorModal(errorCorrespondiente) {
  //Nodo padre
  let div= document.getElementById('modal')
  div.style.display='block'
  //Nodo hijo
  let buttClose=document.createElement('button')
  buttClose.textContent='X'
  buttClose.setAttribute('id',"cerrarModal")
  buttClose.setAttribute('onclick',"cerrar()")
  buttClose.setAttribute('class',"btn btn-danger")
  buttClose.setAttribute('style',"border-radius: 10%;")
  div.appendChild(buttClose)

  let h4=document.createElement('h4')
  h4.textContent='Algo salió mal'
  div.appendChild(h4)

  let hr=document.createElement('hr')
  div.appendChild(hr)

  let p=document.createElement('p')
  p.textContent=`${errorCorrespondiente}`
  div.appendChild(p)
}

//DEFINIMOS  UNA FUNCION MODAL RESPUESTA(cuando hay exito)
function respModal(resp) {
  //Nodo padre
  let div= document.getElementById('modal')
  div.style.display='block'
  //Nodo hijo
  let buttClose=document.createElement('button')
  buttClose.textContent='X'
  buttClose.setAttribute('id',"cerrarModal")
  buttClose.setAttribute('onclick',"cerrar()")
  buttClose.setAttribute('class',"btn btn-danger")
  buttClose.setAttribute('style',"border-radius: 10%;")
  div.appendChild(buttClose)

  let h4=document.createElement('h4')
  h4.textContent='¡Genial!'
  div.appendChild(h4)

  let hr=document.createElement('hr')
  div.appendChild(hr)

  let p=document.createElement('p')
  p.textContent=`${resp}`
  div.appendChild(p)

  let a = document.createElement('a')
  a.setAttribute('href','../index.html')
  a.textContent='Vuelve a ver nuestro catálogo'
  div.appendChild(a)
}

//Creo una funcion que cierre modal emergente
function cerrar() {
  document.getElementById('modal').style.display='none';
  //evito que se reimprima muchas veces el modal
  location.reload()
}
$('#cerrarModal').on('click',cerrar)


//Funcionalidades del formulario
//EYE!
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  // toggle the eye / eye slash icon
  this.classList.toggle('bi-eye');
});

//ENTER!

function ingresoRapido(event) {
  if (event.keyCode == 13) {
    logueo()
  }
}
document.getElementById('username').addEventListener('keydown', ingresoRapido)
document.getElementById('email').addEventListener('keydown', ingresoRapido)
document.getElementById('password').addEventListener('keydown', ingresoRapido)
//boton de log in
let bot=document.getElementById('bot')
bot.addEventListener('click',logueo)