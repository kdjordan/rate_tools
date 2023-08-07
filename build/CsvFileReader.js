"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvFileReader = void 0;
const fs_1 = __importDefault(require("fs"));
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
            let parse = row[2].split('\r');
            return [
                parseInt(row[0]),
                row[1],
                parseFloat(parse[0])
            ];
        });
    }
    readBase() {
        this.dataNew = fs_1.default.readFileSync(this.filename, {
            encoding: 'utf-8'
        })
            .split('\n')
            .map((row) => {
            return row.split(',');
        })
            .map((row) => {
            let parse = row[1].split('\r');
            return [
                parseInt(row[0]),
                parse[0]
            ];
        });
    }
    compare() {
        this.dataNew.forEach(newRow => {
            this.data.forEach((curRow) => {
                console.log(curRow);
                console.log('in here');
                // if (newRow[0] === curRow[0]) {
                //   console.log(`adding ${newRow}`)
                // }
            });
        });
    }
}
exports.CsvFileReader = CsvFileReader;
