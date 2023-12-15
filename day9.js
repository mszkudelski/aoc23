import {dataDay9} from "./dataDay9.js";

const example = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`

function getNextStep(data) {
    const newHistory = [];
    for (let i = 0; i < data.length - 1; i++) {
        newHistory.push(data[i + 1] - data[i])
    }

    if (newHistory.every(item => item === 0)) {
        return 0;
    }

    const nextStepHistory = getNextStep(newHistory);
    // console.log(data, newHistory, newHistory.every(item => item === 0), newHistory[newHistory.length - 1] + nextStepHistory, nextStepHistory)
    return newHistory[newHistory.length - 1] + nextStepHistory
}

function getPrevStep(data) {
    const newHistory = [];
    for (let i = 0; i < data.length - 1; i++) {
        newHistory.push(data[i + 1] - data[i])
    }

    if (newHistory.every(item => item === 0)) {
        return 0;
    }

    const nextStepHistory = getPrevStep(newHistory);
    console.log(data, newHistory, newHistory[0] + nextStepHistory, nextStepHistory)
    return newHistory[0] - nextStepHistory
}

function getHistory(data) {
    return data[data.length - 1] + getNextStep(data);
}

function getHistoryBackwards(data) {
    return data[0] - getPrevStep(data);

}

function getHistorySum(data, func) {
    return data.split('\n').reduce((total, row) => {
        console.log('result:', func(row.split(' ').map(Number)))
        return total + func(row.split(' ').map(Number))
    }, 0);
}

// console.log(getHistorySum('10 13 16 21 30 45'))
console.log(getHistorySum(example, getHistory))
console.log(getHistorySum(example, getHistoryBackwards))
console.log(getHistorySum(dataDay9, getHistoryBackwards))
