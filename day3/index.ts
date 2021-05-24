import * as readline from 'readline';
import * as fs from 'fs';

const readInterface = readline.createInterface(
    fs.createReadStream('./input.txt'), 
    process.stdout,
    undefined,
    false
);

interface Slope {
    dx: number;
    dy: number;
}

const mapDict: { [coord: string]: string} = {};

const slope: Slope = { dx: 1, dy: 2 };

let x = 0;
let y = 0;

let liney = 0;
let maxX = 0;

// Sets up map / dictionary with coords as key, tree / no tree as value
readInterface.on('line', line => {
    maxX = line.length;

    for (let i = 0; i < line.length; i++) {
        mapDict[`${i},${liney}`] = line[i];
    }

    liney++;
});

let numTrees = 0;

readInterface.on('close', () => {
    while (y <= liney) {
        x += slope.dx;
        y += slope.dy;

        if (x >= maxX)
            x -= maxX;

        const spot = mapDict[`${x},${y}`];
        
        if (spot === '#')
            numTrees++;
    }

    console.log('answer:');
    console.log(numTrees);
});