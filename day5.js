import {dataDay5, dataDay5Seeds} from "./dataDay5.js";

const exampleSeeds = `seeds: 79 14 55 13`
const example = `seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`

function mapSourceToDest(source, destRange, sourceRange, length) {
    if (source >= sourceRange) {
        return destRange + length;
    }
    return undefined
}

function getLowestLocationNumber(data, seedsData) {
    const seeds = seedsData.split(":")[1].split(" ").filter(Boolean).map(Number);

    const categories = data.split("\n\n").map((category) => {
        const [name, listsData] = category.trim().split('map:');
        console.log({name, listsData})
        const lists = listsData.split('\n').filter(Boolean).map(list => list.split(' ').filter(Boolean).map(Number));
        return {name, lists}
    })

    return seeds.reduce((minLocation, seed) => {
        const location = categories.reduce((source, category) => {
            const {name, lists} = category

            const dest = lists.reduce((resultList, [destRange, sourceRange, length]) => {
                    // console.log({
                    //     result: resultList,
                    //     src: source,
                    //     destRange,
                    //     sourceRange,
                    //     length,
                    //     "source >= sourceRange": source >= sourceRange,
                    //     "source <= sourceRange + length": source <= sourceRange + length
                    // })
                    if (source >= sourceRange && source <= sourceRange + length) {
                        return destRange + source - sourceRange;
                    }

                    return resultList
                }, undefined
            )
            console.log({dest})
            return dest || source
        }, seed)
        return minLocation > location ? location : minLocation
    })

}

function getLowestLocationNumberwithRanges(data, seedsData) {
    const seeds = seedsData.split(":")[1].split(" ").filter(Boolean).reduce((result, seed, index) => {
        if (index % 2 === 0) {
            return [...result, [Number(seed)]];
        } else {
            result[result.length - 1].push(Number(seed));
            return result;
        }
    }, []);

    // const moreSeeds = seeds.reduce((moreSeed, [seed, length]) =>
    //         [...moreSeed, ...Array.from({length}).map((_, index) => seed + index)]
    //     , []).filter(Boolean)

    const categories = data.split("\n\n").map((category) => {
        const [name, listsData] = category.trim().split('map:');
        // console.log({name, listsData})
        const lists = listsData.split('\n').filter(Boolean).map(list => list.split(' ').filter(Boolean).map(Number));
        return {name, lists}
    })

    // console.log([...moreSeeds], moreSeeds.length, moreSeeds[0])

    let minLocation = undefined;
    seeds.forEach(([seed, length]) => {
        console.log({seed, length})
        for (let i = 0; i < length; i++) {
            const currentSeed = seed + i;
            // console.log(currentSeed)
            const location = categories.reduce((source, category) => {
                const {name, lists} = category
                const dest = lists.reduce((resultList, [destRange, sourceRange, length]) => {

                        // console.log({
                        //     // result: resultList,
                        //     src: source,
                        //     destRange,
                        //     sourceRange,
                        //     length,
                        //     "source >= sourceRange": source >= sourceRange,
                        //     "source <= sourceRange + length": source <= sourceRange + length,
                        //     "destRange + source - sourceRange": destRange + source - sourceRange
                        // })
                        if (source >= sourceRange && source <= sourceRange + length) {
                            const dest = destRange + source - sourceRange;
                            return dest > resultList ? resultList : dest;
                        }

                        return resultList
                    }, undefined
                )
                // console.log({dest})
                return dest || source
            }, currentSeed);
            // console.log({location})
            minLocation = !minLocation || minLocation > location ? location : minLocation
        }
        console.log({minLocation})
    })
    return minLocation
    // return moreSeeds.reduce((minLocation, seed) => {
    //     const location = categories.reduce((source, category) => {
    //         const {name, lists} = category
    //         const dest = lists.reduce((resultList, [destRange, sourceRange, length]) => {
    //                 if (seed === 82 && source === 77) {
    //
    //                     console.log({
    //                         // result: resultList,
    //                         src: source,
    //                         destRange,
    //                         sourceRange,
    //                         length,
    //                         "source >= sourceRange": source >= sourceRange,
    //                         "source <= sourceRange + length": source <= sourceRange + length,
    //                         "destRange + source - sourceRange": destRange + source - sourceRange
    //                     })
    //                 }
    //                 if (source >= sourceRange && source <= sourceRange + length) {
    //                     const dest = destRange + source - sourceRange;
    //                     return dest > resultList ? resultList : dest;
    //                 }
    //
    //                 return resultList
    //             }, undefined
    //         )
    //         if (seed === 82) {
    //             console.log({dest})
    //         }
    //         return dest || source
    //     }, seed);
    //     if (seed === 82) {
    //         console.log({location})
    //     }
    //     return !minLocation || minLocation > location ? location : minLocation
    // }, undefined)

}

// console.log(getLowestLocationNumberwithRanges(example, exampleSeeds))
console.log(getLowestLocationNumberwithRanges(dataDay5, dataDay5Seeds))
