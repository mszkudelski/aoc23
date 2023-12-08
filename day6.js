import {dataDay5} from "./dataDay5.js";
import {dataDay6, dataDay6Part2} from "./dataDay6.js";

const example = [
    {time: 7, distance: 9},
    {time: 15, distance: 40},
    {time: 30, distance: 200},
]

const example2 = [
    {
        time: 71530,
        distance: 940200
    }
]

function getResult(data) {
    return data.reduce((result, race) => {
        return result * Array.from({length: race.time}, (_, index) => {
            return index * (race.time - index);
        }).filter(distance => distance > race.distance).length;
    }, 1);
}


console.log(getResult(example))
console.log(getResult(dataDay6))
console.log(getResult(example2))
console.log(getResult(dataDay6Part2))
