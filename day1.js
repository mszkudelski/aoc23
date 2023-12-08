import {dataDay1} from "./dataDay1.js";


const map = {
    'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
}

function getSum(input) {
    return input.split('\n').reduce((acc, line) => {
        // get first and last digit from letters
        const firstDigit = line.split('').map((letter, index) => {
            const isDigit = Number(letter) > 0;
            if (isDigit) {
                return letter;
            }
            const word = Object.keys(map).find(digitWord => line.slice(index, digitWord.length + index) === digitWord)
            if (!word) {
                return undefined;
            }

            return map[word]
        }).find(digit => Number(digit) > 0);
        const lineReversed = line.split('').reverse().join('');
        const lastDigit = line.split('').reverse().map((letter, index) => {
            const isDigit = Number(letter) > 0;
            if (isDigit) {
                return letter;
            }
            const word = Object.keys(map).find(digitWord => lineReversed.slice(index, digitWord.length + index) === digitWord.split('').reverse().join(''))
            if (!word) {
                return undefined;
            }

            return map[word]
        }).find(digit => Number(digit) > 0);

        // console.log(Number(first + (last || first ) || 0))
        console.log(firstDigit, lastDigit, line)

        return acc + Number(firstDigit + (lastDigit || firstDigit) || 0);
    }, 0)
}

const example = `1abc2
pqr3stu8vwx 
a1b2c3d4e5f
treb7uchet`

const example2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

const example3 = `eightwothree`

console.log(getSum(dataDay1))

console.log(getSum(example), 142)
console.log(getSum(example2), 281)
console.log(getSum(example3), 83)
// 9 4 9 8 2