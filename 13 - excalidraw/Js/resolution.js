const container = document.getElementById('container')
//BOTÃO CREATE
const btnCreate = document.getElementById('btnCreate')
//BOTÃO CONNECT
const btnConnect = document.getElementById('btnConnect')

//LOCALIZAÇÃO DO MOUSE
let offsetX, offsetY
let isDrag = false

//Criando o quadrado
function createDiv() {
    const quadrado = document.createElement('div')
    quadrado.classList.add('quadradoCreate')
    container.appendChild(quadrado)
    console.log('Você criou um quadrado')
   
    //inicio do arrasto
    quadrado.addEventListener('mousedown', (e) =>{
        isDrag = true
        currentDiv = quadrado
        offsetX = e.clientX - quadrado.offsetLeft
        offsetY = e.clientY - quadrado.offsetTop
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

//Mexendo na function connect
function connect() {
    console.log("Função de conexão acionada.");
}

btnConnect.addEventListener('click',connect)

