import * as readline from 'readline';
import * as fs from 'fs';

// Create reader
const readInterface = readline.createInterface(
fs.createReadStream('./input.txt'), 
process.stdout,
undefined,
false
);

const getYesCount = (answers: string[][]): number => {
    if (answers.length === 0)
        return 0;

    let yesCount = answers[0].length;

    const sharedVals: number[] = [];

    for (let i = 1; i < answers.length; i++) {
        let sharedLetters = answers[i].filter(val => answers[0].indexOf(val) > -1);
        sharedVals.push(sharedLetters.length);
    }

    sharedVals.sort((a, b) => a - b);

    if (answers.length > 1) {
        yesCount = sharedVals[0];
    }

    return yesCount;
}

let newGroup = true;
let currGroupYes = 0;
let groupCounts: number[] = [];
let groupAnswers: string[][] = [];

// Reads each line of file
readInterface.on('line', line => {
    if (newGroup && line.length !== 0) {
        // new group, start count for group
        newGroup = false;

        groupAnswers.push(line.split(''));
    } else if (!newGroup && line.length !== 0) {
        // continuing from current group
        groupAnswers.push(line.split(''));
    } else if (!newGroup && line.length === 0) {
        // Blank line, reset and add count to arr
        newGroup = true;

        // console.log('Group answers:')
        // console.log(groupAnswers);
        // console.log('yes count:')
        // console.log(getYesCount(groupAnswers));
        groupCounts.push(getYesCount(groupAnswers));

        //currGroupYes = 0;
        groupAnswers = [];
    }
});

// Runs when file has been entirely read, or reader has been stopped
readInterface.on('close', () => {
    // Last group
    groupCounts.push(getYesCount(groupAnswers));

    // Sum
    const sum = groupCounts.reduce((acc, val) => acc + val);
    console.log('answer');
    console.log(sum);
});