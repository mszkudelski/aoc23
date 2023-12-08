import {dataDay8} from "./dataDay8.js";

const example = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`

const example2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`

function getSteps(data) {
    const [steps, lines] = data.split('\n\n');
    const instructions = lines.split('\n').reduce((map, line) => {
        const [step, instruction] = line.split('=').map(item => item.trim())
        return {...map, [step]: instruction};
    }, {});
    let currentStep = "AAA";
    let stepsCount = 0
    for (stepsCount; currentStep !== "ZZZ"; stepsCount++) {
        const instruction = instructions[currentStep];
        const nextStep = steps[stepsCount % steps.length];
        // console.log({currentStep, instruction, "stepsCount % steps.length": stepsCount % steps.length, nextStep})
        if (nextStep === 'L') {
            // console.log(instruction.match(/^\(([A-Z]{3})/))
            currentStep = instruction.match(/^\(([A-Z]{3})/)[1]
        } else {
            // console.log(instruction.match(/([A-Z]{3})\)/))
            currentStep = instruction.match(/([A-Z]{3})\)/)[1]
        }
    }
    return stepsCount
}

console.log(getSteps(example))
console.log(getSteps(example2))
console.log(getSteps(dataDay8))
