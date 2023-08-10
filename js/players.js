export default class Player {
    constructor(name,catID,catImg,catName,divIDsetup,divIDplayer){
        this.name = name
        this.catID = catID
        this.catImg = catImg
        this.catName = catName
        this.divIDsetup = divIDsetup
        this.divIDplayer = divIDplayer
        this.piezas = []

        this._playerImgBox = document.querySelector(`#${divIDsetup} #player-img-box`)

        this.render()
    }

    addPiece(pieza){
        this.piezas.push(pieza)
        console.log(this.piezas)
    }

    removePiece(pieza){
        console.log("piezas: ",this.piezas)
        console.log("pieza a eliminar: ",pieza)
        for(let element of this.piezas){
            if(pieza.posicionXY === element.posicionXY){
                const index = this.piezas.indexOf(element)
                this.piezas.splice(index,1)
            }
        }
        console.log(this.piezas)
    }

    buildImage(){
        return `
        <img id="character-image-container" src="../img/${this.catImg}" class="card">
        <p id="player-one-img-name">${this.catName}</p>
        `
    }

    render(){
        this._playerImgBox.innerHTML=this.buildImage()
    }
}