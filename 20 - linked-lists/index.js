class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.headNode = null; 
    this.listSize = 0;    
  }

  append(value) {
    const newNode = new Node(value);
    
    if (this.headNode === null) {
      this.headNode = newNode;
    } else {
      let current = this.headNode;
      while (current.nextNode !== null) {
        current = current.nextNode;
      }
      current.nextNode = newNode;
    }
    this.listSize++;
  }

  prepend(value) {
    const newNode = new Node(value, this.headNode);
    this.headNode = newNode;
    this.listSize++;
  }

  get size() {
    return this.listSize;
  }

  get head() {
    return this.headNode;
  }

  get tail() {
    if (this.headNode === null) return null;
    
    let current = this.headNode;
    while (current.nextNode !== null) {
      current = current.nextNode;
    }
    return current;
  }

  at(index) {
    if (index < 0 || index >= this.listSize) {
      return null;
    }
    
    let current = this.headNode;
    for (let i = 0; i < index; i++) {
      current = current.nextNode;
    }
    return current;
  }

  pop() {
    if (this.headNode === null) {
      return null;
    }
    
    if (this.listSize === 1) {
      const removedNode = this.headNode;
      this.headNode = null;
      this.listSize = 0;
      return removedNode;
    }

    let current = this.headNode;
    let previous = null;
    
    while (current.nextNode !== null) {
      previous = current;
      current = current.nextNode;
    }

    previous.nextNode = null;
    this.listSize--;
    return current;
  }

  contains(value) {
    let current = this.headNode;
    while (current !== null) {
      if (current.value === value) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  find(value) {
    let current = this.headNode;
    let index = 0;
    while (current !== null) {
      if (current.value === value) {
        return index;
      }
      current = current.nextNode;
      index++;
    }
    return null;
  }

  toString() {
    let current = this.headNode;
    let result = '';
    
    while (current !== null) {
      result += `( ${current.value} ) -> `;
      current = current.nextNode;
    }
    
    result += 'null';
    return result;
  }


  insertAt(value, index) {
    if (index < 0 || index > this.listSize) {
      console.error("Índice fora dos limites.");
      return;
    }

    if (index === 0) {
      this.prepend(value);
      return;
    }

    let previous = this.at(index - 1);

    const newNode = new Node(value, previous.nextNode);
    previous.nextNode = newNode;
    this.listSize++
  }

  removeAt(index) {
    if (index < 0 || index >= this.listSize) {
      console.error("Índice fora dos limites.");
      return null
    }

    if (index === 0) {
      const removedNode = this.headNode;
      this.headNode = this.headNode.nextNode;
      this.listSize--
      return removedNode
    }

    let previous = this.at(index - 1);
    const removedNode = previous.nextNode
    previous.nextNode = removedNode.nextNode
    
    this.listSize--
    return removedNode
  }
}

const list = new LinkedList();
list.prepend("mouse")
list.prepend("parrot")
list.append("dog")
list.append("cat")
list.append("hamster")
list.append("snake")
list.append("turtle")
console.log(list.toString())
console.log(`Tamanho: ${list.size}`)