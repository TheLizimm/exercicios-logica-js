/*
    Seletores de Consulta (Query selectors):
    element.querySelector(selector): retorna uma referência para a primeira correspondência do seletor.
    element.querySelectorAll(selectors): retorna um "NodeList" contendo referências a todas as correspondências dos seletores. 
  <--------------------------------------------------------------------------------------------------------------------------->

    Criação de Elementos:
    document.createElement(tagName, [options]): cria um novo elemento do tipo de tag tagName. [options] neste caso significa 
    que você pode adicionar alguns parâmetros opcionais à função. Não se preocupe com eles neste momento.
    const div = document.createElement("div");
  <--------------------------------------------------------------------------------------------------------------------------->

    Anexar Elementos (Append):
    parentNode.appendChild(childNode): anexa childNode como o último filho de parentNode.
    parentNode.insertBefore(newNode, referenceNode): insere newNode em parentNode antes de referenceNode.
  <--------------------------------------------------------------------------------------------------------------------------->

    Remover Elementos:
    parentNode.removeChild(child): remove child de parentNode no DOM e retorna uma referência a child.   
  <--------------------------------------------------------------------------------------------------------------------------->

    Adicionando Estilo Inline:
    adiciona a regra de estilo indicada ao elemento na variável div
    div.style.color = "blue";
    <--------------------------------------------------------------------------------------------------------------------------->

    adiciona várias regras de estilo:
    div.style.cssText = "color: blue; background: white;";

    adiciona várias regras de estilo (abordagem alternativa)
    div.setAttribute("style", "color: blue; background: white;");
  <--------------------------------------------------------------------------------------------------------------------------->

    notação de ponto com kebab case: NÃO funciona, pois tenta subtrair 'color' de 'div.style.background'
    equivalente a: div.style.background - color
    div.style.background-color;

    notação de ponto com camelCase: funciona, acessa o estilo background-color da div
    div.style.backgroundColor;

    notação de colchetes com kebab-case: também funciona
    div.style["background-color"];

    notação de colchetes com camelCase: também funciona
    div.style["backgroundColor"];
  <--------------------------------------------------------------------------------------------------------------------------->

    Editando Atributos:
    se o id existir, atualiza-o para 'theDiv', caso contrário, cria um id com o valor "theDiv"
    div.setAttribute("id", "theDiv");

    retorna o valor do atributo especificado, neste caso "theDiv"
    div.getAttribute("id");

    remove o atributo especificado
    div.removeAttribute("id");
  <--------------------------------------------------------------------------------------------------------------------------->

    Trabalhando com Classes:
    adiciona a classe "new" à sua nova div
    div.classList.add("new");

    remove a classe "new" da div
    div.classList.remove("new");

    se a div não tiver a classe "active", adiciona, ou se tiver, remove (alterna)
    div.classList.toggle("active");
  <--------------------------------------------------------------------------------------------------------------------------->

    Adicionando Conteúdo de Texto:
    cria um nó de texto contendo "Hello World!" e o insere na div
    div.textContent = "Hello World!";

    É Preferivel utilizar o textContent pois evita potenciais riscos de segurança

    Adicionando Conteúdo HTML:
    renderiza o HTML dentro da div
    div.innerHTML = "<span>Hello World!</span>";
  <--------------------------------------------------------------------------------------------------------------------------->

*/

// seleciona a div #container
const containe = document.querySelector("#container");
// seleciona o primeiro filho de #container => .display
const display = containe.firstElementChild;
console.log(display) // <div class="display"></div>

// seleciona a div .controls
const controls = document.querySelector(".controls")
// seleciona o irmão anterior => .display
 display = controls.previousElementSibling;
console.log(display) // <div class="display"></div>


const container = document.getElementById('container') //acessamos a div container
const novoParagrafo = document.createElement('p') //criou o elemento que vamos utilizar
novoParagrafo.textContent = "paragrafo criado com js" //adicionou texto
novoParagrafo.style.color = 'red'; //adicionou uma cor
container.appendChild(novoParagrafo) //atribuiu tudo ao container

const newH3 = document.createElement('h3') //criou o elemento h3 e anexou a variavel newH3
newH3.textContent = "im a blue H3" //texto
newH3.style.color = 'blue' //colocou uma cor
container.appendChild(newH3) //adicionou a variavel ao container

const newDiv = document.createElement('div') //novo elemento
newDiv.style.border = "solid black" //borda
newDiv.style.backgroundColor = "pink" //fundo rosa

const h1 = document.createElement('h1') //novo h1 anexado a variavel h1
h1.textContent = "im in a div" //texto do h1
const p = document.createElement('p') //criou um elemento p
p.textContent = "me too" //texto do elemento p
newDiv.appendChild(h1) //adicionou h1 a newDiv
newDiv.appendChild(p) //adicionou p a newDiv
container.appendChild(newDiv) //adicionou todos os conteudo e a variavel newDiv ao container

const btn = document.querySelector("#btn"); //acessou ao id do botão no html
btn.onclick = () => alert("Hello World"); 
//utilizou uma arrow function pois é mais moderno porém é o mesmo de utilizar
/*btn.onclick = function() {
  alert("Hello World");
}; 

const btn = document.querySelector("#btn");  
btn.addEventListener("click", () => { pode se fazer assim que acaba resolvendo o problema de que o DOM só pode ter 1 propriedade
  alert("Hello World");
});
*/
