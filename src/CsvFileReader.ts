import fs from 'fs'
// import { dateStringToDate } from './utils'
import Papa from 'papaparse';

export class CsvFileReader {

  constructor(public filename: string) {}
  
  readNames(type: string): Promise<string[][]> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filename, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        const results = Papa.parse(data, {header: false}).data;
  
        let returnData: string[][] = [];
  
        if (type === 'current') {
          returnData = results.map((row) => {
            return [row[0], row[1]];
          });
        } else if (type === 'new') {
          returnData = results.map((row) => {
            return [row[0]];
          });
        }
  
        resolve(returnData);
      });
    });
  }
}