// Conteúdo do README.md em formato string para ser renderizado como Markdown
const readmeMarkdown = `# 🎯 Exercício: Resolvedor de Labirintos

## 📋 Descrição

Neste exercício, você deverá implementar um algoritmo que encontra o **menor caminho** entre dois pontos em um labirinto usando JavaScript.

## 🎓 Objetivo de Aprendizagem

- Trabalhar com matrizes bidimensionais
- Implementar algoritmo BFS (Busca em Largura)
- Manipular estruturas de dados (filas)
- Resolver problemas de pathfinding

## 📁 Estrutura dos Arquivos

\`\`\`
exercicio-labirinto/
├── index.html          # Página principal
├── styles.css          # Estilos da página
├── labirintos.js       # Array com os labirintos de teste
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
   cd caminho/para/exercicio-labirinto
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
   - Clique no botão "▶️ Executar Solução"

## 📝 Especificação do Exercício

### Função a Implementar

\`\`\`javascript
function resolverLabirinto(matriz)
\`\`\`

### Entrada
- \`matriz\`: Array 2D de caracteres onde:
  - \`'x'\` = parede (não pode passar)
  - \`'i'\` = posição inicial
  - \`'f'\` = posição final
  - \`' '\` = espaço vazio (pode passar)

### Saída
- Retorne a matriz modificada com o caminho marcado
- Use \`'o'\` para marcar as células do caminho
- **IMPORTANTE:** NÃO modifique \`'x'\`, \`'i'\` e \`'f'\`

### Regras
1. ✅ Encontre o **menor caminho** possível (use BFS!)
2. ✅ Movimento apenas: cima, baixo, esquerda, direita
3. ❌ Movimento diagonal não é permitido
4. ❌ Não atravesse paredes (\`'x'\`)
5. ❌ Não modifique início (\`'i'\`), fim (\`'f'\`) ou paredes (\`'x'\`)

### Exemplo Visual

**Entrada:**
\`\`\`
x x x x x
x i     x
x   x   x
x     f x
x x x x x
\`\`\`

**Saída:**
\`\`\`
x x x x x
x i o o x
x   x o x
x     f x
x x x x x
\`\`\`

## 💡 Dicas de Implementação

### Algoritmo BFS (Busca em Largura)

1. **Encontre as posições inicial e final**
   \`\`\`javascript
   let inicio, fim;
   for (let i = 0; i < matriz.length; i++) {
       for (let j = 0; j < matriz[i].length; j++) {
           if (matriz[i][j] === 'i') inicio = {i, j};
           if (matriz[i][j] === 'f') fim = {i, j};
       }
   }
   \`\`\`

2. **Use uma fila para explorar o labirinto**
   \`\`\`javascript
   const fila = [inicio];
   const visitados = new Set();
   \`\`\`

3. **Explore em todas as 4 direções**
   \`\`\`javascript
   const direcoes = [
       [-1, 0], // cima
       [1, 0],  // baixo
       [0, -1], // esquerda
       [0, 1]   // direita
   ];
   \`\`\`

4. **Registre o caminho (use um mapa de predecessores)**

5. **Reconstrua o caminho do fim ao início**

6. **Marque o caminho na matriz com 'o'**

## ✅ Validação Automática

O sistema verifica automaticamente:
- ✅ Se você não modificou as paredes, início ou fim
- ✅ Se o caminho conecta início e fim
- ✅ Se o caminho é o menor possível
- ✅ Se há erros na execução

### Feedback Visual:
- 🟢 **Verde**: Solução válida!
- 🔴 **Vermelho**: Erro encontrado
- 🟡 **Amarelo**: Aguardando execução

## 📚 Recursos de Estudo

### BFS (Breadth-First Search)
- [Visualgo - Pathfinding](https://visualgo.net/en/dfsbfs)
- [GeeksforGeeks - BFS](https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/)

### JavaScript - Estruturas de Dados
- Arrays e Matrizes
- Set e Map
- Filas (Arrays com push/shift)

## 🎮 Desafios Extras

Depois de resolver o exercício básico, tente:

1. **Otimização**: Minimize o número de células visitadas
2. **Múltiplos caminhos**: Encontre todos os caminhos possíveis
3. **Visualização**: Adicione animação mostrando a busca
4. **Novos labirintos**: Crie seus próprios labirintos em \`labirintos.js\`

## ❓ Problemas Comuns

### "A página não carrega"
- Certifique-se de que o Live Server está rodando
- Verifique se todos os arquivos estão na mesma pasta

### "Erro: matriz retornada tem dimensões incorretas"
- Certifique-se de retornar a matriz completa
- Não crie uma nova matriz vazia

### "Você modificou paredes (x), início (i) ou fim (f)!"
- Apenas células com \`' '\` podem virar \`'o'\`
- Nunca altere \`'x'\`, \`'i'\` ou \`'f'\`

### "Caminho não conecta início e fim"
- Verifique se seu BFS está explorando todas as direções
- Confirme que está reconstruindo o caminho corretamente

## 🏆 Critérios de Avaliação

- ✅ Código funciona para todos os labirintos
- ✅ Encontra o menor caminho (BFS)
- ✅ Não modifica células proibidas
- ✅ Código limpo e comentado
- ✅ Tratamento de casos especiais

## 📞 Suporte

Se tiver dúvidas, revise:
1. As especificações acima
2. Os comentários no arquivo \`solucao.js\`
3. Os recursos de estudo recomendados

Boa sorte! 🚀
`;