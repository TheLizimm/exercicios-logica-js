const maxLimte = 100
const container = document.getElementById('container')

function gerarCorAleatoria(){
    let valorCor = Math.floor(Math.random() * 0xFFFFFF)
    let transformHex = '#' + valorCor.toString(16).padStart(6, '0')
    return transformHex
}

function criarDivs(divs){
    container.textContent = ""
    for (let i = 0; i < divs * divs; i++) {
        const div = document.createElement('div');
        div.classList.add('divs');
        div.style.backgroundColor = gerarCorAleatoria();
        container.appendChild(div);
    }
}

function tentativa5(){
    let totalDivs = prompt(`Quantas divs quer (max: ${maxLimte})`)
    if(totalDivs > maxLimte || totalDivs < 1){
        alert(`por favor escolha um valor entre 1 a ${maxLimte}`)
    }
    criarDivs(totalDivs)
}
criarDivs(2)
/*const callButton = document.getElementById('qtsDivs')
callButton.addEventListener("click", () => {
    let totalDivs = prompt(`Quantas divs quer (max: ${maxLimte})`)
    if(totalDivs > maxLimte || totalDivs < 1){
        alert(`por favor escolha um valor entre 1 a ${maxLimte}`)
    }
    criarDivs(divs)
});
criarDivs(2)*/