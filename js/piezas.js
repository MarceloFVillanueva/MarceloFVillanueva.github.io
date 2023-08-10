export default class Pieza {
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