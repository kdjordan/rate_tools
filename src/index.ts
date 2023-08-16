import { CsvFileReader } from "./CsvFileReader";
import {  getNewNames, getCodeLists, makeCsv } from "./utils";


async function processCsvData(filename1: string, filename2: string) {
  const csvFileReader1 = new CsvFileReader(filename1);
  const csvFileReader2 = new CsvFileReader(filename2);
  let flag = true
  // let flag = false
  try {
    const data1 = await csvFileReader1.readBase();
    const data2 = await csvFileReader2.readBase();
    // console.log('**', data1);
    if(flag) {
      // const [newCodeList, matchedCodeList] = compareDestNames(data1, data2)
      // const newDestNames = compareDestNames(data1, data2)
      // makeCsv('albania', newDestNames)
      // makeCsv('new', newCodeList)
      // makeCsv('matches', matchedCodeList)
    }
  } catch (error) {
    console.error('Error reading CSV file:', error);
  }
}

async function processCsvNames(filename1: string, filename2: string) {
  const csvFileReader1 = new CsvFileReader(filename1);
  const csvFileReader2 = new CsvFileReader(filename2);
  let flag = true

  try {
    const curNames = await csvFileReader1.readNames('current');
    const newNames = await csvFileReader2.readNames('new')
    // console.log('new', newNames)
    // console.log('cur', curNames)
    if(flag) {
      const newNamesList = getNewNames(newNames, curNames)
      console.log('add these ', newNamesList)

      makeCsv('test', newNamesList)
    }
  } catch (error) {
    console.error('Error reading CSV file:', error);
  }

}


// processCsvNames('./CSV/CUR_DEST_NAMES.CSV', './CSV/SINCH_NAMES_ONLY.csv');


processCsvNames('./CSV/TEST_FILES/SINCH_NAMES_1000.csv', './CSV/TEST_FILES/CUR_DEST_NAMES_1000.csv');
// const newNamesList = getNewNames(array1, array2)

