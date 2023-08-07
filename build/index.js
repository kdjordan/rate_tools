"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CsvFileReader_1 = require("./CsvFileReader");
const utils_1 = require("./utils");
// let baseList = new Array()
// let newList = new Array()
async function processCsvData(filename1, filename2) {
    const csvFileReader1 = new CsvFileReader_1.CsvFileReader(filename1);
    const csvFileReader2 = new CsvFileReader_1.CsvFileReader(filename2);
    let flag = true;
    try {
        const data1 = await csvFileReader1.readBase();
        const data2 = await csvFileReader2.readBase();
        // console.log('**', data1);
        if (flag) {
            const [newCodeList, matchedCodeList] = (0, utils_1.getCodeLists)(data1, data2);
            (0, utils_1.makeCsv)('new', newCodeList);
            (0, utils_1.makeCsv)('matches', matchedCodeList);
        }
    }
    catch (error) {
        console.error('Error reading CSV file:', error);
    }
}
processCsvData('CURRENT_CODES.CSV', 'NEW_CODES.csv');
