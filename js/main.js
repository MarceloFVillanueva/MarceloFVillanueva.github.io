import Player from "./players.js";

let selectedBoard;
let playerOne;
let playerTwo;
let turno = 0;

const btnWelcome = document.querySelector("#btn-welcome");
const btnStart = document.querySelector("#btn-start");
const btnInitial = document.querySelector("#btn-initial")
const btnInfo = document.querySelector("#btn-info");
const btnReStart = document.querySelector("#btn-restart");
const playerSetupBox = document.querySelector("#player-setup-box");
const boardSelector = document.querySelector("#board-selector");
const playBox = document.querySelector("#play-box")
const titulo = document.querySelector(".header")
const tablero = document.querySelector(".tablero")

window.agregarImagen = agregarImagen

async function agregarImagen(divIDtablero){
    const celda = document.querySelector(`#${divIDtablero}`)
    let imgToAdd;
    let classToAdd;
    let divPoint;
    let amountPieces;
    let tittle;
    if(tablero){
        if (turno%2==0){
            imgToAdd = playerOne.catImg
            classToAdd = playerOne.classImg
            divPoint = playerOne.divID
            playerOne.addPiece(divIDtablero)
            amountPieces = playerOne.piezas.length
            tittle = `<h1>Turno de: ${playerTwo.name}</h1>`
            console.log(playerOne)
        }else{
            imgToAdd = playerTwo.catImg
            classToAdd = playerTwo.classImg
            divPoint = playerTwo.divID
            playerTwo.addPiece(divIDtablero)
            amountPieces = playerTwo.piezas.length
            tittle = `<h1>Turno de: ${playerOne.name}</h1>`
            console.log(playerTwo)
        }
        turno+=1
    }
    celda.innerHTML = `    
    <div>
        <img src="../img/${imgToAdd}" alt="" class="${classToAdd}">
    </div>
    `
    document.querySelector(`#${divPoint} #player-pieces p`).textContent = amountPieces

    titulo.innerHTML = tittle
}

function completarDatosJugador(player){
    document.querySelector(`#${player.divID} #player-name`).innerHTML = `<h2>Nombre del jugador</h2><p>${player.name}</p>`
    document.querySelector(`#${player.divID} #player-pieces`).innerHTML = `<h2>cantidad de piezas en el tablero</h2><p>${player.piezas.length}</p>`
}

if (playBox){
    playerOne = await cargarDatosGuardadosLocalmente("jugadorUno","left-side")
    playerTwo = await cargarDatosGuardadosLocalmente("jugadorDos","right-side")

    titulo.innerHTML = `<h1>Turno de: ${playerOne.name}</h1>`

    if(playerOne.catID === playerTwo.catID){
        const imgClass = document.querySelector("#right-side #character-image-container")
        imgClass.setAttribute("class","card_copia")
        playerTwo.classImg = "card_copia"
        await guardarJugadoresEnLocalStorage(playerOne,playerTwo)
    }

    completarDatosJugador(playerOne)
    completarDatosJugador(playerTwo)
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

async function cargarDatosGuardadosLocalmente(player,divIDs){
    const datos = JSON.parse(localStorage.getItem(player))
    let jugadorGuardadoEnJson;
    if(datos){
        if(playerSetupBox){
            console.log(playerSetupBox)
            document.querySelector(`#${divIDs} #player-name`).placeholder = datos.name
        }
        jugadorGuardadoEnJson = new Player(datos.name,datos.catID,datos.catImg,datos.catName,divIDs,datos.classImg)
    }else{
        if(playerSetupBox){
            document.querySelector(`#${divIDs} #player-name`).placeholder = player
        }
        jugadorGuardadoEnJson = new Player(player,1,"black_cat.png","kuro",divIDs,"card")
    }
    return jugadorGuardadoEnJson
}

if (playerSetupBox){
    playerOne = await cargarDatosGuardadosLocalmente("jugadorUno","player-one-setup")
    playerTwo = await cargarDatosGuardadosLocalmente("jugadorDos","player-two-setup")

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
    swal("Bienvenidos al cascarón de un juego!!","Al comenzar, se puede:\r\n* Elegir pieza con que jugar\r\n* Elegir el nombre que deseas para jugar\r\n* Elegir tamaño del tablero\r\nAl iniciar el juego, se puede:\r\n* Colocar piezas\r\n* Consultar información\r\n* volver a la página para elegir\r\n* volver a la página inicial\r\n\r\nADVERTENCIA: La lógica del juego no está completa!!")
    btnWelcome.addEventListener("click",mostrarPaginaPrincipal)
}


async function guardarJugadoresEnLocalStorage(jugadorUno,jugadorDos){
    localStorage.setItem("jugadorUno", JSON.stringify(jugadorUno))
    localStorage.setItem("jugadorDos", JSON.stringify(jugadorDos))
}

async function iniciarJuego(){
    playerOne.name = document.querySelector(`#${playerOne.divID} #player-name`).value || "bot-jugadorUno"
    playerTwo.name = document.querySelector(`#${playerTwo.divID} #player-name`).value || "bot-jugadorDos"
    
    if(playerOne.catID === playerTwo.catID){
        document.querySelector("#player-two-setup img").setAttribute('class',"card_copia")
    }
    
    await guardarJugadoresEnLocalStorage(playerOne,playerTwo)

    if(selectedBoard==="tablero1"){
        location.href = "../pages/tablero3x3.html"
    }else if(selectedBoard==="tablero2"){
        location.href = "../pages/tablero4x5.html"
    }else if(selectedBoard==="tablero3"){
        location.href = "../pages/tablero7x5.html"
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