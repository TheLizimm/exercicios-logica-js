const container = document.getElementById('container')
//BOTÃO CREATE
const btnCreate = document.getElementById('btnCreate')
//BOTÃO CONNECT
const btnConnect = document.getElementById('btnConnect')

//LOCALIZAÇÃO DO MOUSE
let offsetX, offsetY
let isDrag = false
let currentDiv = null
let totalSquare = []
let idQuadrado = 0
let saveId 

//VARIAVEIS PARA O MODO CONNECT
let connectMode = false
let firstSquare = null
let secondSquare = null
let lines = []

//Criando o quadrado
function createDiv() {
    const quadrado = document.createElement('div')
    quadrado.classList.add('quadradoCreate')
    quadrado.id = idQuadrado
    idQuadrado++
    saveId = idQuadrado
    totalSquare.push(quadrado)
    container.appendChild(quadrado)
    console.log('Você criou um quadrado')
    console.log(saveId)

    //inicio do arrasto
    quadrado.addEventListener('mousedown', (e) =>{
        if(connectMode) return
        isDrag = true
        currentDiv = quadrado
        offsetX = e.clientX - quadrado.offsetLeft
        offsetY = e.clientY - quadrado.offsetTop
    })
    //CLICK NO QUADRADO
    quadrado.addEventListener('click', (e) => {
        if(connectMode) {
            selectSquareForConnection(quadrado)
        }
    })
}

//salvar posição do quadrado
document.addEventListener('mousemove', (e) => {
    if (isDrag && currentDiv) {
        currentDiv.style.left = `${e.clientX - offsetX}px`;
        currentDiv.style.top = `${e.clientY - offsetY}px`;
    }
});

//Conidição de parada
document.addEventListener('mouseup', () => {
    isDrag = false;
    currentDiv = null;
});

//Quando clicar no botão vai chamar a function createDiv()
btnCreate.addEventListener("click",createDiv)

//SELECIONAR QUADRADOS
function selectSquare(quadrado){
    if(!firstSquare){
        firstSquare = quadrado
        console.log('Primeiro quadrado selecionado', quadrado.id)
    }
    else if(!secondSquare && quadrado !== secondSquare){
        secondSquare = quadrado
        console.log('Segundo quadrado selecionado', quadrado.id)
        createLine(firstSquare, secondSquare)
    }
}

//CRIAR LINHA E CALCULAR QUADRADO
function createLine(square1, square2){
    const svg = document.getElementById('lineRework')
    if(!svg){
        svg.id = 'lineRework'
        container.appendChild(svg)
    }
    
    //CALCULAR AREA DO QUADRADO
    const center1 = square1
    const center2 = square2

}

//Mexendo na function connect
function connect() {
    connectMode = !connectMode
    if(connectMode){
        btnConnect.textContent = 'ON'
        console.log("Modo CONNECT ativado! selecione os 2 quadrados")
        console.log("Pressione ESC para sair do modo connect")
    }else {
        console.log('Modo CONNECT desativado.')
        btnConnect.textContent = 'OFF'
        // Resetar seleção se houver
        if(firstSquare) {
            firstSquare = null
        }
        if(secondSquare) {
            secondSquare = null
        }
    }
}
btnConnect.addEventListener('click',connect)

// Desativar modo connect com a tecla ESC
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && connectMode) {
        connect() // Desativa o modo
    }
})