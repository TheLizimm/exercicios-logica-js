const tipos = ["pedra", "papel", "tesoura"]
let humanScore = 0;
let computerScore = 0;

function getHumanChoice() {
    let choice = prompt("Digite o que você quer jogar: Pedra, Papel ou Tesoura");
    return choice.toLowerCase();
}
function getComputerChoice(array){
    return array[Math.floor(Math.random() * array.length)] //utilizar o % te dá o resto da divisão por 3 elementos do array
}
function playRound(humanChoice, computerChoice){
        if(humanChoice === computerChoice){
            console.log("Empatou o round porque os dois escolheram: " + humanChoice)
        }
        else if(humanChoice === "pedra" && computerChoice === "tesoura" ||
          humanChoice === "papel" && computerChoice === "pedra" || 
          humanChoice === "tesoura" && computerChoice === "papel"){
            console.log("você venceu: " + humanChoice + " vence " + computerChoice)
            humanScore++
          }else{
            console.log("você perdeu: " + computerChoice + " vence " + humanChoice)
            computerScore++
          }
}
function playGame(){
    for(let i = 1; i<=5; i++){
        console.log("Rodada: " + i);
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice(tipos);
        const resultado = playRound(humanSelection, computerSelection);
        if (resultado === "Jogador") {
          humanScore++;
        }else if (resultado === "maquina") {
          computerScore++;
        }
        console.log("Placar: Jogador " + humanScore + " vs " + computerScore + " maquina");
    }
    if(humanScore > computerScore){
        console.log("parabens você venceu o jogo")
    }else if(computerScore > humanScore){
        console.log("a maquina venceu o jogo!")
    }else{
        console.log("O jogo empatou")
    }
}
playGame()
