"use strict";
exports.__esModule = true;
var readline = require("readline");
var fs = require("fs");
var readInterface = readline.createInterface(fs.createReadStream('./input.txt'), process.stdout, undefined, false);
var checkValid = function (rule, pass) {
    var firstValid = pass[rule.position1 - 1] === rule.letter;
    var secondValid = pass[rule.position2 - 1] === rule.letter;
    // XOR
    return (firstValid && !secondValid) || (!firstValid && secondValid);
};
var numValid = 0;
readInterface.on('line', function (line) {
    var halves = line.split('-');
    var position1 = Number.parseInt(halves[0]);
    var _a = halves[1].split(' '), pos2String = _a[0], letterColon = _a[1], pass = _a[2];
    var position2 = Number.parseInt(pos2String);
    var letter = letterColon[0];
    var rule = { position1: position1, position2: position2, letter: letter };
    if (checkValid(rule, pass))
        numValid++;
});
readInterface.on('close', function () {
    console.log('answer:');
    console.log(numValid);
});
