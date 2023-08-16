const Papa = require('papaparse');
import fs from 'fs'
const { v4: uuidv4 } = require('uuid');

// export const getUpdateList = (oldList: any[][], newList: any[][]) => {
//   let updateCodeList = []
  
//   newList.forEach((newRow) => {
//     oldList.forEach((oldRow) => {
//       if (oldRow[0] === newRow[0] && oldRow[1] !== newRow[1]) {
//         updateCodeList.push([newRow[0], newRow[1], oldRow[2]], 'UPDATE')
//         // console.log('match', oldRow)
//         }
//     })
//   })
//   return updateCodeList
// } 

export function getCodeLists(oldList: any[][], newList: any[][]) {
  // console.log('going in ', newList)
  let matchedCodes = [];
  let codesToAdd = [];
  for (const newCode of newList) {
    let isMatched = false;
    for (const oldCode of oldList) {
      if (newCode[0] === oldCode[0]) {
        // console.log(newCode[1])
        // matchedCodes.push([...oldCode, ...newCode.slice(1)],);
        matchedCodes.push([oldCode[0], newCode[1] ,oldCode[2], 'UPDATE']);
        isMatched = true;
        break;
      }
    }
    if (!isMatched) {
      let addCode = [...newCode, 1.00, 'NEW']
      codesToAdd.push(addCode);
    }
  }
  
  return [codesToAdd, matchedCodes]
}

export function getNewNames(newList: string[][], curList: string[][]) {

  const namesToAdd: string[] = [];

  // Create a map of current names
  const curNamesMap = new Map();
  for (const curName of curList) {
    curNamesMap.set(curName[0], true); 
  }

  // Check each new name against current name map
  for (const newName of newList) {
    if (!curNamesMap.has(newName[0])) {
      // If new name not found in current map, add it 
      namesToAdd.push(newName[0]);
    }
  }
  // console.log('====', namesToAdd)
  return namesToAdd;

}

export function makeCsv(type: string, codeList: any[][]): void { 
  console.log('making csv', type)
  let fileName = `${type}-${uuidv4().split('-')[0]}`
  const csvString = Papa.unparse(codeList);
  console.log(fileName)
  // Write the CSV string to a file
  fs.writeFile(`${fileName}.csv`, csvString, (err) => {
    if (err) throw err;
    console.log(`${fileName}.csv has been saved.`);
  });
}