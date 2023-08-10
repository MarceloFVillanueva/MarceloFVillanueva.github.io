import Pieza from "./piezas.js";

export default class Player {
    constructor(name,catID,catImg,catName,divID,classImg){
        this.name = name
        this.catID = catID
        this.catImg = catImg
        this.catName = catName
        this.divID = divID
        this.classImg = classImg
        this.piezas = []

        this._playerImgBox = document.querySelector(`#${divID} #player-img-box`)

        this.render()
    }

    addPiece(position){
        const nuevaPieza = new Pieza("normal",position,this.classImg)
        this.piezas.push(nuevaPieza)
        // console.log(this.piezas)
    }

    removePiece(pieza){
        // console.log("piezas: ",this.piezas)
        // console.log("pieza a eliminar: ",pieza)
        for(let element of this.piezas){
            if(pieza.posicionXY === element.posicionXY){
                const index = this.piezas.indexOf(element)
                this.piezas.splice(index,1)
            }
        }
        // console.log(this.piezas)
    }

    buildImage(){
        return `
        <img id="character-image-container" src="../img/${this.catImg}" class="card">
        <p id="player-img-name">${this.catName}</p>
        `
    }

    render(){
        this._playerImgBox.innerHTML=this.buildImage()
    }
}