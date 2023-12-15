import {dataDay13} from "./dataDay13.js";

const example = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`

function getMirrorSize(pattern) {
    const mirrors = [];
    for (let y = 0; y < pattern.length - 1; y++) {
        if (pattern[y].join('') === pattern[y + 1].join('')) {
            // console.log('same rows', y,)
            let mirrorSize = 0;
            while (pattern.slice(y - mirrorSize, y + 1).toString() === pattern.slice(y + 1, y + 2 + mirrorSize).reverse().toString()) {
                mirrorSize++;
            }
            // console.log(pattern.slice(y - mirrorSize, y + 1).toString())
            // console.log(pattern.slice(y + 1, y + 2 + mirrorSize).reverse().toString())
            // console.log({mirrorSize})
            mirrors.push([y + 1, mirrorSize]);
        }
    }
    // console.log(mirrors);
    // find y for biggest mirror
    // probably sort also with y as secondary key
    // const biggestMirror = mirrors.sort((a, b) => b[1] !== a[1] ? b[1] - a[1] : b[0] - a[0])[0]
    const biggestMirror = mirrors.sort((a, b) => b[1] - a[1])[0]
    // console.log({biggestMirror})
    return biggestMirror?.[0];
}

function getPatterns(input) {
    const patterns = input.split('\n\n').map(pattern => pattern.split('\n').map(row => row.split('')))

    return patterns.reduce((result, pattern, patternId) => {
        const pivotPattern = pattern[0].map((col, i) => pattern.map(row => row[i]));
        const horizontalMirrorSize = getMirrorSize(pattern);
        const verticalMirrorSize = getMirrorSize(pivotPattern);
        // console.log({horizontalMirrorSize, verticalMirrorSize})
        if (verticalMirrorSize && verticalMirrorSize > horizontalMirrorSize) {
            return result + verticalMirrorSize;
        } else if (horizontalMirrorSize) {
            return result + (horizontalMirrorSize * 100);
        } else {
            return result
        }

    }, 0)
}

console.log(getPatterns(example));
console.log(getPatterns(dataDay13));
// console.log(36165, 'too high')
// console.log(33159, 'too high')
// console.log(14149, 'too low')
