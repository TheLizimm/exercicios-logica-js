// CONTROLAR TURNO ATUAL
let playerAtual = 0
let playersGlobal = []
// Estrutura para o placar
let scoreGlobal = {}; 

// CRIAÇÃO DE PLAYER
function jogador(nome, marker) { 
    this.nomes = nome
    this.marker = marker
}

// PUXANDO INFORMAÇÕES
function addInformacao(nome1, marker1, nome2, marker2) {
    const nP1 = new jogador(nome1, marker1);
    const nP2 = new jogador(nome2, marker2);
    playersGlobal.push(nP1);
    playersGlobal.push(nP2);
    // Inicializa o placar para os novos jogadores, se não existirem
    scoreGlobal[nome1] = scoreGlobal[nome1] || 0;
    scoreGlobal[nome2] = scoreGlobal[nome2] || 0;
    updateScoreDisplay();
    return playersGlobal;
}

// Manipulação do formulário e DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('playerForm');
    if (playerForm) {
        playerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            nJogadoresComForm();
            hideModal('modalAddPlayer'); 
            showContent('contentGame'); // Mostra o tabuleiro do jogo
        });
    }
    // Inicializa o tabuleiro e mostra o conteúdo inicial do Jogo
    reloadBoard();
    showContent('contentGame');
});

// FUNÇÃO ATUALIZADA PARA LER DO FORMULÁRIO
function nJogadoresComForm() {
    playersGlobal.length = 0;
    playerAtual = 0;
    const player1Name = document.getElementById('player1Name').value;
    let marker1 = document.getElementById('player1Marker').value.toUpperCase();
    const player2Name = document.getElementById('player2Name').value;
    // Validação de marcador
    if (marker1 !== 'X' && marker1 !== 'O') {
        alert(`Marcador para ${player1Name} inválido. Usando 'X' padrão.`);
        marker1 = 'X';
    }
    // Define o marcador do Jogador 2
    let marker2 = (marker1 === 'X') ? 'O' : 'X';
    addInformacao(player1Name, marker1, player2Name, marker2);
    document.querySelector('.jogadorAtual').innerText = `Vez de: ${playersGlobal[playerAtual].nomes} (${playersGlobal[playerAtual].marker})`;
}

// Função de Placar
function updateScore(winningPlayerName) {
    if (winningPlayerName && scoreGlobal[winningPlayerName] !== undefined) {
        scoreGlobal[winningPlayerName]++;
        updateScoreDisplay();
    }
}

function updateScoreDisplay() {
    const scoreElement = document.getElementById('contentScore');
    if (!scoreElement) return;
    let scoreHTML = '<h2>Placar do Jogo</h2>';
    scoreHTML += '<table>';
    scoreHTML += '<tr><th>Jogador</th><th>Vitórias</th></tr>';
    for (const name in scoreGlobal) {
        scoreHTML += `<tr><td>${name}</td><td>${scoreGlobal[name]}</td></tr>`;
    }
    scoreHTML += '</table>';
    scoreElement.innerHTML = scoreHTML;
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
}
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}
window.onclick = function(event) {
    const modal = document.getElementById('modalAddPlayer');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function showContent(contentId) {
    document.querySelectorAll('.game, .jogadorAtual, .reset, #contentScore').forEach(el => {
        el.style.display = 'none';
    });
    if (contentId === 'contentGame') {
        document.querySelector('.game').style.display = 'grid';
        document.querySelector('.jogadorAtual').style.display = 'block';
        document.querySelector('.reset').style.display = 'block';
    } else if (contentId === 'contentScore') {
        updateScoreDisplay(); 
        document.getElementById('contentScore').style.display = 'flex';
    }
}

function tic(buttonElement) { 
    if (playersGlobal.length === 0) {
        alert("Por favor, clique em 'Adicionar Jogadores' para começar!");
        return;
    }
    if (buttonElement.innerText.trim() !== "") {
        console.log("Este quadrado já foi preenchido!");
        return;
    }
    
    const jogadorAtualObj = playersGlobal[playerAtual];
    const marcador = jogadorAtualObj.marker; 
    buttonElement.innerText = marcador; 
    const winner = checkWin();
    if (winner) {
        if (winner === 'Empate') {
            alert("Fim de Jogo! Empate!");
        } else {
            const winningPlayer = playersGlobal.find(p => p.marker === winner);
            alert(`Fim de Jogo! O Vencedor é: ${winningPlayer.nomes} (${winner})!`);
            updateScore(winningPlayer.nomes); // Atualiza o placar
        }
        document.querySelector('.jogadorAtual').innerText = "FIM DE JOGO! Clique no botão ao lado para jogar de novo.";
        getBoardButtons().forEach(button => button.onclick = null); 
        return; 
    }
    // Altera o turno apenas se não houver vencedor
    playerAtual = (playerAtual + 1) % playersGlobal.length; 
    const proximoJogador = playersGlobal[playerAtual];
    document.querySelector('.jogadorAtual').innerText = `Vez de: ${proximoJogador.nomes} (${proximoJogador.marker})`;
}
function getBoardButtons() {
    return document.querySelectorAll('.game button');
}

function checkWin(){
    const buttons = getBoardButtons()
    const condicionalWin = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
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
        button.onclick = function() { tic(this); }; 
    })
    document.querySelector('.jogadorAtual').innerText = 'Pronto para começar!';
    playerAtual = 0;  
    showContent('contentGame'); 
}