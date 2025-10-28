/*
 ------------------------PASSOS -------------------------
 1* criar uma variavel aonde vai armazenar os livros em seu array
 2*criar a função especificando as ordens que vai seguir
 3*criar uma função aonde adicione estas informações a variavel
 4*Mostrar no html
*/

const container = document.getElementById('container')

let myLibrary = []
function Book(titulo, autor, pagina, read = false){ //Cria a function Book com estes elementos no array
    this.id = crypto.randomUUID()
    this.titulo = titulo
    this.autor = autor
    this.page = pagina
    this.read = read;
}

function addInformacao(titulo, autor, pagina, read){
    const nB = new Book(titulo, autor, pagina, read)
    myLibrary.push(nB)
    return myLibrary  //adiciona ao array
}
addInformacao("O Hobbit", "J.R.R. Tolkien", 295, false);
addInformacao("Clean Code", "Robert C. Martin", 464, true);

//CRIAÇÂO DOS LIVROS FEITO AGORA PRECISO MOSTRAR ELES 
// ---------------------------------------------------

const cards = document.createElement('div')  //criei uma div
cards.classList.add('cards') //adicionei a classe de cards

function cSingle(){
    cards.innerHTML = ""  //zera a div pra nn ter que ler o array inteiro de novo
    for(let i = 0; i<myLibrary.length; i++){  //vai ler todo o array do myLibrary e vai criar as div em resposta ao tamanho do seu array 
        let card = document.createElement('div')  //junto com o titulo, autor, pagina e se foi lido
        card.classList.add('card')
        let title = document.createElement('h4')
        title.innerHTML = myLibrary[i].titulo //procura um valor relacionado ao seu local
        let author = document.createElement('p')
        author.innerHTML = myLibrary[i].autor
        let page = document.createElement('p')
        page.innerHTML = myLibrary[i].page  
        let leu = document.createElement('p')
        leu.innerHTML = myLibrary[i].read ? "Lido" : "Não Lido";
        let remover = document.createElement('button') //criei um botão 
        remover.innerHTML = "Remover" //adicionei um texto para nn ficar sem nada
        remover.addEventListener('click', function() {  //o addEventListener guarda a informação de quando clicarem no botão ele vai rodar
            myLibrary.splice(i, 1)  //remove o o elemento dentro do array da variavel
            card.remove(); //remove o pai(card)
        });  
        let status = document.createElement('button')
        status.innerHTML = myLibrary[i].read ? "Não Lido" : "Lido";
        status.addEventListener('click', function(){
            myLibrary[i].read = !myLibrary[i].read; //se true vira false e se for false vira true
            leu.innerHTML = myLibrary[i].read ? "Lido" : "Não Lido"; //atualiza o texto
            status.innerHTML = myLibrary[i].read ? "Não Lido" : "Lido";  //atualiza o texto do botão
        })
        card.appendChild(title)
        card.appendChild(author)   
        card.appendChild(page)
        card.appendChild(leu)
        card.appendChild(remover)
        card.appendChild(status)
        cards.appendChild(card)  //adicionei a as informações do card na variavel cards
    }
}

container.appendChild(cards) //adicionei cards ao container principal

 //PRECISO MEXER NO BOTÃO AGORA
 // -------------------------------------------------------


 function NewBook(){
    let tituloBook = prompt(`Qual o titulo do seu novo livro, ex:${' A arte da guerra'}`)
    let autorBook = prompt(`Qual o autor do seu novo livro, ex:${' Sun Tzu'}`)
    let paginasBook = prompt(`Quantas paginas tem o seu novo livro, ex:${' 293'}`)
    let verifyNumber = parseInt(paginasBook)
    let leituraBook = prompt(`Você já leu esse livro, ex:${' true ou false'}`)
    let isRead = leituraBook && leituraBook.toLowerCase() === 'true';
    addInformacao(tituloBook, autorBook, verifyNumber, isRead);  //armazena as informações na função
    cSingle();
}
cSingle(2) //começa com 2 livros já 
