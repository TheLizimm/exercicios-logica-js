//HASH:
//envolve pegar uma entrada e gerar uma saída correspondente
//EXEMPLO:
//function hash(name) {
//  return name.charAt(0);
//}


//---------------COMEÇO DA ATIVIDADE------------------
//Não preciso utilizar pois tem algumas linguagens que já se utiliza 0.75 normalmente const fatorCarga = 0.75
const capacidadeInicial = 16 //Não se pode começar com um array infinito por padrão utiliza um de 16
const numeroPrimo = 31 //se utiliza um numero primo para distribuir o codigo de maneira uniforme

class Hashmap {
    constructor(){
        this.cInicial = capacidadeInicial
        this.tamanho = 0 //Contador de pares
        this.tabela = new Array(capacidadeInicial)
    }

    hash(key){
        let codigoHash = 0
        let modulo = this.cInicial
        for (let i = 0; i < key.length; i++) {
            //sempre se utiliza essa formula para não passar o limite de inteiros do javascript
            codigoHash = (numeroPrimo * codigoHash + key.charCodeAt(i)) % modulo
        }
        return codigoHash
    }

    set(key, value){
        //Caso não possua um array ele cria
        const indice = this.hash(key)
        if(!this.tabela[indice]){
            this.tabela[indice] = []
        }
        //caso 2: verificar se a chave já existe
        for (let i = 0; i < this.tabela[indice].length; i++) {
            if(this.tabela[indice][i].key === key){
                this.tabela[indice][i].value = value
                console.log(`Alteração de ${key}`)
                return
            }
        }
        //caso 3:
        this.tabela[indice].push({key, value})
        this.tamanho++
        console.log(`${key} e ${value} inseridos na tabela`)

        //Caso 4: Se ultrapassar o limite do balde re-hashear todos os itens na tabela (capacidade * fator de carga)
    }

    get(key){
        const indice = this.hash(key)
        if(this.tabela[indice]){
            for(const item of this.tabela[indice]){
                if(item.key === key){
                    return item.value
                }
            }
        }
        return undefined
    }
    has(key){
        const indice = this.hash(key)
        if(this.tabela[indice]){
            for(const item of this.tabela[indice]){
                if(item.key === key){
                    return true
                }
            }
        }
        return false
    }
    remove(key){
        const indice = this.hash(key)
        if(this.tabela[indice]){
            for (let i = 0; i < this.tabela[indice].length; i++) {
                if(this.tabela[indice][i].key === key){
                    this.tabela[indice].splice(i, 1)
                    this.tamanho--
                    console.log(`${key} removido(a)`)
                    return true
                }
            }
        }
        console.log(`${key} não encontrada`)
        return false
    }
    keyStorage(){
        return this.tamanho
    }
    clear(){
        this.tabela = new Array(capacidadeInicial)
        this.tamanho = 0
        console.log("Mapa Limpo:")
    }
}

const Hmap = new Hashmap()
console.log("--------CAPACIDADE INCIAL---------------")
console.log(`Teste de Capacidade Incial:${capacidadeInicial}`)
console.log("--------ADICIONANDO ITEM----------------")
Hmap.set("arroz", 1)
console.log("--------PEGANDO VALOR----------------")
console.log(`${Hmap.get("arroz")}`)
console.log("--------VERIFICANDO EXISTENCIA----------------")
console.log(`${Hmap.has("macarrão")}`)
console.log("--------REMOVENDO ITEM----------------")
Hmap.remove("ar")
console.log("--------VERIFICANDO TAMANHO----------------")
console.log(`${Hmap.keyStorage()}`)
console.log("--------LIMPANDO LISTA----------------")
Hmap.clear()
console.log(Hmap)
