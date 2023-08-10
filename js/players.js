export default class Player {
    constructor(divID,name,catID,catImg,catName){
        this.name = name
        this.catID = catID
        this.catImg = catImg
        this.catName = catName
        this.divID = divID
        this.piezas = []

        this._playerImgBox = document.querySelector(`#${divID} #player-img-box`)

        // this.renderSetUp()
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

    // buildName(){
    //     return `
    //     <div class="player-name">
    //         <h2>${this.name}</h2>
    //     </div>
    //     `
    // }

    buildImage(){
        return `
        <img id="character-image-container" src="../img/${this.catImg}" class="card">
        <p id="player-one-img-name">${this.catName}</p>
        `
    }

    // cantPiece(){
    //     return `
    //     <div class="player-cant-piece">
    //         <h2>${this.piezas.length}</h2>
    //     </div>
    //     `
    // }

    render(){
        this._playerImgBox.innerHTML=this.buildImage()
    }
}