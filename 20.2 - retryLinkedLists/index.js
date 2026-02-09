class Node {
    constructor(value = null, nextNode = null){
        this.value = value
        this.nextNode = nextNode
    }
}
class LinkedList {
    constructor() {
        this.cabeca = null
        this.tamanhoLista = 0
    }

    //Adicionar valor no final da lista
    append(value){
        const newNode = new Node(value)
        if(this.cabeca === null){
            this.cabeca = newNode
        }else{
            let atual = this.cabeca
            while(atual.nextNode !== null){
                atual = atual.nextNode
            }
            atual.nextNode = newNode
        }
        this.tamanhoLista++
    }
    //ADICIONAR VALOR NO COMEÇO DA LISTA
    prepend(value){
        const newNode = new Node(value)
        if(this.cabeca === null){
            this.cabeca = newNode
        }else{
            let oldHead = this.cabeca
            this.cabeca = newNode
            newNode.nextNode = oldHead
        }
        this.tamanhoLista++
    }

    //REMOVER UM NO
    remove(value){
        if(this.cabeca === null){
            return undefined
        }
        //caso 1: o valor esta na cabeça
        if(this.cabeca.value === value){
            this.cabeca = this.cabeca.nextNode
            this.tamanhoLista--
            return
        }
        //caso 2: encontrar o valor
        let atual = this.cabeca
        while(atual.nextNode !== null){
            if(atual.nextNode.value === value){
                atual.nextNode = atual.nextNode.nextNode
                this.tamanhoLista--
                return
            }
            atual = atual.nextNode
        }
        //caso 3: sem valor
        if(value === null){
            console.log("Não encontrado")
        }
    }
    imprimir(){
        let current = this.cabeca 
        let resultado 
        while(current !== null){
            resultado = current.value
            current = current.nextNode
            console.log(resultado)
        }
    }

    search(value){
        let current = this.cabeca
        while(current.value !== value){
            if(current.nextNode === value){
                console.log("Você achou o valor")
                return
            }else{
                console.log("você não achou o valor")
                return
            }
        }
        
    }
}

const test = new LinkedList
//const n1 = new Node(1)
//const n2 = new Node
//n2.value = 2
//console.log(test)
//console.log(n1)
//console.log(n2)

//ADICIONANDO NO FINAL
test.append(1)
test.append(2)
test.append(4)
test.append(5)
console.log(test)

//ADICIONANDO NO COMEÇO
test.prepend(3)
console.log(test)

//REMOVENDO
test.remove(2)
console.log(test)

test.imprimir()
test.search(1)

