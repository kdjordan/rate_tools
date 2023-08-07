import fs from 'fs'
// import { dateStringToDate } from './utils'
import { MatchResult } from './MatchResult'

type MatchData = [Date, string, string, number, number, MatchResult, string]

export class CsvFileReader {
  data: string[][] = []
  dataNew: string[][] = []
  newList: string[][] = []

  constructor(public filename: string) {}

  getData(): any[][] {
    return this.data
  }

  getNewData(): any[][] {
    return this.dataNew
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
      let parse = row[2].split('\r')
      return [
        parseInt(row[0]),
        row[1],
        parseFloat(parse[0])
      ]
    })
  
  }
  
  readBase(): void {
    this.dataNew = fs.readFileSync(this.filename, {
      encoding: 'utf-8'
    })
    .split('\n')
    .map((row: string): string[] => {
      return row.split(',')
    })
    .map((row: string[]): any => {
      let parse = row[1].split('\r')
      return [
        parseInt(row[0]),
        parse[0]
      ]
    })
  }
  compare(): any {
    this.dataNew.forEach(newRow => {
      this.data.forEach((curRow) => {
        console.log(curRow)
        console.log('in here')
        // if (newRow[0] === curRow[0]) {
        //   console.log(`adding ${newRow}`)
        // }
      })
    })
      
  }
}