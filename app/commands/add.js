'use strict';
const fs = require('fs');
const path = require('path');
const {readAndParseData, writingToJsonFile} = require('../../taskStore.js')


const turnIntoObject = (taskString, taskNumber) => {
  const taskObject = {id: taskNumber, description: taskString, incomplete: true};
  return taskObject;
};

const pushNewObjectToTasksArray = (newTaskObject, allTasksObject) => {
  allTasksObject.tasks.push(newTaskObject);
  return allTasksObject;
};

const runAfterRead = (tasksObject, filePath, taskString) => {
  let taskNumber =  tasksObject.tasks.length+1;
  //turn string into object;
  let newTaskObject = turnIntoObject(taskString, taskNumber);
  //hold object and then push new array into tasks array
  let modifiedTasksObject = pushNewObjectToTasksArray(newTaskObject, tasksObject);
  //stringify tasks then write to jsonFile with new array added
  writingToJsonFile(modifiedTasksObject, filePath);
  if(filePath === path.resolve(__dirname, '../tasks.json')){
    process.stdout.write(`Created task ${modifiedTasksObject.tasks.length}\n`);
  }
}

exports.add = (taskString, filePath) => {
  if(taskString){
    readAndParseData(filePath, runAfterRead, taskString);
  } else {
    //eventually make a test to catch an error when no string entered
    throw new Error('Error: must enter task\n') ;
  }
};
