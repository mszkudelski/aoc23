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

function getPathsLength(data) {
    let lines = data.split('\n').map(line => line.split(''))
    const colCount = lines[0].length;
    const rowCount = lines.length;
    const colEmptiness = Array.from({length: colCount}, () => true);

    for (let row = 0; row < lines.length; row++) {
        const isRowEmpty = lines[row].reduce((result, item, index) => {
            colEmptiness[index] = colEmptiness[index] && item === '.'
            return result && item === '.'
        }, true);
        if (isRowEmpty) {
            // console.log(row, lines[row])
            lines = [
                ...lines.slice(0, row),
                Array.from({length: colCount}, () => '.'),
                ...lines.slice(row)]
            row++;
        }
    }
    let colExpandedCount = 0;
    colEmptiness.forEach((isEmpty, colIndex) => {
        if (isEmpty) {
            // console.log(colIndex + colExpandedCount)
            // console.log(lines[0].slice(0, colIndex + colExpandedCount))
            lines = lines.map(line => {
                return [...line.slice(0, colIndex + colExpandedCount), '.', ...line.slice(colIndex + colExpandedCount)]
            })
            colExpandedCount++
        }
    })
    // console.log(lines.map(line => line.join('')).join('\n'))
    const galaxies = lines.reduce((result, line, index) => {
        return [...result, ...line.reduce((resultLine, item, subIndex) =>
                item === '#' ? [...resultLine, [index, subIndex]] : resultLine
            , [])]
    }, []);

    const map = new Map();
    const set = new Set();
    galaxies.forEach((galaxyA, x) => {
        galaxies.forEach((galaxyB, y) => {
            // console.log(galaxyB[0].toString() + galaxyA[0].toString() + galaxyB[1].toString() + galaxyA[1].toString(), galaxyB[1] - galaxyA[1] + galaxyB[0] - galaxyA[0])
            if (x !== y) {
                set.add(galaxyB[0].toString() + galaxyA[0].toString() + galaxyB[1].toString() + galaxyA[1].toString())
                set.add(Math.max(x, y).toString() + Math.min(x, y).toString())
                // map.set(galaxyB[0].toString() + galaxyA[0].toString() + galaxyB[1].toString() + galaxyA[1].toString(), Math.abs(galaxyB[1] - galaxyA[1]) + Math.abs(galaxyB[0] - galaxyA[0]))
                map.set(Math.max(x, y).toString() + Math.min(x, y).toString(), Math.abs(galaxyB[1] - galaxyA[1]) + Math.abs(galaxyB[0] - galaxyA[0]))
            }
        })
    })

    console.log('reduce', galaxies.reduce((result, galaxyA, x) => {
        return result + galaxies.reduce((resultb, galaxyB, y) => {
            if (x !== y) {
                return resultb + Math.abs(galaxyB[1] - galaxyA[1]) + Math.abs(galaxyB[0] - galaxyA[0])
            } else {
                return resultb
            }
        }, 0)
    }, 0) / 2) // correct answer!!!
    console.log(map.size, set.size, galaxies.length)
    return Array.from(map.values()).reduce((result, distance) => result + distance, 0)
}

// console.log(example)
console.log(getPathsLength(example), 374)
console.log(getPathsLength(dataDay11))
console.log(9571396, 'too low')
console.log(19195957, 'too high')
