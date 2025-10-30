//CONTROLAR TURNO ATUAL
let playerAtual = 0
let playersGlobal = []

//CRIAÇÂO DE PLAYER
function jogador(nome, marker){ //Cria a function Book com estes elementos no array
    this.nomes = nome
    this.marker = marker
}
//PUXANDO INFORMAÇÕES
function addInformacao(nome1, marker1, nome2, marker2){
    const nP1 = new jogador(nome1, marker1);
    const nP2 = new jogador(nome2, marker2);
    playersGlobal.push(nP1);
    playersGlobal.push(nP2);
    return playersGlobal;
}
//PERGUNTANDO AO USUARIO SEU NOME E MARCADOR
function nJogadores(){
    playersGlobal.length = 0; 
    playerAtual = 0; 

    let player1 = prompt('Qual o nome do primeiro jogador:');
    let marker1 = prompt('Vc vai ser o X ou o O (apenas X ou O):').toUpperCase();
    
    let player2 = prompt('Qual o nome do segundo jogador:');
    
    let marker2 = (marker1 === 'X') ? 'O' : 'X'; 
    if (marker1 !== 'X' && marker1 !== 'O') {
        alert("Marcador do Jogador 1 inválido. Usando X e O padrão.");
        marker1 = 'X';
        marker2 = 'O';
    }
    
    addInformacao(player1, marker1 ,player2, marker2); 
    document.querySelector('.jogadorAtual').innerText = `Vez de: ${playersGlobal[playerAtual].nomes} (${playersGlobal[playerAtual].marker})`;
}

//QUADRADO DO JOGO DA VELHA E ALTERNANCIA ENTRE OS MARCADORES E MOSTRAR VENCEDOR
function tic(buttonElement) { 
    if (playersGlobal.length === 0) {
        alert("Por favor, clique em 'Adicionar jogadores' para começar!");
        return;
    }
    if (buttonElement.innerText.trim() !== "") {
        console.log("Este quadrado já foi preenchido!");
        return;
    }
    const jogadorAtualObj = playersGlobal[playerAtual];
    const marcador = jogadorAtualObj.marker; 
    buttonElement.innerText = marcador; 
    playerAtual = (playerAtual + 1) % playersGlobal.length; 
    const proximoJogador = playersGlobal[playerAtual];
    document.querySelector('.jogadorAtual').innerText = `Vez de: ${proximoJogador.nomes} (${proximoJogador.marker})`;

    const winner = checkWin();
    if (winner) {
        if (winner === 'Empate') {
            alert("Fim de Jogo! Empate!");
        } else {
            const winningPlayer = playersGlobal.find(p => p.marker === winner);
            alert(`Fim de Jogo! O Vencedor é: ${winningPlayer.nomes} (${winner})!`);
        }
        document.querySelector('.jogadorAtual').innerText = "FIM DE JOGO! Clique no botão abaixo para jogar de novo.";
        return; 
    }
}

//CRIAÇÂO DE CONTROLE DE GAME
function getBoardButtons() {
    return document.querySelectorAll('.game button');
}

function checkWin(){
    const buttons = getBoardButtons()
    const condicionalWin = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (const condition of condicionalWin) {
        const [a, b, c] = condition;
    if (
        buttons[a].innerText &&
        buttons[a].innerText === buttons[b].innerText &&
        buttons[a].innerText === buttons[c].innerText
    ) {
        return buttons[a].innerText; 
    }
    }
    let isDraw = true;
    for (const button of buttons) {
        if (button.innerText === "") {
            isDraw = false; 
            break;
        }
    }
    if (isDraw) return 'Empate';

    return null; 
}

function reloadBoard(){
    const buttons = getBoardButtons()
    buttons.forEach(button => {
        button.innerText = ""
    })
    document.querySelector('.jogadorAtual').innerText = 'Pronto para começar!';
}
