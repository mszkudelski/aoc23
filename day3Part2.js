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

const exampleRededit = `12.......*..
+.........34
.......-12..
..78........
..*....60...
78.........9
.5.....23..$
8...90*12...
............
2.2......12.
.*.........*
1.1..503+.56`

const example2 = `...992.....#......=...../........701................508...*..578........................259...331.................795..945........79........
.........868........................*.............................17*..........348................441*852........*.....-...........@.....922
....................*200............311..63................452.......323.#778.*....674....................680......696...372.....*..........`


function getPartsSum(data) {
    const matrix = data.split('\n').map(line => line.split(''));

    let sum = 0;

    for (let y = 0; y < matrix.length; y++) {
        const line = matrix[y];
        for (let x = 0; x < line.length; x++) {
            const char = line[x];
            if (char === '*') {
                let number = '';
                // for (i; !isNaN(line[i]); i++) {
                //     number += line[i];
                // }
                const beforeDigit = Number(line[x - 1]);
                const afterDigit = Number(line[x + 1]);
                let aboveDigitIndex = undefined;
                let belowDigitIndex = undefined;

                for (let j = x + 1; j !== x - 2; j--) {
                    // console.log({
                    //     j,
                    //     y,
                    //     // "matrix[y - 1][j]": !isAboveSymbol && matrix[y - 1] !== undefined && matrix[y - 1][j] !== '.',
                    //     // "matrix[y + 1][j]": !isBelowSymbol && matrix[y + 1] !== undefined && matrix[y + 1][j] !== '.'
                    // })
                    if (!aboveDigitIndex) {

                        aboveDigitIndex = matrix[y - 1] !== undefined && matrix[y - 1][j] !== '.' && matrix[y - 1][j] !== undefined && j;
                    }
                    if (!belowDigitIndex) {

                        belowDigitIndex = matrix[y + 1] !== undefined && matrix[y + 1][j] !== '.' && matrix[y + 1][j] !== undefined && j;
                    }

                }
                const parts = [beforeDigit, afterDigit, belowDigitIndex, aboveDigitIndex].filter(item => item && !isNaN(item));

                if (parts.length === 2) {
                    // console.log({
                    //
                    //     beforeDigit, belowDigitIndex, aboveDigitIndex, afterDigit,
                    //
                    //     number: Number(number),
                    //
                    // })
                    // console.log('gear')

                    let afterNumber = '';
                    let aboveNumber = '';
                    let belowNumber = '';
                    let beforeNumber = '';

                    if (afterDigit) {
                        for (let i = x + 1; !isNaN(line[i]); i++) {
                            afterNumber += line[i];
                        }
                        // console.log(afterNumber);
                    }
                    if (beforeDigit) {
                        for (let i = x - 1; !isNaN(line[i]); i--) {
                            beforeNumber = line[i] + beforeNumber;
                        }
                        // console.log(beforeNumber);
                    }
                    if (belowDigitIndex) {

                        for (let i = belowDigitIndex; !isNaN(matrix[y + 1][i]); i++) {
                            belowNumber += matrix[y + 1][i];
                            // console.log({belowDigitIndex})
                        }
                        for (let i = belowDigitIndex - 1; !isNaN(matrix[y + 1][i]); i--) {
                            belowNumber = matrix[y + 1][i] + belowNumber;
                        }
                        // console.log(belowNumber)
                    }
                    if (aboveDigitIndex) {

                        for (let i = aboveDigitIndex; !isNaN(matrix[y - 1][i]); i++) {
                            aboveNumber += matrix[y - 1][i];
                        }
                        for (let i = aboveDigitIndex - 1; !isNaN(matrix[y - 1][i]); i--) {
                            aboveNumber = matrix[y - 1][i] + aboveNumber;
                        }
                        // console.log(aboveNumber)
                    }
                    const gearValue = (beforeNumber ? Number(beforeNumber) : 1) * (afterNumber ? Number(afterNumber) : 1) * (aboveNumber ? Number(aboveNumber) : 1) * (belowNumber ? Number(belowNumber) : 1);

                    const numbers = [beforeNumber, afterNumber, belowNumber, aboveNumber].filter(item => item > 1);

                    if (beforeDigit || afterDigit) {
                        console.log({numbers})

                        console.log({
                            gearValue,
                            before: beforeNumber ? Number(beforeNumber) : 1,
                            after: afterNumber ? Number(afterNumber) : 1,
                            above: aboveNumber ? Number(aboveNumber) : 1,
                            below: belowNumber ? Number(belowNumber) : 1,
                        })
                    }
                    // console.log({
                    //     beforeDigit, belowDigitIndex, aboveDigitIndex, afterDigit,
                    // })
                    // console.log({
                    //     beforeNumber, afterNumber, aboveNumber, belowNumber,
                    // })
                    sum += gearValue
                } else if (parts.length !== 2 && parts.length > 0) {
                    // console.log({
                    //     gearValue,
                    //     before: beforeNumber ? Number(beforeNumber) : 1,
                    //     after: afterNumber ? Number(afterNumber) : 1,
                    //     above: aboveNumber ? Number(aboveNumber) : 1,
                    //     below: belowNumber ? Number(belowNumber) : 1,
                    // })
                    // console.log({
                    //     beforeDigit, belowDigitIndex, aboveDigitIndex, afterDigit,
                    // })
                    // console.log({
                    //     beforeNumber, afterNumber, aboveNumber, belowNumber,
                    // })
                }


                // if (isAfterSymbol || isBeforeSymbol || isAboveSymbol || isBelowSymbol) {
                //     sum += Number(number)
                // }
                //
                // if (i >= line.length) {
                //     x = line.length
                // } else {
                //     x = i
                // }
            }
        }
    }
    return sum
}

console.log(getPartsSum(example))
console.log(getPartsSum(exampleRededit))
console.log(getPartsSum(dataDay3))
