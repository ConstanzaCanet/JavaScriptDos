//Creo objeto de usuario/Cliente
class Person{
    constructor(username,email,pasword){
        this.username = username;
        this.email = email;
        this.pasword = pasword;
    }
}


function logueo() {
  let username1 =document.getElementById('username').value
  let email1= document.getElementById('email').value
  let password1= document.getElementById('password').value
  
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
        return console.log('no es posible loguear ya existe este usuario')

      }else if(usersListfilter.find(u=> u.email== email1)){
        return console.log('no es posible loguear ya existe este email')

      }else if (validEmail != true) {
        return console.log('no es posible email erroneo')

      }else if (password1.length <= 6 && password1== 0) {
        return console.log('no es posible contraseña no valida')

      }else if (password1.length <= 6) {
        return console.log('no es posible contraseña no valida')

      }
       //Si esta vacio inicializo el array--> Primer  push
      else if (localStorage.getItem('usuarios') == null) {
        localStorage.clear()
        let usuario = new Person (username1,email1,password1);
        usersList.push(usuario)
        localStorage.setItem('usuarios', JSON.stringify(usersList))
      }else{
            //Si cumple las condiciones, se pushea el nuevo usuario al array
            let usuario = new Person (username1,email1,password1);
            usersList.push(usuario)
             localStorage.setItem('usuarios', JSON.stringify(usersList))
      }
      //Cuidado aqui se tiene que imprimir lo que corresponda
      location.reload()
  }}






//DEFINIMOS  UNA FUNCION MODAL ERROR
function errorModal(params) {
  
}




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