import * as readline from 'readline';
import * as fs from 'fs';

// Create reader
const readInterface = readline.createInterface(
fs.createReadStream('./input.txt'), 
process.stdout,
undefined,
false
);

let acc = 0;

const TEST_LINE = 'acc +1';

interface Command {
    command: string;
    arg: number;
}

const analyzeLine = (line: string): Command => {
    const halves = line.split(' ');
    const command = halves[0];
    const sign = halves[1][0];
    const num = Number.parseInt(halves[1].slice(1));
    const arg = (sign === '+') ? num : -num;
    
    return { command, arg };
}

const commDict: { [lineNum: number]: Command } = {};

let i = 0;

// Reads each line of file
readInterface.on('line', line => {
    const command = analyzeLine(line);

    commDict[i] = command;

    i++;
});

let visitedLines: number[] = [];
let prev: { lineNum: number, command: Command } = {} as any;
let current: { lineNum: number, command: Command } = {} as any;

// Not good because it mutates global variables but whatever
// Returns true if got to end of program successfully,
// false if ran into infinite loop
const evalProgram = (): { completed: boolean, lineNum?: number } => {
    for (let currLine = 0; currLine < i; currLine++) {
        if (visitedLines.indexOf(currLine) > -1) {
            // console.log('Visited a line again! Failing!')
            return {
                completed: false,
                lineNum: currLine,
            }
        } else
            visitedLines.push(currLine);

        const command = commDict[currLine];
        prev = current;
        current = { lineNum: currLine, command };

        if (command.command === 'acc') {
            acc += command.arg;
            continue;
        } else if (command.command === 'jmp') {
            currLine += command.arg;
            currLine -= 1; // for the iteration on loop end
            continue;
        }
    }

    console.log('terminated successfully');
    return {
        completed: true,
    }
}

// This is why we don't directly mutate global things in functions but whatever
const resetVars = () => {
    acc = 0;
    visitedLines = [];
    prev = {} as any;
    current = {} as any;
}

// Runs when file has been entirely read, or reader has been stopped
readInterface.on('close', () => {
    let { completed, lineNum } = evalProgram();

    if (completed) {
        console.log('successful first try:');
        console.log(acc);
    } else {
        let changeLine = 0;
        let oldComm = '';
        let commChanged = false;

        while (!evalProgram().completed && changeLine < i) {
            if (commChanged) {
                // console.log('Resetting old command');
                // reset changed command that didn't work
                commDict[changeLine - 1].command = oldComm;
            }

            resetVars();
            commChanged = false;

            if (commDict[changeLine].command !== 'acc') {
                // console.log('Changing new command');
                oldComm = commDict[changeLine].command;
                commDict[changeLine].command = (oldComm === 'jmp') ? 'nop' : 'jmp';
                // console.log(evalProgram().completed);
                commChanged = true;
            }

            // console.log('line down');
            changeLine++;
            // console.log(commDict);
        }
    }

    console.log(acc);
});