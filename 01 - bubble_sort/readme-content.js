// Conteúdo do README.md em formato string para ser renderizado como Markdown
const readmeMarkdown = `# 🔄 Exercício: Bubble Sort

## 📋 Descrição

O **Bubble Sort** é um dos algoritmos de ordenação mais simples e fundamentais na Ciência da Computação. Ele funciona comparando repetidamente pares de elementos adjacentes e trocando-os se estiverem na ordem errada. O nome "Bubble" (bolha) vem do fato de que os maiores elementos "flutuam" para o final do array como bolhas.

Neste exercício, você implementará o algoritmo Bubble Sort com visualização em tempo real de cada comparação e troca, permitindo compreender profundamente como o algoritmo funciona.

Este exercício é essencial para entender conceitos de complexidade algorítmica, análise de performance e técnicas de otimização.

## 🎓 Objetivo de Aprendizagem

- Implementar um algoritmo de ordenação clássico
- Compreender complexidade de tempo O(n²)
- Visualizar o funcionamento de algoritmos através de animações
- Trabalhar com funções assíncronas (async/await)
- Analisar melhor caso, caso médio e pior caso de algoritmos
- Praticar otimizações de algoritmos

## 📁 Estrutura dos Arquivos

\`\`\`
exercicio-bubble-sort/
├── index.html          # Página principal
├── styles.css          # Estilos da página
├── dados.js            # Arrays de teste
├── solucao.js          # SEU ARQUIVO - implemente aqui!
├── main.js             # Sistema de validação (não modificar)
├── readme-content.js   # Conteúdo deste README
└── README.md           # Este arquivo
\`\`\`

## 🚀 Como Executar

### Pré-requisitos
- VSCode instalado
- Node.js 22 instalado

### Passo a Passo

1. **Baixe todos os arquivos** do exercício e coloque-os na mesma pasta

2. **Abra a pasta no VSCode:**
   \`\`\`bash
   cd caminho/para/exercicio-bubble-sort
   code .
   \`\`\`

3. **Instale a extensão "Live Server"** no VSCode:
   - Abra a aba de extensões (Ctrl+Shift+X)
   - Busque por "Live Server"
   - Instale a extensão de Ritwick Dey

4. **Execute o projeto:**
   - Clique com o botão direito no arquivo \`index.html\`
   - Selecione "Open with Live Server"
   - O navegador abrirá automaticamente

5. **Implemente sua solução** no arquivo \`solucao.js\`

6. **Teste sua solução:**
   - Salve o arquivo \`solucao.js\`
   - A página recarregará automaticamente
   - Clique no botão "▶️ Executar Bubble Sort"
   - Observe a animação em tempo real!

## 📝 Especificação do Exercício

### Função a Implementar

\`\`\`javascript
async function bubbleSort(arr)
\`\`\`

### Entrada
- \`arr\`: Array de números inteiros a ser ordenado

### Saída
- Retorne o array ordenado em ordem crescente
- O array deve ser ordenado **in-place** (modificar o array original)

### Funções Obrigatórias

Você DEVE usar estas funções fornecidas:

\`\`\`javascript
await registrarComparacao(i, j)  // Antes de comparar arr[i] com arr[j]
await registrarTroca(i, j)       // Antes de trocar arr[i] com arr[j]
\`\`\`

### Regras
1. ✅ Implemente o algoritmo **Bubble Sort clássico**
2. ✅ Ordene em ordem **crescente**
3. ✅ Chame \`registrarComparacao(i, j)\` antes de cada comparação
4. ✅ Chame \`registrarTroca(i, j)\` antes de cada troca
5. ✅ A função DEVE ser \`async\` (usar async/await)
6. ❌ NÃO altere o tamanho do array (sem adicionar/remover elementos)
7. ❌ NÃO altere o conteúdo (mesmos números devem estar presentes)
8. ❌ NÃO use métodos prontos como \`.sort()\`

### Exemplo Visual

**Entrada:**
\`\`\`
[64, 34, 25, 12, 22]
\`\`\`

**Processo (primeira passagem):**
\`\`\`
Compara 64 e 34 → Troca → [34, 64, 25, 12, 22]
Compara 64 e 25 → Troca → [34, 25, 64, 12, 22]
Compara 64 e 12 → Troca → [34, 25, 12, 64, 22]
Compara 64 e 22 → Troca → [34, 25, 12, 22, 64]
\`\`\`

**Saída Final:**
\`\`\`
[12, 22, 25, 34, 64]
\`\`\`

## 💡 Dicas de Implementação

 * - Bubble Sort compara pares adjacentes e troca se estiverem fora de ordem
 * - Use dois loops: externo para passagens, interno para comparações
 * - Otimização: reduza o range a cada passagem (últimos elementos já ordenados)
 * - Otimização extra: pare se nenhuma troca for feita em uma passagem

### Passos Detalhados

1. **Loop Externo (Passagens)**
   - Representa quantas vezes você precisa "varrer" o array

2. **Loop Interno (Comparações)**
   - Compara elementos adjacentes
   - A cada passagem, o maior elemento "borbulha" para o final
   - Pode reduzir o range: \`j < n - i - 1\` (últimos já ordenados)

3. **Registrar Comparação**
   - Chame \`await registrarComparacao(j, j + 1)\` ANTES de comparar
   - Isso permite a visualização na interface

4. **Comparar e Trocar**
   - Se \`arr[j] > arr[j + 1]\`: elementos estão fora de ordem
   - Chame \`await registrarTroca(j, j + 1)\` ANTES da troca
   - Depois faça a troca usando variável temporária

5. **Retornar Array**
   - Retorne o array modificado

### Otimização (Opcional)

Adicione uma flag para detectar se houve trocas:

\`\`\`javascript
let houveTroca;
for (let i = 0; i < n - 1; i++) {
    houveTroca = false;
    
    for (let j = 0; j < n - i - 1; j++) {
        await registrarComparacao(j, j + 1);
        if (arr[j] > arr[j + 1]) {
            await registrarTroca(j, j + 1);
            // fazer troca
            houveTroca = true;
        }
    }
    
    // Se não houve troca, array já está ordenado
    if (!houveTroca) break;
}
\`\`\`

## ✅ Validação Automática

O sistema verifica automaticamente:

### 1. Tamanho do Array
- ✅ Verifica se o tamanho permanece o mesmo
- ❌ Detecta se elementos foram adicionados ou removidos

### 2. Conteúdo do Array
- ✅ Verifica se os mesmos elementos estão presentes
- ❌ Detecta se valores foram alterados, adicionados ou removidos

### 3. Ordenação Correta
- ✅ Verifica se o array está em ordem crescente
- ❌ Detecta se há elementos fora de ordem

### 4. Número de Trocas
- ✅ Compara com número esperado de trocas do Bubble Sort
- ⚠️ Avisa se houver menos trocas (possível otimização)
- ❌ Detecta se há mais trocas que o necessário

### Feedback Visual:
- 🔵 **Azul**: Elementos não ordenados
- 🟡 **Amarelo**: Elementos sendo comparados
- 🔴 **Vermelho**: Elementos sendo trocados
- 🟢 **Verde**: Elementos ordenados

## 📚 Recursos de Estudo

### Bubble Sort
- [Wikipedia - Bubble Sort (PT-BR)](https://pt.wikipedia.org/wiki/Bubble_sort)
- [IME-USP - Bubble Sort](https://www.ime.usp.br/~pf/algoritmos/aulas/buble.html)
- [GeeksforGeeks - Bubble Sort](https://www.geeksforgeeks.org/bubble-sort/)
- [VisuAlgo - Visualização de Algoritmos de Ordenação](https://visualgo.net/en/sorting)

### Complexidade de Algoritmos
- [Khan Academy - Análise Assintótica (PT-BR)](https://pt.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/asymptotic-notation)
- [IME-USP - Análise de Algoritmos](https://www.ime.usp.br/~pf/analise_de_algoritmos/)
- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/)

### JavaScript Async/Await
- [MDN - Async/Await](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function)
- [JavaScript.info - Async/Await](https://javascript.info/async-await)

## 🎮 Desafios Extras

Depois de resolver o exercício básico, tente:

1. **Otimização com Flag**: Adicione detecção de array já ordenado (para quando há uma passagem sem trocas)
2. **Bubble Sort Bidirecional (Cocktail Sort)**: Faça o algoritmo funcionar nas duas direções
3. **Contagem de Comparações**: Além das trocas, conte quantas comparações foram feitas
4. **Análise de Complexidade**: Calcule e compare os tempos para melhor caso, caso médio e pior caso
5. **Comparação com Outros Algoritmos**: Implemente Selection Sort ou Insertion Sort e compare

## ❓ Problemas Comuns

### "Erro: registrarComparacao is not defined"
- Você esqueceu de tornar a função \`async\`
- Use: \`async function bubbleSort(arr)\`

### "Tamanho do array foi alterado"
- Não use \`.push()\`, \`.pop()\`, \`.splice()\` ou similares
- Apenas troque elementos existentes

### "Conteúdo do array foi alterado"
- Você está modificando os valores dos elementos
- Apenas troque as posições, não altere os valores

### "Mais trocas que o esperado"
- Verifique sua lógica de comparação
- Certifique-se de comparar elementos adjacentes (\`j\` e \`j+1\`)
- Verifique se está chamando \`registrarTroca\` no momento certo

### "Array não está ordenado"
- Verifique a condição de comparação (\`>\` para crescente)
- Certifique-se de fazer a troca corretamente
- Verifique se os loops têm os limites corretos

### "Função não retorna nada"
- Não esqueça de retornar o array: \`return arr;\`

## 🏆 Critérios de Avaliação

- ✅ Implementação correta do Bubble Sort
- ✅ Uso correto de \`async/await\`
- ✅ Chamada correta das funções de registro
- ✅ Array ordenado corretamente
- ✅ Tamanho e conteúdo preservados
- ✅ Número de trocas dentro do esperado
- ✅ Código limpo e bem comentado

## 📊 Análise de Complexidade

### Complexidade de Tempo
- **Melhor Caso**: O(n) - Array já ordenado (com otimização de flag)
- **Caso Médio**: O(n²) - Array aleatório
- **Pior Caso**: O(n²) - Array em ordem inversa

### Complexidade de Espaço
- **O(1)** - Algoritmo in-place, usa apenas variável temporária

### Por Que O(n²)?
O Bubble Sort tem dois loops aninhados:
- Loop externo: n-1 iterações
- Loop interno: n-i-1 iterações em média
- Total: aproximadamente n²/2 comparações

## 📞 Suporte

Se tiver dúvidas, revise:
1. As especificações acima
2. Os comentários no arquivo \`solucao.js\`
3. Os recursos de estudo recomendados
4. A estrutura básica fornecida nas dicas

Observe atentamente a animação para entender o que está acontecendo!

Boa sorte! 🚀
`;