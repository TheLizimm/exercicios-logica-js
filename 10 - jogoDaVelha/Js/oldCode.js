//CODIGO ANTIGO QUE APAGUEI E REFIZ UM NOVO


//Armazenar o tabuleiro do jogo em um array
const matrizString = [
    ['*', '*', '*'], 
    ['*', '*', '*'], 
    ['*', '*', '*']  
];

function imprimirTabuleiro(matriz) {
    matriz.forEach(linha => {
        const linhaFormatada = linha.join(' ');
        console.log(linhaFormatada);
    });
}
imprimirTabuleiro(matrizString);

//players
let totalPlayers = []
let marker = []


//criar players
function criacaoDeJogador(){
    function jogadores(player, marcador){
        this.player = player;
        this.marcador = marcador
        totalPlayers.push(player)
        marker.push(marcador)
    }   
    jogadores.prototype.printAll = function(){
        console.log("----------")
        console.log("nome : " +this.player)
        console.log("Marcador: "+this.marcador)
    }

    function p1(){
    let player1 = new jogadores('luis' , 'x')
    p1.prototype = player1
    player1.printAll()
    let player2 = new jogadores('richard' , 'o')
    p1.prototype = player2
    player2.printAll()
    }
    p1()
}
criacaoDeJogador()
//Crie um objeto controlador responsável pelo fluxo do jogo (quem joga, verificar vitória, etc).
function verificarGanhador(){
    let positions = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]
}