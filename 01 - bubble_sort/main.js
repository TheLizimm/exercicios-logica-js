// ========== VARIÁVEIS GLOBAIS ==========
let casosOriginais = [];
let trocasEsperadas = [];
let execucaoAtual = null;
let executando = false;
let animacoesPendentes = []; // Armazena animações para cada caso
let animacoesEmExecucao = []; // Controla se animação está rodando

// ========== FUNÇÃO TOGGLE README ==========
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

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza o README
    if (typeof marked !== 'undefined' && typeof readmeMarkdown !== 'undefined') {
        const markdownContent = document.getElementById('markdownContent');
        markdownContent.innerHTML = marked.parse(readmeMarkdown);
    }
    
    // Preparar dados
    prepararDados();
    
    // Renderizar interface inicial
    renderizarInterfaceInicial();
});

// ========== PREPARAÇÃO DOS DADOS ==========
function prepararDados() {
    // Clonar casos de teste originais
    casosOriginais = casosDeTeste.map(caso => ({
        nome: caso.nome,
        array: [...caso.array],
        descricao: caso.descricao
    }));
    
    // Calcular número esperado de trocas para cada array
    trocasEsperadas = casosOriginais.map(caso => 
        calcularTrocasBubbleSort([...caso.array])
    );
    
    // Inicializar controle de animações
    animacoesEmExecucao = new Array(casosOriginais.length).fill(false);
}

// ========== CALCULAR TROCAS DO BUBBLE SORT ==========
function calcularTrocasBubbleSort(arr) {
    let trocas = 0;
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Trocar
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                trocas++;
            }
        }
    }
    
    return trocas;
}

// ========== RENDERIZAÇÃO INICIAL ==========
function renderizarInterfaceInicial() {
    const grid = document.getElementById('arraysGrid');
    grid.innerHTML = '';
    
    casosOriginais.forEach((caso, index) => {
        const container = criarContainerArray(caso, index);
        grid.appendChild(container);
    });
}

// ========== CRIAR CONTAINER DE ARRAY ==========
function criarContainerArray(caso, index) {
    const container = document.createElement('div');
    container.className = 'array-container';
    container.id = `array-${index}`;
    
    // Título
    const title = document.createElement('div');
    title.className = 'array-title';
    title.textContent = caso.nome;
    
    // Informação
    const info = document.createElement('div');
    info.className = 'array-info';
    info.innerHTML = `Tamanho: <span>${caso.array.length}</span> elementos | Trocas esperadas: <span>${trocasEsperadas[index]}</span>`;
    
    // Status
    const status = document.createElement('div');
    status.className = 'array-status';
    status.id = `status-${index}`;
    
    // Visualização
    const visualization = criarVisualizacao(caso.array, index);
    
    // Botão Play
    const playButton = document.createElement('button');
    playButton.className = 'play-button';
    playButton.id = `play-${index}`;
    playButton.innerHTML = '<span class="play-icon">▶️</span> Reproduzir Animação';
    playButton.onclick = () => reproduzirAnimacao(index);
    playButton.style.display = 'none'; // Oculto até executar
    
    // Estatísticas
    const stats = criarEstatisticas(index);
    
    // Feedback
    const feedback = document.createElement('div');
    feedback.className = 'feedback-list';
    feedback.id = `feedback-${index}`;
    
    container.appendChild(title);
    container.appendChild(info);
    container.appendChild(status);
    container.appendChild(visualization);
    container.appendChild(playButton);
    container.appendChild(stats);
    container.appendChild(feedback);
    
    return container;
}

// ========== CRIAR VISUALIZAÇÃO ==========
function criarVisualizacao(array, caseIndex) {
    const viz = document.createElement('div');
    viz.className = 'array-visualization';
    viz.id = `viz-${caseIndex}`;
    
    const maxValue = Math.max(...array);
    const barWidth = 40;
    const gap = 8;
    const totalWidth = array.length * (barWidth + gap) - gap;
    
    // Centralizar considerando a largura do container
    setTimeout(() => {
        const vizWidth = viz.offsetWidth;
        const startX = (vizWidth - totalWidth) / 2;
        
        array.forEach((value, idx) => {
            const barContainer = document.getElementById(`bar-${caseIndex}-${idx}`).parentElement;
            if (barContainer) {
                barContainer.style.left = `${startX + idx * (barWidth + gap)}px`;
            }
        });
    }, 0);
    
    array.forEach((value, idx) => {
        const barContainer = document.createElement('div');
        barContainer.className = 'array-bar';
        barContainer.style.left = '0px'; // Será ajustado depois
        
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.id = `bar-${caseIndex}-${idx}`;
        bar.textContent = value;
        
        // Altura proporcional ao valor
        const height = (value / maxValue) * 100 + 30;
        bar.style.height = `${height}px`;
        
        barContainer.appendChild(bar);
        viz.appendChild(barContainer);
    });
    
    return viz;
}

// ========== CRIAR ESTATÍSTICAS ==========
function criarEstatisticas(index) {
    const stats = document.createElement('div');
    stats.className = 'array-stats';
    stats.innerHTML = `
        <div class="stat-item">
            <div class="stat-label">Comparações</div>
            <div class="stat-value" id="comparacoes-${index}">0</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Trocas</div>
            <div class="stat-value" id="trocas-${index}">0</div>
        </div>
    `;
    return stats;
}

// ========== EXECUTAR TODOS OS CASOS ==========
async function executarTodos() {
    if (executando) return;
    
    const btn = document.querySelector('.btn');
    btn.disabled = true;
    btn.textContent = '⏳ Executando...';
    executando = true;
    
    // Resetar animações pendentes
    animacoesPendentes = [];
    
    for (let i = 0; i < casosOriginais.length; i++) {
        animacoesPendentes[i] = [];
        await executarCaso(i);
    }
    
    btn.disabled = false;
    btn.textContent = '▶️ Executar Bubble Sort';
    executando = false;
}

// ========== EXECUTAR UM CASO ==========
async function executarCaso(index) {
    const caso = casosOriginais[index];
    const arrayClone = [...caso.array];
    
    // Resetar estatísticas
    document.getElementById(`comparacoes-${index}`).textContent = '0';
    document.getElementById(`trocas-${index}`).textContent = '0';
    
    // Resetar visualização para estado original
    resetarVisualizacao(index, caso.array);
    
    // Configurar contexto de execução
    execucaoAtual = {
        index: index,
        array: arrayClone,
        comparacoes: 0,
        trocas: 0,
        elementosOriginais: new Set(caso.array),
        animacoes: []
    };
    
    try {
        // Executar bubble sort do aluno (sem animação em tempo real)
        const resultado = await bubbleSort(arrayClone, registrarComparacao, registrarTroca);
        
        // Salvar animações
        animacoesPendentes[index] = execucaoAtual.animacoes;
        
        // Atualizar contadores finais
        document.getElementById(`comparacoes-${index}`).textContent = execucaoAtual.comparacoes;
        document.getElementById(`trocas-${index}`).textContent = execucaoAtual.trocas;
        
        // Validar resultado
        const validacao = validarResultado(caso, resultado, index);
        
        // Atualizar interface
        if (validacao.valido) {
            atualizarStatus(index, 'success', '✅ Solução válida!');
        } else {
            atualizarStatus(index, 'error', '❌ Solução inválida');
        }
        
        // Mostrar feedback
        mostrarFeedback(index, validacao);
        
        // Mostrar resultado final na visualização
        mostrarResultadoFinal(index, resultado);
        
        // Mostrar botão play se houver animações
        if (animacoesPendentes[index].length > 0) {
            document.getElementById(`play-${index}`).style.display = 'block';
        }
        
    } catch (error) {
        atualizarStatus(index, 'error', `❌ Erro: ${error.message}`);
        mostrarFeedback(index, {
            feedbacks: [`Erro ao executar: ${error.message}`]
        });
    }
    
    execucaoAtual = null;
}

// ========== FUNÇÕES PARA O ALUNO CHAMAR ==========

async function registrarComparacao(i, j) {
    if (!execucaoAtual) return;
    
    execucaoAtual.comparacoes++;
    
    // Armazenar animação ao invés de executar
    execucaoAtual.animacoes.push({
        tipo: 'comparacao',
        indices: [i, j]
    });
}

async function registrarTroca(i, j) {
    if (!execucaoAtual) return;
    
    execucaoAtual.trocas++;
    
    // Armazenar animação ao invés de executar
    execucaoAtual.animacoes.push({
        tipo: 'troca',
        indices: [i, j]
    });
}

// ========== REPRODUZIR ANIMAÇÃO ==========
async function reproduzirAnimacao(index) {
    const playButton = document.getElementById(`play-${index}`);
    const animacoes = animacoesPendentes[index];
    
    if (!animacoes || animacoes.length === 0) return;
    
    // Se já está executando, parar
    if (animacoesEmExecucao[index]) {
        animacoesEmExecucao[index] = false;
        playButton.innerHTML = '<span class="play-icon">▶️</span> Reproduzir Animação';
        playButton.classList.remove('playing');
        return;
    }
    
    // Iniciar execução
    animacoesEmExecucao[index] = true;
    playButton.innerHTML = '<span class="play-icon">⏹️</span> Parar Animação';
    playButton.classList.add('playing');
    
    // Resetar para estado inicial
    const caso = casosOriginais[index];
    resetarVisualizacao(index, caso.array);
    
    // Array de trabalho para simular o estado atual
    const arrayAtual = [...caso.array];
    
    // Mapa de posição visual: qual índice DOM está em qual posição lógica
    const posicaoVisual = arrayAtual.map((_, i) => i);
    
    // Reproduzir cada animação
    for (let i = 0; i < animacoes.length && animacoesEmExecucao[index]; i++) {
        const anim = animacoes[i];
        
        if (anim.tipo === 'comparacao') {
            // Pegar os índices visuais corretos
            const visualI = posicaoVisual[anim.indices[0]];
            const visualJ = posicaoVisual[anim.indices[1]];
            await animarComparacao(index, visualI, visualJ);
        } else if (anim.tipo === 'troca') {
            // Pegar os índices visuais corretos
            const visualI = posicaoVisual[anim.indices[0]];
            const visualJ = posicaoVisual[anim.indices[1]];
            await animarTroca(index, visualI, visualJ, arrayAtual);
            
            // Trocar no array lógico
            [arrayAtual[anim.indices[0]], arrayAtual[anim.indices[1]]] = 
            [arrayAtual[anim.indices[1]], arrayAtual[anim.indices[0]]];
            
            // Atualizar mapa de posição visual
            [posicaoVisual[anim.indices[0]], posicaoVisual[anim.indices[1]]] = 
            [posicaoVisual[anim.indices[1]], posicaoVisual[anim.indices[0]]];
        }
    }
    
    // Se completou (não foi interrompido)
    if (animacoesEmExecucao[index]) {
        // Marcar todos como ordenados
        await marcarTodosOrdenados(index);
    }
    
    // Finalizar
    animacoesEmExecucao[index] = false;
    playButton.innerHTML = '<span class="play-icon">▶️</span> Reproduzir Animação';
    playButton.classList.remove('playing');
}

// ========== ANIMAR COMPARAÇÃO ==========
async function animarComparacao(index, i, j) {
    const bar1 = document.getElementById(`bar-${index}-${i}`).parentElement;
    const bar2 = document.getElementById(`bar-${index}-${j}`).parentElement;
    const barEl1 = document.getElementById(`bar-${index}-${i}`);
    const barEl2 = document.getElementById(`bar-${index}-${j}`);
    
    if (barEl1) barEl1.classList.add('comparing');
    if (barEl2) barEl2.classList.add('comparing');
    
    await sleep(400);
    
    if (barEl1) barEl1.classList.remove('comparing');
    if (barEl2) barEl2.classList.remove('comparing');
}

// ========== ANIMAR TROCA ==========
async function animarTroca(index, i, j, arrayAtual) {
    const bar1 = document.getElementById(`bar-${index}-${i}`).parentElement;
    const bar2 = document.getElementById(`bar-${index}-${j}`).parentElement;
    const barEl1 = document.getElementById(`bar-${index}-${i}`);
    const barEl2 = document.getElementById(`bar-${index}-${j}`);
    
    // Destacar como trocando
    if (barEl1) barEl1.classList.add('swapping');
    if (barEl2) barEl2.classList.add('swapping');
    
    await sleep(200);
    
    // Obter posições atuais
    const pos1 = parseInt(bar1.style.left);
    const pos2 = parseInt(bar2.style.left);
    
    // Trocar posições
    bar1.style.left = `${pos2}px`;
    bar2.style.left = `${pos1}px`;
    
    await sleep(600);
    
    // Remover destaque
    if (barEl1) barEl1.classList.remove('swapping');
    if (barEl2) barEl2.classList.remove('swapping');
    
    await sleep(100);
}

// ========== RESETAR VISUALIZAÇÃO ==========
function resetarVisualizacao(index, array) {
    const viz = document.getElementById(`viz-${index}`);
    const maxValue = Math.max(...array);
    const barWidth = 40;
    const gap = 8;
    const totalWidth = array.length * (barWidth + gap) - gap;
    const vizWidth = viz.offsetWidth;
    const startX = (vizWidth - totalWidth) / 2;
    
    array.forEach((value, idx) => {
        const barContainer = document.getElementById(`bar-${index}-${idx}`).parentElement;
        const bar = document.getElementById(`bar-${index}-${idx}`);
        
        if (barContainer) {
            barContainer.style.left = `${startX + idx * (barWidth + gap)}px`;
        }
        
        if (bar) {
            bar.classList.remove('comparing', 'swapping', 'sorted');
            bar.textContent = value;
            const height = (value / maxValue) * 100 + 30;
            bar.style.height = `${height}px`;
        }
    });
}

// ========== MOSTRAR RESULTADO FINAL ==========
function mostrarResultadoFinal(index, arrayOrdenado) {
    const viz = document.getElementById(`viz-${index}`);
    const maxValue = Math.max(...arrayOrdenado);
    const barWidth = 40;
    const gap = 8;
    const totalWidth = arrayOrdenado.length * (barWidth + gap) - gap;
    const vizWidth = viz.offsetWidth;
    const startX = (vizWidth - totalWidth) / 2;
    
    arrayOrdenado.forEach((value, idx) => {
        const barContainer = document.getElementById(`bar-${index}-${idx}`).parentElement;
        const bar = document.getElementById(`bar-${index}-${idx}`);
        
        if (barContainer) {
            barContainer.style.left = `${startX + idx * (barWidth + gap)}px`;
        }
        
        if (bar) {
            bar.classList.remove('comparing', 'swapping');
            bar.classList.add('sorted');
            bar.textContent = value;
            const height = (value / maxValue) * 100 + 30;
            bar.style.height = `${height}px`;
        }
    });
}

// ========== MARCAR TODOS COMO ORDENADOS ==========
async function marcarTodosOrdenados(index) {
    const caso = casosOriginais[index];
    for (let i = 0; i < caso.array.length; i++) {
        const bar = document.getElementById(`bar-${index}-${i}`);
        if (bar) {
            bar.classList.add('sorted');
            await sleep(50);
        }
    }
}

// ========== VALIDAÇÃO ==========
function validarResultado(caso, resultado, index) {
    const feedbacks = [];
    let valido = true;
    
    // 1. Verificar se é um array
    if (!Array.isArray(resultado)) {
        feedbacks.push('❌ Retorno não é um array');
        return { valido: false, feedbacks };
    }
    
    // 2. Verificar tamanho do array
    if (resultado.length !== caso.array.length) {
        feedbacks.push(`❌ Tamanho do array foi alterado. Original: ${caso.array.length}, Resultado: ${resultado.length}`);
        valido = false;
    } else {
        feedbacks.push(`✅ Tamanho do array mantido: ${resultado.length} elementos`);
    }
    
    // 3. Verificar se conteúdo foi preservado (mesmos elementos)
    const elementosOriginais = {};
    const elementosResultado = {};
    
    caso.array.forEach(el => {
        elementosOriginais[el] = (elementosOriginais[el] || 0) + 1;
    });
    
    resultado.forEach(el => {
        elementosResultado[el] = (elementosResultado[el] || 0) + 1;
    });
    
    let conteudoAlterado = false;
    for (let key in elementosOriginais) {
        if (elementosOriginais[key] !== elementosResultado[key]) {
            conteudoAlterado = true;
            break;
        }
    }
    
    if (conteudoAlterado) {
        feedbacks.push('❌ Conteúdo do array foi alterado (elementos adicionados/removidos)');
        valido = false;
    } else {
        feedbacks.push('✅ Conteúdo do array preservado');
    }
    
    // 4. Verificar se está ordenado
    let ordenado = true;
    for (let i = 0; i < resultado.length - 1; i++) {
        if (resultado[i] > resultado[i + 1]) {
            ordenado = false;
            break;
        }
    }
    
    if (!ordenado) {
        feedbacks.push('❌ Array não está ordenado corretamente');
        valido = false;
    } else {
        feedbacks.push('✅ Array ordenado corretamente');
    }
    
    // 5. Verificar número de trocas
    const trocasRealizadas = execucaoAtual ? execucaoAtual.trocas : 0;
    const trocasEsperadasCaso = trocasEsperadas[index];
    
    if (trocasRealizadas === trocasEsperadasCaso) {
        feedbacks.push(`✅ Número de trocas correto: ${trocasRealizadas}`);
    } else if (trocasRealizadas < trocasEsperadasCaso) {
        feedbacks.push(`⚠️ Menos trocas que o esperado. Realizadas: ${trocasRealizadas}, Esperadas: ${trocasEsperadasCaso}`);
        // Pode ser otimização, não marcar como inválido necessariamente
    } else {
        feedbacks.push(`❌ Mais trocas que o esperado. Realizadas: ${trocasRealizadas}, Esperadas: ${trocasEsperadasCaso}`);
        valido = false;
    }
    
    return { valido, feedbacks };
}

// ========== ATUALIZAR STATUS ==========
function atualizarStatus(index, tipo, mensagem) {
    const status = document.getElementById(`status-${index}`);
    status.className = `array-status status-${tipo} visible`;
    status.textContent = mensagem;
}

// ========== MOSTRAR FEEDBACK ==========
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

// ========== UTILIDADE ==========
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}