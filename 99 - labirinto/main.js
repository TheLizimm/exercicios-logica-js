// Armazena os labirintos originais e processados
let labirintosOriginais = [];
let menoresCaminhos = []; // Armazena o tamanho do menor caminho para cada labirinto

// Função para alternar README
function toggleReadme() {
    const content = document.getElementById('readmeContent');
    const icon = document.getElementById('readme-icon');
    
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        icon.textContent = '▼';
    } else {
        content.style.display = 'none';
        icon.textContent = '▶';
    }
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza o README
    if (typeof marked !== 'undefined' && typeof readmeMarkdown !== 'undefined') {
        const markdownContent = document.getElementById('markdownContent');
        markdownContent.innerHTML = marked.parse(readmeMarkdown);
    }
    
    // Clona os labirintos originais
    labirintosOriginais = labirintos.map(lab => ({
        nome: lab.nome,
        matriz: lab.matriz.map(row => [...row])
    }));
    
    // Calcula o menor caminho para cada labirinto
    calcularMenoresCaminhos();
    
    renderizarLabirintos();
});

// Renderiza todos os labirintos na página
function renderizarLabirintos() {
    const grid = document.getElementById('mazesGrid');
    grid.innerHTML = '';
    
    labirintosOriginais.forEach((labirinto, index) => {
        const container = document.createElement('div');
        container.className = 'maze-container';
        container.id = `maze-${index}`;
        
        const title = document.createElement('div');
        title.className = 'maze-title';
        title.textContent = labirinto.nome;
        
        const status = document.createElement('div');
        status.className = 'maze-status status-pending';
        status.id = `status-${index}`;
        status.textContent = 'Aguardando execução...';
        
        const mazeDiv = document.createElement('div');
        mazeDiv.style.textAlign = 'center';
        mazeDiv.id = `maze-content-${index}`;
        mazeDiv.appendChild(criarMazeHTML(labirinto.matriz, index, false));
        
        const info = document.createElement('div');
        info.className = 'maze-info';
        info.textContent = `Menor caminho: ${menoresCaminhos[index]} células`;
        
        const feedback = document.createElement('div');
        feedback.className = 'feedback-list';
        feedback.id = `feedback-${index}`;
        
        container.appendChild(title);
        container.appendChild(status);
        container.appendChild(mazeDiv);
        container.appendChild(info);
        container.appendChild(feedback);
        
        grid.appendChild(container);
    });
}

// Cria o HTML visual do labirinto
function criarMazeHTML(matriz, mazeIndex, mostrarErros = false, celulasErradas = []) {
    const maze = document.createElement('div');
    maze.className = 'maze';
    
    matriz.forEach((row, i) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'maze-row';
        
        row.forEach((cell, j) => {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'maze-cell';
            cellDiv.id = `cell-${mazeIndex}-${i}-${j}`;
            
            // Verifica se é uma célula com erro
            const isErro = mostrarErros && celulasErradas.some(err => err.i === i && err.j === j);
            
            if (isErro) {
                cellDiv.classList.add('cell-error');
            } else {
                const cellClass = obterClasseCelula(cell);
                cellDiv.classList.add(cellClass);
            }
            
            cellDiv.textContent = cell;
            
            rowDiv.appendChild(cellDiv);
        });
        
        maze.appendChild(rowDiv);
    });
    
    return maze;
}

// Retorna a classe CSS apropriada para cada tipo de célula
function obterClasseCelula(cell) {
    switch(cell) {
        case 'x': return 'cell-wall';
        case 'i': return 'cell-start';
        case 'f': return 'cell-end';
        case 'o': return 'cell-path';
        default: return 'cell-empty';
    }
}

// Executa a solução para todos os labirintos
function executarTodos() {
    labirintosOriginais.forEach((labirinto, index) => {
        // Clona a matriz para não modificar o original durante a verificação
        const matrizClonada = labirinto.matriz.map(row => [...row]);
        
        try {
            // Executa a função do aluno
            const resultado = resolverLabirinto(matrizClonada);
            
            // Valida o resultado
            const validacao = validarSolucao(labirinto.matriz, resultado, index);
            
            if (validacao.valido) {
                atualizarStatus(index, 'success', '✅ Solução válida!');
                renderizarMazeAtualizado(index, resultado, false, []);
            } else {
                atualizarStatus(index, 'error', `❌ Solução inválida`);
                renderizarMazeAtualizado(index, resultado, true, validacao.celulasErradas || []);
            }
            
            // Mostra feedback detalhado
            mostrarFeedback(index, validacao);
            
        } catch (error) {
            atualizarStatus(index, 'error', `❌ Erro na execução: ${error.message}`);
            renderizarMazeAtualizado(index, labirinto.matriz, false, []);
            mostrarFeedback(index, { 
                feedbacks: [`Erro ao executar função: ${error.message}`] 
            });
        }
    });
}

// Valida se a solução está correta
function validarSolucao(original, resultado, mazeIndex) {
    const celulasErradas = [];
    const feedbacks = [];
    let valido = true;
    
    // Verifica se as dimensões são iguais
    if (!resultado || original.length !== resultado.length) {
        feedbacks.push('❌ Matriz retornada tem dimensões incorretas');
        return { valido: false, feedbacks, celulasErradas };
    }
    
    // Verifica cada célula e se 'x', 'i' ou 'f' foram modificados
    for (let i = 0; i < original.length; i++) {
        if (original[i].length !== resultado[i].length) {
            feedbacks.push('❌ Matriz retornada tem dimensões incorretas');
            return { valido: false, feedbacks, celulasErradas };
        }
        
        for (let j = 0; j < original[i].length; j++) {
            const cellOriginal = original[i][j];
            const cellResultado = resultado[i][j];
            
            if ((cellOriginal === 'x' || cellOriginal === 'i' || cellOriginal === 'f') 
                && cellOriginal !== cellResultado) {
                celulasErradas.push({ i, j });
            }
        }
    }
    
    if (celulasErradas.length > 0) {
        feedbacks.push('❌ Você modificou paredes (x), início (i) ou fim (f)');
        valido = false;
    }
    
    // 1) Verifica se existe algum caminho (alguma letra 'o')
    const tamanhoCaminho = contarCelulasO(resultado);
    const tamanhoEsperado = menoresCaminhos[mazeIndex];
    
    if (tamanhoCaminho === 0) {
        feedbacks.push('❌ Nenhum caminho foi marcado. Implemente a função resolverLabirinto()');
        valido = false;
    } else {
        feedbacks.push(`✅ Caminho foi marcado: ${tamanhoCaminho} células`);
        
        // 2) Verifica se o caminho conecta i e f (seguindo apenas as células 'o')
        const caminhoConectado = verificarConexaoCaminho(resultado);
        if (!caminhoConectado) {
            feedbacks.push('❌ O caminho marcado não conecta o início (i) ao fim (f)');
            valido = false;
        } else {
            feedbacks.push('✅ O caminho conecta o início ao fim');
        }

        // 3) Verifica se o tamanho do caminho é o menor possível
        if (tamanhoCaminho === tamanhoEsperado) {
            feedbacks.push(`✅ Tamanho do caminho é o menor possível: ${tamanhoCaminho} células`);
        } else if (tamanhoCaminho > tamanhoEsperado) {
            feedbacks.push(`❌ Caminho não é o menor. Seu caminho: ${tamanhoCaminho} células, menor caminho: ${tamanhoEsperado} células`);
            valido = false;
        } else {
            feedbacks.push(`⚠️ Caminho menor que o esperado: ${tamanhoCaminho} células (esperado: ${tamanhoEsperado}). Possível erro no cálculo.`);
            valido = false;
        }
    }
    
    return { valido, feedbacks, celulasErradas };
}

// Verifica se o caminho marcado com 'o' conecta 'i' e 'f'
// Seguindo apenas células 'o' adjacentes (sem pular)
function verificarConexaoCaminho(matriz) {
    let inicio = null, fim = null;
    
    // Encontra início e fim
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] === 'i') inicio = {i, j};
            if (matriz[i][j] === 'f') fim = {i, j};
        }
    }
    
    if (!inicio || !fim) return false;
    
    // BFS seguindo apenas 'o' (e aceitando 'f' como destino)
    const fila = [inicio];
    const visitados = new Set();
    visitados.add(`${inicio.i},${inicio.j}`);
    
    const direcoes = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    while (fila.length > 0) {
        const atual = fila.shift();
        
        // Verifica se chegou no fim
        if (atual.i === fim.i && atual.j === fim.j) {
            return true;
        }
        
        // Explora apenas células 'o' ou 'f' adjacentes
        for (const [di, dj] of direcoes) {
            const ni = atual.i + di;
            const nj = atual.j + dj;
            const chave = `${ni},${nj}`;
            
            if (ni >= 0 && ni < matriz.length && 
                nj >= 0 && nj < matriz[ni].length && 
                !visitados.has(chave)) {
                
                const celula = matriz[ni][nj];
                
                // Só pode andar por 'o' ou chegar em 'f'
                if (celula === 'o' || celula === 'f') {
                    visitados.add(chave);
                    fila.push({i: ni, j: nj});
                }
            }
        }
    }
    
    return false;
}

// Conta quantas células 'o' existem na matriz
function contarCelulasO(matriz) {
    let count = 0;
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] === 'o') count++;
        }
    }
    return count;
}

// Atualiza o status visual do labirinto
function atualizarStatus(index, tipo, mensagem) {
    const status = document.getElementById(`status-${index}`);
    status.className = `maze-status status-${tipo} visible`;
    status.textContent = mensagem;
}

// Renderiza novamente o labirinto após execução
function renderizarMazeAtualizado(index, matriz, mostrarErros, celulasErradas) {
    const mazeContent = document.getElementById(`maze-content-${index}`);
    mazeContent.innerHTML = '';
    mazeContent.appendChild(criarMazeHTML(matriz, index, mostrarErros, celulasErradas));
}

// Mostra feedback detalhado
function mostrarFeedback(index, validacao) {
    const feedbackDiv = document.getElementById(`feedback-${index}`);
    
    if (!validacao.feedbacks || validacao.feedbacks.length === 0) {
        feedbackDiv.classList.remove('visible');
        return;
    }
    
    feedbackDiv.innerHTML = `
        <div class="feedback-title">📋 Análise da Solução:</div>
        <ul>
            ${validacao.feedbacks.map(f => `<li>${f}</li>`).join('')}
        </ul>
    `;
    feedbackDiv.classList.add('visible');
}

// Calcula o menor caminho para cada labirinto usando BFS
function calcularMenoresCaminhos() {
    menoresCaminhos = labirintosOriginais.map(lab => {
        return bfs(lab.matriz);
    });
}

// Implementação BFS para encontrar menor caminho
function bfs(matriz) {
    let inicio = null, fim = null;
    
    // Encontra início e fim
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] === 'i') inicio = {i, j};
            if (matriz[i][j] === 'f') fim = {i, j};
        }
    }
    
    if (!inicio || !fim) return 0;
    
    // BFS
    const fila = [{pos: inicio, dist: 0}];
    const visitados = new Set();
    visitados.add(`${inicio.i},${inicio.j}`);
    
    const direcoes = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    while (fila.length > 0) {
        const {pos, dist} = fila.shift();
        
        if (pos.i === fim.i && pos.j === fim.j) {
            // Retorna distância - 1 porque não contamos 'i' e 'f'
            return dist - 1;
        }
        
        for (const [di, dj] of direcoes) {
            const ni = pos.i + di;
            const nj = pos.j + dj;
            const chave = `${ni},${nj}`;
            
            if (ni >= 0 && ni < matriz.length && 
                nj >= 0 && nj < matriz[ni].length && 
                !visitados.has(chave) &&
                matriz[ni][nj] !== 'x') {
                
                visitados.add(chave);
                fila.push({pos: {i: ni, j: nj}, dist: dist + 1});
            }
        }
    }
    
    return 0; // Sem caminho
}