import { CsvFileReader } from "./CsvFileReader";
import { getUpdateList, getNewCodeList, makeCsv } from "./utils";


const baseCodes = new CsvFileReader('DEMO_BASE_CODES.csv')
baseCodes.read()
const baseList = baseCodes.getData()
// console.log(baseList)

// console.log(baseCodes.data)

const newCodes = new CsvFileReader('DEMO_NEW_CODES.csv')
newCodes.readBase()
const newList = newCodes.getNewData()
// console.log(newList)

// let updateCodeList = getUpdateList(baseList, newList)
let newCodeList = getNewCodeList(baseList, newList)
// console.log(updateCodeList)

console.log(newCodeList)
makeCsv(newCodeList)
// let deltaList = compareLists([[222, 'test2', .088], [333, 'test3', .08]], [[222, 'testReplace']])

// newCodes.compare()
// newCodes.compare()
// console.log(newCodes.dataNew)
// const newCodes = new CsvFileReader('NEW_CODES.csv')