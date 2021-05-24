"use strict";
exports.__esModule = true;
var readline = require("readline");
var fs = require("fs");
// Create reader
var readInterface = readline.createInterface(fs.createReadStream('./input.txt'), process.stdout, undefined, false);
var TEST_LINE = 'light orange bags contain 1 dark maroon bag, 3 dim maroon bags, 5 striped green bags, 2 pale aqua bags.';
var bagDict = {};
var analyzeLine = function (line) {
    var words = line.split(' ');
    var color = [words[0], words[1]].join(' ');
    var bags = [];
    if (words[4] === 'no') {
        return {
            count: 1,
            color: color,
            bags: []
        };
    }
    else {
        for (var i = 4; i < words.length; i += 4) {
            var count = Number.parseInt(words[i]);
            var color_1 = [words[i + 1], words[i + 2]].join(' ');
            bags.push({ count: count, color: color_1 });
        }
    }
    return {
        count: 1,
        color: color,
        bags: bags
    };
};
var startingBags = [];
var containsGold = function (bag) {
    for (var _i = 0, _a = bag.bags; _i < _a.length; _i++) {
        var innerBag = _a[_i];
        if (innerBag.color === 'shiny gold') {
            return true;
        }
        else {
            if (containsGold(bagDict[innerBag.color]))
                return true;
        }
    }
    return false;
};
var getCount = function (bag) {
    var count = 0;
    for (var _i = 0, _a = bag.bags; _i < _a.length; _i++) {
        var innerBag = _a[_i];
        if (bagDict[innerBag.color].bags.length === 0)
            count += innerBag.count;
        else
            count += innerBag.count + (innerBag.count * getCount(bagDict[innerBag.color]));
    }
    return count;
};
// Reads each line of file
readInterface.on('line', function (line) {
    var bag = analyzeLine(line);
    bagDict[bag.color] = bag;
});
// Runs when file has been entirely read, or reader has been stopped
readInterface.on('close', function () {
    var sum = 0;
    // for (let bagColor in bagDict) {
    //     const bag = bagDict[bagColor];
    //     startingBags.push(bagColor);
    //     //sum += (containsGold(bag)) ? 1 : 0;
    // }
    sum = getCount(bagDict['shiny gold']);
    console.log('answer:');
    console.log(sum);
});
