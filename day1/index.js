"use strict";
exports.__esModule = true;
var readline = require("readline");
var fs = require("fs");
var readInterface = readline.createInterface(fs.createReadStream('./input.txt'), process.stdout, null, false);
var results = {};
readInterface.on('line', function (line) {
    var curr = Number.parseInt(line);
    var difference = 2020 - curr;
    results[difference] = { num: curr };
    for (var diff in results) {
        var num = results[diff].num;
        var z = Number.parseInt(diff) - curr;
        if (results[2020 - z]) {
            console.log('answer:');
            console.log(curr * num * z);
            process.exit();
        }
    }
});
