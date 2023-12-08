import {dataDay2} from "./dataDay2.js";

const example = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

// which games would have been possible if the bag contained
// only 12 red cubes, 13 green cubes, and 14 blue cubes?


function getGameSum(data) {
    return data.split('\n').map(game => {
        const id = game.split(':')[0].split(' ')[1].trim();
        const sets = game.split(':')[1].split(';').map(set => {
            return set.split(',').map(item => {
                const [count, color,] = item.trim().split(' ');
                return {count, color}
            })
        }).flat()
        console.log(sets)
        return {id, sets}
    }).reduce((total, game) => {
        const green = game.sets.every(set => set.color !== 'green' || set.count <= 13)
        const red = game.sets.every(set => set.color !== 'red' || set.count <= 12)
        const blue = game.sets.every(set => set.color !== 'blue' || set.count <= 14)
        if (green && red && blue) {
            return total + Number(game.id);
        } else {
            return total
        }
    }, 0)
}

// console.log(getGameSum(example))
// console.log(getGameSum(dataDay2))

function getGamePower(data) {
    return data.split('\n').map(game => {
        const id = game.split(':')[0].split(' ')[1].trim();
        const sets = game.split(':')[1].split(';').map(set => {
            return set.split(',').map(item => {
                const [count, color,] = item.trim().split(' ');
                return {count: Number(count), color}
            })
        }).flat()
        // console.log(sets)
        return {id, sets}
    }).reduce((total, game) => {
        const {green, red, blue} = game.sets.reduce((result, set) => {

            if (set.count > result[set.color] || result[set.color] === 0) {
                return {...result, [set.color]: set.count}
            }
            return result
        }, {green: 0, red: 0, blue: 0});

        console.log({green, red, blue, gameId: game.id});
        return total + (green * red * blue)
    }, 0)
}

console.log(getGamePower(example))
console.log(getGamePower(dataDay2))