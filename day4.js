import {dataDay4} from "./dataDay4.js";

const example = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

const sample = `Card   1: 24 76 32 40 51 61 89  6 30 60 | 30 69 24 86  6  8 92 61 51 88 63 67 32 62 15 49 22 77 40 27 89 60 76 58 79
Card   2: 97  3 51 52 79  8 89 76 10 59 | 59 48 52 76 97 16 92 81 62 25 89 51 54  3 79 18 94 78  8 32 99 66 10 70 38
Card   3:  8 67 56 82 96  2 21 47 41 38 |  6 83 17 36  8 21 82 27 68 67  7 38 56 42 66  3 47 87 41 71 88 96  2 98 72`

// 2^9 = 512


function getSum(sum, point) {
    if (sum === 0) {
        if (point) {
            return 1;
        } else {
            return 0
        }
    } else if (point) {
        return sum * 2;
    } else {
        return sum
    }
}

function getWinningPoints(data) {
    const cards = data.split('\n').map(card => {
        const [winnnignumbers, cardNumbers] = card.split(':')[1].split('|')
            .map(
                numbers => numbers.split(' ').slice(1)
                    .map(Number).filter(Boolean))
        // console.log(cardNumbers, winnnignumbers)

        return {
            winnnignumbers, cardNumbers, copies: 1
        }
    })

    cards.forEach(
        ({winnnignumbers, cardNumbers, copies: cardCopies}, cardIndex) => {

            const copies = (winnnignumbers.reduce(
                (sum, winningNumber) => sum + cardNumbers.includes(winningNumber)
                // console.log(winningNumber, point, sum, getSum(sum, point))
                , 0));
            Array.from({length: copies}).forEach((_, index) => {
                console.log(copies, cardIndex, index)
                cards[cardIndex + index + 1].copies += cardCopies;
            })

        }
    )
    console.log(cards)
    return cards.reduce((sum, card) => sum + card.copies, 0)
}

console.log(getWinningPoints(example));
// console.log(getWinningPoints(`Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1`));
// console.log(getWinningPoints(sample));
console.log(getWinningPoints(dataDay4));
