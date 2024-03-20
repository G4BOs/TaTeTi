//funcion de ganar
let info= document.getElementById('info')

document.getElementById('btn').addEventListener('click',()=>{
     location.reload()
})


function win(intento) {
    let combinaciones = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    // Convertir las posiciones del jugador en un array
    console.log('Intento:'+intento)
    

    // Verificar si alguna combinación ganadora coincide con las posiciones del jugador
    for (let i = 0; i < combinaciones.length; i++) {
        let combinacionGanadora = combinaciones[i];
        if (combinacionGanadora.every(pos => intento.includes(pos))) {
            return true;
        }
    }

    return false;
}


//Comprobar si se termina
let sigue =true

let turn=1;
let rounds=0
let positions=[[],[]]
let tabla =
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

let jcolor= {1:'x',2:'o'}

function btnmostrar(){document.getElementById('btn').style.display='block'}

function color(a){
    
    //console.log( a,'Funciona')

if (tabla[a][a+1]==0&&sigue==true){
    tabla[a][(a+1)]=turn
if(turn===1){turn=2;rounds++}
else{turn=1;rounds++}
    
document.getElementById(`${a}`).id=jcolor[turn]
positions[turn-1].push((a+1))

if(positions[0].length>=3||positions[1].length>=3)
{  
    if(win(positions[0])){
        btnmostrar();
        info.innerText='X GANA!'
        ;sigue=false}

    else if(win(positions[1]))
    {  btnmostrar();
        info.innerText='O GANA!';
    sigue=false}


    else if(rounds==9)
    {  btnmostrar();
        info.innerText='EMPATE'
    ;sigue=false}
}


}

}

let table = document.getElementById('tabla');

function draw(){

for(let i=0;i<tabla.length;i++)
{
    let cuadro = document.createElement('div');
    cuadro.classList.add('cuadro');
    cuadro.id = i;
    cuadro.addEventListener('click',function(){color(i)})
    table.appendChild(cuadro);
}
}
draw()
