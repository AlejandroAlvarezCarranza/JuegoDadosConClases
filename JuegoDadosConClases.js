//Código JavaScript
//ELABORADO POR: ALEJANDRO CRUZ ALVAREZ CARRANZA

//Clase Jugador
class Jugador{
    //definicion de variables privadas
    #_caraDado1=0;
    #_caraDado2=0;

    //constructor de la clase jugador
    constructor(nom){
        this.nombre=nom
    }
    
    //get y set de caraDado1 (variable privada)
    get caraDado1(){return this.#_caraDado1;}
    set caraDado1(valorDado1){this.#_caraDado1=valorDado1}

    //get y set de CaraDado2 (variable privada)
    get caraDado2(){return this.#_caraDado2}
    set caraDado2(valorDado2){this.#_caraDado2=valorDado2}
}

//Clase JuegoDados
class JuegoDados{
    //Constructor de la clase Juego Dados
    constructor(numJuego,j1,j2){
        this.numeroJuego=numJuego;
        this.jugador1=new Jugador(j1.nombre);
        this.jugador2=new Jugador(j2.nombre);
    }
    
    //Metodo para tirar los dados
    tirarDados(){
        this.jugador1.caraDado1 = Math.round((Math.random() * 5) + 1);
        this.jugador1.caraDado2 = Math.round((Math.random() * 5) + 1);
        this.jugador2.caraDado1 = Math.round((Math.random() * 5) + 1);
        this.jugador2.caraDado2 = Math.round((Math.random() * 5) + 1);
    }

    //Metodo para determinar al ganador
    determinarGanador(){
        if ( (this.jugador1.caraDado1 + this.jugador1.caraDado2 == 7)
            && (this.jugador2.caraDado1 + this.jugador2.caraDado2 != 7) )
            return this.jugador1.nombre;
        else if ( (this.jugador2.caraDado1 + this.jugador2.caraDado2 == 7)
            && (this.jugador1.caraDado1 + this.jugador2.caraDado1 != 7) )
            return this.jugador2.nombre;
        else return "Empate";
    }
}

//Clase del torneo
class torneoDados{
    //definicion de variables privadas
    #_juegosGanadosJugador1=0;
    #_juegosGanadosJugador2=0;
    
    //Constructor de la clase del torneo
    constructor(){
        this.jugadas = new Array();
    }
    
    //get y set de los juegos ganados del jugador 1 (variable privada)
    get juegosGanadosJugador1(){return this.#_juegosGanadosJugador1}
    set juegosGanadosJugador1(valorGanadosJ1){this.#_juegosGanadosJugador1=valorGanadosJ1}

    //get y set de los juegos ganados del jugador 2 (variable privada)
    get juegosGanadosJugador2(){return this.#_juegosGanadosJugador2}
    set juegosGanadosJugador2(valorGanadosJ2){this.#_juegosGanadosJugador2=valorGanadosJ2}

    //metodo para instanciar objetos necesarios para llevar a cabo el torneo
    crear(j1,j2){
        this.jugador1 = new Jugador(j1);
        this.jugador2 = new Jugador(j2);
    }

    //metodo donde se llevan a cabo las partidas del torneo
    jugar(){
        let salida = true;
        while(salida){
            this.jugadas.push(new JuegoDados(this.jugadas.length,this.jugador1,this.jugador2));
            this.jugadas[this.jugadas.length-1].tirarDados();

            if(this.jugadas[this.jugadas.length-1].determinarGanador()==this.jugador1.nombre){
                this.juegosGanadosJugador1++;
            }else if(this.jugadas[this.jugadas.length-1].determinarGanador()==this.jugador2.nombre){
                this.juegosGanadosJugador2++;
            }

            if(this.juegosGanadosJugador1==3 || this.juegosGanadosJugador2==3){
                salida=false;
            }
        }
    }

    //creacion de metodo privado donde se obtienen los resultados
    #_resultado(){
        if(this.juegosGanadosJugador1==3){
            return this.jugador1.nombre;
        }else{
            return this.jugador2.nombre;
        }
    }

    //get del metodo de resultado (metodo privado)
    get resultado(){
        return this.#_resultado();
    }
    
    //set del metodo de resultado (metodo privado) - este funciona para cambia el resultado (cambiando al ganador por otro)
    set resultado(ganador){
        if(ganador==this.jugador1.nombre){
            if(this.juegosGanadosJugador1!=3){
                this.juegosGanadosJugador2=this.#_juegosGanadosJugador1;
                this.juegosGanadosJugador1=3;
            }            
        }else if(ganador==this.jugador1.nombre){
            if(this.juegosGanadosJugador2!=3){
                this.juegosGanadosJugador1=this.juegosGanadosJugador2;
                this.juegosGanadosJugador2=3;
            }
        }else{
            console.log("El Jugador que ingreso No existe");
        }
    }
}

//Uso de las Clases para demostrar su correcto funcionamiento
const primerTorneo = new torneoDados();
const segundoTorneo = new torneoDados();
primerTorneo.crear("Alejandro","Agustin");
primerTorneo.jugar();
console.log("(Primer Torneo) (J1)Alejandro vs (J2)Agustin");
console.log("(Primer Torneo) Ganador: "+primerTorneo.resultado);
console.log("(Primer Torneo) Juegos Totales Jugados: "+primerTorneo.jugadas.length);
console.log("(Primer Torneo) Partidas Ganadas por "+primerTorneo.jugador1.nombre+": "+primerTorneo.juegosGanadosJugador1);
console.log("(Primer Torneo) Partidas Ganadas por "+primerTorneo.jugador2.nombre+": "+primerTorneo.juegosGanadosJugador2);
console.log("(Primer Torneo) Resultado/Ganador de la partida No. "+(primerTorneo.jugadas.length-2)+": "+primerTorneo.jugadas[primerTorneo.jugadas.length-3].determinarGanador());

console.log("");

segundoTorneo.crear(primerTorneo.resultado,"Carlos");
segundoTorneo.jugar();
console.log("(Segundo Torneo) (J1)"+primerTorneo.resultado+" vs (J2)Carlos");
console.log("(Segundo Torneo) Ganador: "+segundoTorneo.resultado);
console.log("(Segundo Torneo) Juegos Totales Jugados: "+segundoTorneo.jugadas.length);
console.log("(Segundo Torneo) Partidas Ganadas por "+segundoTorneo.jugador1.nombre+": "+segundoTorneo.juegosGanadosJugador1);
console.log("(Segundo Torneo) Partidas Ganadas por "+segundoTorneo.jugador2.nombre+": "+segundoTorneo.juegosGanadosJugador2);
console.log("(Segundo Torneo) Resultado/Ganador de la partida No. "+(segundoTorneo.jugadas.length-2)+": "+segundoTorneo.jugadas[segundoTorneo.jugadas.length-3].determinarGanador());
segundoTorneo.resultado=segundoTorneo.jugador1.nombre;
console.log("(Segundo Torneo) Resultado cambiado al jugador 1:"+segundoTorneo.resultado);

//Instrucciones y codigo base ofrecido
/* Programar la clase que represente al torneo
clase torneoDados
    jugadas //Arreglo de objetos de clase JuegoDados

    juegosGanadosJugador1   //Hacer privado y métodos getter y setter
    juegosGanadosjugador2   //Hacer privado y métodos getter y setter

    función crear
    función jugar
    función resultado     //hacer privado y métodos getter y setter
*/



//Usar clases para demostrar su funcionamiento
/*
    Simular un torneo de dados.
    El torneo se juega hasta que un jugador gana 3 juegos.
    Un jugador gana un juego cuando la suma de los 2 dados es 7 y el otro no obtiene un 7.
    En caso de que en un juego ninguno de los jugadores obtenga 7, se declara empate

    function Jugador(nombre){
    this.nombre = nombre;
    let caraDado1 = 0;  //Hacer privado y sus métodos getter y setter
    let caraDado2 = 0;  //Hacer privado y sus métodos getter y setter
    
    this.getCaraDado1 = function(){return caraDado1};
    this.setCaraDado1 = function(valorDado1){caraDado1=valorDado1}

    this.getCaraDado2 = function(){return caraDado2};
    this.setCaraDado2 = function(valorDado2){caraDado2=valorDado2};
}

function JuegoDados(numeroJuego, j1, j2){
    this.numeroJuego = numeroJuego;
    this.jugador1 = j1;
    this.jugador2 = j2;

    this.tirarDados = function() {
        this.jugador1.caraDado1 = Math.round((Math.random() * 5) + 1);
        this.jugador1.caraDado2 = Math.round((Math.random() * 5) + 1);
        this.jugador2.caraDado1 = Math.round((Math.random() * 5) + 1);
        this.jugador2.caraDado2 = Math.round((Math.random() * 5) + 1);
    }

    this.determinaGanador = function() {
        if ( ((this.jugador1.caraDado1 + this.jugador1.caraDado2) == 7)
            && ((this.jugador2.caraDado1 + this.jugador2.caraDado2) != 7) )
            return this.jugador1
        else if ( ((this.jugador2.caraDado1 + this.jugador2.caraDado2) == 7)
            && ((this.jugador1.caraDado1 + this.jugador2.caraDado1) != 7) )
            return this.jugador2
        else return null;
    }
}
*/
