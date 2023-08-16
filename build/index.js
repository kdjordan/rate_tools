"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CsvFileReader_1 = require("./CsvFileReader");
const utils_1 = require("./utils");
// let baseList = new Array()
// let newList = new Array()
const array1 = [
    ['ALBANIA'],
    ['ALBANIA FIXED ALBTEL'],
    ['ALBANIA FIXED TELEKOM ALBANIA'],
    ['ALBANIA MOBILE'],
    ['ALBANIA MOBILE AMC'],
    ['ALBANIA MOBILE EAGLE'],
    ['ALBANIA MOBILE VODAFONE'],
    ['ALBANIA OLO'],
    ['ALBANIA SPECIAL SERVICES'],
    ['ALBANIA TIRANA']
];
const array2 = [
    ['ALBANIA', 'ALBANIA'],
    ['ALBANIA MOBILE AMC', 'ALBANIA'],
    ['ALBANIA MOBILE EAGLE', 'ALBANIA'],
    ['ALBANIA MOBILE VODAFONE', 'ALBANIA'],
    ['ALBANIA TIRANA', 'ALBANIA']
];
async function processCsvData(filename1, filename2) {
    const csvFileReader1 = new CsvFileReader_1.CsvFileReader(filename1);
    const csvFileReader2 = new CsvFileReader_1.CsvFileReader(filename2);
    let flag = true;
    // let flag = false
    try {
        const data1 = await csvFileReader1.readBase();
        const data2 = await csvFileReader2.readBase();
        // console.log('**', data1);
        if (flag) {
            // const [newCodeList, matchedCodeList] = compareDestNames(data1, data2)
            // const newDestNames = compareDestNames(data1, data2)
            // makeCsv('albania', newDestNames)
            // makeCsv('new', newCodeList)
            // makeCsv('matches', matchedCodeList)
        }
    }
    catch (error) {
        console.error('Error reading CSV file:', error);
    }
}
async function processCsvNames(filename1, filename2) {
    const csvFileReader1 = new CsvFileReader_1.CsvFileReader(filename1);
    const csvFileReader2 = new CsvFileReader_1.CsvFileReader(filename2);
    let flag = true;
    // let flag = false
    try {
        const currentNames = await csvFileReader2.readOldNames();
        const newNames = await csvFileReader1.readNewNames();
        console.log('**', newNames);
        console.log('- ', currentNames);
        if (flag) {
            const newNamesList = (0, utils_1.getNewNames)(currentNames, newNames);
            // console.log('add these ', newNamesList)
            // makeCsv('test', newNamesList)
        }
    }
    catch (error) {
        console.error('Error reading CSV file:', error);
    }
}
// processCsvNames('./CSV/CUR_DEST_NAMES.CSV', './CSV/SINCH_NAMES_ONLY.csv');
processCsvNames('./CSV/TEST_FILES/SINCH_NAMES_1000.csv', './CSV/TEST_FILES/CUR_DEST_NAMES_1000.csv');
// const newNamesList = getNewNames(array1, array2)
