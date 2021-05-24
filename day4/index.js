"use strict";
exports.__esModule = true;
var readline = require("readline");
var fs = require("fs");
var readInterface = readline.createInterface(fs.createReadStream('./input.txt'), process.stdout, undefined, false);
var analyzeLine = function (line) {
    var pairs = line.split(' ');
    var keyvals = [];
    for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
        var pair = pairs_1[_i];
        keyvals.push(pair.split(':'));
    }
    return keyvals;
};
var isValid = function (passport) {
    // Check byr
    console.log('checking byr');
    if (!passport.byr)
        return false;
    if (Number.parseInt(passport.byr) < 1920 || Number.parseInt(passport.byr) > 2002)
        return false;
    // Check iyr
    console.log('checking iyr');
    if (!passport.iyr)
        return false;
    var iyr = Number.parseInt(passport.iyr);
    if (iyr < 2010 || iyr > 2020)
        return false;
    // Check eyr
    console.log('checking eyr');
    if (!passport.eyr)
        return false;
    var eyr = Number.parseInt(passport.eyr);
    if (eyr < 2020 || eyr > 2030)
        return false;
    // Check hgt
    console.log('checking hgt');
    if (!passport.hgt)
        return false;
    var unit = passport.hgt.slice(passport.hgt.length - 2, passport.hgt.length);
    if (unit !== 'cm' && unit !== 'in')
        return false;
    var digits = Number.parseInt(passport.hgt.slice(0, passport.hgt.length - 2));
    if (!!!digits ||
        (unit === 'cm' && (digits < 150 || digits > 193 || passport.hgt.length !== 5)) ||
        (unit === 'in' && (digits < 59 || digits > 76 || passport.hgt.length !== 4)))
        return false;
    // Check hcl
    console.log('checking hcl');
    if (!passport.hcl)
        return false;
    if ((passport.hcl.match(/#[0-9a-f]{6}/gm) || []).length !== 1 || passport.hcl.length !== 7)
        return false;
    // Check ecl
    console.log('checking ecl');
    if (!passport.ecl)
        return false;
    if (passport.ecl !== 'amb' && passport.ecl !== 'blu' && passport.ecl !== 'gry' && passport.ecl !== 'brn'
        && passport.ecl !== 'grn' && passport.ecl !== 'hzl' && passport.ecl !== 'oth')
        return false;
    // Check pid
    console.log('checking pid');
    if (!passport.pid)
        return false;
    if ((passport.pid.match(/[0-9]{9}/gm) || []).length !== 1 || passport.pid.length !== 9)
        return false;
    return true;
};
// let testpass = {
//     pid: '000056539',
//     hgt: '190cm',
//     'ecl': 'blu',
//     iyr: '2014',
//     eyr: '2029',
//     byr: '1989',
//     'hcl': '#123abc'
// };
// console.log(isValid(testpass));
// process.exit();
var newPass = true;
var numValid = 0;
var reqKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
var currPassport = {};
readInterface.on('line', function (line) {
    if (newPass && line.length !== 0) {
        // Add a new passport\
        newPass = false;
        var keyvals = analyzeLine(line);
        for (var _i = 0, keyvals_1 = keyvals; _i < keyvals_1.length; _i++) {
            var _a = keyvals_1[_i], key = _a[0], val = _a[1];
            if (key !== 'cid')
                currPassport[key] = val;
        }
    }
    else if (!newPass && line.length !== 0) {
        // Add to existing passport
        var keyvals = analyzeLine(line);
        for (var _b = 0, keyvals_2 = keyvals; _b < keyvals_2.length; _b++) {
            var _c = keyvals_2[_b], key = _c[0], val = _c[1];
            if (key !== 'cid')
                currPassport[key] = val;
        }
    }
    else if (!newPass && line.length === 0) {
        // Add old passport we were working on to array
        // reset newPass variable and get ready to start a new passport
        newPass = true;
        if (isValid(currPassport)) {
            numValid++;
            console.log('VALID PASS:');
            console.log(currPassport);
        }
        else {
            console.log('INVALID PASS:');
            console.log(currPassport);
        }
        currPassport = {};
    }
});
readInterface.on('close', function () {
    if (!newPass && isValid(currPassport))
        numValid++;
    console.log('answer');
    console.log(numValid);
});
