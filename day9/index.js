"use strict";
exports.__esModule = true;
var readline = require("readline");
var fs = require("fs");
// Create reader
var readInterface = readline.createInterface(fs.createReadStream('./input.txt'), process.stdout, undefined, false);
var nums = [];
// Reads each line of file
readInterface.on('line', function (line) {
    nums.push(Number.parseInt(line));
});
// Runs when file has been entirely read, or reader has been stopped
readInterface.on('close', function () {
    var invalidNum = 0;
    // find invalid num
    for (var i = 25; i < nums.length; i++) {
        // console.log(`i: ${i}`);
        var foundSum = false;
        for (var j = i - 1; j >= i - 25; j--) {
            // console.log(`j: ${j}`);
            for (var k = i - 1; k >= i - 25; k--) {
                // console.log(`k: ${k}`)
                if (nums[j] + nums[k] === nums[i] && nums[j] !== nums[k]) {
                    foundSum = true;
                    break;
                }
            }
            if (foundSum)
                break;
        }
        if (!foundSum) {
            invalidNum = nums[i];
            break;
        }
    }
    // find set that adds up to invalid
    for (var i = 0; i < nums.length; i++) {
        for (var j = i + 1; j < nums.length; j++) {
            var sum = 0;
            var sumNums = [];
            for (var k = i; k <= j; k++) {
                sum += nums[k];
                sumNums.push(nums[k]);
            }
            if (sum === invalidNum) {
                console.log("range is " + i + " to " + j + " inclusive");
                console.log(sumNums);
                console.log('answer');
                sumNums.sort();
                console.log(sumNums[0] + sumNums[sumNums.length - 1]);
                return;
            }
            sumNums = [];
        }
    }
});
