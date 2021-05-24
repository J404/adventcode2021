"use strict";
exports.__esModule = true;
var readline = require("readline");
var fs = require("fs");
// Create reader
var readInterface = readline.createInterface(fs.createReadStream('./input.txt'), process.stdout, undefined, false);
var acc = 0;
var TEST_LINE = 'acc +1';
var analyzeLine = function (line) {
    var halves = line.split(' ');
    var command = halves[0];
    var sign = halves[1][0];
    var num = Number.parseInt(halves[1].slice(1));
    var arg = (sign === '+') ? num : -num;
    return { command: command, arg: arg };
};
var commDict = {};
var i = 0;
// Reads each line of file
readInterface.on('line', function (line) {
    var command = analyzeLine(line);
    commDict[i] = command;
    i++;
});
var visitedLines = [];
var prev = {};
var current = {};
// Not good because it mutates global variables but whatever
// Returns true if got to end of program successfully,
// false if ran into infinite loop
var evalProgram = function () {
    for (var currLine = 0; currLine < i; currLine++) {
        if (visitedLines.indexOf(currLine) > -1) {
            // console.log('Visited a line again! Failing!')
            return {
                completed: false,
                lineNum: currLine
            };
        }
        else
            visitedLines.push(currLine);
        var command = commDict[currLine];
        prev = current;
        current = { lineNum: currLine, command: command };
        if (command.command === 'acc') {
            acc += command.arg;
            continue;
        }
        else if (command.command === 'jmp') {
            currLine += command.arg;
            currLine -= 1; // for the iteration on loop end
            continue;
        }
    }
    console.log('terminated successfully');
    return {
        completed: true
    };
};
// This is why we don't directly mutate global things in functions but whatever
var resetVars = function () {
    acc = 0;
    visitedLines = [];
    prev = {};
    current = {};
};
// Runs when file has been entirely read, or reader has been stopped
readInterface.on('close', function () {
    var _a = evalProgram(), completed = _a.completed, lineNum = _a.lineNum;
    if (completed) {
        console.log('successful first try:');
        console.log(acc);
    }
    else {
        var changeLine = 0;
        var oldComm = '';
        var commChanged = false;
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
