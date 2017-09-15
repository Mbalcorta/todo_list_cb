'use strict';
const fs = require('fs');
const path = require('path');

const readFileAndParse = (jsonPath, taskNumber) => {
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    if(err){
      throw err
    }
    runAfterRead(taskNumber, jsonPath, JSON.parse(data))
    return JSON.parse(data);
  });
};

const writeToFile = (filePath, objectTasksString) => {
  fs.writeFile(filePath, objectTasksString, (err) => {
    if(err) throw err
    return objectTasksString;
  });
};

const printToTerminal = (filePath, stringValue) => {
  if(filePath === path.resolve(__dirname, '../tasks.json')){
    process.stdout.write(stringValue);
  }
}

const ChangeIncompleteStatus = (arrayOfObjects, taskNumber, filePath) => {
  if(arrayOfObjects[taskNumber] && arrayOfObjects[taskNumber].incomplete){
      const taskTitle = arrayOfObjects[taskNumber].description;
      arrayOfObjects[taskNumber].incomplete = false;
      return  `Deleted tasks ${taskNumber+1}: '${taskTitle}'\n`;
    } else {
      if(filePath === path.resolve(__dirname, '../tasks.json')){
        process.stdout.write('ID Description\n');
        process.stdout.write('-- -------------\n\n');
        }
      return 'You have 0 tasks\n';
    }
};

const runAfterRead = (taskNumber, filePath, data) => {
  const arrayOfTaskObjects = data.tasks;
  const stringReturnValue = ChangeIncompleteStatus(arrayOfTaskObjects, (Number(taskNumber)-1), filePath);
  const objectTasksString = JSON.stringify(data);
  printToTerminal(filePath, stringReturnValue);
  writeToFile(filePath, objectTasksString);
  return stringReturnValue;
}
//complete will change incomplete status is false;
exports.deleted = (taskNumber, filePath) => {
  readFileAndParse(filePath, taskNumber);
};
