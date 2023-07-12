//alert("Pruebas")
// let seguirJugando = false

// let newPlayer = ""

// let newAvatar = ""

let boardSize = 3;
let extraText = ""
let newAvatar = ""
let newPlayer = ""
let seguirJugando = false
let valorEje = 0
let txt = document.querySelector('p')

const pieza = {
    claseDePieza: "piezaBase",
    posicionX: 0,
    posicionY: 0,

    set nuevaPosicionX(x) {
        this.posicionX = this.posicionX + x
    },

    set nuevaPosicionY(y) {
        this.posicionY = this.posicionY + y
    }
}

const AVATARES = [
    {
        avatar: "charmander",
        tipo: "fuego",
        imagen: "img/charmander.png",
    },
    {
        avatar: "squirtle",
        tipo: "agua",
        imagen: "img/squirtle.png",
    },
    {
        avatar: "bulbasaur",
        tipo: "planta",
        imagen: "img/bulbasaur.png",
    },
    {
        avatar: "pikachu",
        tipo: "electrico",
        imagen: "img/pikachu.png",
    },
    {
        avatar: "eevee",
        tipo: "normal",
        imagen: "img/eevee.png",
    },
    {
        avatar: "mew",
        tipo: "psiquico",
        imagen: "img/mew.png",
    }
]

let index = 0
let textoParaImprimir = ""
for(let name of AVATARES){
    textoParaImprimir = textoParaImprimir + `${index+1} - ${AVATARES[index].avatar}\r\n`;
    index++
} 

function nuevoJuego(){
    extraText = ""
    newAvatar = ""
    newPlayer = ""
    seguirJugando = false
    valorEje = 0
    elegirAvatar()
}

function moverSiPuedeMover(eje,paso){
    if (eje == "y"){
        valorEje = pieza.posicionY
        if (0 <= valorEje + paso && valorEje + paso < boardSize){
            pieza.nuevaPosicionY = paso
        }else{
            console.log("Lo siento, la pieza no puede salir del tablero")
            alert("La pieza no puede salir del tablero! Inténtelo nuevamente!")
        }
    }else{
        valorEje = pieza.posicionX
        if (0 <= valorEje + paso && valorEje + paso < boardSize){
            pieza.nuevaPosicionX = paso
        }else{
            console.log("Lo siento, la pieza no puede salir del tablero")
            alert("La pieza no puede salir del tablero! Inténtelo nuevamente!")
        }
    }

    
}

function imprimirAvatar(imagenElegido,avatarElegido){
    // No pude arreglar la imagen
    // document.write("<div class='card'><img src='" + imagenElegido + "' alt='" + avatarElegido + "'></div>")
}

function colocarNuevaPieza(){
    alert("En construcción.....")
}

function elegirAvatar(){

    while (newPlayer==""){
        newPlayer = prompt("Escriba el nombre del nuevo jugador:")
        if (newPlayer != ""){
            txt.textContent = "Bienvenido " + newPlayer + "!!" 
            console.log("> Colocando pieza en (" + pieza.posicionX + "," + pieza.posicionY + ")");
            console.log("> Tamaño del tablero: " + boardSize + "x" + boardSize)
            alert("Hola " + newPlayer + "!\nPresione iniciar Juego, para comenzar!")
        }
    }
    if (newAvatar == ""){
        let newAvatar = Number(prompt("Eliga nuevo avatar:\r\n"+textoParaImprimir))
        let imagenElegido = AVATARES[newAvatar-1].imagen
        let avatarElegido = AVATARES[newAvatar-1].avatar
        console.log(`Avatar elegido: ${avatarElegido}`)
        imprimirAvatar(imagenElegido,avatarElegido)
    } else {
        alert("Ya eligio un avatar. Si quiere comenzar de nuevo, presione 'Nuevo Juego")
    }
}


function moverPieza(mov){

    if (mov === "arriba"){
        moverSiPuedeMover("y",1)
    }else if (mov === "abajo"){
        moverSiPuedeMover("y",-1)
    }else if (mov === "derecha"){
        moverSiPuedeMover("x",1)
    }else if (mov === "izquierda"){
        moverSiPuedeMover("x",-1)
    }else if (mov === "salir"){
        seguirJugando = finishGame()
    }else{
        alert("Movimiento incorrecto!\nPara moverse escriba: 'izquierda','derecha','arriba' o 'abajo'\nSi desea dejar de moverse, escriba 'salir'.")
    }
    console.log("> Posición actual de la pieza: (" + pieza.posicionX + "," + pieza.posicionY + ")")
}

function finishGame(){
    console.log("> Finalizando juego")
    let finish = false;
    newPlayer = "";
    pieza.posicionX = 0;
    pieza.posicionY = 0;
    return finish
}

function startGame(){
    seguirJugando = true;
    console.log("> Iniciando juego")
    while (seguirJugando){
        let mov = prompt("Pieza colocada en la posición: (" + pieza.posicionX + "," + pieza.posicionY + ")" + "\nHacia donde quiere mover la pieza?")
        extraText = ""
        if (mov.toLowerCase() != "salir"){
            console.log("Mover pieza hacia: " + mov)
        }
        moverPieza(mov.toLowerCase())
    }
}
