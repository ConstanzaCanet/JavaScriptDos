//Cree este archivo para tener diferencia a la hora de seleccionar log in o sing in
// Lo hice aparte del archivo original de  loguin(mal escrito) poque me daban errores al enlazarlo al index

function impressLogIn() {
    //Funcion que imprima login
    //Nodo padre
    let logBox=document.getElementById('logBox1')
    document.getElementById('logBox1').textContent=''
    
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
    h1.textContent='Login!'
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
    inputUser.setAttribute('id','username')
    div.appendChild(inputUser)
  
    let labelEmail= document.createElement('label')
    labelEmail.textContent='Email'
    div.appendChild(labelEmail)
  
    let inputEmail= document.createElement('input')
    inputEmail.setAttribute('type','email')
    inputEmail.setAttribute('placeholder','Email')
    inputEmail.setAttribute('id','email')
    div.appendChild(inputEmail)
  
    let labelPass= document.createElement('label')
    labelPass.textContent='Password'
    div.appendChild(labelPass)
  
    let inputPass= document.createElement('input')
    inputPass.setAttribute('type','password')
    inputPass.setAttribute('placeholder','Password')
    inputPass.setAttribute('id','password')
    div.appendChild(inputPass)
  
    let eye= document.createElement('i')
    eye.setAttribute('class','far fa-eye')
    eye.setAttribute('id','togglePassword')
    div.appendChild(eye)
  
    let botn =document.createElement('button')
    botn.setAttribute('type','button')
    botn.setAttribute('id','bot')
    botn.textContent='LOGIN'
    div.appendChild(botn)

    let signEnlace= document.createElement('a')
    signEnlace.setAttribute('href','../logueo/signin.html')
    signEnlace.setAttribute('id','signEnlace')
    signEnlace.textContent='¿Ya eres usuario?'
    div.appendChild(signEnlace)

    form.appendChild(div)
    logBox.appendChild(form)
    
  }




