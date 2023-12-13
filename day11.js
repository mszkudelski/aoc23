import {dataDay11} from "./dataDay11.js";

const example = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

function getPathsLength(data, gap = 2) {
    let lines = data.split('\n').map(line => line.split(''))
    const colCount = lines[0].length;
    const rowCount = lines.length;
    const colEmptiness = Array.from({length: colCount}, () => true);
    const emptyRows = [];

    for (let row = 0; row < lines.length; row++) {
        const isRowEmpty = lines[row].reduce((result, item, index) => {
            colEmptiness[index] = colEmptiness[index] && item === '.'
            return result && item === '.'
        }, true);
        if (isRowEmpty) {
            // console.log(row, lines[row])
            emptyRows.push(row);
            // row++;
        }
    }
    let colExpandedCount = 0;
    const emptyCols = colEmptiness.map((isEmpty, colIndex) => {
        if (isEmpty) {
            // console.log(colIndex + colExpandedCount)
            // console.log(lines[0].slice(0, colIndex + colExpandedCount))

            return colIndex;
        }
    }).filter(col => col !== undefined);

    console.log(emptyRows, emptyCols)
    // console.log(lines.map(line => line.join('')).join('\n'))
    const galaxies = lines.reduce((result, line, index) => {
        return [...result, ...line.reduce((resultLine, item, subIndex) =>
                item === '#' ? [...resultLine, [index, subIndex]] : resultLine
            , [])]
    }, []);

    // const map = new Map();
    // const set = new Set();
    // galaxies.forEach((galaxyA, x) => {
    //     galaxies.forEach((galaxyB, y) => {
    //         // console.log(galaxyB[0].toString() + galaxyA[0].toString() + galaxyB[1].toString() + galaxyA[1].toString(), galaxyB[1] - galaxyA[1] + galaxyB[0] - galaxyA[0])
    //         if (x !== y) {
    //             set.add(galaxyB[0].toString() + galaxyA[0].toString() + galaxyB[1].toString() + galaxyA[1].toString())
    //             set.add(Math.max(x, y).toString() + Math.min(x, y).toString())
    //             // map.set(galaxyB[0].toString() + galaxyA[0].toString() + galaxyB[1].toString() + galaxyA[1].toString(), Math.abs(galaxyB[1] - galaxyA[1]) + Math.abs(galaxyB[0] - galaxyA[0]))
    //             map.set(Math.max(x, y).toString() + Math.min(x, y).toString(), Math.abs(galaxyB[1] - galaxyA[1]) + Math.abs(galaxyB[0] - galaxyA[0]))
    //         }
    //     })
    // })

    return galaxies.reduce((result, galaxyA, x) => {
        return result + galaxies.reduce((resultb, galaxyB, y) => {
            if (x !== y) {
                // const gapsRows = emptyRows.filter(emptyRow =>
                //     emptyRow - galaxyA[0] > 0 && galaxyB[0] - emptyRow > 0
                // ).length
                // const gapsCols =
                //     emptyCols.filter(emptyCol =>
                //         emptyCol - galaxyA[1] > 0 && galaxyB[1] - emptyCol > 0
                //     ).length
                const gapsRows = emptyRows.filter(emptyRow =>
                    Math.max(galaxyB[0], galaxyA[0]) > emptyRow && Math.min(galaxyB[0], galaxyA[0]) < emptyRow
                ).length
                const gapsCols =
                    emptyCols.filter(emptyCol =>
                        Math.max(galaxyB[1], galaxyA[1]) > emptyCol && Math.min(galaxyB[1], galaxyA[1]) < emptyCol
                    ).length
                const gaps = gapsRows + gapsCols;
                // console.log({gapsRows, gapsCols, galaxyA, galaxyB})
                return resultb + Math.abs(galaxyB[1] - galaxyA[1]) + Math.abs(galaxyB[0] - galaxyA[0]) + (gaps * gap)
            } else {
                return resultb
            }
        }, 0)
    }, 0) / 2 // correct answer!!!
    // console.log(map.size, set.size, galaxies.length)
    // return Array.from(map.values()).reduce((result, distance) => result + distance, 0)
}

// console.log(example)
console.log(getPathsLength(example), 374)
console.log(getPathsLength(example, 10), 1030)
// console.log(getPathsLength(example, 100), 8410)
// console.log(getPathsLength(dataDay11))
// console.log(9571396, 'too low')
// console.log(19195957, 'too high')
