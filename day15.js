import {dataDay15} from "./dataDay15.js";

const example = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

function getHash(sequence) {
    return sequence.split('').reduce((result, char) => {
        const code = char.charCodeAt(0);
        return (result + code) * 17 % 256
    }, 0)
}

function getResult(data) {
    return data.split(',').reduce((globalresult, sequence) => globalresult + getHash(sequence), 0)
}

// console.log(getResult(`rn`));
// console.log(getResult(example));
// console.log(getResult(dataDay15));

// PART 2

function getFocusingPower(data) {
    const boxes = data.split(',').reduce((map, sequence) => {
        const [_, label, sign, value] = sequence.match(/([a-z]*)(=|-)(\d*)?/)
        console.log({label, sign, value})
        const hash = getHash(label)
        if (sign === '=') {
            let lensExists = false;
            const box = map.get(hash);
            if (box) {
                if (box.find(lens => lens.label === label)) {

                    map.set(hash, box.map(({label: boxLabel, value: boxValues}) => {
                        if (boxLabel === label) {
                            lensExists = true;
                            return {label, value}
                        }
                        return {label: boxLabel, value: boxValues}
                    }))
                } else {
                    map.set(hash, [...box, {label, value}])
                }
            } else {
                map.set(hash, [{label, value}])
            }
            console.log({box})
        } else if (sign === '-') {
            if (map.has(hash)) {
                const box = map.get(hash)
                map.set(hash, box.filter(({label: boxLabel}) => boxLabel !== label))
            }
        }
        console.log(map)
        return map
    }, new Map())
    return Array.from(boxes.entries()).reduce((total, [boxId, box]) => {
        return total + box.reduce((lensTotal, {value}, index) => {
            return lensTotal + (boxId + 1) * (index + 1) * value
        }, 0)
    }, 0)
}

console.log(getFocusingPower(example));
console.log(getFocusingPower(dataDay15));
