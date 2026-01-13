class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(array){
        // Remove duplicatas e ordena antes de construir
        const sortedArray = [...new Set(array)].sort((a, b) => a - b)
        this.root = this.buildTree(sortedArray)
    }

    // Função central: transforma array ordenado em árvore equilibrada
    buildTree(array){
        if(array.length === 0) return null
        const mid = Math.floor(array.length / 2)
        const node = new Node (array[mid])
        node.left = this.buildTree(array.slice(0, mid))
        node.right = this.buildTree(array.slice(mid + 1))
        return node 
    }

    //Inserção e Remoção
    //Inserir o valor no nó da arvore
    insert(value, root = this.root) {
        if(root === null) return new Node(value);
        if(value < root.data){
            root.left = this.insert(value, root.left)
        }else if(value > root.data){
            root.right = this.insert(value, root.right)
        }
        return root;
    }

    //Deletar item
    deleteItem(value, root = this.root){
        if(root === null) return root
        if(value < root.data){
            root.left = this.deleteItem(value, root.left)
        }else if(value > root.data){
            root.right = this.deleteItem(value, root.right)
        }else{
            if(root.left === null) return root.right
            if(root.right === null) return root.left
            root.data = this.minValue(root.right)
            root.right = this.deleteItem(root.data, root.right)
        }
        return root
    }

    minValue(node){
        let min = node.data
        while(node.left !== null){
            min = node.left.data
            node = node.left
        }
        return min
    }

    //Travessias
    levelOrder(callback){
        if(!callback) throw new Error("Callback é obrigatorio")
        const queue = [this.root]
        while(queue.length > 0){
            const node = queue.shift()
            callback(node)
            if(node.left) queue.push(node.left)
            if(node.right) queue.push(node.right)
        }
    }

    inOrder(callback, node = this.root){
        if(!callback) throw new Error("Callback é obrigatorio")
        if(node){
            this.inOrder(callback, node.left)
            callback(node)
            this.inOrder(callback, node.right)
        }
    }

    //Altura, Profundidade e Equilíbrio
    height(node){
        if(node === null) return -1
        const leftHeight = this.height(node.left)
        const rightHeight = this.height(node.right)
        return Math.max(leftHeight, rightHeight) + 1
    }

    isBalanced(node = this.root){
        if(node === null) return true
        const diff = Math.abs(this.height(node.left) - this.height(node.right))
        return diff <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right)
    }

    rebalance(){
        const nodes = []
        this.inOrder((node) => nodes.push(node.data)) //cria um array ordenado
        this.root = this.buildTree(nodes) //Reconstroi equilibrado 
    }
}

// Função para gerar números aleatórios
const randomArray = (size) => Array.from({length: size}, () => Math.floor(Math.random() * 100));
const myTree = new Tree(randomArray(15));
console.log("Está equilibrada?", myTree.isBalanced());
myTree.insert(150);
myTree.insert(200);
myTree.insert(250);
console.log("Está equilibrada após inserções?", myTree.isBalanced());
console.log(myTree)

myTree.rebalance();
console.log("Está equilibrada após rebalance()?", myTree.isBalanced());
console.log(myTree)



