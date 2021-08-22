class PersonLogueada{
  constructor(username,password){
      this.username = username;
      this.password = password;
  }
}


  function signIn() {
    //Funcion que imprima Sign in
    //Nodo padre
    let logBox=document.getElementById('logBox2')
    
    //Nodos hijos
    //imagen con enlace
    let a= document.createElement('a')
    a.setAttribute('href','../index.html')
  
    let img= document.createElement('img')
    img.setAttribute('class','logologin')
    img.setAttribute('src','../images/pelis.png')
    img.setAttribute('alt','logo')
    a.appendChild(img)
  
    logBox.appendChild(a)
    //h1
    let h1=document.createElement('h1')
    h1.setAttribute('class','contenedor')
    h1.textContent='Sign in!'
    logBox.appendChild(h1)
    //form
    let form=document.createElement('form')
    form.setAttribute('action','')
    form.setAttribute('class','container')
  
    let div= document.createElement('div')
    div.setAttribute('class','mb-3 row')
    form.appendChild(div)
  
    let labelUser= document.createElement('label')
    labelUser.textContent='Username'
    div.appendChild(labelUser)
  
    let inputUser= document.createElement('input')
    inputUser.setAttribute('type','text')
    inputUser.setAttribute('placeholder','Username')
    inputUser.setAttribute('id','username1')
    div.appendChild(inputUser)
  
    let labelPass= document.createElement('label')
    labelPass.textContent='Password'
    div.appendChild(labelPass)
  
    let inputPass= document.createElement('input')
    inputPass.setAttribute('type','password')
    inputPass.setAttribute('placeholder','Password')
    inputPass.setAttribute('id','password1')
    div.appendChild(inputPass)
  
    let eye= document.createElement('i')
    eye.setAttribute('class','far fa-eye')
    eye.setAttribute('id','togglePassword')
    div.appendChild(eye)
  
    let botn =document.createElement('button')
    botn.setAttribute('type','button')
    botn.setAttribute('id','botSing')
    botn.textContent='SIGN IN'
    div.appendChild(botn)

    let logEnlace= document.createElement('a')
    logEnlace.setAttribute('href','./loguin.html')
    logEnlace.setAttribute('id','logEnlace')
    logEnlace.setAttribute('onclick','SignInEnter()')
    logEnlace.textContent='¿No estas registrado?'
    div.appendChild(logEnlace)

    form.appendChild(div)
    logBox.appendChild(form)
  }
  
    
//Funcion para usuarios ya existentes
// SING IN
function SignInEnter() {
  //Tomo valores ingrsados
  let username1 =document.getElementById('username1').value
  let password1= document.getElementById('password1').value
  //veo si hay un registro(si es que hay array de usuarios)
  let usersList= JSON.parse(localStorage.getItem("usuarios"))
  console.log(usersList)
  //si no hay array, detengo y aviso falta de registro
  if (!usersList) {
    return errorModal('No tengo ese usuario registrado')
    //si hay un array, busco valores y comparo
  }else{
    let passIngresada=usersList.find(u=> u.password == password1)
    let userIngresado= usersList.find(u=> u.username== username1)
    if (username1 ==0) {
      return errorModal('Datos faltantes...')
   
     }else if (passIngresada = undefined) {
       return errorModal('password no coincide')
   
     }else if(userIngresado == undefined){
       return errorModal('username no coincide')
   
     }else{
       
       //tomo array de usuario actual para actualizarlo
       let usuarioAhora= JSON.parse(localStorage.getItem("usuarios1"))
       let usuario1 = new PersonLogueada (username1,password1);
       usuarioAhora.push(usuario1)
       localStorage.setItem('usuarios1', JSON.stringify(usuario1))
       //Doy respuesta
       return respModal('Bienvenido')
     } 

  }
  
}



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
  h4.textContent=`${resp}`
  div.appendChild(h4)

  let hr=document.createElement('hr')
  div.appendChild(hr)

  let p=document.createElement('p')
  p.textContent='Que bien verte de nuevo'
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


    
  //Por defecto----------------------------------------

  signIn()


  
//Funcionalidades del formulario
//EYE!
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password1');
togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  // toggle the eye / eye slash icon
  this.classList.toggle('bi-eye');
});

  //ENTER!

function ingresoRapido1(event) {
  if (event.keyCode == 13) {
    SignInEnter()
  }
}
document.getElementById('username1').addEventListener('keydown', ingresoRapido1)
document.getElementById('password1').addEventListener('keydown', ingresoRapido1)

//Boton de sign in
let sign= document.getElementById('botSing')
sign.addEventListener('click', SignInEnter)