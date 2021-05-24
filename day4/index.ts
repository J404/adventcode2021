import * as readline from 'readline';
import * as fs from 'fs';

const readInterface = readline.createInterface(
    fs.createReadStream('./input.txt'), 
    process.stdout,
    undefined,
    false
);

type Passport = { [key: string]: string };

const analyzeLine = (line: string): string[][] => {
    const pairs = line.split(' ');
    const keyvals = [];

    for (let pair of pairs)
        keyvals.push(pair.split(':'));

    return keyvals;
}

const isValid = (passport: Passport): boolean => {
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
    const iyr = Number.parseInt(passport.iyr);
    if (iyr < 2010 || iyr > 2020)
        return false;

    // Check eyr
    console.log('checking eyr');
    if (!passport.eyr)
        return false;
    const eyr = Number.parseInt(passport.eyr);
    if (eyr < 2020 || eyr > 2030)
        return false;
    

    // Check hgt
    console.log('checking hgt');
    if (!passport.hgt)
        return false;
        
    const unit = passport.hgt.slice(passport.hgt.length - 2, passport.hgt.length);
    if (unit !== 'cm' && unit !== 'in')
        return false;
    const digits = Number.parseInt(passport.hgt.slice(0, passport.hgt.length - 2));
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
}

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

let newPass = true;

let numValid = 0;

const reqKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
let currPassport: Passport = {};

readInterface.on('line', line => {
    if (newPass && line.length !== 0) {
        // Add a new passport\
        newPass = false;

        const keyvals = analyzeLine(line);

        for (let [key, val] of keyvals) {
            if (key !== 'cid')
                currPassport[key] = val;
        }
    } else if (!newPass && line.length !== 0) {
        // Add to existing passport
        const keyvals = analyzeLine(line);

        for (let [key, val] of keyvals) {
            if (key !== 'cid')
                currPassport[key] = val;
        }
    } else if (!newPass && line.length === 0) {
        // Add old passport we were working on to array
        // reset newPass variable and get ready to start a new passport
        newPass = true;
        
        if (isValid(currPassport)) {
            numValid++;
            console.log('VALID PASS:');
            console.log(currPassport);
        } else {
            console.log('INVALID PASS:');
            console.log(currPassport);
        }

        currPassport = {};
    }
});

readInterface.on('close', () => {
    if (!newPass && isValid(currPassport))
        numValid++;

    console.log('answer');
    console.log(numValid);
});