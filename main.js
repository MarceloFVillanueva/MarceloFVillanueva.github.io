//alert("Pruebas")
let seguirJugando = false

let newPlayer = ""


const BOARDSIZE = 3;

let extra_text = ""

let position ={
    x:0,
    y:0
}

var txt = document.querySelector('p')

var btn = document.querySelector('button')
btn.addEventListener('click',startGame)

function moverSiPuedeMover(eje,paso){
    if (0 <= eje + paso && eje + paso < BOARDSIZE){
        eje = eje + paso
    }else{
        console.log("Lo siento, la pieza no puede salir del tablero")
        alert("La pieza no puede salir del tablero! Inténtelo nuevamente!")
    }
    return eje
}

function moverPieza(mov){
    let nuevaPosicion = {
        x:position.x,
        y:position.y
    }

    if (mov === "arriba"){
        position.y = moverSiPuedeMover(nuevaPosicion.y,1)
    }else if (mov === "abajo"){
        position.y = moverSiPuedeMover(nuevaPosicion.y,-1)
    }else if (mov === "derecha"){
        position.x = moverSiPuedeMover(nuevaPosicion.x,1)
    }else if (mov === "izquierda"){
        position.x = moverSiPuedeMover(nuevaPosicion.x,-1)
    }else if (mov === "salir"){
        seguirJugando = finishGame()
    }else{
        alert("Movimiento incorrecto!\nPara moverse escriba: 'izquierda','derecha','arriba' o 'abajo'\nSi desea dejar de moverse, escriba 'salir'.")
    }
    console.log("> Posición actual de la pieza: (" + position.x + "," + position.y + ")")
}

function finishGame(){
    console.log("> Finalizando juego")
    let finish = false;
    newPlayer = "";
    position.x = 0;
    position.y = 0;
    return finish
}

function startGame(){
    seguirJugando = true;
    console.log("> Iniciando juego")
    while (seguirJugando){
        let mov = prompt("Pieza colocada en la posición: (" + position.x + "," + position.y + ")" + "\nHacia donde quiere mover la pieza?")
        extra_text = ""
        if (mov.toLowerCase() != "salir"){
            console.log("Mover pieza hacia: " + mov)
        }
        moverPieza(mov.toLowerCase())
    }    
}

while (newPlayer==""){
    newPlayer = prompt("Escriba el nombre del nuevo jugador:")
    if (newPlayer != ""){
        txt.textContent = "Bienvenido " + newPlayer + "!!" 
        console.log("> Colocando pieza en (" + position.x + "," + position.y + ")");
        console.log("> Tamaño del tablero: " + BOARDSIZE + "x" + BOARDSIZE)
        alert("Hola " + newPlayer + "!\nPresione iniciar Juego, para comenzar!")
    }
}