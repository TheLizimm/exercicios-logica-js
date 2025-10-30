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