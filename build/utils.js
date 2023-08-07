"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCsv = exports.getNewCodeList = exports.getUpdateList = void 0;
const Papa = require('papaparse');
const fs_1 = __importDefault(require("fs"));
const getUpdateList = (oldList, newList) => {
    let updateCodeList = [];
    newList.forEach((newRow) => {
        oldList.forEach((oldRow) => {
            if (oldRow[0] === newRow[0] && oldRow[1] !== newRow[1]) {
                updateCodeList.push([newRow[0], newRow[1], oldRow[2]], 'UPDATE');
                console.log('match', oldRow);
            }
        });
    });
    return updateCodeList;
};
exports.getUpdateList = getUpdateList;
function getNewCodeList(oldList, newList) {
    let matchedCodes = [];
    let codesToAdd = [];
    for (const newCode of newList) {
        let isMatched = false;
        for (const oldCode of oldList) {
            if (newCode[0] === oldCode[0]) {
                matchedCodes.push([...oldCode, ...newCode.slice(1)]);
                isMatched = true;
                break;
            }
        }
        if (!isMatched) {
            let addCode = [...newCode, 1.00, 'NEW'];
            codesToAdd.push(addCode);
        }
    }
    return codesToAdd;
}
exports.getNewCodeList = getNewCodeList;
function makeCsv(codesToAdd) {
    const csvString = Papa.unparse(codesToAdd);
    // Write the CSV string to a file
    fs_1.default.writeFile('codesToAdd.csv', csvString, (err) => {
        if (err)
            throw err;
        console.log('codesToAdd.csv has been saved.');
    });
}
exports.makeCsv = makeCsv;
