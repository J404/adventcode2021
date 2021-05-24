import * as readline from 'readline';
import * as fs from 'fs';

// Create reader
const readInterface = readline.createInterface(
fs.createReadStream('./input.txt'), 
process.stdout,
undefined,
false
);

const nums: number[] = [];

// Reads each line of file
readInterface.on('line', line => {
    nums.push(Number.parseInt(line));
});

// Runs when file has been entirely read, or reader has been stopped
readInterface.on('close', () => {
    let invalidNum = 0;

    // find invalid num
    for (let i = 25; i < nums.length; i++) {
        // console.log(`i: ${i}`);
        let foundSum = false;

        for (let j = i - 1; j >= i - 25; j--) {
            // console.log(`j: ${j}`);
            for (let k = i - 1; k >= i - 25; k--) {
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
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            let sum = 0;
            let sumNums = [];

            for (let k = i; k <= j; k++) {
                sum += nums[k];
                sumNums.push(nums[k]);
            }

            if (sum === invalidNum) {
                console.log(`range is ${i} to ${j} inclusive`);
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