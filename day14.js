import {dataDay14} from "./dataDay14.js";

const example = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`

function getLoad(data, cycles = 1) {
    const lines = data.split('\n');
    const rows = lines.map((line,) => line.split(''))

    const cyclesSet = new Set();

    const directions = [[-1, 0], [0, -1], [1, 0], [0, 1],]

    let isSetSizeTheSame = false;

    // let resultRows = rows.map(row => [...row]);

    let cyclesIteration = 1;

    for (let cycle = 1; cycle <= cycles; cycle += cyclesIteration) {
        console.log("cycle: ", cycle);
        // let tempRows = [...resultRows];
        directions.forEach(([dy, dx]) => {
            // const [dy, dx] = directions[0];
            for (let y = dy < 1 ? 0 : (rows.length - 1); dy < 1 ? y < rows.length : y >= 0; dy < 1 ? y++ : y--) {
                // for (let x = 0; x < rows[y].length; x++) {
                for (let x = dx < 1 ? 0 : (rows[y].length - 1); dx < 1 ? x < rows[y].length : x >= 0; dx < 1 ? x++ : x--) {
                    const space = rows[y][x];
                    if (space === 'O' && rows[y + dy] && rows[y + dy][x + dx] === '.') {
                        let ty = y;
                        let tx = x;
                        while (rows[ty + dy] && rows[ty + dy][tx + dx] === '.') {
                            tx += dx;
                            ty += dy;
                        }
                        // console.log({ty, tx, x, y, dx, dy, "rows[y][x]": rows[y][x], "rows[tx][ty]": rows[tx][ty]})
                        if (tx !== x || ty !== y) {
                            rows[ty][tx] = 'O'
                            rows[y][x] = '.'
                        }
                    }
                }
            }
        })

        console.log(cyclesSet.has(rows.toString()))

        if (cyclesSet.has(rows.toString())) {
            console.log("SAME SIZE", cyclesSet.size, cycle,)
            isSetSizeTheSame = true;
            cyclesIteration = cycle;
        }
        cyclesSet.add(rows.toString());
    }

    let load = 0;

    for (let x = 0; x < rows[0].length; x++) {
        for (let y = 0; y < rows.length; y++) {
            const space = rows[y][x];
            if (space === 'O') {
                load += rows.length - y;
                // console.log(resultRows.length - y)
            }
        }
        // console.log(x, load);
    }

    console.log(rows.map(row => row.join('')).join('\n'),)

    return load
}

const afterTilt = `OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....`;

console.log(getLoad(example), 136);
// console.log(getLoad(example, 2));
// console.log(getLoad(example, 3));
// console.log(getLoad(example, 4));
// console.log(getLoad(example, 5));
// console.log(getLoad(example, 6));
// console.log(getLoad(example, 7));
// console.log(getLoad(example, 8));
// console.log(getLoad(example, 9));
// console.log(getLoad(example, 10));
// console.log(getLoad(example, 11));
// console.log(getLoad(example, 12));
// console.log(getLoad(example, 13));
console.log(getLoad(example, 100));
console.log(getLoad(example, 1000000000), 64);
// console.log(afterTilt == getLoad(example));
// console.log(afterTilt)
// console.log(getLoad(dataDay14, 1000000000))
// console.log(106700, 'too high')