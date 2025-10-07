# 📐 Template para Exercícios de JavaScript - Guia Completo

Este documento descreve a estrutura completa para criar exercícios interativos de JavaScript com validação automática, feedback visual e documentação integrada.

---

## 📁 Estrutura de Arquivos

Todos os exercícios devem seguir esta estrutura de arquivos:

```
exercicio-nome/
├── index.html              # Página principal
├── styles.css              # Estilos visuais
├── readme-content.js       # Conteúdo do README em formato string
├── dados.js                # Dados de teste (casos de teste)
├── solucao.js              # Arquivo do aluno (apenas assinatura da função)
├── main.js                 # Lógica de validação e interface
└── README.md               # Documentação completa (opcional - para download)
```

---

## 🎨 1. Arquivo: `index.html`

### Estrutura Básica

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercício: [Nome do Exercício]</title>
    <link rel="stylesheet" href="styles.css">
    <!-- Biblioteca para renderizar Markdown -->
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
</head>
<body>
    <div class="container">
        <!-- 1. HEADER -->
        <h1>🎯 Exercício: [Nome do Exercício]</h1>
        
        <!-- 2. OBJETIVO RÁPIDO -->
        <div class="instructions">
            <h3>📋 Objetivo</h3>
            <p>[Descrição curta e direta do que o aluno deve fazer]</p>
        </div>

        <!-- 3. README COLAPSÁVEL -->
        <div class="readme-container">
            <button class="readme-toggle" onclick="toggleReadme()">
                <span id="readme-icon">▶</span> Instruções Completas (README)
            </button>
            <div class="readme-content" id="readmeContent">
                <div id="markdownContent"></div>
            </div>
        </div>

        <!-- 4. BOTÃO DE EXECUÇÃO -->
        <div class="controls">
            <button class="btn" onclick="executarTodos()">▶️ Executar Solução</button>
        </div>

        <!-- 5. LEGENDA (se necessário) -->
        <div class="legend">
            <!-- Elementos visuais explicativos -->
        </div>

        <!-- 6. ÁREA DE RESULTADOS -->
        <div class="results-grid" id="resultsGrid"></div>
    </div>

    <!-- ORDEM DE IMPORTAÇÃO É IMPORTANTE! -->
    <script src="readme-content.js"></script>
    <script src="dados.js"></script>
    <script src="solucao.js"></script>
    <script src="main.js"></script>
</body>
</html>
```

### Elementos Essenciais

1. **Header (`<h1>`)**: Título claro com emoji relevante
2. **Objetivo (`instructions`)**: Descrição curta (1-2 frases)
3. **README Colapsável**: Instruções completas escondidas inicialmente
4. **Botão de Execução**: Sempre chamando função `executarTodos()`
5. **Área de Resultados**: Container dinâmico para mostrar outputs

---

## 🎨 2. Arquivo: `styles.css`

### Estrutura Base Obrigatória

```css
/* ========== RESET E BASE ========== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

/* ========== CONTAINER PRINCIPAL ========== */
.container {
    max-width: 1400px;
    margin: 0 auto;
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

/* ========== HEADER ========== */
h1 {
    color: #333;
    margin-bottom: 10px;
    text-align: center;
}

/* ========== CAIXA DE OBJETIVO ========== */
.instructions {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    border-left: 4px solid #667eea;
}

.instructions h3 {
    color: #667eea;
    margin-bottom: 8px;
}

.instructions p {
    color: #555;
    line-height: 1.6;
}

/* ========== README COLAPSÁVEL ========== */
.readme-container {
    margin-bottom: 20px;
}

.readme-toggle {
    width: 100%;
    background: #667eea;
    color: white;
    border: none;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    transition: background 0.3s;
    display: flex;
    align-items: center;
    gap: 10px;
}

.readme-toggle:hover {
    background: #5568d3;
}

#readme-icon {
    display: inline-block;
    transition: transform 0.3s;
    font-size: 14px;
}

.readme-content {
    display: none;
    background: #f8f9fa;
    border: 2px solid #667eea;
    border-top: none;
    border-radius: 0 0 8px 8px;
    padding: 20px;
    margin-top: -8px;
    max-height: 600px;
    overflow-y: auto;
}

/* ========== ESTILOS MARKDOWN ========== */
#markdownContent h1 {
    color: #667eea;
    font-size: 28px;
    margin-top: 20px;
    margin-bottom: 15px;
    border-bottom: 2px solid #667eea;
    padding-bottom: 10px;
}

#markdownContent h2 {
    color: #764ba2;
    font-size: 22px;
    margin-top: 25px;
    margin-bottom: 12px;
}

#markdownContent h3 {
    color: #333;
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 10px;
}

#markdownContent p {
    margin-bottom: 12px;
    line-height: 1.6;
    color: #555;
}

#markdownContent ul, #markdownContent ol {
    margin-left: 25px;
    margin-bottom: 15px;
}

#markdownContent li {
    margin-bottom: 8px;
    line-height: 1.6;
}

#markdownContent code {
    background: #e9ecef;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    color: #d63384;
}

#markdownContent pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 15px;
}

#markdownContent pre code {
    background: none;
    padding: 0;
    color: #f8f8f2;
}

/* ========== BOTÃO DE EXECUÇÃO ========== */
.controls {
    text-align: center;
    margin-bottom: 30px;
}

.btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 15px 40px;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    font-weight: 600;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.btn:active {
    transform: translateY(0);
}

/* ========== STATUS (Sucesso/Erro) ========== */
.status {
    text-align: center;
    padding: 8px;
    border-radius: 6px;
    margin-bottom: 15px;
    font-weight: 600;
    display: none;
}

.status.visible {
    display: block;
}

.status-success {
    background: #d4edda;
    color: #155724;
}

.status-error {
    background: #f8d7da;
    color: #721c24;
}

/* ========== FEEDBACK (Lista Amarela) ========== */
.feedback-list {
    margin-top: 10px;
    padding: 12px;
    background: #fff3cd;
    border-left: 4px solid #ffc107;
    border-radius: 6px;
    display: none;
}

.feedback-list.visible {
    display: block;
}

.feedback-list ul {
    margin: 5px 0 0 20px;
    padding: 0;
}

.feedback-list li {
    color: #856404;
    margin: 5px 0;
    line-height: 1.5;
}

.feedback-title {
    font-weight: 600;
    color: #856404;
    margin-bottom: 5px;
}
```

### Cores Padrão do Template

- **Primária**: `#667eea` (Azul/Roxo)
- **Secundária**: `#764ba2` (Roxo)
- **Sucesso**: `#d4edda` (Verde claro)
- **Erro**: `#f8d7da` (Vermelho claro)
- **Warning**: `#fff3cd` (Amarelo claro)
- **Fundo**: Gradiente `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

---

## 📝 3. Arquivo: `readme-content.js`

### Template Base

```javascript
// Conteúdo do README.md em formato string para ser renderizado como Markdown
const readmeMarkdown = `# 🎯 Exercício: [Nome do Exercício]

## 📋 Descrição

[Descrição detalhada do exercício - 2-3 parágrafos]

## 🎓 Objetivo de Aprendizagem

- [Conceito 1]
- [Conceito 2]
- [Conceito 3]
- [Conceito 4]

## 📁 Estrutura dos Arquivos

\\\`\\\`\\\`
exercicio-nome/
├── index.html          # Página principal
├── styles.css          # Estilos da página
├── dados.js            # Dados de teste
├── solucao.js          # SEU ARQUIVO - implemente aqui!
├── main.js             # Sistema de validação (não modificar)
├── readme-content.js   # Conteúdo deste README
└── README.md           # Este arquivo
\\\`\\\`\\\`

## 🚀 Como Executar

### Pré-requisitos
- VSCode instalado
- Node.js 22 instalado

### Passo a Passo

1. **Baixe todos os arquivos** do exercício e coloque-os na mesma pasta

2. **Abra a pasta no VSCode:**
   \\\`\\\`\\\`bash
   cd caminho/para/exercicio-nome
   code .
   \\\`\\\`\\\`

3. **Instale a extensão "Live Server"** no VSCode:
   - Abra a aba de extensões (Ctrl+Shift+X)
   - Busque por "Live Server"
   - Instale a extensão de Ritwick Dey

4. **Execute o projeto:**
   - Clique com o botão direito no arquivo \\\`index.html\\\`
   - Selecione "Open with Live Server"
   - O navegador abrirá automaticamente

5. **Implemente sua solução** no arquivo \\\`solucao.js\\\`

6. **Teste sua solução:**
   - Salve o arquivo \\\`solucao.js\\\`
   - A página recarregará automaticamente
   - Clique no botão "▶️ Executar Solução"

## 📝 Especificação do Exercício

### Função a Implementar

\\\`\\\`\\\`javascript
function nomeDaFuncao(parametro1, parametro2)
\\\`\\\`\\\`

### Entrada
- \\\`parametro1\\\`: [Descrição do parâmetro]
- \\\`parametro2\\\`: [Descrição do parâmetro]

### Saída
- [Descrição do que deve ser retornado]

### Regras
1. ✅ [Regra 1]
2. ✅ [Regra 2]
3. ❌ [Restrição 1]
4. ❌ [Restrição 2]

### Exemplo Visual

**Entrada:**
\\\`\\\`\\\`
[Exemplo de entrada]
\\\`\\\`\\\`

**Saída:**
\\\`\\\`\\\`
[Exemplo de saída esperada]
\\\`\\\`\\\`

## 💡 Dicas de Implementação

### [Algoritmo/Técnica Principal]

1. **[Passo 1]**
   \\\`\\\`\\\`javascript
   // Código de exemplo
   \\\`\\\`\\\`

2. **[Passo 2]**
   \\\`\\\`\\\`javascript
   // Código de exemplo
   \\\`\\\`\\\`

[Continue com mais passos...]

## ✅ Validação Automática

O sistema verifica automaticamente:
- ✅ [Critério 1]
- ✅ [Critério 2]
- ✅ [Critério 3]

### Feedback Visual:
- 🟢 **Verde**: Solução válida!
- 🔴 **Vermelho**: Erro encontrado
- 🟡 **Amarelo**: Avisos/Detalhes

## 📚 Recursos de Estudo

### [Tópico 1]
- [Link 1 com descrição]
- [Link 2 com descrição]

### [Tópico 2]
- [Link 3 com descrição]
- [Link 4 com descrição]

## 🎮 Desafios Extras

Depois de resolver o exercício básico, tente:

1. **[Desafio 1]**: [Descrição]
2. **[Desafio 2]**: [Descrição]
3. **[Desafio 3]**: [Descrição]

## ❓ Problemas Comuns

### "[Erro comum 1]"
- [Solução/Explicação]

### "[Erro comum 2]"
- [Solução/Explicação]

### "[Erro comum 3]"
- [Solução/Explicação]

## 🏆 Critérios de Avaliação

- ✅ [Critério 1]
- ✅ [Critério 2]
- ✅ [Critério 3]
- ✅ [Critério 4]

## 📞 Suporte

Se tiver dúvidas, revise:
1. As especificações acima
2. Os comentários no arquivo \\\`solucao.js\\\`
3. Os recursos de estudo recomendados

Boa sorte! 🚀
`;
```

### Estrutura Obrigatória do README

Todas as seções devem seguir esta ordem:

1. **Título com emoji**
2. **📋 Descrição** - O que é o exercício
3. **🎓 Objetivo de Aprendizagem** - O que o aluno vai aprender
4. **📁 Estrutura dos Arquivos** - Lista de arquivos do projeto
5. **🚀 Como Executar** - Passo a passo detalhado
6. **📝 Especificação do Exercício** - Detalhes técnicos
7. **💡 Dicas de Implementação** - Guia de solução
8. **✅ Validação Automática** - O que é testado
9. **📚 Recursos de Estudo** - Links úteis
10. **🎮 Desafios Extras** - Extensões opcionais
11. **❓ Problemas Comuns** - FAQ
12. **🏆 Critérios de Avaliação** - Como será avaliado
13. **📞 Suporte** - Onde buscar ajuda

---

## 📊 4. Arquivo: `dados.js`

### Template Base

```javascript
// Array com casos de teste
// Adapte conforme o tipo de exercício

const casosDeTeste = [
    {
        nome: "Caso Simples",
        entrada: {
            // Dados de entrada para o caso de teste
            param1: valorExemplo1,
            param2: valorExemplo2
        },
        esperado: resultadoEsperado,
        descricao: "Descrição opcional do caso"
    },
    {
        nome: "Caso Médio",
        entrada: {
            param1: valorExemplo3,
            param2: valorExemplo4
        },
        esperado: resultadoEsperado2,
        descricao: "Descrição opcional"
    },
    {
        nome: "Caso Complexo",
        entrada: {
            param1: valorExemplo5,
            param2: valorExemplo6
        },
        esperado: resultadoEsperado3,
        descricao: "Descrição opcional"
    }
];
```

### Boas Práticas

1. **Mínimo de 3-4 casos de teste**
2. **Progressão de dificuldade**: Simples → Médio → Complexo
3. **Nomes descritivos** para cada caso
4. **Inclua casos de borda** quando relevante
5. **Documente casos especiais** com `descricao`

---

## 👨‍💻 5. Arquivo: `solucao.js`

### Template Base

```javascript
/**
 * EXERCÍCIO: [NOME DO EXERCÍCIO]
 * 
 * [Descrição breve do que deve ser implementado]
 * 
 * ENTRADA:
 * - parametro1: [Tipo] - [Descrição]
 * - parametro2: [Tipo] - [Descrição]
 * 
 * SAÍDA:
 * - [Tipo de retorno] - [Descrição do retorno]
 * 
 * REGRAS:
 * - [Regra 1]
 * - [Regra 2]
 * - [Regra 3]
 * 
 * DICAS:
 * - [Dica 1]
 * - [Dica 2]
 * 
 * EXEMPLO:
 * Entrada: nomeDaFuncao(exemplo1, exemplo2)
 * Saída: resultadoEsperado
 */

function nomeDaFuncao(parametro1, parametro2) {
    // IMPLEMENTE SUA SOLUÇÃO AQUI
    
    // TODO: [Passo 1]
    // TODO: [Passo 2]
    // TODO: [Passo 3]
    
    return null; // Altere conforme necessário
}
```

### Boas Práticas

1. **JSDoc completo** no início
2. **TODOs descritivos** para guiar o aluno
3. **Apenas a assinatura** da função (sem implementação)
4. **Exemplo claro** de uso
5. **Return padrão** (null, [], {}, etc)

---

## ⚙️ 6. Arquivo: `main.js`

### Estrutura Básica Obrigatória

```javascript
// ========== VARIÁVEIS GLOBAIS ==========
let dadosOriginais = [];
let resultadosEsperados = [];

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
    // Clonar dados originais
    dadosOriginais = casosDeTeste.map(caso => ({
        ...caso,
        entrada: JSON.parse(JSON.stringify(caso.entrada))
    }));
    
    // Calcular resultados esperados (se necessário)
    // Ex: resultadosEsperados = dadosOriginais.map(calcularResultadoCorreto);
}

// ========== RENDERIZAÇÃO INICIAL ==========
function renderizarInterfaceInicial() {
    const grid = document.getElementById('resultsGrid');
    grid.innerHTML = '';
    
    dadosOriginais.forEach((caso, index) => {
        const container = criarContainerCaso(caso, index);
        grid.appendChild(container);
    });
}

// ========== CRIAR CONTAINER DE CASO ==========
function criarContainerCaso(caso, index) {
    const container = document.createElement('div');
    container.className = 'case-container';
    container.id = `case-${index}`;
    
    // Título
    const title = document.createElement('div');
    title.className = 'case-title';
    title.textContent = caso.nome;
    
    // Status (inicialmente oculto)
    const status = document.createElement('div');
    status.className = 'status';
    status.id = `status-${index}`;
    
    // Visualização (adaptar conforme necessário)
    const visualization = criarVisualizacao(caso, index);
    
    // Feedback
    const feedback = document.createElement('div');
    feedback.className = 'feedback-list';
    feedback.id = `feedback-${index}`;
    
    container.appendChild(title);
    container.appendChild(status);
    container.appendChild(visualization);
    container.appendChild(feedback);
    
    return container;
}

// ========== EXECUTAR TODOS OS CASOS ==========
function executarTodos() {
    dadosOriginais.forEach((caso, index) => {
        try {
            // Executar função do aluno
            const resultado = nomeDaFuncao(caso.entrada.param1, caso.entrada.param2);
            
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
            
            // Atualizar visualização
            atualizarVisualizacao(index, resultado);
            
        } catch (error) {
            atualizarStatus(index, 'error', `❌ Erro: ${error.message}`);
            mostrarFeedback(index, {
                feedbacks: [`Erro ao executar: ${error.message}`]
            });
        }
    });
}

// ========== VALIDAÇÃO ==========
function validarResultado(caso, resultado, index) {
    const feedbacks = [];
    let valido = true;
    
    // Implementar validações específicas do exercício
    // Exemplo:
    
    // 1. Verificar tipo
    if (typeof resultado !== 'tipo_esperado') {
        feedbacks.push('❌ Tipo de retorno incorreto');
        valido = false;
    }
    
    // 2. Verificar resultado
    if (resultado !== caso.esperado) {
        feedbacks.push(`❌ Resultado incorreto. Esperado: ${caso.esperado}, Recebido: ${resultado}`);
        valido = false;
    } else {
        feedbacks.push('✅ Resultado correto');
    }
    
    // 3. Validações adicionais conforme necessário
    
    return { valido, feedbacks };
}

// ========== ATUALIZAR STATUS ==========
function atualizarStatus(index, tipo, mensagem) {
    const status = document.getElementById(`status-${index}`);
    status.className = `status status-${tipo} visible`;
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

// ========== FUNÇÕES AUXILIARES ==========
// Adicionar funções específicas conforme necessário
```

### Elementos Essenciais do main.js

1. **toggleReadme()** - Sempre presente
2. **DOMContentLoaded** - Inicialização única
3. **executarTodos()** - Função principal chamada pelo botão
4. **Validação em 3 etapas**:
   - Executar função do aluno
   - Validar resultado
   - Atualizar interface com feedback
5. **Tratamento de erros** com try/catch
6. **Feedback detalhado** sempre em lista amarela

---

## ✅ Checklist de Qualidade

Use este checklist para garantir que o exercício está completo:

### Interface
- [ ] Header com emoji e título claro
- [ ] Caixa de objetivo (1-2 frases)
- [ ] README colapsável funcionando
- [ ] Botão de execução centralizado
- [ ] Legenda (se aplicável)
- [ ] Área de resultados renderizando corretamente

### Funcionalidade
- [ ] Todos os scripts carregando na ordem correta
- [ ] Função do aluno definida em `solucao.js`
- [ ] Mínimo de 3 casos de teste
- [ ] Validação completa implementada
- [ ] Feedback detalhado para cada caso
- [ ] Tratamento de erros funcionando

### Documentação
- [ ] README com todas as 13 seções
- [ ] Exemplos de código em Markdown
- [ ] Dicas de implementação claras
- [ ] Links para recursos externos
- [ ] Problemas comuns documentados

### Visual
- [ ] Cores do template aplicadas
- [ ] Status verde/vermelho visíveis
- [ ] Feedback amarelo com lista
- [ ] Markdown renderizando corretamente
- [ ] Layout responsivo

### Código
- [ ] Código comentado adequadamente
- [ ] Funções com nomes descritivos
- [ ] Sem código duplicado
- [ ] Variáveis com nomes claros
- [ ] Estrutura consistente

---

## 🎯 Exemplo Completo de Fluxo

### 1. Aluno abre a página
- Vê o título e objetivo
- Vê a interface inicial (antes da execução)
- Pode expandir o README para ler instruções completas

### 2. Aluno implementa a solução
- Abre `solucao.js` no VSCode
- Implementa a função seguindo os TODOs
- Salva o arquivo

### 3. Aluno testa a solução
- Clica no botão "▶️ Executar Solução"
- Sistema executa função para todos os casos de teste
- Interface atualiza mostrando:
  - Status verde (✅) ou vermelho (❌)
  - Visualização do resultado
  - Lista amarela com feedback detalhado

### 4. Aluno itera
- Lê o feedback
- Corrige a implementação
- Testa novamente
- Repete até todos os casos passarem

---

## 💡 Dicas de Implementação

### Para Exercícios com Visualização Complexa

Se o exercício precisa de visualização customizada (como o labirinto):

1. Crie classes CSS específicas para elementos visuais
2. Implemente função `criarVisualizacao()` personalizada
3. Adicione função `atualizarVisualizacao()` para mostrar resultados
4. Use cores consistentes com o tema

### Para Exercícios com Múltiplos Parâmetros

```javascript
// Em dados.js
entrada: {
    param1: valor1,
    param2: valor2,
    param3: valor3
}

// Ao chamar a função
const resultado = nomeDaFuncao(
    caso.entrada.param1,
    caso.entrada.param2,
    caso.entrada.param3
);
```

### Para Exercícios com Validação Complexa

Crie funções auxiliares de validação:

```javascript
function validarTipo(valor, tipoEsperado) { /* ... */ }
function validarEstrutura(objeto, estruturaEsperada) { /* ... */ }
function validarConteudo(array, regraDeConteudo) { /* ... */ }
```

### Para Exercícios com Estado Mutável

Sempre clone os dados antes de passar para função do aluno:

```javascript
const entradaClonada = JSON.parse(JSON.stringify(caso.entrada));
const resultado = funcaoDoAluno(entradaClonada);
```

---

## 📦 Template Completo para Download

Para facilitar, mantenha um template base com:

1. Estrutura de pastas vazia
2. HTML base com placeholders `[NOME]`, `[DESCRIÇÃO]`
3. CSS completo (não muda entre exercícios)
4. `main.js` com estrutura básica
5. `solucao.js` com template de comentários
6. `readme-content.js` com estrutura completa

**Processo de criação:**
1. Copie o template
2. Substitua os placeholders
3. Implemente a validação específica
4. Crie os casos de teste
5. Teste com solução correta e incorreta
6. Revise checklist de qualidade

---

## 🔧 Manutenção e Melhorias

### Quando Adicionar Novos Recursos

- Sempre mantenha consistência visual
- Documente no README se afetar o aluno
- Atualize este template com padrões novos
- Teste em diferentes navegadores

### Quando Corrigir Bugs

- Verifique se afeta outros exercícios
- Atualize o template se necessário
- Documente no README se relevante

---

## 📞 Suporte

Para dúvidas sobre este template:
1. Revise as seções acima
2. Compare com exercício do labirinto (referência completa)
3. Verifique checklist de qualidade

**Mantenha este documento atualizado conforme novos padrões são estabelecidos!**

---

**Versão:** 1.0  
**Última Atualização:** Outubro 2025  
**Baseado em:** Exercício Resolvedor de Labirin