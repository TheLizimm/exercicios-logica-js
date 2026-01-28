const moves = [
    [2, 1], [1, 2], [-1, 2], [-2, 1],
    [-2, -1], [-1, -2], [1, -2], [2, -1]
];

function knighMoves(start, end){
    //[posição_atual, caminho_percorrido]
    let queue = [[start, [start]]]
    let visited = new Set()
    visited.add(start.toString())

    while(queue.length > 0){
        let [current, path] = queue.shift()
        //Se chegamos ao destino, retornamos o resultado
        if(current[0] === end[0] && current[1] === end[1]){
            console.log(`Você conseguiu em ${path.length -1} movimentos, Seu caminho foi: `)
            path.forEach(pos => console.log(pos))
            return path
        }
        //Explorar movimentos possíveis
        for (let [dx, dy] of moves){
            let next = [current[0] + dx, current[1] + dy]
            //Verificar se o movimento está dentro do tabuleiro e não foi visitado
            if(next[0] >= 0 && next[0] < 8 && next[1] >= 0 && next[1] < 8){
                if(!visited.has(next.toString())){
                    visited.add(next.toString())
                    queue.push([next, [...path, next]])
                }
            }
        }
    }
}

knighMoves([0,0], [3,3])
knighMoves([1,2], [4,6])