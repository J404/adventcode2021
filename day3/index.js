"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = __importStar(require("readline"));
var fs = __importStar(require("fs"));
var readInterface = readline.createInterface(fs.createReadStream('./input.txt'), process.stdout, undefined, false);
var mapDict = {};
var slope = { dx: 1, dy: 2 };
var x = 0;
var y = 0;
var liney = 0;
var maxX = 0;
// Sets up map / dictionary with coords as key, tree / no tree as value
readInterface.on('line', function (line) {
    maxX = line.length;
    for (var i = 0; i < line.length; i++) {
        mapDict[i + "," + liney] = line[i];
    }
    liney++;
});
var numTrees = 0;
readInterface.on('close', function () {
    while (y <= liney) {
        x += slope.dx;
        y += slope.dy;
        if (x >= maxX)
            x -= maxX;
        var spot = mapDict[x + "," + y];
        if (spot === '#')
            numTrees++;
    }
    console.log('answer:');
    console.log(numTrees);
});
