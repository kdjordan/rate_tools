import fs from 'fs'
// import { dateStringToDate } from './utils'
import Papa from 'papaparse';

export class CsvFileReader {
  data: string[][] = []
  dataNew: any[][] = []
  newList: string[][] = []
  newNames: string[][] = []
  oldNames: string[][] = []

  constructor(public filename: string) {}

  getData(): any[][] {
    return this.data
  }

  getNewData(): any[][] {
    return this.dataNew
  }

  getOldNames(): any[][] {
    return this.oldNames
  }

  read():void{
    this.data = fs.readFileSync(this.filename, {
      encoding: 'utf-8'
    })
    .split('\n')
    .map((row: string): string[] => {
      return row.split(',')
    })
    .map((row: string[]): any => {
      // console.log(row)
      let parse = row[2].split('\r')
      return [
        parseInt(row[0]),
        row[1],
        parseFloat(parse[0])
      ]
    })
  }
  
  readBase(): Promise<any[][]> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filename, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        const results = Papa.parse(data, { header: false }).data;
        const returnData = results.map((row: any[]) => {
          return [parseInt(row[0]), row[1], parseFloat(row[2])];
        });

        resolve(returnData);
      });
    });
  }

  readOldNames(): Promise<any[][]> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filename, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        const results = Papa.parse(data, { header: false }).data;
        const returnData = results.map((row: any) => {
          return [row[0], row[1]];
        });

        resolve(returnData);
      });
    });
  }
  readNewNames(): Promise<any[][]> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filename, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        const results = Papa.parse(data, { header: false }).data;
        const returnData = results.map((row: any) => {
          return [row[0]];
        });

        resolve(returnData);
      });
    });
  }


}