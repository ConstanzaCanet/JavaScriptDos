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
  if (localStorage.getItem('usuarios') != null) {
      let usersListfilter= JSON.parse(localStorage.getItem("usuarios"))
      if (usersListfilter.find(u=> u.username== username1)) {
        return console.log('no es posible loguear ya existe este usuario')

      }else if(usersListfilter.find(u=> u.email== email1)){
        return console.log('no es posible loguear ya existe este email')

      }else if (validEmail != true) {
        return console.log('no es posible email erroneo')

      }else if (password.length < 6) {
        return console.log('no es posible contraseña no valida')



      }else if (localStorage.getItem('usuarios') == null) {
          //Si esta vacio inicializo el array--> Primer  push
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
  }}

document.getElementById('bot').addEventListener('click',logueo)


//Funcion para usuarios ya existentes
// SING IN
function SignInEnter() {
  let username1 =document.getElementById('username').value
  let email1= document.getElementById('email').value
  let password1= document.getElementById('password').value

  let usersList= JSON.parse(localStorage.getItem("usuarios"))

  if (usersListfilter.find(u=> u.email!= email1)) {
    alert('email no coincide')
  }else if (usersListfilter.find(u=> u.username!= username1)) {
    alert('username no coincide')
  }else if(usersListfilter.find(u=> u.password!= password1))
  alert('password no coincide')
}



function LogIn() {
  //Funcion que imprima login
}

function signIn() {
  //Funcion que imprima Sign in
}



/*
//defino array
let personas=[];
//defino local storage



function Saluda() {
  
    let namePerson = document.getElementById("nombre").value
    let lastName= document.getElementById("apellido").value
    let email = document.getElementById("email").value
    let pasword = document.getElementById("pasword").value
   
    let grupo= JSON.parse(localStorage.getItem('personas'))

    if (namePerson == 0 || email == 0) {
      let conte2 = document.getElementsByClassName('Salud');
      let saludando= document.createElement('p');
      saludando.textContent = `No se pudo registrar! Faltan datos`
      return conte2[0].appendChild(saludando)
    } else if (lastName == 0 || pasword ==0) {
      let conte2 = document.getElementsByClassName('Salud');
      let saludando= document.createElement('p');
      saludando.textContent = `No se pudo registrar! Faltan datos`
      return conte2[0].appendChild(saludando)
    }else if (pasword.length < 6) {
      let conte2 = document.getElementsByClassName('Salud');
      let saludando= document.createElement('p');
      saludando.textContent = `No se pudo registrar! La contraseña es insuficiente`
      return conte2[0].appendChild(saludando)
      //Condicional y Storage
    }else if (localStorage.getItem('personas') != null) {
      let usuario = new Person (namePerson,lastName,email,pasword);
      grupo.push(usuario)
      localStorage.setItem('personas', JSON.stringify(grupo))
    }else{
      localStorage.clear()
      let usuario = new Person (namePerson,lastName,email,pasword);
      personas.push(usuario)
      localStorage.setItem('personas', JSON.stringify(personas))
    }{
      let conte2 = document.getElementsByClassName('Salud');
      let saludando= document.createElement('p');
      saludando.textContent = `Exelente! Ya te encuentras logueado, tu nombre es ${namePerson} ${lastName} y registraste tu email: ${email}`
      conte2[0].appendChild(saludando)
    }

    
  console.log(personas)
  }
  
  
  
  let boton= document.getElementById("bot")
  boton.addEventListener("click", Saluda)


  //Pruebo local storage
  function veoveo() {
    let pelis = localStorage.getItem("movie")
    const peliculas = JSON.parse(pelis)
    console.log(peliculas)
  }
  
  veoveo()
*/