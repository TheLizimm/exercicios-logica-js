# 🔄 Exercício: Bubble Sort

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

```
exercicio-bubble-sort/
├── index.html          # Página principal
├── styles.css          # Estilos da página
├── dados.js            # Arrays de teste
├── solucao.js          # SEU ARQUIVO - implemente aqui!
├── main.js             # Sistema de validação (não modificar)
├── readme-content.js   # Conteúdo deste README
└── README.md           # Este arquivo
```

## 🚀 Como Executar

### Pré-requisitos
- VSCode instalado
- Node.js 22 instalado

### Passo a Passo

1. **Baixe todos os arquivos** do exercício e coloque-os na mesma pasta

2. **Abra a pasta no VSCode:**
   ```bash
   cd caminho/para/exercicio-bubble-sort
   code .
   ```

3. **Instale a extensão "Live Server"** no VSCode:
   - Abra a aba de extensões (Ctrl+Shift+X)
   - Busque por "Live Server"
   - Instale a extensão de Ritwick Dey

4. **Execute o projeto:**
   - Clique com o botão direito no arquivo `index.html`
   - Selecione "Open with Live Server"
   - O navegador abrirá automaticamente

5. **Implemente sua solução** no arquivo `solucao.js`

6. **Teste sua solução:**
   - Salve o arquivo `solucao.js`
   - A página recarregará automaticamente
   - Clique no botão "▶️ Executar Bubble Sort"
   - Observe a animação em tempo real!

## 📝 Especificação do Exercício

### Função a Implementar

```javascript
async function bubbleSort(arr)
```

### Entrada
- `arr`: Array de números inteiros a ser ordenado

### Saída
- Retorne o array ordenado em ordem crescente
- O array deve ser ordenado **in-place** (modificar o array original)

### Funções Obrigatórias

Você DEVE usar estas funções fornecidas:

```javascript
await registrarComparacao(i, j)  // Antes de comparar arr[i] com arr[j]
await registrarTroca(i, j)       // Antes de trocar arr[i] com arr[j]
```

### Regras
1. ✅ Implemente o algoritmo **Bubble Sort clássico**
2. ✅ Ordene em ordem **crescente**
3. ✅ Chame `registrarComparacao(i, j)` antes de cada comparação
4. ✅ Chame `registrarTroca(i, j)` antes de cada troca
5. ✅ A função DEVE ser `async` (usar async/await)
6. ❌ NÃO altere o tamanho do array (sem adicionar/remover elementos)
7. ❌ NÃO altere o conteúdo (mesmos números devem estar presentes)
8. ❌ NÃO use métodos prontos como `.sort()`

### Exemplo Visual

**Entrada:**
```
[64, 34, 25, 12, 22]
```

**Processo (primeira passagem):**
```
Compara 64 e 34 → Troca → [34, 64, 25, 12, 22]
Compara 64 e 25 → Troca → [34, 25, 64, 12, 22]
Compara 64 e 12 → Troca → [34, 25, 12, 64, 22]
Compara 64 e 22 → Troca → [34, 25, 12, 22, 64]
```

**Saída Final:**
```
[12, 22, 25, 34, 64]
```

## 💡 Dicas de Implementação

### Estrutura Básica do Bubble Sort

 * - Bubble Sort compara pares adjacentes e troca se estiverem fora de ordem
 * - Use dois loops: externo para passagens, interno para comparações
 * - Otimização: reduza o range a cada passagem (últimos elementos já ordenados)
 * - Otimização extra: pare se nenhuma troca for feita em uma passagem

## ✅ Validação Automática

O sistema verifica automaticamente:

1. **Tamanho do Array**: Verifica se permanece o mesmo
2. **Conteúdo do Array**: Verifica se os mesmos elementos estão presentes
3. **Ordenação Correta**: Verifica se está em ordem crescente
4. **Número de Trocas**: Compara com número esperado

### Feedback Visual:
- 🔵 **Azul**: Elementos não ordenados
- 🟡 **Amarelo**: Elementos sendo comparados
- 🔴 **Vermelho**: Elementos sendo trocados
- 🟢 **Verde**: Elementos ordenados

## 📚 Recursos de Estudo

### Bubble Sort
- [Wikipedia - Bubble Sort (PT-BR)](https://pt.wikipedia.org/wiki/Bubble_sort)
- [IME-USP - Bubble Sort](https://www.ime.usp.br/~pf/algoritmos/aulas/buble.html)
- [VisuAlgo - Visualização](https://visualgo.net/en/sorting)

### Complexidade
- [Khan Academy - Análise Assintótica](https://pt.khanacademy.org/computing/computer-science/algorithms)
- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/)

## 🏆 Critérios de Avaliação

- ✅ Implementação correta do Bubble Sort
- ✅ Uso correto de async/await
- ✅ Array ordenado corretamente
- ✅ Código limpo e comentado

Boa sorte! 🚀