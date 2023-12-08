import {dataDay8} from "./dataDay8.js";

const example = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`

function getLetterSteps(letter, instructions) {
    return Object.entries(instructions).reduce((map, [key, value]) => {
            if (key.includes(letter))
                return [...map, key]
            else
                return map
        }, []
    );
}

function getNextInstruction(currentStep, instructions, nextStep) {
    const instruction = instructions[currentStep];
    // console.log({currentStep, instruction, "stepsCount % steps.length": stepsCount % steps.length, nextStep})
    // console.log(currentStep,)
    if (nextStep === 'L') {
        // console.log(instruction.match(/^\(([A-Z]{3})/))
        return instruction.match(/^\(([A-Z1-9]{3})/)[1]
    } else {
        // console.log(instruction.match(/([A-Z]{3})\)/))
        return instruction.match(/([A-Z1-9]{3})\)/)[1]
    }
}

function getSteps(data) {
    const [steps, lines] = data.split('\n\n');
    const instructions = lines.split('\n').reduce((map, line) => {
        const [step, instruction] = line.split('=').map(item => item.trim())
        return {...map, [step]: instruction};
    }, {});
    let currentSteps = getLetterSteps('A', instructions);
    // console.log({stepsA: stepsA})
    const stepALength = currentSteps.length;
    // for (stepsCount; currentSteps.filter(step => step.includes('Z')).length !== stepALength; stepsCount++) {
    //     currentSteps = currentSteps.map(
    //         step =>
    //             getNextInstruction(step, instructions, steps[stepsCount % steps.length])
    //     )
    //     let length = currentSteps.filter(step => step.includes('Z')).length;
    //     if (length > 2)
    //         console.log(length);
    // }
    return currentSteps.map(currentStep => {
        let stepsCount = 0;
        for (stepsCount; !currentStep.includes("Z"); stepsCount++) {
            const instruction = instructions[currentStep];
            const nextStep = steps[stepsCount % steps.length];
            // console.log({currentStep, instruction, "stepsCount % steps.length": stepsCount % steps.length, nextStep})
            if (nextStep === 'L') {
                // console.log(instruction.match(/^\(([A-Z]{3})/))
                currentStep = instruction.match(/^\(([A-Z1-9]{3})/)[1]
            } else {
                // console.log(instruction.match(/([A-Z]{3})\)/))
                currentStep = instruction.match(/([A-Z1-9]{3})\)/)[1]
            }
        }
        return stepsCount
    }).reduce((result, count) => result * count)
}

console.log(getSteps(example))
// console.log(getSteps(example2))
console.log(getSteps(dataDay8))
