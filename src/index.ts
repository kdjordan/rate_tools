import { CsvFileReader } from "./CsvFileReader";
import { getCodeLists, makeCsv } from "./utils";

// let baseList = new Array()
// let newList = new Array()

async function processCsvData(filename1: string, filename2: string) {
  const csvFileReader1 = new CsvFileReader(filename1);
  const csvFileReader2 = new CsvFileReader(filename2);
  let flag = true
  try {
    const data1 = await csvFileReader1.readBase();
    const data2 = await csvFileReader2.readBase();
    // console.log('**', data1);
    if(flag) {
      const [newCodeList, matchedCodeList] = getCodeLists(data1, data2)
      makeCsv('new', newCodeList)
      makeCsv('matches', matchedCodeList)
    }
  } catch (error) {
    console.error('Error reading CSV file:', error);
  }
}

processCsvData('CURRENT_CODES.CSV', 'NEW_CODES.csv');

