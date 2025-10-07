/**
 * EXERCÍCIO: RESOLVEDOR DE LABIRINTOS
 * 
 * Implemente a função abaixo que resolve um labirinto.
 * 
 * ENTRADA:
 * - matriz: Array 2D de caracteres representando o labirinto
 *   - 'x' = parede (não pode passar)
 *   - 'i' = posição inicial
 *   - 'f' = posição final
 *   - ' ' = espaço vazio (pode passar)
 * 
 * SAÍDA:
 * - Retorne a matriz modificada com o caminho marcado com 'o'
 * - O caminho deve ser o MENOR CAMINHO possível
 * - NÃO modifique os caracteres 'x', 'i' e 'f'
 * - Apenas substitua espaços ' ' por 'o' no caminho
 * 
 * DICAS:
 * - Use algoritmo BFS (Busca em Largura) para encontrar o menor caminho
 * - Você pode se mover apenas para cima, baixo, esquerda e direita
 * - Não é permitido movimento diagonal
 * 
 * EXEMPLO:
 * Entrada:                    Saída:
 * ['x','x','x','x','x']      ['x','x','x','x','x']
 * ['x','i',' ',' ','x']      ['x','i','o','o','x']
 * ['x',' ','x',' ','x']  =>  ['x',' ','x','o','x']
 * ['x',' ',' ','f','x']      ['x',' ',' ','f','x']
 * ['x','x','x','x','x']      ['x','x','x','x','x']
 */

function resolverLabirinto(matriz) {
    // IMPLEMENTE SUA SOLUÇÃO AQUI
    
    matriz[1][2] = 'o';
    console.log(matriz);
    return matriz;
}