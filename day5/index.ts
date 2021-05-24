import * as readline from 'readline';
import * as fs from 'fs';

// Create reader
const readInterface = readline.createInterface(
fs.createReadStream('./input.txt'), 
process.stdout,
undefined,
false
);

const getSeatID = (input: string): number => {
    const rowInstruct = input.slice(0, 7);
    const colInstruct = input.slice(7);

    const row = followPass(0, 127, rowInstruct);
    const col = followPass(0, 7, colInstruct);

    return row * 8 + col;
}

const followPass = (start: number, end: number, pass: string): number => {
    let newPass = '';
    let mid = 0;

    if (pass[0] === 'F' || pass[0] === 'L') {
        mid = Math.floor((start + end) / 2);

        // if (start === mid || end === mid)
        //     return mid;

        end = mid;
    } else {
        mid = Math.ceil((start + end) / 2);

        start = mid;
    }

    newPass = pass.slice(1);

    if (newPass.length === 0)
        return mid;
    else 
        return followPass(start, end, newPass);
}

const passIDs: number[] = [];

// Reads each line of file
readInterface.on('line', line => {
    const id = getSeatID(line);
    passIDs.push(id);
});

// Runs when file has been entirely read, or reader has been stopped
readInterface.on('close', () => {
    passIDs.sort((a, b) => a - b);
    
    for (let id of passIDs) {
        if (passIDs.indexOf(id - 2) > -1 && passIDs.indexOf(id - 1) < 0) {
            console.log('answer:');
            console.log(id - 1);
            return;
        }
    }

    console.log('no missing ID found');
    // console.log(passIDs[passIDs.length - 1]);
});