"use strict";
exports.__esModule = true;
var readline = require("readline");
var fs = require("fs");
// Create reader
var readInterface = readline.createInterface(fs.createReadStream('./input.txt'), process.stdout, undefined, false);
var getSeatID = function (input) {
    var rowInstruct = input.slice(0, 7);
    var colInstruct = input.slice(7);
    var row = followPass(0, 127, rowInstruct);
    var col = followPass(0, 7, colInstruct);
    return row * 8 + col;
};
var followPass = function (start, end, pass) {
    var newPass = '';
    var mid = 0;
    if (pass[0] === 'F' || pass[0] === 'L') {
        mid = Math.floor((start + end) / 2);
        // if (start === mid || end === mid)
        //     return mid;
        end = mid;
    }
    else {
        mid = Math.ceil((start + end) / 2);
        start = mid;
    }
    newPass = pass.slice(1);
    if (newPass.length === 0)
        return mid;
    else
        return followPass(start, end, newPass);
};
var passIDs = [];
// Reads each line of file
readInterface.on('line', function (line) {
    var id = getSeatID(line);
    passIDs.push(id);
});
// Runs when file has been entirely read, or reader has been stopped
readInterface.on('close', function () {
    passIDs.sort(function (a, b) { return a - b; });
    for (var _i = 0, passIDs_1 = passIDs; _i < passIDs_1.length; _i++) {
        var id = passIDs_1[_i];
        if (passIDs.indexOf(id - 2) > -1 && passIDs.indexOf(id - 1) < 0) {
            console.log('answer:');
            console.log(id - 1);
            return;
        }
    }
    console.log('no missing ID found');
    // console.log(passIDs[passIDs.length - 1]);
});
