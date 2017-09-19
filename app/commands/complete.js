'use strict';
const fs = require('fs');
const path = require('path');
const {readAndParseData, writingToJsonFile} = require('../../taskStore.js')

//complete will change incomplete status if false;
exports.complete = (taskNumber, filePath, callback) => {
  let terminalString = ''
  if(taskNumber){
    let indexPosition = Number(taskNumber)-1
    readAndParseData(filePath, function(err, data){
      if(err) throw err
      if(data.tasks[indexPosition] && data.tasks[indexPosition].incomplete){
          data.tasks[indexPosition].incomplete = false;
          terminalString += `Completed task ${data.tasks[indexPosition].id}: '${data.tasks[indexPosition].description}'\n`
          process.stdout.write(`Completed task ${data.tasks[indexPosition].id}: '${data.tasks[indexPosition].description}'\n`);
          writingToJsonFile(filePath, data, function(err){
            if(err) throw err
            callback(err, terminalString)
          })
        } else {
          if(filePath === path.resolve(__dirname, '../tasks.json') && data.tasks.length > 0){
            terminalString += `Task ${data.tasks[indexPosition].id}: "${data.tasks[indexPosition].description}" already completed\n`
            process.stdout.write(`Task ${data.tasks[indexPosition].id}: "${data.tasks[indexPosition].description}" already completed\n`);
          } else {
            terminalString += 'You have 0 tasks\n'

          }
            callback(err, terminalString)
        }
    });
  } else {
    throw new Error('Must enter task number\n')
  }
};

