import * as readline from 'readline';
import * as fs from 'fs';

const readInterface = readline.createInterface(
    fs.createReadStream('./input.txt'), 
    process.stdout,
    null,
    false
);

const results: Object = {}; 

readInterface.on('line', line => {
    const curr = Number.parseInt(line);
    const difference = 2020 - curr;
    
    results[difference] = { num: curr };

    for (let diff in results) {
        const num = results[diff].num;
        const z = Number.parseInt(diff) - curr;
        if (results[2020 - z]) {
            console.log('answer:');
            console.log(curr * num * z);
            process.exit();
        }
    }
});