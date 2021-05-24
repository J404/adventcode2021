import * as readline from 'readline';
import * as fs from 'fs';

// Create reader
const readInterface = readline.createInterface(
fs.createReadStream('./input.txt'), 
process.stdout,
undefined,
false
);

const TEST_LINE = 'light orange bags contain 1 dark maroon bag, 3 dim maroon bags, 5 striped green bags, 2 pale aqua bags.';

interface BagNoDepth {
    count: number;
    color: string;
}

interface Bag {
    count: number;
    color: string;
    bags: BagNoDepth[];
}

type BagDict = { [bagColor: string]: Bag };

const bagDict: BagDict = {};

const analyzeLine = (line: string): Bag => {
    const words = line.split(' ');
    const color = [ words[0], words[1] ].join(' ');
    
    let bags: BagNoDepth[] = [];
    if (words[4] === 'no') {
        return {
            count: 1,
            color: color,
            bags: []
        }
    } else {
        for (let i = 4; i < words.length; i += 4) {
            const count = Number.parseInt(words[i]);
            const color = [ words[i + 1], words[i + 2] ].join(' ');
            bags.push({ count, color });
        }
    }

    return {
        count: 1,
        color,
        bags
    }
}

const startingBags: string[] = [];
const containsGold = (bag: Bag): boolean => {
    for (let innerBag of bag.bags) {
        if (innerBag.color === 'shiny gold') {
            return true;
        } else {
            if (containsGold(bagDict[innerBag.color]))
                return true;
        }
    }

    return false;
}

const getCount = (bag: Bag): number => {
    let count = 0;
    for (let innerBag of bag.bags) {
        if (bagDict[innerBag.color].bags.length === 0)
            count += innerBag.count;
        else
            count += innerBag.count + (innerBag.count * getCount(bagDict[innerBag.color]));
    }

    return count;
}

// Reads each line of file
readInterface.on('line', line => {
    const bag = analyzeLine(line);
    bagDict[bag.color] = bag;
});

// Runs when file has been entirely read, or reader has been stopped
readInterface.on('close', () => {
    let sum = 0;

    // for (let bagColor in bagDict) {
    //     const bag = bagDict[bagColor];
    //     startingBags.push(bagColor);

    //     //sum += (containsGold(bag)) ? 1 : 0;
    // }

    sum = getCount(bagDict['shiny gold']);

    console.log('answer:');
    console.log(sum);
});