import Player from "./players.js";
import Pieza from "./piezas.js";

let selectedBoard;
let jugadores;
let playerOne;
var jugadorUnoGuardadoEnJson
let playerTwo;
let jugadorDosGuardadoEnJson;

const btnWelcome = document.querySelector("#btn-welcome");
const btnStart = document.querySelector("#btn-start");
const btnInitial = document.querySelector("#btn-initial")
const btnInfo = document.querySelector("#btn-info");
const btnReStart = document.querySelector("#btn-restart");
const playerSetupBox = document.querySelector("#player-setup-box");
const boardSelector = document.querySelector("#board-selector");
const playBox = document.querySelector("#play-box")

if (playBox){
    const celdas = document.querySelectorAll(".cuadrado")
    celdas.forEach(element => {
        console.log(element.id)
    });
}

if (boardSelector){
    let select = document.getElementById("selector")
    select.addEventListener("change",()=>{selectedBoard = select.value})
}

function setCat(player,val,data){
    const index = player.catID
    if(index+val>0 && index+val<11){
        player.catID = index + val
        player.catName = data[index + val].name
        player.catImg = data[index + val].dir_img
        player.render()
    }
}

async function getCats(){
    try{
        const res = await fetch(`../data/cats.json`)
        const data = await res.json()
        return data
    }catch(err){
        swal(err)
    }
}

async function actualizarImagen(player,val){
    const catData = await getCats()
    setCat(player,val,catData)
}

async function cargarDatosGuardadosLocalmente(){
    const datosUno = JSON.parse(localStorage.getItem("jugadorUno"))
    if(datosUno){
        document.querySelector(`#${datosUno.divIDsetup} #player-name`).placeholder = datosUno.name
        jugadorUnoGuardadoEnJson = new Player(datosUno.name,datosUno.catID,datosUno.catImg,datosUno.catName,datosUno.divIDsetup,datosUno.divIDplayer)
    }else{
        document.querySelector("#player-one-setup #player-name").placeholder = "jugador uno"
        jugadorUnoGuardadoEnJson = new Player("jugadorUno",1,"black_cat.png","kuro","player-one-setup","left-side")
    }
    
    const datosDos = JSON.parse(localStorage.getItem("jugadorDos"))
    if(datosDos){
        document.querySelector(`#${datosDos.divIDsetup} #player-name`).placeholder = datosDos.name
        jugadorDosGuardadoEnJson = new Player(datosDos.name,datosDos.catID,datosDos.catImg,datosDos.catName,datosDos.divIDsetup,datosDos.divIDplayer)
    }else{
        document.querySelector("#player-two-setup #player-name").placeholder = "jugador dos"
        jugadorDosGuardadoEnJson = new Player("jugadorDos",1,"black_cat.png","kuro","player-two-setup","right-side")
    }

    return {jugadorUnoGuardadoEnJson,jugadorDosGuardadoEnJson}
}

if (playerSetupBox){
    jugadores = await cargarDatosGuardadosLocalmente()

    playerOne = jugadores.jugadorUnoGuardadoEnJson
    playerTwo = jugadores.jugadorDosGuardadoEnJson

    const loadNext = document.querySelectorAll("#btn-next")
    const loadPrev = document.querySelectorAll("#btn-prev")
    loadPrev[0].addEventListener("click", async()=>{
        actualizarImagen(playerOne,-1)
    })
    loadNext[0].addEventListener("click", async()=>{
        actualizarImagen(playerOne,1)
    })
    loadPrev[1].addEventListener("click", async()=>{
        actualizarImagen(playerTwo,-1)
    })
    loadNext[1].addEventListener("click", async()=>{
        actualizarImagen(playerTwo,1)
    })
}

if (btnReStart){btnReStart.addEventListener("click",reiniciarJuego)}
if (btnInfo){btnInfo.addEventListener("click",mostrarInfo)}
if (btnInitial){btnInitial.addEventListener("click",volverPaginaInicio)}
if (btnStart){btnStart.addEventListener("click",iniciarJuego)}
if (btnWelcome){
    swal("Bienvenidos al cascarón de un juego!!","Para comenzar con el juego, siga los siguientes pasos:\r\nPaso 1: Elija el nombre de los jugadores\r\nPaso 2: Elija el gato de mascota que más le guste\r\nPaso 3: Elija el tamaño del trablero\r\nPaso 4: Presionar botón 'Iniciar Juego'")
    btnWelcome.addEventListener("click",mostrarPaginaPrincipal)
}


async function guardarJugadoresEnLocalStorage(jugadorUno,jugadorDos){
    localStorage.setItem("jugadorUno", JSON.stringify(jugadorUno))
    localStorage.setItem("jugadorDos", JSON.stringify(jugadorDos))
}

async function iniciarJuego(){
    playerOne.name = document.querySelector(`#${playerOne.divIDsetup} #player-name`).value || "bot-jugadorUno"
    playerTwo.name = document.querySelector(`#${playerTwo.divIDsetup} #player-name`).value || "bot-jugadorDos"
    
    if(playerOne.catID === playerTwo.catID){
        document.querySelector("#player-two-setup img").setAttribute('class',"card_copia")
    }
    
    await guardarJugadoresEnLocalStorage(playerOne,playerTwo)

    if(selectedBoard==="tablero1"){
        location.href = "../pages/tablero3x3.html"
    }else if(selectedBoard==="tablero2"){
        location.href = "../pages/tablero4x5.html"
    }else if(selectedBoard==="tablero3"){
        location.href = "../pages/tablero5x7.html"
    }else if(selectedBoard==="tablero4"){
        location.href = "../pages/tablero8x9.html"
    }

}

function reiniciarJuego(){
    localStorage.removeItem("jugadorUno")
    localStorage.removeItem("jugadorDos")
    location.href = "../index.html"
}

function volverPaginaInicio(){
    if (playerSetupBox){
        reiniciarJuego()
    }else{
        location.href = "./inicio.html"
    }
}

function mostrarInfo(){
    swal("Reglas!", "Este es un juego por turnos.\r\nEn tu turno, selecciona una celda vacía del tablero donde deseas colocar tu pieza.\r\nEn caso de que alrededor de la pieza colocada, haya piezas del rival, estas se alejaran por una posición de la pieza colocada.\r\nSi logras poner 3 piezas normales tuyas en línea (ya sea vertical, horizontal o diagonal), las 3 se reemplazarán por una pieza mayor.\r\nEl juego termina cuando tú o tu rival formen una línea de 3 piezas mayores.\r\n\r\nBuena suerte!!")
}

function mostrarPaginaPrincipal(){
    location.href = "./pages/inicio.html";
}

// const pieza1 = new Pieza("normal",[1,2])
// const pieza2 = new Pieza("normal",[2,2])
// const pieza3 = new Pieza("normal",[1,3])
// playerOne.agregarPieza(pieza1)
// playerOne.agregarPieza(pieza2)
// playerOne.agregarPieza(pieza3)
// playerOne.eliminarPieza(pieza2)
// playerOne.eliminarPieza(pieza1)
// console.log(playerOne)
// fetch('../cats.json')
//     .then((response) => {
//         return response.json()
//     })
//     .then((json) => console.log(json))
//     .catch((err) => {
//         swal("Error",`${err}`,"error")
//     })


