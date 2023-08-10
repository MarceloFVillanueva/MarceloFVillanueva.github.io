export default class Pieza {
    constructor(typePiece,positionXY,typeClass){
        this.tipoDePieza = typePiece,
        this.posicionXY = positionXY,
        this.tipoDeClase = typeClass
    }
    
    nuevaPosicionX(x){
        this.posicionXY[0] = this.posicionXY[0] + x
    }
    nuevaPosicionY(y){
        this.posicionXY[1] = this.posicionXY[1] + y
    }
}