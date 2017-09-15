'use strict';
const fs = require('fs');
const path = require('path');

const readFileAndParse = (filePath) => {
  let fileContents
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    if(err){
      throw err
    }
    data = fileContents
    return JSON.parse(fileContents);
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

//complete will change incomplete status is false;
exports.deleted = (taskNumber, filePath) => {
  const objectTasks = readFileAndParse(filePath);
  const arrayOfTaskObjects = objectTasks.tasks;
  const stringReturnValue = ChangeIncompleteStatus(arrayOfTaskObjects, (Number(taskNumber)-1), filePath);
  const objectTasksString = JSON.stringify(objectTasks);
  printToTerminal(filePath, stringReturnValue);
  writeToFile(filePath, objectTasksString);
  return stringReturnValue;
};