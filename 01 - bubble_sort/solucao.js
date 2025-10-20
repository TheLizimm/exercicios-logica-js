/*MERGE SORT
--------------------- primeira parte ---------------------------- (DIVISÂO DOS ARRAYS)
primeiro passo - Parada, Isso impede que a função se chame infinitamente e é o ponto de partida para a fase de combinação. 
segundo passo - Encontrando o Meio, caso tenha um numero impar de posso utilizar o math.floor para dividir o array da forma mais uniforme possivel
terceiro passo - Dividindo: Usa o método slice() para criar uma nova array que contém a primeira metade dos elementos.
quarto passo - Dividindo (cont.): Cria uma nova array com a segunda metade dos elementos, começando do índice meio até o final.
quinto passo - garantir que direita é um array ordenado.
sexto passo - garantir que a esquerda é um array ordenado
setimo passo - pegar os 2 arrays que retornamos e juntar eles
--------------------- segunda parte --------------------- (JUNTAR OS ARRAYS ORDENADAMENTE)
primeiro passo - criar um array vazio para resultado e 2 ponteiros para acompanhar a posição no array
segundo passo - loop de comparação, enquanto nn estiverem ordenados vai continuar fazendo   
terceiro passo - garantir a comparação dos elemetos atuais 
quarto passo - pegar o elemento e adicionar no resultado e fazer com que o ponteiro do array que pegamos o elemento ande 1
quinto passo - pegar oque sobrou do outro array e anexar ao final do resultado
---------------------- terceira parte ----------------------------- (EXEMPLO DE USO)
primeira passo - criar um array bagunçado
segundo passo - chamar a função e armazenar o resultado em uma variavel
terceiro passo - mostrar no console
*/
function mergeSort(arr){
    if(arr.length <= 1){ //primeiro passo
        return arr
    }
    const meio = Math.floor(arr.length/2) //segundo passo
    const direita = arr.slice(0,meio) //terceiro passo
    const esquerda = arr.slice(meio) //quarto passo
    const fixDireita = mergeSort(direita) //quinto passo
    const fixEsquerda = mergeSort(esquerda) //sexto passo
    return merge(fixDireita, fixEsquerda) //setimo passo
}
function merge(dir, esq){
    //primeiro passo
    let resultado = [] 
    let i = 0 
    let j = 0
    //segundo passo
    while(i < dir.length && j < esq.length){
        if(dir[i] < esq[j]){ //terceiro passo
            resultado.push(dir[i])
            i++ //quarto passo
        }else{
            resultado.push(esq[j])
            j++
        }
    }
    return resultado.concat(dir.slice(i)).concat(esq.slice(j)); //quinto passo
}
const arrayBagunçado = [12,15,6,3,7,2]
const arrayOrdenado = mergeSort(arrayBagunçado)
console.log(arrayOrdenado)

/*
BUBBLE SORT
async function bubbleSort(arr, registrarComparacao, registrarTroca) {
    let n = arr.length
    for(let i = 0; i<n -1; i++){
        for(let j = 0; j<n-i-1; j++){
            await registrarComparacao(i,j);
            if(arr[j] > arr[j+1]){
               await registrarTroca(i,j);
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                j = 0;
            }
        }
    }
    return arr
}
*/
