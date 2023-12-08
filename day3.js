import {dataDay4} from "./dataDay4.js";
import {dataDay3} from "./dataDay3.js";

const example = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

const example2 = `...992.....#......=...../........701................508...*..578........................259...331.................795..945........79........
.........868........................*.............................17*..........348................441*852........*.....-...........@.....922
....................*200............311..63................452.......323.#778.*....674....................680......696...372.....*..........`


function getPartsSum(data) {
    const matrix = data.split('\n').map(line => line.split(''));

    let sum = 0;

    for (let y = 0; y < matrix.length; y++) {
        const line = matrix[y];
        for (let x = 0; x < line.length; x) {
            const char = line[x];
            if (!isNaN(char)) {
                let number = '';
                let i = x;
                for (i; !isNaN(line[i]); i++) {
                    number += line[i];
                }
                const isBeforeSymbol = line[x - 1] !== '.' && line[x - 1] !== undefined;
                const isAfterSymbol = line[i] !== '.' && line[i] !== undefined;
                let isAboveSymbol = false;
                let isBelowSymbol = false;

                for (let j = i; j !== x - 2; j--) {
                    // console.log({
                    //     j,
                    //     y,
                    //     // "matrix[y - 1][j]": !isAboveSymbol && matrix[y - 1] !== undefined && matrix[y - 1][j] !== '.',
                    //     // "matrix[y + 1][j]": !isBelowSymbol && matrix[y + 1] !== undefined && matrix[y + 1][j] !== '.'
                    // })
                    if (!isAboveSymbol) {

                        isAboveSymbol = matrix[y - 1] !== undefined && matrix[y - 1][j] !== '.' && matrix[y - 1][j] !== undefined;
                    }
                    if (!isBelowSymbol) {

                        isBelowSymbol = matrix[y + 1] !== undefined && matrix[y + 1][j] !== '.' && matrix[y + 1][j] !== undefined;
                    }

                }
                console.log({
                    is: isAfterSymbol || isBeforeSymbol || isAboveSymbol || isBelowSymbol,

                    number: Number(number),

                })


                if (isAfterSymbol || isBeforeSymbol || isAboveSymbol || isBelowSymbol) {
                    sum += Number(number)
                }

                if (i >= line.length) {
                    x = line.length
                } else {
                    x = i
                }
            } else {
                x++;
            }
        }
    }
    return sum
}

console.log(getPartsSum(example))
console.log(getPartsSum(dataDay3))
