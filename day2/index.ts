import * as readline from 'readline';
import * as fs from 'fs';

const readInterface = readline.createInterface(
    fs.createReadStream('./input.txt'), 
    process.stdout,
    undefined,
    false
);

interface Rule {
    position1: number;
    position2: number;
    letter: string;
}

const checkValid = (rule: Rule, pass: string): boolean => {
    const firstValid = pass[rule.position1 - 1] === rule.letter; 
    const secondValid = pass[rule.position2 - 1] === rule.letter; 
    
    // XOR
    return (firstValid && !secondValid) || (!firstValid && secondValid);
}

let numValid = 0;

readInterface.on('line', line => {
    let halves = line.split('-');
    const position1 = Number.parseInt(halves[0]);

    const [ pos2String, letterColon, pass ] = halves[1].split(' ');

    const position2 = Number.parseInt(pos2String);
    const letter = letterColon[0];

    const rule: Rule = { position1, position2, letter };

    if (checkValid(rule, pass))
        numValid++;
});

readInterface.on('close', () => {
    console.log('answer:');
    console.log(numValid);
});