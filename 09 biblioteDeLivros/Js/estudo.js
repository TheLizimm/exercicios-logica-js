/*
    FUNÇÔES CONSTRUTORAS

function Book(title, author, pages) {
  this.title = title;   // 'this' se refere ao objeto que será criado
  this.author = author;
  this.pages = pages;
}

const book1 = new Book("1984", "George Orwell", 328);
const book2 = new Book("O Alquimista", "Paulo Coelho", 197);

console.log(book1.title); // "1984"
console.log(book2.author); // "Paulo Coelho" 

// Sempre que você usar new Book(...), o this dentro da função se refere ao novo objeto criado.

Funções construtoras permitem criar múltiplos objetos com a mesma estrutura sem repetir código.

///////////////////////////////////////////////////////////////////////////////////////////////////////////

    PROTOTYPE (Protótipo)

function Book(title) {
  this.title = title;
}

// Adicionando método ao protótipo
Book.prototype.describe = function() {
  return `Livro: ${this.title}`;
}

const myBook = new Book("Dom Quixote");
console.log(myBook.describe()); // "Livro: Dom Quixote"

describe não está dentro do objeto myBook.
Está no Book.prototype, mas myBook consegue acessar porque herda do protótipo.
Isso é eficiente: todos os objetos criados com Book compartilham os métodos do protótipo, economizando memória.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

O protótipo é outro objeto que o objeto original herda

Imagine que cada objeto é uma cadeia.
Se você tenta acessar uma propriedade e ela não existe no objeto, JS procura no protótipo, e depois no protótipo do protótipo, e assim por diante.

function Book(title) {
  this.title = title;
}

Book.prototype.read = function() {
  console.log(`Você leu ${this.title}`);
};

const b = new Book("Clean Code");
b.read(); // "Você leu Clean Code"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

Acessando o protótipo de um objeto

a) Object.getPrototypeOf(obj)
console.log(Object.getPrototypeOf(b) === Book.prototype); // true

b) __proto__ (não recomendado, mas funciona)
console.log(b.__proto__ === Book.prototype); // true

c) constructor.prototype
console.log(b.constructor.prototype === Book.prototype); // true

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Herança prototípica

Objetos podem herdar métodos e propriedades de outros objetos via protótipo.
Isso é a herança em JS, diferente de linguagens clássicas como Java ou C++ (que usam classes).

const animal = {
  eat() { console.log("Comendo..."); }
};

const dog = {
  bark() { console.log("Au au"); }
};

// Configura herança
Object.setPrototypeOf(dog, animal);

dog.bark(); // "Au au"
dog.eat();  // "Comendo..."  <-- herdado do protótipo

dog não tem eat, mas herda de animal.
*/