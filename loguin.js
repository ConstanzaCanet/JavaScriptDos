

//PRESENTO TAREA DE EVENTOS
//RETO DE LA CLASE(LO DEJO PARA CORRECCION):
class Person{
    constructor(namePerson, lastName, pasword, email, cart){
        this.namePerson = namePerson;
        this.lastName = lastName;
        this.pasword = pasword;
        this.email = email;
        this.cart = cart;
    }
}  
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
