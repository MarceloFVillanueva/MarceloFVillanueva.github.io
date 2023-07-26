const contenido = document.querySelector('.flex-content')
const cajaNombres = document.querySelector('.initial-box')
const lateralIzquierdo = document.querySelector('.left-side')
const lateralDerecho = document.querySelector('.right-side')
const btnInicial = document.querySelector('.initial-btn')
btnInicial.addEventListener('click',iniciarJuego)
const btnFinal = document.querySelector('.finish-btn')
btnFinal.addEventListener('click',empezarDeNuevo)
const nombreJugadorUnoGuardadoEnJson = JSON.parse(localStorage.getItem("nombreJugadorUno")) || "jugador uno"
document.getElementById('nombre-jugador1').placeholder=nombreJugadorUnoGuardadoEnJson
const nombreJugadorDosGuardadoEnJson = JSON.parse(localStorage.getItem("nombreJugadorDos")) || "jugador dos"
document.getElementById('nombre-jugador2').placeholder=nombreJugadorDosGuardadoEnJson

class Jugador{
    constructor(name,chosenAvatar){
        this.nombre = name,
        this.avatar = chosenAvatar
        this.piezas = []
    }
    agregarPieza(pieza){
        this.piezas.append(pieza)
    }
    eliminarPieza(pieza){
        console.log("Eliminando Piezas")
    }
}

class Pieza{
    constructor(typeOfPiece,positionXY){
        this.tipoDePieza = typeOfPiece,
        this.posicionXY = positionXY
    }
    nuevaPosicionX(x){
        this.posicionXY[0] = this.posicionXY[0] + x
    }
    nuevaPosicionY(y){
        this.posicionXY[1] = this.posicionXY[1] + y
    }
}

function iniciarJuego(){
    const nameJugadorUno = document.getElementById('nombre-jugador1').value || "bot-jugadorUno"
    const nameJugadorDos = document.getElementById('nombre-jugador2').value || "bot-jugadorDos"
    contenido.removeChild(cajaNombres)
    const jugadorUno = crearJugador(nameJugadorUno);
    lateralIzquierdo.innerHTML=`<h2>${nameJugadorUno}</h2>`
    const jugadorDos = crearJugador(nameJugadorDos);
    lateralDerecho.innerHTML=`<h2>${nameJugadorDos}</h2>`
    guardarJugadoresEnLocalStorage(jugadorUno,jugadorDos)
    crearTablero()
}

function crearJugador(name){
    let avatar = elegirAvatar() || "black_cat.png"
    let jugador = new Jugador(name,avatar)
    console.log(jugador)
    return jugador
}

function elegirAvatar(){
    console.log("imprimir selección de personajes para elegir")
}

function crearTablero(){
    contenido.innerHTML =`
    <div class="tablero">
        <div class="fila">
            <div id="00" class="cuadrado"></div>
            <div id="10" class="cuadrado"></div>
            <div id="20" class="cuadrado"></div>
        </div>
        <div class="fila">
            <div id="01" class="cuadrado"></div>
            <div id="11" class="cuadrado"></div>
            <div id="21" class="cuadrado"></div>
        </div>
        <div class="fila">
            <div id="02" class="cuadrado"></div>
            <div id="12" class="cuadrado"></div>
            <div id="22" class="cuadrado"></div>
        </div>
    </div>
    `
}

function empezarDeNuevo(){
    const tablero = document.querySelector('.tablero')
    contenido.removeChild(tablero)
    console.log("reiniciar juego")
}

function guardarJugadoresEnLocalStorage(jugadorUno,jugadorDos){
    localStorage.setItem("nombreJugadorUno", JSON.stringify(jugadorUno.nombre))
    localStorage.setItem("jugadorUno", JSON.stringify(jugadorUno))
    localStorage.setItem("nombreJugadorDos", JSON.stringify(jugadorDos.nombre))
    localStorage.setItem("jugadorDos", JSON.stringify(jugadorDos))
}
