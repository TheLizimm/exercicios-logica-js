import './style.css';

const storage_key = 'myTaskslist'
let myTasks = []

function saveTasks() {
    localStorage.setItem(storage_key, JSON.stringify(myTasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem(storage_key);
    if (savedTasks) {
        myTasks = JSON.parse(savedTasks);
    } else {
        addInformacao("Cozinhar", "Fazer omelete", "12/11/25", false);
    }
}

function task(titulo ,descricao,dataVencimento,feito = false){ //Cria a function Book com estes elementos no array
    this.id = crypto.randomUUID()
    this.titulo = titulo
    this.descricao = descricao
    this.dataVencimento = dataVencimento
    this.feito = feito;
}

function addInformacao(titulo ,descricao,dataVencimento,feito){
    const nB = new task(titulo ,descricao,dataVencimento,feito)
    myTasks.push(nB)
    saveTasks()
    return myTasks  //adiciona ao array
}

loadTasks()

//Criação Feita agora preciso mostrar eles

const cards = document.createElement('div')  
cards.classList.add('cards') 

function addNewTask(){
    cards.innerHTML = ""  //zera a div pra nn ter que ler o array inteiro de novo
    for(let i = 0; i<myTasks.length; i++){ 
        let card = document.createElement('div')  
        card.classList.add('card')
        let title = document.createElement('h4')
        title.innerHTML = myTasks[i].titulo 
        let descricao = document.createElement('p')
        descricao.innerHTML = myTasks[i].descricao
        let dataVencimento = document.createElement('p')
        dataVencimento.innerHTML = myTasks[i].dataVencimento  
        let feito = document.createElement('p')
        feito.innerHTML = myTasks[i].feito ? "Já concluido" : "Não concluido";
        let remover = document.createElement('button') 
        remover.innerHTML = "Remover" 
        remover.addEventListener('click', function() {  
            const taskId = myTasks[i].id;
            myTasks = myTasks.filter(task => task.id !== taskId);
            saveTasks()
            addNewTask(); 
        });  
        let status = document.createElement('button')
        status.innerHTML = myTasks[i].feito ? "Não concluido" : "Já concluido";
        status.addEventListener('click', function(){
            myTasks[i].feito = !myTasks[i].feito; //se true vira false e se for false vira true
            feito.innerHTML = myTasks[i].feito ? "Já concluido" : "Não concluido"; //atualiza o texto
            status.innerHTML = myTasks[i].feito ? "Não concluido" : "Já concluido";  //atualiza o texto do botão
            saveTasks()
        })
        let newSubTaks = document.createElement('button')
        newSubTaks.classList.add('subTask')
        newSubTaks.innerHTML = "Alterar tarefa"
        newSubTaks.addEventListener('click', function(){
            editTask(i)
        })
        let cardActions = document.createElement('div');
        cardActions.classList.add('card-actions');
        card.appendChild(title)
        card.appendChild(descricao)   
        card.appendChild(dataVencimento)
        card.appendChild(feito)
        card.appendChild(newSubTaks)
        cardActions.appendChild(remover)
        cardActions.appendChild(status)
        card.appendChild(cardActions)
        cards.appendChild(card)  
    }
}

container.appendChild(cards)

//finalizei aonde vai aparecer o conteudo das tarefas agora preciso mexer no botão
 window.newTask = function(){
    let tituloTask = prompt(`Qual o titulo da sua nova tarefa, ex:${' Ir no mercado '}`)
    let descricao = prompt(`Qual a descrição da sua tarefa, ex:${' comprar tomate '}`)
    let dataVencimento;
    let isValidDate = false;
    do {
        dataVencimento = prompt(`Preciso fazer isso até que dia? Ex: '27/11/25'`);
        if (dataVencimento === null) {
            alert("Criação de tarefa cancelada. A data de vencimento é obrigatória.");
            return; 
        }
        if (dataVencimento.trim() !== '') {
            isValidDate = true;
        } else {
            alert("Por favor, digite uma data de vencimento.");
        }
    } while (!isValidDate);
    let feito = prompt(`Você já realizou essa tarefa: , ex:${' true ou false'}`)
    let isRead = feito && feito.toLowerCase() === 'true';
    addInformacao(tituloTask, descricao, dataVencimento, isRead);  
    addNewTask();
}
addNewTask(1)

//Alterando o botão de mexer nas infos 
function editTask(index){
    let currentTask = myTasks[index]
    let newTitulo = prompt(`Novo título (Atual: ${currentTask.titulo}):`, currentTask.titulo);
    if (!newTitulo) newTitulo = currentTask.titulo;
    let newDescricao = prompt(`Nova descrição (Atual: ${currentTask.descricao}):`, currentTask.descricao);
    if (!newDescricao) newDescricao = currentTask.descricao;
    let newDataVencimento = prompt(`Nova data de vencimento (Atual: ${currentTask.dataVencimento}):`, currentTask.dataVencimento);
    if (!newDataVencimento) newDataVencimento = currentTask.dataVencimento;
    myTasks[index].titulo = newTitulo
    myTasks[index].descricao = newDescricao
    myTasks[index].dataVencimento = newDataVencimento
    saveTasks()
    addNewTask()
}