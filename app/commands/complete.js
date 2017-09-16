'use strict';
const fs = require('fs');
const path = require('path');
const {readAndParseData, writingToJsonFile} = require('../../taskStore.js')


const ChangeIncompleteStatus = (jsonData, filePath, taskNumber) => {
    const taskNumberIndex = (Number(taskNumber)-1);
    const taskTitle = jsonData.tasks[taskNumberIndex].description;
    const taskId = jsonData.tasks[taskNumberIndex].id
    if(jsonData.tasks[taskNumberIndex] && jsonData.tasks[taskNumberIndex].incomplete){
        jsonData.tasks[taskNumberIndex].incomplete = false;
        writingToJsonFile(jsonData ,filePath)
        process.stdout.write(`Completed tasks ${taskId}: '${taskTitle}'\n`);
      } else {
        if(filePath === path.resolve(__dirname, '../tasks.json')){
          process.stdout.write(`Tasks ${taskId}: "${taskTitle}" already completed\n`);
          }
      }
};

//complete will change incomplete status if false;
exports.complete = (taskNumber, filePath) => {
  if(taskNumber){
    readAndParseData(filePath, ChangeIncompleteStatus, taskNumber);
  } else {
    throw new Error('Must enter task number\n')
  }
};

