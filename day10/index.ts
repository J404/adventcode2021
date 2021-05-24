import * as readline from 'readline';
import * as fs from 'fs';
import { start } from 'repl';

// Create reader
const readInterface = readline.createInterface(
fs.createReadStream('./input.txt'), 
process.stdout,
undefined,
false
);

let joltList: number[] = [];

const findBranchesToEnd = (startJolt: number): number => {
    const index = joltList.indexOf(startJolt);
    //console.log(startJolt);

    const finalJolts = joltList[joltList.length - 1] + 3;

    const oneDiff = joltList.indexOf(startJolt + 1);
    const twoDiff = joltList.indexOf(startJolt + 2);
    const threeDiff = joltList.indexOf(startJolt + 3);

    let numBranches = 0;

    if (startJolt === finalJolts || startJolt + 1 === finalJolts || startJolt + 2 === finalJolts || startJolt + 3 === finalJolts)
        return 1;

    if (oneDiff >= 0)
        numBranches += findBranchesToEnd(startJolt + 1);
    if (twoDiff >= 0)
        numBranches += findBranchesToEnd(startJolt + 2);
    if (threeDiff >= 0)
        numBranches += findBranchesToEnd(startJolt + 3);

    return numBranches;
}

// Reads each line of file
readInterface.on('line', line => {
    joltList.push(Number.parseInt(line));
});

let oneDiffs = 0;
let threeDiffs = 0;

// Runs when file has been entirely read, or reader has been stopped
readInterface.on('close', () => {
    joltList.sort((a, b) => a - b);
    // console.log(joltList);

    // for (let i = 0; i < joltList.length; i++) {
    //     const curr = joltList[i];
    //     const prev = joltList[i - 1] || 0;
    //     const diff = curr - prev;

    //     if (diff === 1) {
    //         oneDiffs++;
    //     } else if (diff === 3) {
    //         threeDiffs++;
    //     }
    // }

    // // Final adapter to ours, three higher than the higest one
    // threeDiffs++;

    // console.log('answer');
    // console.log(oneDiffs * threeDiffs);

    const numCombinations = findBranchesToEnd(0);
    console.log('answer:');
    console.log(numCombinations);
});