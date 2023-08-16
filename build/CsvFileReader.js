"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvFileReader = void 0;
const fs_1 = __importDefault(require("fs"));
// import { dateStringToDate } from './utils'
const papaparse_1 = __importDefault(require("papaparse"));
class CsvFileReader {
    constructor(filename) {
        this.filename = filename;
    }
    readNames(type) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(this.filename, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                const results = papaparse_1.default.parse(data, { header: false }).data;
                let returnData = [];
                if (type === 'current') {
                    returnData = results.map((row) => {
                        return [row[0], row[1]];
                    });
                }
                else if (type === 'new') {
                    returnData = results.map((row) => {
                        return [row[0]];
                    });
                }
                resolve(returnData);
            });
        });
    }
}
exports.CsvFileReader = CsvFileReader;
