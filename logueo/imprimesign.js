
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

  let usersList= JSON.parse(localStorage.getItem("usuarios"))

 if (usersList.find(u=> u.username!= username1)) {
    return alert('username no coincide')
  }else if(usersList.find(u=> u.password!= password1))
  return alert('password no coincide')
}
//boton en archivo sign


    
  //Por defecto----------------------------------------

  signIn()
  //ENTER!

function ingresoRapido1(event) {
  if (event.keyCode == 13) {
    SignInEnter()
  }
}
document.getElementById('username1').addEventListener('keydown', ingresoRapido1)
document.getElementById('password1').addEventListener('keydown', ingresoRapido1)