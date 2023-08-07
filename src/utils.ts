const Papa = require('papaparse');
import fs from 'fs'

export const getUpdateList = (oldList: any[][], newList: any[][]) => {
  let updateCodeList = []
  
  newList.forEach((newRow) => {
    oldList.forEach((oldRow) => {
      if (oldRow[0] === newRow[0] && oldRow[1] !== newRow[1]) {
        updateCodeList.push([newRow[0], newRow[1], oldRow[2]], 'UPDATE')
        console.log('match', oldRow)
        }
    })
  })
  return updateCodeList
} 

export function getNewCodeList(oldList: any[][], newList: any[][]) {
  let matchedCodes = [];
  let codesToAdd = [];
  for (const newCode of newList) {
    let isMatched = false;
    for (const oldCode of oldList) {
      if (newCode[0] === oldCode[0]) {
        matchedCodes.push([...oldCode, ...newCode.slice(1)],);
        isMatched = true;
        break;
      }
    }
    if (!isMatched) {
      let addCode = [...newCode, 1.00, 'NEW']
      codesToAdd.push(addCode);
    }
  }

  return codesToAdd
}

export function makeCsv(codesToAdd) {
  const csvString = Papa.unparse(codesToAdd);
  
  // Write the CSV string to a file
  fs.writeFile('codesToAdd.csv', csvString, (err) => {
    if (err) throw err;
    console.log('codesToAdd.csv has been saved.');
  });
}