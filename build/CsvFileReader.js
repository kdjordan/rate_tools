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
        this.data = [];
        this.dataNew = [];
        this.newList = [];
        this.newNames = [];
        this.oldNames = [];
    }
    getData() {
        return this.data;
    }
    getNewData() {
        return this.dataNew;
    }
    getOldNames() {
        return this.oldNames;
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
                const results = papaparse_1.default.parse(data, { header: false }).data;
                const returnData = results.map((row) => {
                    return [parseInt(row[0]), row[1], parseFloat(row[2])];
                });
                resolve(returnData);
            });
        });
    }
    readOldNames() {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(this.filename, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                const results = papaparse_1.default.parse(data, { header: false }).data;
                const returnData = results.map((row) => {
                    return [row[0], row[1]];
                });
                resolve(returnData);
            });
        });
    }
    readNewNames() {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(this.filename, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                const results = papaparse_1.default.parse(data, { header: false }).data;
                const returnData = results.map((row) => {
                    return [row[0]];
                });
                resolve(returnData);
            });
        });
    }
}
exports.CsvFileReader = CsvFileReader;
