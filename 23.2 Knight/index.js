function possivelMoves(pos){
    const moves = [[1,2], [2,1], [2,-1], [1,-2], [-1, -2], [-2,-1], [-2,1], [-1,2]] //movimentos 
    const [x, y] = pos
    return moves
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(([nx, ny]) => nx >= 0 && nx <= 7 && ny >= 0 && ny <= 7)
}

function knight(start, end){
    let queue = [[start, [start]]]
    let visitou = new Set() 
    visitou.add(start.toString())
    while(queue.length > 0){
        let [current, path] = queue.shift()
        if(current[0] === end[0] && current[1] === end[1]){
            console.log(`você chegou ao destino em ${path.length -1} movimentos`)
            return path
        }
        let moves = possivelMoves(current)
        for(let move of moves){
            if(!visitou.has(move.toString())){
                visitou.add(move.toString())
                queue.push([move, [...path, move]])
            }
        }
    }
}

console.log(knight([3,3], [4,3]))