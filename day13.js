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

function getPatterns(input) {
    const patterns = input.split('\n\n').map(pattern => pattern.split('\n').map(row => row.split('')))

    return patterns.reduce((result, pattern, patternId) => {
        let patternResult = 0;
        for (let y = 0; y < pattern.length - 1; y++) {
            if (pattern[y].join('') === pattern[y + 1].join('')) {
                console.log('same rows', y, patternId)
                let mirrorSize = 0;
                while (pattern.slice(y - mirrorSize, y + 1).toString() === pattern.slice(y + 1, y + 2 + mirrorSize).reverse().toString()) {
                    mirrorSize++;
                }
                // console.log(pattern.slice(y - mirrorSize, y + 1).toString())
                // console.log(pattern.slice(y + 1, y + 2 + mirrorSize).reverse().toString())
                console.log({mirrorSize})
                patternResult += 100 * mirrorSize;
            }
        }
        return patternResult + result;
    }, 0)
}

console.log(getPatterns(example));