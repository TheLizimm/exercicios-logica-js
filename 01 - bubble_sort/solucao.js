/**
 * EXERCÍCIO: BUBBLE SORT
 * 
 * Implemente o algoritmo Bubble Sort para ordenar um array de números inteiros.
 * Você DEVE usar as funções fornecidas para registrar comparações e trocas,
 * permitindo a visualização e validação do algoritmo.
 * 
 * ENTRADA:
 * - arr: Array de números inteiros a ser ordenado
 * 
 * SAÍDA:
 * - Retorne o array ordenado
 * - O array deve ser ordenado in-place (modificar o original)
 * 
 * FUNÇÕES OBRIGATÓRIAS PARA USAR:
 * - await registrarComparacao(i, j): Chame antes de comparar arr[i] com arr[j]
 * - await registrarTroca(i, j): Chame ANTES de trocar arr[i] com arr[j]
 * 
 * REGRAS:
 * - Use o algoritmo Bubble Sort clássico
 * - Faça a ordenação in-place (modifique o array original)
 * - Chame registrarComparacao antes de cada comparação
 * - Chame registrarTroca antes de cada troca de elementos
 * - A função DEVE ser async (usar async/await)
 * - Não modifique o tamanho do array
 * - Não adicione ou remova elementos
 * 
 * DICAS:
 * - Bubble Sort compara pares adjacentes e troca se estiverem fora de ordem
 * - Use dois loops: externo para passagens, interno para comparações
 * - Otimização: reduza o range a cada passagem (últimos elementos já ordenados)
 * - Otimização extra: pare se nenhuma troca for feita em uma passagem
 * 
 * EXEMPLO DE USO DAS FUNÇÕES:
 * 
 * // Antes de comparar elementos nas posições i e j:
 * await registrarComparacao(i, j);
 * if (arr[i] > arr[j]) {
 *     // Antes de trocar:
 *     await registrarTroca(i, j);
 *     // Depois faça a troca:
 *     let temp = arr[i];
 *     arr[i] = arr[j];
 *     arr[j] = temp;
 * }
 * 
 * EXEMPLO:
 * Entrada: [64, 34, 25, 12, 22]
 * Saída:   [12, 22, 25, 34, 64]
 * 
 * Complexidade Esperada:
 * - Melhor caso: O(n) - array já ordenado
 * - Caso médio: O(n²)
 * - Pior caso: O(n²) - array em ordem inversa
 */

async function bubbleSort(arr, registrarComparacao, registrarTroca) {
    // IMPLEMENTE SUA SOLUÇÃO AQUI
    
    // TODO: Implemente o loop externo (passagens pelo array)
    // TODO: Implemente o loop interno (comparações adjacentes)
    // TODO: Chame await registrarComparacao(i, j) antes de comparar
    // TODO: Se elementos estiverem fora de ordem:
    //       - Chame await registrarTroca(i, j)
    //       - Faça a troca dos elementos
    // TODO: Considere adicionar flag para otimizar (parar se não houver trocas)
    // TODO: Retorne o array ordenado
    
    return arr;
}