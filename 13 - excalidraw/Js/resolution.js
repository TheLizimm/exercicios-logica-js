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

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//CRIAÇÃO DOS QUADRADOS

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
            e.stopPropagation()
            selectSquare(quadrado)
        }
    })
}

//salvar posição do quadrado
document.addEventListener('mousemove', (e) => {
    if (isDrag && currentDiv) {
        currentDiv.style.left = `${e.clientX - offsetX}px`;
        currentDiv.style.top = `${e.clientY - offsetY}px`;
        updateLines(currentDiv)
    }
});

//Conidição de parada
document.addEventListener('mouseup', () => {
    isDrag = false;
    if (currentDiv) {
     currentDiv.style.cursor = 'grab';
     currentDiv = null;
    }
});

//Quando clicar no botão vai chamar a function createDiv()
btnCreate.addEventListener("click",createDiv)

//SELECIONAR QUADRADOS
function selectSquare(quadrado){
    if(!firstSquare){
        firstSquare = quadrado
        quadrado.style.border = '3px solid blue'
        console.log('Primeiro quadrado selecionado', quadrado.id)
    }
    else if(!secondSquare && quadrado !== secondSquare){
        secondSquare = quadrado
        quadrado.style.border = '3px solid blue'
        console.log('Segundo quadrado selecionado', quadrado.id)
        createLine(firstSquare, secondSquare)
        
        //Resetar a selec
        setTimeout(() => {
            firstSquare.style.border = '' 
            secondSquare.style.border = ''
            firstSquare = null
            secondSquare = null
        }, 300)
    }
}

//////////////////////////////////////////////////////////////////////////////////
//CRIAR LINHA E CALCULAR QUADRADO
function createLine(square1, square2){
    let svg = document.getElementById('lineRework')
    if(!svg){
        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg' )
        svg.id = 'lineRework'
        svg.style.width = '100%'
        svg.style.height = '100%'
        svg.style.position = 'absolute'
        svg.style.top = '0'
        svg.style.left = '0'
        svg.style.pointerEvents = 'none'
        svg.style.zIndex = '1'
        container.appendChild(svg)
        //Marcador da seta
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker')
        marker.setAttribute('id', 'arrow')
        marker.setAttribute('markerWidth', '10')
        marker.setAttribute('markerHeight', '10')
        marker.setAttribute('refX', '5')
        marker.setAttribute('refY', '3')
        marker.setAttribute('orient', 'auto')
        const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        arrowPath.setAttribute('d', 'M0,0 L0,6 L6,3 Z')
        marker.appendChild(arrowPath)
        svg.appendChild(marker)
    }

    const lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    //CALCULAR AREA DO QUADRADO
    const center1 = getCenter(square1, square2)
    const center2 = getCenter(square2, square1)
    lineElement.setAttribute('x1', center1.x)
    lineElement.setAttribute('y1', center1.y)
    lineElement.setAttribute('x2', center2.x)
    lineElement.setAttribute('y2', center2.y)
    lineElement.setAttribute('stroke', 'black')
    lineElement.setAttribute('stroke-width', '2') 
    lineElement.setAttribute('marker-end', 'url(#arrow)') 
    svg.appendChild(lineElement)
    lines.push({ lineElement, square1, square2 })    
    console.log('Linha criada entre os quadrados', square1.id, 'e', square2.id)
}

//CALCULAR O CENTRO DE UM QUADRADO
function getCenter(a, b){
    const rect1 = a.getBoundingClientRect()
    const rect2 = b.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    const center1 = { x: rect1.left + rect1.width / 2, y: rect1.top + rect1.height / 2 }
    const center2 = { x: rect2.left + rect2.width / 2, y: rect2.top + rect2.height / 2 }

    const dx = center2.x - center1.x
    const dy = center2.y - center1.y
    const angle = Math.atan2(dy, dx)

    const radius = Math.min(rect1.width, rect1.height) / 2
    const x = center1.x + Math.cos(angle) * radius
    const y = center1.y + Math.sin(angle) * radius
    return{ 
        x: x - containerRect.left,
        y: y - containerRect.top 
    }
}

//ATUALIZAR POSIÇÃO DA LINHA
function updateLines(square){
    lines.forEach(lineMove => {
        if(lineMove.square1 === square || lineMove.square2 === square){
            const center1 = getCenter(lineMove.square1, lineMove.square2)
            const center2 = getCenter(lineMove.square2, lineMove.square1)
            lineMove.lineElement.setAttribute('x1', center1.x)
            lineMove.lineElement.setAttribute('y1', center1.y)
            lineMove.lineElement.setAttribute('x2', center2.x)
            lineMove.lineElement.setAttribute('y2', center2.y)
        }
    })
}

///////////////////////////////////////////////////////////////
//MEXENDO NO BOTÃO CONNECT
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
            firstSquare.style.border = '' //SE DESATIVAR O MODO CONNECT O QUADRADO VOLTA A COR DA BORDA PADRAO
            firstSquare = null
        }
        if(secondSquare) {
            secondSquare.style.border = ''
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