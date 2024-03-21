const pop = new Audio('src/pop1.mp3');


//-----------------------Mostrar Resultado--------------------------------
let resultado= document.getElementById('info')


//----------------------Recargar Pagina-----------------------------------
document.getElementById('btn').addEventListener('click',()=>{
     location.reload()
})
//------------Boton de recargar Pagina------------------------------------------
function btnmostrar(){document.getElementById('btn').style.display='block'}



//----------------Funcion que analiza victoria
function win(intento) {
    let combinacionesGanadoras = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    // ----Verificar si alguna combinación ganadora coincide con las posiciones del jugador
    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        let combinacionGanadora = combinacionesGanadoras[i];
        if (combinacionGanadora.every(pos => intento.includes(pos))) {
            return true;
        }
    }

    return false;
}


//Comprobar si se termina
let siguePartida =true

//-----------------------------------------------Sistema de turnos----------------------------------

//Rondas jugadas
let rondasJugadas=0

//Turnos
let turno=1;

//Valores de los jugadores
let player= {1:'x',2:'o'}

//Seguimiento de posiciones de jugadores
let positions=[[],[]]

//Valores de las pocisiones del jugador
let posicionDeJugadores =
[
    {'1':0},
    {'2':0},
    {'3':0},
    {'4':0},
    {'5':0},
    {'6':0},
    {'7':0},
    {'8':0},
    {'9':0},
]


//--------------------------------------Dibujar tabla----------------------------------
function dibujar(a){

//====Verificar si sigue el juego=
if (posicionDeJugadores[a][a+1]==0&&siguePartida==true){

//Reproducir sonido
pop.play()

//Asignar posicion de click del jugador
posicionDeJugadores[a][(a+1)]=turno;

//Intercalar turnos
if(turno===1){turno=2;rondasJugadas++}
else{turno=1;

    //Aumentar numero de rondas jugadas
    rondasJugadas++}

//Registrar las posiciones de jugadores en un array
document.getElementById(`${a}`).id=player[turno]
positions[turno-1].push((a+1))

//Comprobar victoria
if(positions[0].length>=3||positions[1].length>=3)
{  

    //Si gana jugador X
    if(win(positions[0])){
        btnmostrar();
        resultado.innerText='X GANA!'
        //Cambiar valor de si sigue la partida
        ;siguePartida=false}


        //Si Gana jugador O
        else if(win(positions[1]))
    {  btnmostrar();
        resultado.innerText='O GANA!';
    siguePartida=false}


    //Empate
    else if(rondasJugadas==9)
    {  btnmostrar();
        resultado.innerText='EMPATE'
    ;siguePartida=false}
}
}
}

//-----------------Dibujar cuadricula de posiciones---------------

//Ventana de juego
let table = document.getElementById('tabla');

//Dibujar cuadros jugables
function dibujarCuadros(){

for(let i=0;i<posicionDeJugadores.length;i++)
{
    //Crear divs con id unico 
    let cuadro = document.createElement('div');
    cuadro.classList.add('cuadro');
    cuadro.id = i;
    cuadro.addEventListener('click',function(){dibujar(i)})
    table.appendChild(cuadro);
}
}
dibujarCuadros()
