import {dataDay7} from "./dataDay7.js";

const example = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

const example2 = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
22456 12
J3456 1
AAAAA 2
JJJA2 2
JJ234 2
JJJA2 2
JJJJ2 2
JJJJJ 2`

const cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J',]

// pair - 1
//      + J = three (+ 2 pkt)
//
// two pairs - 2
//      + J = full (+ 2pkt)
//      + JJ = four ( + 3 pkt)
//      + JJJ = five ( + 4 pkt)
// three of a kind - 3
//      + J = four ( + 2 pkt)
//      + JJ = five ( + 3 pkt)
// full - 4 (pair + three)
// four - 5
//      + J = five ( + 1 pkt)
// five - 6

function getFigurePoints(figure) {
    if (figure.length > 1) {
        // console.log(figure)
        if (figure.length === 2) {
            return 1
        }
        if (figure.length === 3) {
            return 3;
        }
        if (figure.length > 3) {
            return figure.length + 1
        }
    } else {
        return 0
    }
}

function getJJPoints(points, jjs) {
    if (points === 5) {
        return 6;
    }
    if (points === 0) {
        return Math.min(getFigurePoints(jjs) + 1, 6);
    }
    return Math.min(points + jjs.length + 1, 6)
}

function figure(hand) {
    // based on points and amount of JJs add points
    const points = Array.from(hand.split('').reduce((set, card) => set.add(card), new Set())).reduce((result, card) => {
        if (card === 'J') return result;
        const figure = hand.match(new RegExp(`(${card})`, 'g'));
        return result + getFigurePoints(figure);
    }, 0)

    const jj = hand.match(/(J)/g)
    // console.log(hand)
    if (jj && jj.length) {
        console.log(hand, points, jj, getJJPoints(points, jj))
        return getJJPoints(points, jj)
    } else {
        return points
    }
}

function getWinnings(data) {
    const hands = data.split('\n').map(hand => hand.split(' ')).map(([hand, bid]) =>
        [figure(hand), hand, bid]
    ).sort((a, b) => {
        const result = a[0] - b[0];
        if (result === 0) {
            if (a[1] === b[1]) {
                return 0
            }
            // higher card wins
            for (let i = 0; a[1][i] === a[1][i] || i !== 5; i++) {
                console.log(i, cards.indexOf(a[1][i]), cards.indexOf(b[1][i]), a, b)
                if (cards.indexOf(a[1][i]) > cards.indexOf(b[1][i])) {
                    return -1;
                } else if (cards.indexOf(a[1][i]) < cards.indexOf(b[1][i])) {
                    return 1;
                }
            }

        }
        return result
    })
    console.log(hands)
    return hands.reduce((result, [_, __, bid], index) => {
        // console.log(result, bid, index + 1)
        return result + (bid * (index + 1))
    }, 0)
}

console.log(getWinnings(example))
console.log(getWinnings(example2))
// console.log(getWinnings(dataDay7))
