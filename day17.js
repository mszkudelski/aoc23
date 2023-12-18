const example = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`

function getHeatLoss(data) {
    const matrix = data.split('\n').map(row => row.split('').map(Number));

    let prev = {x: -1, y: -1};
    let current = {x: 0, y: 0};
    let heatLoss = 0;

    while (current.x < matrix.length && current.y < matrix[0].length && heatLoss < 102) {
        // let value = Number(matrix[current.x][current.y]);
        const neighbors = [{x: current.x + 1, y: current.y}, {x: current.x - 1, y: current.y},
            {x: current.x, y: current.y - 1}, {x: current.x, y: current.y + 1}]
        console.log({current, prev})
        let minLoss = null;
        for (let i = 0; i < neighbors.length; i++) {
            const {x, y} = neighbors[i];
            console.log('prev', {
                currentNeigbor: neighbors[i],
                currentMin: minLoss,
                i,
            })
            if (matrix[minLoss?.y] === undefined || matrix[minLoss?.y][minLoss.x] === undefined) {
                minLoss = neighbors[i]
            }
            if (matrix[y] === undefined || matrix[y][x] === undefined || (y === prev[y] && x === prev[x])) {
                console.log('continue')
                continue
            }
            // console.log({x, y, prev})
            // console.log('mid', {
            //     currentNeigbor: neighbors[i],
            //     currentMin: minLoss,
            //     i,
            //     nValue: matrix[y]?.[x],
            //     lossValue: matrix[minLoss.y][minLoss.x]
            // })
            if (minLoss === null || matrix[y]?.[x] < matrix[minLoss.y][minLoss.x]) {
                minLoss = neighbors[i];
            }
            // console.log('after', {currentNeigbor: neighbors[i], currentMin: minLoss})

        }

        console.log(minLoss);
        heatLoss += Number(matrix[minLoss.y]?.[minLoss.x]);
        prev = current;
        current = minLoss
        // console.log(heatLoss)
    }
    return heatLoss
}

console.log(getHeatLoss(example));