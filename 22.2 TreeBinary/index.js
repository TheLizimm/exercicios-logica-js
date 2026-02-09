// Passo 1: ----------------- ESTRUTURA BASE -----------------
class no{
    constructor(valor){
        this.valor = valor //valor que o nó armazena
        this.direita = null //filho da direita --- inicia como nulo
        this.esquerda = null //filho da esquerda --- inicia como nulo
    }
}

class tree{
    constructor(array){
        //prepara o array e remove duplicatas
        const sortedArray = [...new Set(array)].sort((a, b) => a - b)
        this.root = this.buildTree(array)
    }
// Passo 2: ----------------- A FUNÇÂO -----------------
    buildTree(array){
        if(array.length === 0){
            return null
        }
        const mid = Math.floor(array.length / 2)
        const node = new no(array[mid])
        node.esquerda = this.buildTree(array.slice(0, mid))
        node.direita = this.buildTree(array.slice(mid + 1))
        return node
    }
// Passo 3: ----------------- MANIPULAÇÂO -----------------  
    includes(value){
        let current = this.root
        while(current !== null){
            if (value === current.valor) {
                return true
            }
            if(value < current.valor){
                current = current.esquerda
            }
            else{
                current = current.direita
            }
        }
        return false
    }

    insert(value){
        if(this.includes(value)){
            return
        }
        const nNode = new no(value)
        if(this.root === null){
            this.root = nNode
            return
        }
        let atual = this.root
        let father = null
        while (atual !== null) {
            father = atual
            if(value < atual.valor){
                atual = atual.esquerda
            }else{
                atual = atual.direita
            }
        }
        if(value < father.valor){
            father.esquerda = nNode
        }else{
            father.direita = nNode
        }
    }

    delete(valor, noAtual = this.root){
        if(noAtual === null){
            return null
        }
        if(valor < noAtual.valor){
            noAtual.esquerda = this.delete(valor, noAtual.esquerda)
        }else if(valor > noAtual.valor){
            noAtual.direita = this.delete(valor, noAtual.direita)
        }else{
            if(noAtual.esquerda === null){
                return noAtual.direita
            }
            if(noAtual.direita === null){
                return noAtual.esquerda
            }
            const sucessor = this.encontrarMenor(noAtual.direita)
            noAtual.valor = sucessor.valor
            noAtual.direita = this.delete(sucessor.valor, noAtual.direita)
        }
        if(noAtual === this.root){
            this.root = noAtual
        }
        return noAtual
    }

    encontrarMenor(noAtual){
        while(noAtual.esquerda !== null){
            noAtual = noAtual.esquerda
        }
        return noAtual
    }
}

//ENUNCIADO JÁ DEU ESSA PARTE PARA TESTARMOS A ARVORE
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) return;
  if (node.direita !== null) {
    prettyPrint(node.direita, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.valor}`);
  if (node.esquerda !== null) {
    prettyPrint(node.esquerda, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const myArray = [10,20,30,40,50,60,70]
const myTree = new tree(myArray)
//VISUALIZAÇÔES
console.log("--------------Visualizando a Árvore---------------")
prettyPrint(myTree.root)

console.log("------TESTE DO INCLUDES---------")
console.log("Existe 30?", myTree.includes(30))
console.log("Existe 5?", myTree.includes(5))

console.log("------TESTE DO INSERT-----------")
myTree.insert(15)
myTree.insert(5)
prettyPrint(myTree.root)

console.log("------TESTE DO DELETE---------")
myTree.delete(20)
prettyPrint(myTree.root)

