'use strict';
const fs = require('fs');
const path = require('path');
const {readAndParseData, writingToJsonFile} = require('../../taskStore.js')
//
//
// const ChangeIncompleteStatus = (jsonData, filePath, taskNumber) => {
//     const taskNumberIndex = (Number(taskNumber)-1);
//     const taskTitle = jsonData.tasks[taskNumberIndex].description;
//     const taskId = jsonData.tasks[taskNumberIndex].id
//     if(jsonData.tasks[taskNumberIndex] && jsonData.tasks[taskNumberIndex].incomplete){
//         jsonData.tasks[taskNumberIndex].incomplete = false;
//         writingToJsonFile(jsonData ,filePath)
//         process.stdout.write(`Deleted task ${taskId}: '${taskTitle}'\n`);
//       } else {
//         if(filePath === path.resolve(__dirname, '../tasks.json')){
//           process.stdout.write(`Task ${taskId}: "${taskTitle}" already deleted\n`);
//           }
//       }
// };
//
// //complete will change incomplete status is false;
// exports.deleted = (taskNumber, filePath) => {
//   if(taskNumber){
//     readAndParseData(filePath, ChangeIncompleteStatus, taskNumber);
//   } else {
//     throw new Error('Must enter task number to delete\n')
//   }
// };

exports.deleted = (taskNumber, filePath, callback) => {
  let terminalString = ''
  if(taskNumber){
    let indexPosition = Number(taskNumber)-1
    readAndParseData(filePath, function(err, data){
      if(err) throw err
      if(data.tasks[indexPosition] && data.tasks[indexPosition].incomplete){
          data.tasks[indexPosition].incomplete = false;
          terminalString += `Deleted task ${data.tasks[indexPosition].id}: '${data.tasks[indexPosition].description}'\n`
          process.stdout.write(`Deleted task ${data.tasks[indexPosition].id}: '${data.tasks[indexPosition].description}'\n`);
          writingToJsonFile(filePath, data, function(err){
            if(err) throw err
            callback(err, terminalString)
          })
        } else {
          if(filePath === path.resolve(__dirname, '../tasks.json') && data.tasks.length > 0){
            terminalString += `Task ${data.tasks[indexPosition].id}: "${data.tasks[indexPosition].description}" already deleted\n`
            process.stdout.write(`Task ${data.tasks[indexPosition].id}: "${data.tasks[indexPosition].description}" already deleted\n`);
          } else {
            terminalString += 'You have 0 tasks\n'

          }
            callback(err, terminalString)
        }
    });
  } else {
    throw new Error('Must enter task number to delete\n')
  }
};

