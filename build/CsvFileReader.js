"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvFileReader = void 0;
const fs_1 = __importDefault(require("fs"));
const Papa = require('papaparse');
class CsvFileReader {
    constructor(filename) {
        this.filename = filename;
        this.data = [];
        this.dataNew = [];
        this.newList = [];
    }
    getData() {
        return this.data;
    }
    getNewData() {
        return this.dataNew;
    }
    read() {
        this.data = fs_1.default.readFileSync(this.filename, {
            encoding: 'utf-8'
        })
            .split('\n')
            .map((row) => {
            return row.split(',');
        })
            .map((row) => {
            // console.log(row)
            let parse = row[2].split('\r');
            return [
                parseInt(row[0]),
                row[1],
                parseFloat(parse[0])
            ];
        });
    }
    readBase() {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(this.filename, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                const results = Papa.parse(data, { header: false }).data;
                const returnData = results.map((row) => {
                    return [parseInt(row[0]), row[1], parseFloat(row[2])];
                });
                resolve(returnData);
            });
        });
    }
}
exports.CsvFileReader = CsvFileReader;
