"use strict";
exports.__esModule = true;
var readline = require("readline");
var fs = require("fs");
// Create reader
var readInterface = readline.createInterface(fs.createReadStream('./input.txt'), process.stdout, undefined, false);
var joltList = [];
var findBranchesToEnd = function (startJolt) {
    var index = joltList.indexOf(startJolt);
    //console.log(startJolt);
    var finalJolts = joltList[joltList.length - 1] + 3;
    var oneDiff = joltList.indexOf(startJolt + 1);
    var twoDiff = joltList.indexOf(startJolt + 2);
    var threeDiff = joltList.indexOf(startJolt + 3);
    var numBranches = 0;
    if (startJolt === finalJolts || startJolt + 1 === finalJolts || startJolt + 2 === finalJolts || startJolt + 3 === finalJolts)
        return 1;
    if (oneDiff >= 0)
        numBranches += findBranchesToEnd(startJolt + 1);
    if (twoDiff >= 0)
        numBranches += findBranchesToEnd(startJolt + 2);
    if (threeDiff >= 0)
        numBranches += findBranchesToEnd(startJolt + 3);
    return numBranches;
};
// Reads each line of file
readInterface.on('line', function (line) {
    joltList.push(Number.parseInt(line));
});
var oneDiffs = 0;
var threeDiffs = 0;
// Runs when file has been entirely read, or reader has been stopped
readInterface.on('close', function () {
    joltList.sort(function (a, b) { return a - b; });
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
    var numCombinations = findBranchesToEnd(0);
    console.log('answer:');
    console.log(numCombinations);
});
