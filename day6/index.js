"use strict";
exports.__esModule = true;
var readline = require("readline");
var fs = require("fs");
// Create reader
var readInterface = readline.createInterface(fs.createReadStream('./input.txt'), process.stdout, undefined, false);
var getYesCount = function (answers) {
    if (answers.length === 0)
        return 0;
    var yesCount = answers[0].length;
    var sharedVals = [];
    for (var i = 1; i < answers.length; i++) {
        var sharedLetters = answers[i].filter(function (val) { return answers[0].indexOf(val) > -1; });
        sharedVals.push(sharedLetters.length);
    }
    sharedVals.sort(function (a, b) { return a - b; });
    if (answers.length > 1) {
        yesCount = sharedVals[0];
    }
    return yesCount;
};
var newGroup = true;
var currGroupYes = 0;
var groupCounts = [];
var groupAnswers = [];
// Reads each line of file
readInterface.on('line', function (line) {
    if (newGroup && line.length !== 0) {
        // new group, start count for group
        newGroup = false;
        groupAnswers.push(line.split(''));
    }
    else if (!newGroup && line.length !== 0) {
        // continuing from current group
        groupAnswers.push(line.split(''));
    }
    else if (!newGroup && line.length === 0) {
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
readInterface.on('close', function () {
    // Last group
    groupCounts.push(getYesCount(groupAnswers));
    // Sum
    var sum = groupCounts.reduce(function (acc, val) { return acc + val; });
    console.log('answer');
    console.log(sum);
});
